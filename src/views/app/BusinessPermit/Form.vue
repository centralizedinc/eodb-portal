<template>
  <a-row type="flex" justify="space-between">
    <!-- Steps -->
    <a-col :xs="{ span: 0 }" :md="{ span: 5 }" style="background: white;">
      <a-affix :offsetTop="60">
        <a-card :bodyStyle="{ padding: '10px', height: '100%' }" style="height: 100%;border: none;">
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
    <a-col :xs="{ span: 24 }" :md="{ span: 18 }">
      <h1 style="margin-top: 5vh;">Business Permit Application</h1>
      <h4>This information will help us assess your application.</h4>
      <a-row type="flex" justify="space-between">
        <a-col :xs="{ span: 24 }" :md="{ span: 16 }">
          <!-- <component
            :is="form_components[current_step]"
            :form="form"
            @prev="current_step--"
            @next="validateStep"
            @payment="validateStep(true)"
            :loading="loading"
            :errors="errors"
          />-->
          <business-owner
            ref="business_owner"
            v-if="current_step===0"
            :form="form"
            @prev="current_step--"
            @next="validateStep"
            :loading="loading"
            :errors="errors"
          />
          <business-details
            ref="business_details"
            v-else-if="current_step===1"
            :form="form"
            @prev="current_step--"
            @next="validateStep"
            :loading="loading"
            :errors="errors"
          />
          <business-activity
            ref="business_activity"
            v-else-if="current_step===2"
            :form="form"
            @prev="current_step--"
            @next="validateStep"
            :loading="loading"
            :errors="errors"
          />
          <application-summary
            ref="application_summary"
            v-else-if="current_step===3"
            :form="form"
            @prev="current_step--"
            @next="validateStep"
            @payment="validateStep(true)"
            :loading="loading"
            :errors="errors"
          />
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
          <a-affix :offsetTop="60">
            <!-- Attachments -->
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
              <a-form>
                <a-form-item
                  :validate-status="checkErrors('dti_sec_cda') ? 'error': ''"
                  :help="checkErrors('dti_sec_cda')"
                  style="margin:0"
                >
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
                            <a-icon type="upload" />
                          </a-upload>
                        </a-col>
                      </a-row>
                    </template>
                  </a-table>
                  <a-button
                    type="link"
                    v-if="required_docs.length>0"
                    @click="show_required_doc_fields=true"
                  >Show Additional Fields</a-button>
                </a-form-item>
              </a-form>
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
              </a-row>
            </a-card>
          </a-affix>
        </a-col>
      </a-row>
    </a-col>

    <a-modal :visible="show_required_doc_fields" :closable="false" :footer="null">
      <i
        style="font-weight: 600;"
      >The following details are needed to fill in the additional required documents.</i>
      <a-form class="required-form">
        <!-- Civil Status -->
        <a-form-item
          v-if="checkDocsNeeded(['residence','barangay','police'])"
          style="font-weight: bold;"
          :validate-status="checkErrors('required_documents.civil_status') ? 'error': ''"
          :help="checkErrors('required_documents.civil_status')"
        >
          <span slot="label">
            Civil Status
            <i style="color: red">*</i>
          </span>
          <a-radio-group buttonStyle="solid" v-model="form.required_documents.civil_status">
            <a-radio-button value="single">Single</a-radio-button>
            <a-radio-button value="married">Married</a-radio-button>
            <a-radio-button value="widowed">Widowed</a-radio-button>
            <a-radio-button value="separated">Separated</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <!-- Birth Place -->
        <a-form-item
          v-if="checkDocsNeeded(['residence','barangay','police'])"
          style="font-weight: bold;"
          :validate-status="checkErrors('required_documents.birthplace') ? 'error': ''"
          :help="checkErrors('required_documents.birthplace')"
        >
          <span slot="label">
            Place of Birth
            <i style="color: red">*</i>
          </span>
          <a-input v-model="form.required_documents.birthplace" placeholder="Place of Birth" />
        </a-form-item>
        <!-- Monthly Salary -->
        <a-form-item
          v-if="checkDocsNeeded(['residence'])"
          style="font-weight: bold;"
          label="Monthly Salary"
        >
          <a-input v-model="form.required_documents.monthly_salary" placeholder="Monthly Salary" />
        </a-form-item>
        <!-- Occupation -->
        <a-form-item
          v-if="checkDocsNeeded(['residence', 'barangay'])"
          style="font-weight: bold;"
          label="Occupation/Profession"
        >
          <a-input
            v-model="form.required_documents.occupation"
            placeholder="Occupation/Profession"
          />
        </a-form-item>
        <!-- Height -->
        <a-form-item
          v-if="checkDocsNeeded(['residence'])"
          style="font-weight: bold;"
          label="Height"
        >
          <a-input v-model="form.required_documents.height" placeholder="Height" />
        </a-form-item>
        <!-- Weight -->
        <a-form-item
          v-if="checkDocsNeeded(['residence'])"
          style="font-weight: bold;"
          label="Weight"
        >
          <a-input v-model="form.required_documents.weight" placeholder="Weight" />
        </a-form-item>
        <!-- ICR No -->
        <a-form-item
          v-if="checkDocsNeeded(['residence'])"
          style="font-weight: bold;"
          label="ICR No(if Alien)"
        >
          <a-input v-model="form.required_documents.icr_no" placeholder="ICR No(if Alien)" />
        </a-form-item>
        <a-button type="primary" block @click="submitRequiredDocs">Submit</a-button>
      </a-form>
    </a-modal>

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
          gender: "",
          telno: "",
          mobile: "",
          email: "",
          tin: "",
          job_title: "",
          salary: ""
        },
        owner_address: {
          bldg_no: "",
          unit_no: "",
          bldg_name: "",
          street: "",
          subdivision: "",
          region: "04",
          province: "0456",
          city: "045641",
          barangay: "045641004",
          postal_code: "4324"
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
          region: "04",
          province: "0456",
          city: "045641",
          barangay: "",
          postal_code: "4324",
          is_rented: false,
          rental: "",
          lessor_name: "",
          rental_address: {
            bldg_no: "",
            unit_no: "",
            bldg_name: "",
            street: "",
            subdivision: "",
            region: "04",
            province: "0456",
            city: "045641",
            barangay: "",
            postal_code: "4324"
          },
          contact_no: "",
          email: ""
        },
        attachments: [],
        required_documents: {
          // The following details are needed to fill in the additional required documents.
          // cs(1,2,3) bp(1,2,3) ms(1) op(1,2) h(1) w(1) icr(1)
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
      errors: [],
      show_required_doc_fields: false,
      required_docs: [],
      prevent_showing_required_docs: false
    };
  },
  created() {
    this.init();
  },
  // mounted() {
  //   console.log("this.$refs :", this.$refs);
  //   if (this.fixed_address) {
  //     // Business Owner
  //     this.form.owner_address.region = "04";
  //     this.$refs.business_owner.changeRegion();
  //     this.form.owner_address.province = "0456";
  //     this.$refs.business_owner.changeProvince();
  //     this.form.owner_address.city = "045641";
  //     this.$refs.business_owner.changeCity();

  //     // Business Details
  //     this.form.business_address.region = "04";
  //     this.$refs.business_details.changeRegion();
  //     this.form.business_address.province = "0456";
  //     this.$refs.business_details.changeProvince();
  //     this.form.business_address.city = "045641";
  //     this.$refs.business_details.changeCity();

  //     // Business Rental
  //     this.form.business_address.rental_address.region = "04";
  //     this.$refs.business_details.changeRentalRegion();
  //     this.form.business_address.rental_address.province = "0456";
  //     this.$refs.business_details.changeRentalProvince();
  //     this.form.business_address.rental_address.city = "045641";
  //     this.$refs.business_details.changeRentalCity();
  //   }
  //   if (this.fixed_postal) {
  //     this.form.owner_address.postal_code = "4324";
  //     this.form.business_address.postal_code = "4324";
  //     this.form.business_address.rental_address.postal_code = "4324";
  //   }
  // },
  watch: {
    current_step() {
      console.log("this.form step :", this.form);
    }
  },
  methods: {
    init() {
      this.$store.dispatch("GET_REGIONS");
      this.$store.dispatch("GET_PROVINCES");
    },
    validateStep(validate_all) {
      var errors = [];
      console.log("validate_all :", validate_all);
      console.log("this.current_step :", this.current_step);
      console.log("this.form.attachments :", this.form.attachments);
      var jump_to = 0;
      // if (validate_all || this.current_step === 0) {
      //   if (!this.form.owner_details.name.last) {
      //     errors.push({
      //       field: "owner_details.name.last",
      //       error: "Last Name is a required field."
      //     });
      //   }
      //   if (!this.form.owner_details.name.first) {
      //     errors.push({
      //       field: "owner_details.name.first",
      //       error: "First Name is a required field."
      //     });
      //   }
      //   if (!this.form.owner_details.birthdate) {
      //     errors.push({
      //       field: "owner_details.birthdate",
      //       error: "Date of Birth is a required field."
      //     });
      //   }
      //   if (!this.form.owner_details.gender) {
      //     errors.push({
      //       field: "owner_details.gender",
      //       error: "Gender is a required field."
      //     });
      //   }
      //   if (!this.form.owner_details.telno) {
      //     errors.push({
      //       field: "owner_details.telno",
      //       error: "Tel No is a required field."
      //     });
      //   }
      //   if (!this.form.owner_details.mobile) {
      //     errors.push({
      //       field: "owner_details.mobile",
      //       error: "Mobile No is a required field."
      //     });
      //   }
      //   if (!this.form.owner_details.email) {
      //     errors.push({
      //       field: "owner_details.email",
      //       error: "Email Address is a required field."
      //     });
      //   }
      //   if (!this.form.owner_address.region) {
      //     errors.push({
      //       field: "owner_address.region",
      //       error: "Region is a required field."
      //     });
      //   }
      //   if (!this.form.owner_address.province) {
      //     errors.push({
      //       field: "owner_address.province",
      //       error: "Province is a required field."
      //     });
      //   }
      //   // if (!this.form.owner_address.barangay) {
      //   //   errors.push({
      //   //     field: "owner_address.barangay",
      //   //     error: "Barangay is a required field."
      //   //   });
      //   // }
      //   if (!this.form.owner_address.city) {
      //     errors.push({
      //       field: "owner_address.city",
      //       error: "City/Municipality is a required field."
      //     });
      //   }
      //   if (!this.form.owner_address.postal_code) {
      //     errors.push({
      //       field: "owner_address.postal_code",
      //       error: "Postal Code is a required field."
      //     });
      //   }

      //   if (errors.length) jump_to = 0;
      // }
      // if (validate_all || this.current_step === 1) {
      //   if (!this.form.business_details.business_type) {
      //     errors.push({
      //       field: "business_details.business_type",
      //       error: "Business Type is a required field."
      //     });
      //   }
      //   if (!this.form.business_details.business_name) {
      //     errors.push({
      //       field: "business_details.business_name",
      //       error: "Business Name is a required field."
      //     });
      //   }
      //   if (!this.form.business_details.registration_no) {
      //     errors.push({
      //       field: "business_details.registration_no",
      //       error: "Registration No is a required field."
      //     });
      //   }
      //   if (!this.form.business_details.registration_date) {
      //     errors.push({
      //       field: "business_details.registration_date",
      //       error: "Date of Registration is a required field."
      //     });
      //   }
      //   if (!this.form.business_details.tin) {
      //     errors.push({
      //       field: "business_details.tin",
      //       error: "Tax Identification No is a required field."
      //     });
      //   }
      //   if (!this.form.business_details.business_area) {
      //     errors.push({
      //       field: "business_details.business_area",
      //       error: "Business Area is a required field."
      //     });
      //   }
      //   if (!this.form.business_details.employees_establishment) {
      //     employees_residing: "",
      //       errors.push({
      //         field: "business_details.employees_establishment",
      //         employees_residing: "",
      //         error: "No of Employees is a required field."
      //       });
      //   }
      //   if (!this.form.business_address.region) {
      //     errors.push({
      //       field: "business_address.region",
      //       error: "Region is a required field."
      //     });
      //   }
      //   if (!this.form.business_address.province) {
      //     errors.push({
      //       field: "business_address.province",
      //       error: "Province is a required field."
      //     });
      //   }
      //   if (!this.form.business_address.barangay) {
      //     errors.push({
      //       field: "business_address.barangay",
      //       error: "Barangay is a required field."
      //     });
      //   }
      //   if (!this.form.business_address.city) {
      //     errors.push({
      //       field: "business_address.city",
      //       error: "City/Municipality is a required field."
      //     });
      //   }
      //   if (!this.form.business_address.postal_code) {
      //     errors.push({
      //       field: "business_address.postal_code",
      //       error: "Postal Code is a required field."
      //     });
      //   }
      //   if (this.form.business_details.is_rented) {
      //     if (!this.form.business_address.rental) {
      //       errors.push({
      //         field: "business_address.rental",
      //         error: "Monthly Rental is a required field."
      //       });
      //     }
      //     if (!this.form.business_address.lessor_name) {
      //       errors.push({
      //         field: "business_address.lessor_name",
      //         error: "Lessor Name is a required field."
      //       });
      //     }
      //     if (!this.form.business_address.contact_no) {
      //       errors.push({
      //         field: "business_address.contact_no",
      //         error: "Contact No is a required field."
      //       });
      //     }
      //     if (!this.form.business_address.email) {
      //       errors.push({
      //         field: "business_address.email",
      //         error: "Email Address is a required field."
      //       });
      //     }
      //     if (!this.form.business_address.rental_address.region) {
      //       errors.push({
      //         field: "business_address.rental_address.region",
      //         error: "Region is a required field."
      //       });
      //     }
      //     if (!this.form.business_address.rental_address.province) {
      //       errors.push({
      //         field: "business_address.rental_address.province",
      //         error: "Province is a required field."
      //       });
      //     }
      //     if (!this.form.business_address.rental_address.barangay) {
      //       errors.push({
      //         field: "business_address.rental_address.barangay",
      //         error: "Barangay is a required field."
      //       });
      //     }
      //     if (!this.form.business_address.rental_address.city) {
      //       errors.push({
      //         field: "business_address.rental_address.city",
      //         error: "City/Municipality is a required field."
      //       });
      //     }
      //     if (!this.form.business_address.rental_address.postal_code) {
      //       errors.push({
      //         field: "business_address.rental_address.postal_code",
      //         error: "Postal Code is a required field."
      //       });
      //     }
      //   }
      //   if (errors.length) jump_to = 1;
      // }
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

      // if (
      //   validate_all &&
      //   (!this.form.attachments ||
      //     !this.form.attachments.length ||
      //     this.form.attachments.findIndex(v => v.doc_type === "dti_sec_cda") ===
      //       -1)
      // ) {
      //   // validate DTI/SEC/CDA
      //   errors.push({
      //     field: "dti_sec_cda",
      //     error: "Please attach DTI/SEC/CDA Certificate file."
      //   });
      //   this.$message.error("Please attach DTI/SEC/CDA Certificate file.");
      //   jump_to = 3;
      // }
      console.log("this.form :", this.form);
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
          console.log(
            "test: ",
            this.checkRequiredDocs() && !this.prevent_showing_required_docs
          );
          if (this.checkRequiredDocs() && !this.prevent_showing_required_docs) {
            this.$message.info(
              "The following details are needed to fill in the additional required documents."
            );
            this.show_required_doc_fields = true;
            this.prevent_showing_required_docs = true;
          } else {
            this.show_payment = true;
          }
        } else {
          this.current_step++;
          window.scrollTo(0, 0);
        }
      }
    },
    checkRequiredDocs() {
      this.required_docs = [];
      this.document_data_source.forEach(doc => {
        if (
          this.form.attachments.findIndex(v => v.doc_type === doc.keyword) ===
          -1
        )
          this.required_docs.push(doc.keyword);
      });
      return this.required_docs.length;
    },
    checkDocsNeeded(keywords) {
      var show = false;
      keywords.forEach(key => {
        if (this.required_docs.includes(key)) show = true;
      });
      return show;
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
          this.$message.success("Successful Payment.");
          this.$message.success("Your application has been received.");
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
        this.$message.info(
          `${this.document_data_source[i].title} file uploaded.`
        );
        this.document_data_source[i].status = 2;
        this.checkRequiredDocs();
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

      this.$message.info(`Remove file ${this.document_data_source[i].title}.`);
      this.document_data_source[i].status = 0;
    },
    submitRequiredDocs() {
      var errors = [];
      if (!this.form.required_documents.civil_status) {
        errors.push({
          field: "required_documents.civil_status",
          error: "Civil Status is a required field."
        });
      }
      if (!this.form.required_documents.birthplace) {
        errors.push({
          field: "required_documents.birthplace",
          error: "Place of Birth is a required field."
        });
      }
      this.errors = errors;
      if (!errors.length) {
        this.show_required_doc_fields = false;
        this.show_payment = true;
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

.required-form .ant-form-item {
  margin: 0;
}
</style>