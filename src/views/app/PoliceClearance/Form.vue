<template>
  <a-row type="flex" justify="space-between">
    <!-- Steps -->
    <a-col :xs="{ span: 0 }" :md="{ span: 5 }" style="background: white;">
      <!-- <a-affix :offsetTop="60"> -->
      <a-card :bodyStyle="{ padding: '10px', height: '100%' }" style="height: 100%;border: none;">
        <a-steps direction="vertical" :current="current_step" class="form-stepper">
          <a-step
            v-for="(item, index) in steps"
            :key="index"
            :title="item.title"
            :description="item.description"
          />
        </a-steps>
      </a-card>
      <!-- </a-affix> -->
    </a-col>

    <!-- Fill up form -->
    <a-col :xs="{ span: 24 }" :md="{ span: 18 }">
      <h1 style="margin-top: 5vh;">Police Clearance Application</h1>
      <h4>This information will help us assess your application.</h4>
      <a-row type="flex" justify="space-between">
        <a-col :xs="{ span: 24 }" :md="{ span: 16 }">
          <component
            :is="form_components[current_step]"
            :form="form"
            @prev="current_step--"
            @next="validateStep"
            @payment="validateStep(true)"
            :loading="loading"
            :errors="errors"
            :documents="document_data_source"
          />
        </a-col>
        <!-- Attachments -->
        <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
          <a-affix :offsetTop="60">
            <a-card
              :headStyle="{ 
                background: 'linear-gradient(to bottom, #56caef, #3c6cb4)', 
                color: 'white', 
                'font-weight': 'bold',
                'font-size': '15px', 
                padding: '5px 10px',
                'min-height': '2vh'
              }"
              :bodyStyle="{ padding: 0 }"
              class="document-card"
            >
              <a-row slot="title">
                <a-col :span="22">Required Documents</a-col>
                <a-col :span="2">
                  <a-tooltip placement="left">
                    <span
                      slot="title"
                    >Upload all the required documents. If there's a need to apply for a specific certificate/clearance, additional required information will be asked.</span>
                    <a-icon type="info-circle" />
                  </a-tooltip>
                </a-col>
              </a-row>
              <a-table
                :columns="document_columns"
                :dataSource="required_documents"
                bordered
                :pagination="false"
                size="small"
              >
                <template slot="status" slot-scope="text">
                  <div style="text-align: center;">
                    <a-icon
                      v-if="text===2"
                      type="check-circle"
                      style="color: green; font-weight: bold;"
                    />
                    <a-icon
                      v-else-if="text===1"
                      type="loading"
                      style="color: green; font-weight: bold;"
                    />
                    <a-icon v-else type="close" style="color: red; font-weight: bold;" />
                  </div>
                </template>
                <template slot="action" slot-scope="text, record">
                  <a-row style="text-align: center;">
                    <a-col v-if="record.status === 2" :span="24">
                      <a-icon
                        style="cursor: pointer; color: red; font-weight: bold;"
                        type="delete"
                        @click="removeAttachment(record.keyword)"
                      />
                    </a-col>
                    <a-col v-else :span="24">
                      <a-upload
                        :multiple="true"
                        :showUploadList="false"
                        :beforeUpload="file => attachFile(record.keyword, file)"
                        style="cursor: pointer; color: blue; font-weight: bold;"
                      >
                        <a-icon type="upload" />
                      </a-upload>
                    </a-col>
                  </a-row>
                </template>
              </a-table>
              <span
                v-if="checkErrors('attachments')"
                style="color: red"
              >{{checkErrors('attachments')}}</span>
            </a-card>

            <!-- Payment Details -->
            <a-card
              title="Fees"
              style="margin-top: 1vh;"
              :headStyle="{ 
                background: 'linear-gradient(to bottom, #56caef, #3c6cb4)', 
                color: 'white', 
                'font-weight': 'bold', 
                'font-size': '15px', 
                padding: '5px 10px',
                'min-height': '2vh'
              }"
              :bodyStyle="{ padding: '1vh' }"
              class="document-card"
            >
              <a-row type="flex" align="middle" justify="space-between">
                <a-col :span="11">
                  <span style="font-weight: bold;">Mode of Payment</span>
                </a-col>
                <a-col :span="12">
                  <a-select
                    style="width: 100%;"
                    v-model="transaction_details.mode_of_payment"
                    @change="updatePaymentMode"
                  >
                    <a-select-option value="A">Annually</a-select-option>
                    <a-select-option value="SA">Semi-Annual</a-select-option>
                    <a-select-option value="Q">Quarterly</a-select-option>
                  </a-select>
                  <span
                    v-if="checkErrors('mode_of_payment')"
                    style="color: red"
                  >{{checkErrors('mode_of_payment')}}</span>
                </a-col>
              </a-row>

              <a-row type="flex" align="middle">
                <a-col style="font-weight: bold;" :span="24">Payment Breakdown</a-col>
                <template v-for="(item, index) in payments_data_source">
                  <a-col :span="15" :key="`a${index}`" class="row-border">{{item.description}}</a-col>
                  <a-col
                    :span="9"
                    :key="`b${index}`"
                    class="row-border"
                    style="text-align: right;"
                  >{{formatCurrency(item.amount)}}</a-col>
                </template>
                <a-col :span="15" class="row-border" style="color: #333;background: #d7d7d7">Total</a-col>
                <a-col
                  :span="9"
                  class="row-border"
                  style="text-align: right; color: #333;background: #d7d7d7"
                >{{formatCurrency(this.transaction_details.total_payable)}}</a-col>
              </a-row>
            </a-card>
          </a-affix>
        </a-col>
      </a-row>
    </a-col>

    <payment
      :loading="loading"
      :show="show_payment"
      @pay="proceedToSubmit"
      @close="show_payment=false"
    />
  </a-row>
</template>

<script>
import PersonalDetails from "./PersonalDetails";
import ContactAddress from "./ContactAddress";
import ApplicationSummary from "./ApplicationSummary";
import Payment from "@/components/payments/Payment.vue";

export default {
  components: {
    Payment,
    PersonalDetails,
    ContactAddress,
    ApplicationSummary
  },
  data() {
    return {
      show_payment: false,
      current_step: 0,
      form_components: [PersonalDetails, ContactAddress, ApplicationSummary],
      form: {
        application_type: 0,
        permit_type: "police",
        personal_details: {
          name: {
            // first: "",
            // middle: "",
            // last: "",
            // suffix: ""
          },
          birthday: "",
          birthplace: "",
          other_country: "",
          icr: null,
          gender: "",
          civil_status: "",
          height: null,
          weight: null,
          blood_type: "",
          identification_marks: "",
          complexion: "",
          educational_attainment: "",
          occupation: ""
        },
        family_background: {
          father_info: {
            name: {
              first: "",
              middle: "",
              last: "",
              suffix: ""
            },
            birthplace: "",
            other_country: ""
          },
          mother_info: {
            name: {
              first: "",
              middle: "",
              last: "",
              suffix: ""
            },
            birthplace: "",
            other_country: ""
          },
          spouse_info: {
            name: {
              first: "",
              middle: "",
              last: "",
              suffix: ""
            },
            birthplace: "",
            other_country: ""
          }
        },
        address_details: {},
        contact_details: {},
        request_for: "",
        attachments: [
          {
            doc_type: "dti_sec_cda",
            files: []
          }
        ],
        required_documents: {
          civil_status: "",
          birthplace: "",
          monthly_salary: "",
          occupation: "",
          height: "",
          weight: "",
          icr_no: ""
        }
      },
      document_columns: [
        {
          title: "Document Title",
          dataIndex: "title",
          width: 200
        },
        {
          title: "Status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: 50
        },
        {
          title: "",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      document_data_source: [
        {
          title: "DTI/SEC/CDA Certificate",
          status: 0,
          keyword: "dti_sec_cda",
          hidden: true
        },
        {
          title: "Residence Certificate",
          status: 0,
          keyword: "residence"
        },
        {
          title: "Barangay Clearance",
          status: 0,
          keyword: "barangay"
        },
        {
          title: "Police Clearance",
          status: 0,
          keyword: "police"
        }
      ],
      steps: [
        // {
        //   title: "Document Checklist",
        //   description:
        //     "Check all the documents you have and apply for lacking requirements instantly within this app."
        // },
        // {
        //   title: "Business Owner Information",
        //   description:
        //     "Individual or entity who owns a business. Check all corresponding details for any errors."
        // },
        // {
        //   title: "Business Details",
        //   description:
        //     "Includes important details such as Business Name and Business Address. Provide the updated contact number and email."
        // },
        // {
        //   title: "Business Activity",
        //   description:
        //     "NOTE: For Business Codes, please refer to BIR Registration. Line of business cannot be blank."
        // },
        // {
        //   title: "Additional Fields",
        //   description:
        //     "This is the additional fields for the not provided required documents."
        // },
        {
          title: "Personal Details",
          description:
            "An overview of application wherein user can review, edit and modify prior submission."
        },
        {
          title: "Contact / Address",
          description:
            "An overview of application wherein user can review, edit and modify prior submission."
        },
        {
          title: "Application Summary",
          description:
            "An overview of application wherein user can review, edit and modify prior submission."
        },
        {
          title: "Payment",
          description:
            "Pay application through Credit Card, Over-the-counter or at any 7-eleven outlets."
        }
      ],
      transaction_details: {
        total_payable: 5000,
        amount_payable: 0,
        amount_paid: 0,
        payment_breakdown: [
          {
            description: "CTC or Cedula",
            fee_type: "local_taxes",
            amount: 1000
          },
          {
            description: "Barangay Clearance",
            fee_type: "local_taxes",
            amount: 1000
          },
          {
            description: "Police Clearance",
            fee_type: "local_taxes",
            amount: 1000
          },
          {
            description: "Business Permit Fee",
            fee_type: "local_taxes",
            amount: 1000
          },
          {
            description: "Fire Safety and Inspection Fee",
            fee_type: "local_taxes",
            amount: 1000
          },
          {
            description: "Convenience Fee",
            fee_type: "application_fee",
            amount: 1000
          }
        ],
        status: "unpaid",
        method: "",
        mode_of_payment: "",
        payment_details: {}
      },
      card_details: {},
      payments_data_source: [
        {
          description: "CTC or Cedula",
          amount: 1000
        },
        {
          description: "Barangay Clearance",
          amount: 1000
        },
        {
          description: "Police Clearance",
          amount: 1000
        },
        {
          description: "Business Permit Fee",
          amount: 1000
        },
        {
          description: "Fire Safety and Inspection Fee",
          amount: 1000
        },
        {
          description: "Convenience Fee",
          fee_type: "application_fee",
          amount: 1000
        }
      ],
      loading: false,
      errors: []
    };
  },
  created() {
    this.init();
  },
  watch: {
    current_step() {
      console.log("this.form step :", this.form);
    }
  },
  computed: {
    required_documents() {
      var docs = [];
      this.form.attachments.forEach(attachment => {
        docs.push(
          this.document_data_source.find(v => v.keyword === attachment.doc_type)
        );
      });
      return docs;
    }
  },
  methods: {
    init() {
      this.$store.dispatch("GET_REGIONS");
      this.$store.dispatch("GET_PROVINCES");
    },
    validateStep(validate_all) {
      console.log("validate_all :", validate_all);
      console.log("this.current_step :", this.current_step);
      console.log("this.form :", this.form);

      var { errors, jump_to } = this.validation(validate_all);
      // var errors = [],
      //   jump_to = 0;

      console.log("errors :", JSON.stringify(errors));
      this.errors = errors;

      // if there is error and validate all then jump to the step
      if (errors.length && validate_all) {
        this.current_step = jump_to;
        window.scrollTo(0, 0);
      }

      // if there is no errors
      if (!errors.length) {
        if (this.current_step === 2) {
          this.submit();
          this.show_payment = true;
          // Proceed to payment
        } else {
          this.current_step++;
          window.scrollTo(0, 0);
        }
      }
    },
    checkErrors(field) {
      var form_error = this.errors.find(v => v.field === field);
      return form_error ? form_error.error : null;
    },
    changeStep(step) {
      this.current_step = step;
      window.scrollTo(0, 0);
    },
    proceedToSubmit({ payment_details, method }) {
      this.transaction_details.method = method;
      if (method === "creditcard") {
        this.card_details = payment_details;
        const expiry = this.card_details.expiry.split("/");
        this.card_details.exp_month = expiry[0];
        this.card_details.exp_year = expiry[1];
      } else this.transaction_details.payment_details = payment_details;
      this.submit();
    },
    submit() {
      this.loading = true;
      var files = null;
      if (this.form.attachments.length) {
        files = new FormData();
        this.form.attachments.forEach(attachment => {
          attachment.files.forEach(file => {
            files.append(attachment.doc_type, file, file.name);
          });
        });
      }
      this.$store
        .dispatch("CREATE_APPLICATION", {
          details: {
            payment: {
              method: this.transaction_details.method,
              mode_of_payment: this.transaction_details.mode_of_payment,
              card: this.card_details,
              transaction_details: this.transaction_details
            },
            data: this.form
          },
          files
        })
        .then(result => {
          console.log("CREATE_POLICE_CLEARANCE result :", result);
          this.$message.success("Successful Payment.");
          this.$message.success("Your application has been received.");
          this.loading = false;
          this.$router.push("/app");
        })
        .catch(err => {
          console.log("CREATE_BUSINESS_PERMIT err :", err);
        });
    },
    attachFile(keyword, file) {
      console.log("keyword :", keyword);
      var i = this.document_data_source.findIndex(v => v.keyword === keyword);
      this.document_data_source[i].status = 1;

      setTimeout(() => {
        // Add new attachment
        var attachment_index = this.form.attachments.findIndex(
          v => v.doc_type === keyword
        );
        this.form.attachments[attachment_index].files.push(file);
        this.$message.info(
          `${this.document_data_source[i].title} file uploaded.`
        );
        this.document_data_source[i].status = 2;
      }, 1000);
    },
    removeAttachment(keyword) {
      console.log("keyword :", keyword);
      var i = this.document_data_source.findIndex(v => v.keyword === keyword);
      this.document_data_source[i].status = 0;

      var attachment_index = this.form.attachments.findIndex(
        v => v.doc_type === keyword
      );
      this.form.attachments[attachment_index].files = [];

      this.$message.info(`Remove file ${this.document_data_source[i].title}.`);
      this.document_data_source[i].status = 0;
    },
    checkDocsNeeded(keywords) {
      var show = false;
      console.log("this.form.attachments :", this.form.attachments);
      this.form.attachments.forEach(attachment => {
        if (keywords.includes(attachment.doc_type)) show = true;
      });
      return !show;
    },
    updatePaymentMode() {
      if (this.transaction_details.mode_of_payment === "SA") {
        var payable = parseFloat(this.transaction_details.total_payable) / 2;
        this.transaction_details.amount_payable = payable;
        this.transaction_details.amount_paid = payable;
      } else if (this.transaction_details.mode_of_payment === "Q") {
        var payable = parseFloat(this.transaction_details.total_payable) / 4;
        this.transaction_details.amount_payable = payable;
        this.transaction_details.amount_paid = payable;
      } else {
        this.transaction_details.amount_payable = this.transaction_details.total_payable;
        this.transaction_details.amount_paid = this.transaction_details.total_payable;
      }
    },
    validation(validate_all) {
      var errors = [],
        jump_to = 0;
      if (validate_all || this.current_step === 0) {
        console.log("current step 0: " + this.form.personal_details.name.last);
        if (!this.form.personal_details.name.last) {
          console.log("error push last name: ");
          errors.push({
            field: "personal_details.name.last",
            error: "Last Name is a required field."
          });
        }
        if (!this.form.personal_details.name.first) {
          errors.push({
            field: "personal_details.name.first",
            error: "First Name is a required field."
          });
        }
        if (!this.form.personal_details.birthday) {
          errors.push({
            field: "personal_details.birthday",
            error: "Date of Birth is a required field."
          });
        }
        if (!this.form.personal_details.gender) {
          errors.push({
            field: "personal_details.gender",
            error: "Gender is a required field."
          });
        }
        if (!this.form.personal_details.birthplace) {
          errors.push({
            field: "personal_details.birthplace",
            error: "Birthplace is a required field."
          });
        }
        if (!this.form.personal_details.height) {
          errors.push({
            field: "personal_details.height",
            error: "Height is a required field."
          });
        }
        if (!this.form.personal_details.weight) {
          errors.push({
            field: "personal_details.weight",
            error: "Weight is a required field."
          });
        }
        if (!this.form.personal_details.blood_type) {
          errors.push({
            field: "personal_details.blood_type",
            error: "Blood Type is a required field."
          });
        }
        if (!this.form.personal_details.complexion) {
          errors.push({
            field: "personal_details.complexion",
            error: "Complexion is a required field."
          });
        }
        if (!this.form.personal_details.educational_attainment) {
          errors.push({
            field: "personal_details.educational_attainment",
            error: "Educational Attainment is a required field."
          });
        }
        if (!this.form.personal_details.occupation) {
          errors.push({
            field: "personal_details.occupation",
            error: "Occupation is a required field."
          });
        }

        // if (
        //   this.checkDocsNeeded(["residence", "barangay", "police"]) &&
        //   !this.form.required_documents.civil_status
        // ) {
        //   errors.push({
        //     field: "required_documents.civil_status",
        //     error: "Civil Status is a required field."
        //   });
        // }

        // if (
        //   this.checkDocsNeeded(["residence", "barangay", "police"]) &&
        //   !this.form.required_documents.birthplace
        // ) {
        //   errors.push({
        //     field: "required_documents.birthplace",
        //     error: "Place of Birth is a required field."
        //   });
        // }

        if (errors.length) jump_to = 0;
      }
      if (validate_all || this.current_step === 1) {
        if (!this.form.contact_details.tel_no) {
          errors.push({
            field: "contact_details.tel_no",
            error: "Tel No is a required field."
          });
        }
        if (!this.form.contact_details.mobile) {
          errors.push({
            field: "contact_details.mobile",
            error: "Mobile No is a required field."
          });
        }
        if (!this.form.contact_details.email) {
          errors.push({
            field: "contact_details.email",
            error: "Email Address is a required field."
          });
        }
        if (!this.form.address_details.region) {
          errors.push({
            field: "address_details.region",
            error: "Region is a required field."
          });
        }
        if (!this.form.address_details.province) {
          errors.push({
            field: "address_details.province",
            error: "Province is a required field."
          });
        }
        if (!this.form.address_details.barangay) {
          errors.push({
            field: "address_details.barangay",
            error: "Barangay is a required field."
          });
        }
        if (!this.form.address_details.city) {
          errors.push({
            field: "address_details.city",
            error: "City/Municipality is a required field."
          });
        }
        if (!this.form.address_details.postal_code) {
          errors.push({
            field: "address_details.postal_code",
            error: "Postal Code is a required field."
          });
        }
        if (errors.length) jump_to = 1;
      }

      if (
        validate_all &&
        this.form.attachments &&
        this.form.attachments.length &&
        this.form.attachments.findIndex(v => !v.files || !v.files.length) > -1
      ) {
        // validate ATTACHMENTS
        errors.push({
          field: "attachments",
          error: "Please attach the required documents."
        });
        this.$message.error("Please attach the required documents");
        jump_to = 4;
      }

      console.log("errors: " + JSON.stringify(errors));
      // Validate Mode of Payment
      if (validate_all && !this.transaction_details.mode_of_payment) {
        errors.push({
          field: "mode_of_payment",
          error: "Please choose mode of payment."
        });
        this.$message.error("Please choose mode of payment.");
        jump_to = 4;
      }
      console.log("errors to return: " + JSON.stringify(errors));
      return { errors, jump_to };
    }
  }
};
</script>

<style>
.form-stepper {
  height: 100%;
}

.form-stepper .ant-steps-item-title {
  font-size: 14px !important;
  font-weight: bold !important;
}

.form-stepper .ant-steps-item-description {
  font-size: 12px !important;
}

.form-stepper .ant-steps-item {
  height: 18vh !important;
}

.form-affix {
  height: 100% !important;
}

.form-affix .ant-affix {
  height: 100% !important;
}

.documents-table th {
  text-align: center !important;
}

.documents-table th,
.documents-table td {
  padding: 5px !important;
}

.document-card .ant-card-head-title {
  padding: 0 !important;
}

.row-border {
  padding: 5px;
  border: 0.5px solid #888;
  font-size: 12px;
  font-weight: 600;
}
</style>