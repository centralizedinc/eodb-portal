<template>
  <a-row type="flex" justify="space-between">
    <!-- Steps -->
    <a-col :xs="{ span: 0 }" :lg="{ span: 5 }" style="background: white;">
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
    <a-col
      style="padding: 10px"
      :xs="{ span: 24 }"
      :md="{ span: 24 }"
      :lg="{span: 18}"
      class="fill-up-form"
    >
      <h1 style="margin-top: 5vh;">Barangay/Business Clearance Application</h1>
      <h4>This information will help us assess your application.</h4>
      <a-row type="flex" justify="space-between">
        <a-col :xs="{span: 24}" :md="{span: 24}" :lg="{span: 16}">
          <!-- current_step-- -->
          <component
            :is="form_components[current_step]"
            :form="form"
            @prev="prev_step"
            @next="validateStep"
            @payment="validateStep(true)"
            :loading="loading"
            :errors="errors"
            :documents="document_data_source"
            @selectPurpose="onSelectPurpose"
          />
        </a-col>
        <!-- Attachments -->
        <a-col :xs="{ span: 24 }" :md="{ span:  24}" :lg="{ span: 7 }">
          <a-affix :offsetTop="65">
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
                    <span slot="title">
                      Upload all the required documents. If there's a need to
                      apply for a specific certificate/clearance, additional
                      required information will be asked.
                    </span>
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
                      v-if="text === 2"
                      type="file-done"
                      style="color: green; font-weight: bold;"
                    />
                    <a-icon
                      v-else-if="text === 1"
                      type="loading"
                      style="color: blue; font-weight: bold;"
                    />
                    <a-icon v-else type="exception" style="color: red; font-weight: bold;" />
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
                    <a-col :span="24" v-else-if="record.status===1">
                      <a-icon type="loading" style="color: blue; font-weight: bold;" />
                    </a-col>
                    <a-col v-else :span="24">
                      <a-upload
                        :multiple="true"
                        :showUploadList="false"
                        :beforeUpload="file => attachFile(record.keyword, file)"
                        style="cursor: pointer; font-weight: bold;"
                      >
                        <a-icon type="upload" style="color: blue;" />
                      </a-upload>
                    </a-col>
                  </a-row>
                </template>
              </a-table>
              <span
                v-if="checkErrors('attachments')"
                style="color: red"
              >{{ checkErrors("attachments") }}</span>
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
              <!-- <a-row type="flex" align="middle" justify="space-between">
                <a-col :span="11">
                  <span style="font-weight: bold;">Mode of Payment</span>
                </a-col>
                <a-col :span="12">
                  <a-select
                    disabled
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
                  >{{ checkErrors("mode_of_payment") }}</span>
                </a-col>
              </a-row>-->

              <a-row type="flex" align="middle">
                <a-col style="font-weight: bold;" :span="24">Payment Breakdown</a-col>
                <template v-for="(item, index) in payments_data_source">
                  <a-col :span="15" :key="`a${index}`" class="row-border">{{ item.description }}</a-col>
                  <a-col
                    :span="9"
                    :key="`b${index}`"
                    class="row-border"
                    style="text-align: right;"
                  >{{ formatCurrency(item.amount) }}</a-col>
                </template>
                <a-col
                  :span="15"
                  class="row-border"
                  style="color: #333;background: #d7d7d7"
                >Total Amount</a-col>
                <a-col
                  :span="9"
                  class="row-border"
                  style="text-align: right; color: #333;background: #d7d7d7"
                >{{ formatCurrency(this.transaction_details.total_payable) }}</a-col>
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
      @close="show_payment = false"
      :payment_amount="total_payable"
    />
  </a-row>
</template>

<script>
import Purpose from "./Purpose";
import PersonalDetails from "./PersonalDetails";
import ApplicationSummary from "./ApplicationSummary";
import ApplicationChecklist from "./ApplicationChecklist";
import BusinessDetails from "./BusinessDetails";
import Payment from "@/components/payments/Payment.vue";
export default {
  components: {
    Payment,
    Purpose,
    ApplicationChecklist,
    PersonalDetails,
    BusinessDetails,
    BusinessDetails,
    ApplicationSummary
  },
  data() {
    return {
      show_payment: false,
      current_step: 0,
      form_components: [
        // ApplicationChecklist,
        "Purpose",
        "PersonalDetails",
        "ApplicationSummary"
      ],
      form: {
        requestor: "",
        purpose: [],
        application_type: 0,
        permit_type: "barangay",
        residential_address: {
          bldg_no: "",
          unit_no: "",
          bldg_name: "",
          street: "",
          subdivision: "",
          region: "",
          province: "",
          city: "",
          barangay: "",
          postal_code: "",
          coordinates: {
            lat: 0,
            lng: 0
          }
        },
        personal_details: {
          name: {
            first: "",
            middle: "",
            last: "",
            suffix: ""
          }
        },
        business_details: {
          business_owner: "",
          business_name: "",
          business_type: "",
          franchise: ""
        },
        business_address: {
          bldg_no: "",
          unit_no: "",
          bldg_name: "",
          street: "",
          subdivision: "",
          region: "",
          province: "",
          city: "",
          barangay: "",
          postal_code: "",
          coordinates: {
            lat: 0,
            lng: 0
          }
        },
        // spouse_name: {
        //   first: "",
        //   middle: "",
        //   last: "",
        //   suffix: ""
        // },
        // request_for: "",
        attachments: [
          {
            doc_type: "cedula",
            files: []
          },
          {
            doc_type: "dti_sec_cda",
            files: []
          }
        ],
        required_documents: {}
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
          title: "Action",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      document_data_source: null,
      // [
      //   {
      //     title: "DTI/SEC/CDA Certificate",
      //     status: 0,
      //     keyword: "dti_sec_cda",
      //     hidden: true
      //   },
      //   {
      //     title: "Community Tax Certificate",
      //     status: 0,
      //     keyword: "cedula"
      //   }
      // ],
      steps: [
        // {
        //   title: "Document Checklist",
        //   description:
        //     "Check all the documents you have and apply for lacking requirements instantly within this app."
        // },
        {
          title: "Type of Clearance",
          // description:
          //   "State the reason or the purpose of your request (i.e., local employment, police clearance, business permit, loan purposes, etc.) "
          description:
            "Barangay Certificate for local employment, police clearance, etc. And Barangay Business Clearance for Business Clearance application"
        },
        {
          title: "Personal Details",
          description:
            "Details about the applicant, such as  name, address and other personal information"
        },
        // {
        //   title: "Additional Fields",
        //   description:
        //     "This is the additional fields for the not provided required documents."
        // },
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
      business_step: {
        title: "Business Details",
        description:
          "For business permit applicants, this section must be filled in. It includes important details such as name, address and nature of business."
      },
      transaction_details: {
        total_payable: 5000,
        amount_payable: 0,
        amount_paid: 0,
        payment_breakdown: [],
        status: "unpaid",
        method: "",
        mode_of_payment: "A",
        payment_details: {}
      },
      card_details: {},
      payments_data_source: [
        // {
        //   description: "CTC or Cedula",
        //   amount: 1000
        // },
        // {
        //   description: "Barangay Clearance",
        //   amount: 1000
        // },
        // {
        //   description: "Police Clearance",
        //   amount: 1000
        // },
        // {
        //   description: "Business Permit Fee",
        //   amount: 1000
        // },
        // {
        //   description: "Fire Safety and Inspection Fee",
        //   amount: 1000
        // },
        {
          description: "Application Fee",
          fee_type: "application_fee",
          amount: 100
        },
        {
          description: "Convenience Fee",
          fee_type: "convenience_fee",
          amount: 150
        }
      ],
      loading: false,
      departments: [],
      errors: [],
      computation_formula: ""
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
      console.log(
        "document data source @ required documents: " +
          JSON.stringify(this.document_data_source)
      );
      this.form.attachments.forEach(attachment => {
        docs.push(
          this.document_data_source.find(v => v.keyword === attachment.doc_type)
        );
      });
      console.log("required documents data docs: " + JSON.stringify(docs));
      return docs;
    },
    total_payable() {
      console.log("total payable data: " + JSON.stringify(this.form.tax));
      const index = this.payments_data_source.findIndex(
        v => v.fee_type === "application_fee"
      );
      var amount = 0,
        computed_amount = 0;
      try {
        computed_amount = eval(this.computation_formula);
      } catch (error) {
        console.log("error :", error);
        computed_amount = 0;
      }
      this.payments_data_source[index].amount = computed_amount;
      var total = this.payments_data_source
        .map(v => v.amount)
        .reduce((t, c) => parseFloat(t) + parseFloat(c));
      console.log("total payable total value: " + JSON.stringify(total));
      this.transaction_details.total_payable = total;
      this.transaction_details.amount_paid = total;
      return total;
    },
    user() {
      return this.$store.state.user_session.user;
    }
  },
  mounted() {
    // GET DEPARTMENTS
    const departments = this.deepCopy(
      this.$store.state.permits.filing_permit.approvers
    );
    console.log("departments :", departments);
    this.departments = departments;
    this.form.permit_code = this.$store.state.permits.filing_permit._id;

    // GET REQUIREMENTS
    console.log(
      "get requirements: " +
        JSON.stringify(this.$store.state.permits.filing_permit.requirements)
    );
    const requirements = this.deepCopy(
      this.$store.state.permits.filing_permit.requirements
    );
    console.log("requirements :", JSON.stringify(requirements));
    const doc_req = requirements.map(v => {
      return {
        title: v.name,
        status: 0,
        keyword: v.keyword,
        hidden: v.required
      };
    });

    console.log("doc rep data: " + JSON.stringify(doc_req));
    this.document_data_source = doc_req;
    console.log(
      "document data soure: " + JSON.stringify(this.document_data_source)
    );
    // this.updateDocsPayment();
    this.onSelectPurpose();
  },
  methods: {
    onSelectPurpose() {
      // Add or remove business details/residential address
      if (
        this.form.purpose.includes("bp") &&
        this.steps.findIndex(v => v.title === this.business_step.title) === -1
      ) {
        this.steps.splice(2, 0, this.business_step);
        this.form_components.splice(2, 0, "BusinessDetails");
      } else if (
        !this.form.purpose.includes("bp") &&
        this.steps.findIndex(v => v.title === this.business_step.title) > -1
      ) {
        this.steps.splice(2, 1);
        this.form_components.splice(2, 1);
      }

      // add dti/sec/cda attachment
      var index = this.form.attachments.findIndex(
        v => v.doc_type === "dti_sec_cda"
      );
      const i = this.document_data_source.findIndex(
        v => v.keyword === "dti_sec_cda"
      );
      console.log("index :", index);
      console.log("test :", !this.form.purpose.includes("bp") && index > -1);
      if (this.form.purpose.includes("bp") && index === -1) {
        this.form.attachments.push({
          doc_type: "dti_sec_cda",
          files: []
        });
      } else if (!this.form.purpose.includes("bp") && index > -1) {
        this.document_data_source[i].status = 0;
        this.form.attachments.splice(index, 1);
      }
    },
    init() {
      this.$store.dispatch("GET_REGIONS");
      this.$store.dispatch("GET_PROVINCES");
      var data = this.$store.state.user_session.user;
      this.form.personal_details.name = data.name;

      this.form.requestor =
        this.user && this.user.name
          ? `${this.user.name.first} ${this.user.name.last}`
          : "";

      this.$store
        .dispatch("GET_FEES_COMPUTATION", {
          permit_type: this.$store.state.permits.filing_permit._id,
          app_type: 0
        })
        .then(result => {
          console.log("GET_FEES_COMPUTATION result.data :", result.data);
          if (!result.data.errors)
            this.computation_formula = result.data.computation;
        })
        .catch(err => {
          console.log("err :", err);
        });
    },
    prev_step() {
      // if (this.current_step == 3) {
      //   if (this.form.purpose.includes("bp")) {
      //     this.current_step--;
      //   } else this.current_step -= 2;
      // } else
      this.current_step--;
    },
    validateStep(validate_all) {
      console.log("validate_all :", validate_all);
      console.log("this.current_step :", this.current_step);
      console.log("this.form :", this.form);

      // comment to validate
      var { errors, jump_to } = this.validation(validate_all);
      window.scrollTo(0, 0);
      // comment to  bypass
      // var errors = [],
      //   jump_to = 0;

      console.log("errors :", JSON.stringify(errors));
      this.errors = errors;

      // if there is error and validate all then jump to the step
      if (errors.length && validate_all) {
        if (jump_to !== null) this.current_step = jump_to;
        window.scrollTo(0, 0);
      }

      // if there is no errors
      if (!errors.length) {
        if (
          this.current_step === 3 ||
          (!this.form.purpose.includes("bp") && this.current_step === 2)
        ) {
          this.show_payment = true;
          // Proceed to payment
        } else {
          // if (this.current_step == 1) {
          //   if (this.form.purpose.includes("bp")) {
          //     this.current_step++;
          //   } else this.current_step += 2;
          // } else
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
      var upload_attachments = this.form.attachments.filter(
        v => v.files && typeof v.files[0] === "object"
      );
      console.log("upload_attachments :", upload_attachments);
      if (upload_attachments.length) {
        files = new FormData();
        upload_attachments.forEach(attachment => {
          attachment.files.forEach(file => {
            files.append(attachment.doc_type, file, file.name);
          });
        });
      }

      console.log(
        "before saving this.form.attachments :",
        this.form.attachments
      );
      var transaction_no = "",
        reference_no = "";
      this.transaction_details.payment_breakdown = this.payments_data_source;
      this.$store
        .dispatch("CREATE_APPLICATION", {
          details: {
            payment: {
              method: this.transaction_details.method,
              mode_of_payment: this.transaction_details.mode_of_payment,
              card: this.card_details,
              transaction_details: this.transaction_details
            },
            data: this.form,
            departments: this.departments
          },
          files
        })
        .then(result => {
          console.log("CREATE_APPLICATION result :", result);

          // Create Payment Receipt
          transaction_no = result.payment.transaction_no;
          reference_no = result.payment.reference_no;
          const payment_details = {
            transaction_no: result.payment.transaction_no,
            date: result.payment.date_created,
            payor: this.getPayorName(result.payment),
            payment_breakdown: result.payment.payment_breakdown
          };
          return this.$upload(payment_details, "RECEIPT");
        })
        .then(blob => {
          console.log("blob :", blob);
          if (blob) {
            var file = new File(
              [blob],
              `payment-${transaction_no}-${Date.now()}-smart-juan.pdf`,
              {
                type: "application/pdf",
                lastModified: Date.now()
              }
            );
            var form_data = new FormData();
            form_data.append("receipt", file);
            return this.$store.dispatch("SAVE_RECEIPT_ATTACHMENT", {
              transaction_no,
              reference_no,
              form_data
            });
          }
        })
        .then(result => {
          console.log("Payment receipt result :", result);

          this.$message.success("Successful Payment.");
          this.$message.success("Your application has been received.");
          this.loading = false;
          this.$router.push(`/app/tracker?ref_no=${reference_no}`);
        })
        .catch(err => {
          this.loading = false;
          console.log("CREATE_APPLICATION err :", err);
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
    // validation
    validation(validate_all) {
      var errors = [],
        jump_to = null;
      if (validate_all || this.current_step === 1) {
        if (!this.form.personal_details.name.last) {
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
        if (!this.form.personal_details.birthdate) {
          errors.push({
            field: "personal_details.birthdate",
            error: "Date of Birth is a required field."
          });
        }
        if (!this.form.personal_details.birthplace) {
          errors.push({
            field: "personal_details.birthplace",
            error: "Birthplace is a required field."
          });
        }
        if (!this.form.personal_details.gender) {
          errors.push({
            field: "personal_details.gender",
            error: "Gender is a required field."
          });
        }
        // if (!this.form.personal_details.civil_status) {
        //   errors.push({
        //     field: "personal_details.civil_status",
        //     error: "Civil Status is a required field."
        //   });
        // }
        if (!this.form.personal_details.ctc_no) {
          errors.push({
            field: "personal_details.ctc_no",
            error: "CTC is a required field."
          });
        }

        if (this.form.purpose.includes("pc")) {
          if (!this.form.residential_address.region) {
            errors.push({
              field: "residential_address.region",
              error: "Region is a required field."
            });
          }
          if (!this.form.residential_address.province) {
            errors.push({
              field: "residential_address.province",
              error: "Province is a required field."
            });
          }
          if (!this.form.residential_address.barangay) {
            errors.push({
              field: "residential_address.barangay",
              error: "Barangay is a required field."
            });
          }
          if (!this.form.residential_address.city) {
            errors.push({
              field: "residential_address.city",
              error: "City/Municipality is a required field."
            });
          }
          if (!this.form.residential_address.postal_code) {
            errors.push({
              field: "residential_address.postal_code",
              error: "Postal Code is a required field."
            });
          }
        }

        // if (
        //   this.checkDocsNeeded(["cedula"]) ||
        //   !this.form.required_documents.civil_status
        // ) {
        //   errors.push({
        //     field: "required_documents.civil_status",
        //     error: "Civil Status is a required field."
        //   });
        // }

        // if (
        //   this.checkDocsNeeded(["cedula", "barangay", "police"]) &&
        //   !this.form.required_documents.birthplace
        // ) {
        //   errors.push({
        //     field: "required_documents.birthplace",
        //     error: "Place of Birth is a required field."
        //   });
        // }

        if (errors.length) jump_to = 1;
      }
      if (
        (validate_all || this.current_step === 2) &&
        this.form.purpose.includes("bp")
      ) {
        if (!this.form.business_details.business_type) {
          errors.push({
            field: "business_details.business_type",
            error: "Business Type is a required field."
          });
        }
        if (!this.form.business_details.business_owner) {
          errors.push({
            field: "business_details.business_owner",
            error: "Business Owner Name is required field"
          });
        }
        if (!this.form.business_details.business_name) {
          errors.push({
            field: "business_details.business_name",
            error: "Business Name is a required field."
          });
        }

        if (!this.form.business_address.region) {
          errors.push({
            field: "business_address.region",
            error: "Region is a required field."
          });
        }
        if (!this.form.business_address.province) {
          errors.push({
            field: "business_address.province",
            error: "Province is a required field."
          });
        }
        if (!this.form.business_address.barangay) {
          errors.push({
            field: "business_address.barangay",
            error: "Barangay is a required field."
          });
        }
        if (!this.form.business_address.city) {
          errors.push({
            field: "business_address.city",
            error: "City/Municipality is a required field."
          });
        }
        if (!this.form.business_address.postal_code) {
          errors.push({
            field: "business_address.postal_code",
            error: "Postal Code is a required field."
          });
        }
        if (errors.length) jump_to = 2;
      }
      // if (validate_all || this.current_step === 2) {
      //   if (
      //     !this.form.business_details.line_of_business ||
      //     !this.form.business_details.line_of_business.length
      //   ) {
      //     errors.push({
      //       field: "business_details.line_of_business",
      //       error: "Add atleast one line of business"
      //     });
      //     jump_to = 2;
      //   }
      // }

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
        // jump_to = 2;
      }

      // Validate Mode of Payment
      if (validate_all && !this.transaction_details.mode_of_payment) {
        errors.push({
          field: "mode_of_payment",
          error: "Please choose mode of payment."
        });
        this.$message.error("Please choose mode of payment.");
        // jump_to = 2;
      }
      return { errors, jump_to };
    },
    getPayorName(payment) {
      if (payment.method === "creditcard") {
        return payment.payment_details.source.name;
      } else {
        return this.user && this.user.name
          ? `${this.user.name.first} ${this.user.name.last}`
          : "";
      }
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

.fill-up-form .ant-input,
.fill-up-form .ant-form-item-control-wrapper {
  text-transform: uppercase;
}

.fill-up-form .ant-form-explain {
  font-size: 10px;
  text-transform: none;
  font-weight: bold;
}
</style>
