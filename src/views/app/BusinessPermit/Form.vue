<template>
  <a-row type="flex" justify="space-between">
    <!-- Steps -->
    <a-col :xs="{ span: 0 }" :md="{ span: 5 }">
      <a-affix :offsetTop="60">
        <a-card :bodyStyle="{ padding: '10px', height: '100%' }" style="height: 100%;">
          <span style="font-size: 15px; font-weight: bold;">Secure Business Permit in 5 steps</span>
          <a-steps direction="vertical" :current="current_step" class="form-stepper">
            <a-step
              v-for="(item, index) in steps"
              :key="index"
              :title="item.title"
              :description="item.description"
            />
          </a-steps>
        </a-card>
      </a-affix>
    </a-col>

    <!-- Fill up form -->
    <a-col :xs="{ span: 24 }" :md="{ span: 12 }">
      <h1 style="margin-top: 5vh;">Business Permit Application</h1>
      <h4>This information will help us assess your application.</h4>
      <component
        :is="form_components[current_step]"
        :form="form"
        @prev="current_step--"
        @next="validateStep"
        @payment="validateStep(true)"
        :loading="loading"
        :errors="errors"
      />
    </a-col>

    <a-col :xs="{ span: 24 }" :md="{ span: 6 }">
      <a-affix :offsetTop="60">
        <!-- Attachments -->
        <a-card
          style="margin-top: 5vh;"
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
            :dataSource="document_data_source"
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
            <template slot="action" slot-scope="text, record, index">
              <a-row style="text-align: center;">
                <a-col v-if="record.status === 2" :span="24">
                  <a-icon
                    style="cursor: pointer; color: red; font-weight: bold;"
                    type="delete"
                    @click="removeAttachment(index)"
                  />
                </a-col>
                <a-col v-else :span="24">
                  <a-upload
                    :multiple="true"
                    :showUploadList="false"
                    :beforeUpload="file => attachFile(index, file)"
                    style="cursor: pointer; color: blue; font-weight: bold;"
                  >
                    <!-- @change="attachFile(index, $event)" -->
                    <a-icon type="upload" />
                  </a-upload>
                </a-col>
              </a-row>
            </template>
          </a-table>
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
          <a-row type="flex" align="middle" style="margin-bottom: 1vh;">
            <a-col :span="10">
              <span style="font-weight: bold;">Mode of Payment</span>
            </a-col>
            <a-col :span="14">
              <a-select style="width: 100%;" v-model="payment_details.mode_of_payment">
                <a-select-option value="A">Annually</a-select-option>
                <a-select-option value="SA">Semi-Annual</a-select-option>
                <a-select-option value="Q">Quarterly</a-select-option>
              </a-select>
            </a-col>
          </a-row>

          <a-row>
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
            >{{formatCurrency(this.payment_details.total_payable)}}</a-col>
            <!-- <a-col :span="24">
              <a-button block style="background: #1890ff; color: #fff; font-weight: bold;">Pay Now</a-button>
            </a-col>-->
          </a-row>
        </a-card>
      </a-affix>
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
import BusinessOwner from "./BusinessOwner";
import BusinessDetails from "./BusinessDetails";
import BusinessActivity from "./BusinessActivity";
import ApplicationSummary from "./ApplicationSummary";
import Payment from "@/components/payments/Payment.vue";

export default {
  components: {
    Payment,
    BusinessOwner,
    BusinessDetails,
    BusinessActivity,
    ApplicationSummary
  },
  data() {
    return {
      show_payment: false,
      current_step: 0,
      form_components: [
        "BusinessOwner",
        "BusinessDetails",
        "BusinessActivity",
        "ApplicationSummary"
      ],
      form: {
        application_type: 0,
        owner_details: {
          name: {
            first: "",
            middle: "",
            last: "",
            suffix: ""
          },
          birthdate: null,
          birthplace: "",
          gender: "",
          telno: "",
          mobile: "",
          email: "",
          tin: "",
          civil_status: "",
          job_title: "",
          salary: ""
        },
        owner_address: {
          bldg_no: "",
          unit_no: "",
          bldg_name: "",
          street: "",
          subdivision: "",
          region: "",
          province: "",
          city: "",
          barangay: "",
          postal_code: ""
        },
        business_details: {
          business_name: "",
          business_type: "",
          registration_no: "",
          registration_date: null,
          tin: "",
          ctc_no: "",
          business_area: "",
          employees_establishment: "",
          employees_residing: "",
          telno: "",
          mobile: "",
          email: "",
          enjoying_tax_incentive: false,
          specify_entity: "",
          line_of_business: [],
          measure_or_pax: []
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
          is_rented: false,
          rental: "",
          lessor_name: "",
          rental_address: {
            bldg_no: "",
            unit_no: "",
            bldg_name: "",
            street: "",
            subdivision: "",
            region: "",
            province: "",
            city: "",
            barangay: "",
            postal_code: ""
          },
          contact_no: "",
          email: ""
        },
        attachments: []
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
          keyword: "dti_sec_cda"
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
        {
          title: "Business Owner Information",
          description:
            "Individual or entity who owns a business. Check all corresponding details for any errors."
        },
        {
          title: "Business Details",
          description:
            "Includes important details such as Business Name and Business Address. Provide the updated contact number and email."
        },
        {
          title: "Business Activity",
          description:
            "NOTE: For Business Codes, please refer to BIR Registration. Line of business cannot be blank."
        },
        {
          title: "Application Summary",
          description:
            "An overview of application wherein user can review, edit and modify prior submission."
        },
        {
          title: "Payment",
          description: "Payment Details"
        }
      ],
      payment_details: {
        total_payable: 5000,
        amount_rendered: 0,
        method: "",
        mode_of_payment: "",
        application_details: {},
        payment_details: {}
      },
      payments_data_source: [
        {
          description: "Residence Certificate",
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
        }
      ],
      loading: false,
      errors: []
    };
  },
  methods: {
    validateStep(validate_all) {
      var errors = [];
      console.log("validate_all :", validate_all);
      var jump_to = 0;
      if (validate_all || this.current_step === 0) {
        if (!this.form.owner_details.name.last) {
          errors.push({
            field: "owner_details.name.last",
            error: "Last Name is a required field."
          });
        }
        if (!this.form.owner_details.name.first) {
          errors.push({
            field: "owner_details.name.first",
            error: "First Name is a required field."
          });
        }
        if (!this.form.owner_details.birthdate) {
          errors.push({
            field: "owner_details.birthdate",
            error: "Date of Birth is a required field."
          });
        }
        if (!this.form.owner_details.gender) {
          errors.push({
            field: "owner_details.gender",
            error: "Gender is a required field."
          });
        }
        if (!this.form.owner_details.telno) {
          errors.push({
            field: "owner_details.telno",
            error: "Tel No is a required field."
          });
        }
        if (!this.form.owner_details.mobile) {
          errors.push({
            field: "owner_details.mobile",
            error: "Mobile No is a required field."
          });
        }
        if (!this.form.owner_details.email) {
          errors.push({
            field: "owner_details.email",
            error: "Email Address is a required field."
          });
        }
        if (!this.form.owner_address.region) {
          errors.push({
            field: "owner_address.region",
            error: "Region is a required field."
          });
        }
        if (!this.form.owner_address.province) {
          errors.push({
            field: "owner_address.province",
            error: "Province is a required field."
          });
        }
        if (!this.form.owner_address.barangay) {
          errors.push({
            field: "owner_address.barangay",
            error: "Barangay is a required field."
          });
        }
        if (!this.form.owner_address.city) {
          errors.push({
            field: "owner_address.city",
            error: "City/Municipality is a required field."
          });
        }
        if (!this.form.owner_address.postal_code) {
          errors.push({
            field: "owner_address.postal_code",
            error: "Postal Code is a required field."
          });
        }

        if (errors.length) jump_to = 0;
      } else if (validate_all || this.current_step === 1) {
        if (!this.form.business_details.business_type) {
          errors.push({
            field: "business_details.business_type",
            error: "Business Type is a required field."
          });
        }
        if (!this.form.business_details.business_name) {
          errors.push({
            field: "business_details.business_name",
            error: "Business Name is a required field."
          });
        }
        if (!this.form.business_details.registration_no) {
          errors.push({
            field: "business_details.registration_no",
            error: "Registration No is a required field."
          });
        }
        if (!this.form.business_details.registration_date) {
          errors.push({
            field: "business_details.registration_date",
            error: "Date of Registration is a required field."
          });
        }
        if (!this.form.business_details.tin) {
          errors.push({
            field: "business_details.tin",
            error: "Tax Identification No is a required field."
          });
        }
        if (!this.form.business_details.business_area) {
          errors.push({
            field: "business_details.business_area",
            error: "Business Area is a required field."
          });
        }
        if (!this.form.business_details.employees_establishment) {
          employees_residing: "",
            errors.push({
              field: "business_details.employees_establishment",
              employees_residing: "",
              error: "No of Employees is a required field."
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
        if (this.form.business_details.is_rented) {
          if (!this.form.business_address.rental) {
            errors.push({
              field: "business_address.rental",
              error: "Monthly Rental is a required field."
            });
          }
          if (!this.form.business_address.lessor_name) {
            errors.push({
              field: "business_address.lessor_name",
              error: "Lessor Name is a required field."
            });
          }
          if (!this.form.business_address.rental_address.contact_no) {
            errors.push({
              field: "business_address.rental_address.contact_no",
              error: "Contact No is a required field."
            });
          }
          if (!this.form.business_address.rental_address.email) {
            errors.push({
              field: "business_address.rental_address.email",
              error: "Email Address is a required field."
            });
          }
          if (!this.form.business_address.rental_address.region) {
            errors.push({
              field: "business_address.rental_address.region",
              error: "Region is a required field."
            });
          }
          if (!this.form.business_address.rental_address.province) {
            errors.push({
              field: "business_address.rental_address.province",
              error: "Province is a required field."
            });
          }
          if (!this.form.business_address.rental_address.barangay) {
            errors.push({
              field: "business_address.rental_address.barangay",
              error: "Barangay is a required field."
            });
          }
          if (!this.form.business_address.rental_address.city) {
            errors.push({
              field: "business_address.rental_address.city",
              error: "City/Municipality is a required field."
            });
          }
          if (!this.form.business_address.rental_address.postal_code) {
            errors.push({
              field: "business_address.rental_address.postal_code",
              error: "Postal Code is a required field."
            });
          }
        }
        if (errors.length) jump_to = 1;
      } else if (validate_all || this.current_step === 2) {
        if (
          !this.form.business_details.line_of_business ||
          !this.form.business_details.line_of_business.length
        ) {
          errors.push({
            field: "business_details.line_of_business",
            error: "Add atleast one line of business"
          });
          jump_to = 2;
        }
      }
      console.log("errors :", errors);
      this.errors = errors;

      // if there is error and validate all then jump to the step
      if (errors.length && validate_all) {
        this.current_step = jump_to;
        window.scrollTo(0, 0);
      }

      // if there is no errors
      if (!errors.length) {
        if (this.current_step === 3) {
          // Proceed to payment
          this.show_payment = true;
        } else {
          this.current_step++;
          window.scrollTo(0, 0);
        }
      }
    },
    changeStep(step) {
      this.current_step = step;
      window.scrollTo(0, 0);
    },
    validate() {
      // Validate first

      this.show_payment = true;
    },
    proceedToSubmit({ payment_details, method }) {
      this.payment_details.payment_details = payment_details;
      this.payment_details.method = method;
      this.submit();
    },
    submit() {
      this.loading = true;
      var files = null;
      if (this.form.attachments.length) {
        files = new FormData();
        this.form.attachments.forEach(attachment => {
          files.append(
            attachment.doc_type,
            attachment.file,
            attachment.file.name
          );
        });
      }
      this.$store
        .dispatch("CREATE_BUSINESS_PERMIT", {
          details: {
            payment: this.payment_details,
            data: this.form
          },
          files
        })
        .then(result => {
          console.log("CREATE_BUSINESS_PERMIT result :", result);
          this.loading = false;
          // this.$router.push("/app");
        })
        .catch(err => {
          console.log("CREATE_BUSINESS_PERMIT err :", err);
        });
    },
    attachFile(i, file) {
      this.document_data_source[i].status = 1;

      setTimeout(() => {
        // Add new attachment
        this.form.attachments.push({
          doc_type: this.document_data_source[i].keyword,
          file
        });
        this.document_data_source[i].status = 2;
      }, 1000);
    },
    removeAttachment(i) {
      const remove_count = this.form.attachments.filter(
        v => v.doc_type === this.document_data_source[i].keyword
      ).length;
      console.log("remove_count :", remove_count);

      for (let index = 1; index <= remove_count; index++) {
        var find_index = this.form.attachments.findIndex(
          v => v.doc_type === this.document_data_source[i].keyword
        );
        this.form.attachments.splice(find_index, 1);
      }

      this.document_data_source[i].status = 0;
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
  height: 25% !important;
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