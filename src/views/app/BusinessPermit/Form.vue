<template>
  <div>
    <loading-content v-if="fetching_data" />
    <a-row type="flex" v-else justify="space-between">
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
        <h1 style="margin-top: 5vh;">Business Permit Application</h1>
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
              @updateGross="updateGross"
              @updateCapital="updateCapital"
              @updateDocsPayment="updateDocsPayment"
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
                <a-table
                  :columns="document_columns"
                  :dataSource="required_documents"
                  bordered
                  :pagination="false"
                  size="small"
                  class="documents-table"
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
                      size="small"
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

                <h5 style="font-weight: bold;">Payment Breakdown</h5>
                <a-row
                  v-for="(item, index) in payments_data_source"
                  :key="`a${index}`"
                  class="row-border"
                  type="flex"
                  align="middle"
                >
                  <a-col :span="15" class="row-cell">{{item.description}}</a-col>
                  <a-col
                    :span="9"
                    style="text-align: right;"
                    class="row-cell"
                  >{{formatCurrency(item.amount)}}</a-col>
                </a-row>

                <a-row class="row-border">
                  <a-col
                    :span="15"
                    class="row-cell"
                    style="color: #333;background: #d7d7d7"
                  >Total Amount</a-col>
                  <a-col
                    :span="9"
                    class="row-cell"
                    style="text-align: right; color: #333;background: #d7d7d7"
                  >{{formatCurrency(total_payable)}}</a-col>
                </a-row>
                <template v-if="installment">
                  <a-row class="row-border">
                    <a-col :span="15" class="row-cell" style="text-align: right;">
                      <i>{{installment.label}}</i>
                    </a-col>
                    <a-col :span="9" class="row-cell" style="text-align: right;">
                      <i>{{formatCurrency(installment.amount)}}</i>
                    </a-col>
                  </a-row>
                </template>
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
        :payment_amount="installment ? installment.amount : total_payable"
      />
    </a-row>
  </div>
</template>

<script>
// packages
import moment from "moment";

// Components
import ApplicationChecklist from "./ApplicationChecklist";
import BusinessOwner from "./BusinessOwner";
import BusinessDetails from "./BusinessDetails";
import BusinessActivity from "./BusinessActivity";
import ApplicationSummary from "./ApplicationSummary";
import Payment from "@/components/payments/Payment.vue";
import LoadingContent from "@/components/Loading";

export default {
  components: {
    Payment,
    ApplicationChecklist,
    BusinessOwner,
    BusinessDetails,
    BusinessActivity,
    ApplicationSummary,
    LoadingContent
  },
  data() {
    return {
      moment,
      show_payment: false,
      current_step: 0,
      form_components: [
        "ApplicationChecklist",
        "BusinessOwner",
        "BusinessDetails",
        "BusinessActivity",
        "ApplicationSummary"
      ],
      form: {
        application_type: 0,
        permit_type: "business",
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
          salary: "",
          civil_status: "",
          birthplace: "",
          monthly_salary: "",
          occupation: "",
          height: "",
          weight: "",
          icr_no: ""
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
          barangay: "",
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
          measure_or_pax: [],
          capital_investment: ""
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
        {
          title: "Document Checklist",
          description:
            "Check all the documents you have and apply for lacking requirements instantly within this app."
        },
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
          description:
            "Pay application through Credit Card, Over-the-counter or at any 7-eleven outlets."
        }
      ],
      transaction_details: {
        total_payable: 5000,
        amount_payable: 0,
        amount_paid: 0,
        payment_breakdown: [],
        status: "unpaid",
        method: "",
        mode_of_payment: "",
        payment_details: {}
      },
      card_details: {},
      payments_data_source: [
        {
          description: "Fire Safety and Inspection Fee",
          fee_type: "local_taxes",
          amount: 3000
        },
        {
          description: "Business Permit Fee",
          fee_type: "application_fee",
          amount: 0
        },
        {
          description: "Convenience Fee",
          fee_type: "convenience_fee",
          amount: 50
        }
      ],
      loading: false,
      errors: [],
      fetching_data: false,
      installment: null,
      departments: []
    };
  },
  created() {
    this.init();
  },
  mounted() {
    console.log('this.$store.state.permits.filing_permit :', this.$store.state.permits.filing_permit);
    
    // GET DEPARTMENTS
    const departments = this.deepCopy(
      this.$store.state.permits.filing_permit.approvers
    );
    console.log('departments :', departments);
    this.departments = departments;
    this.form.permit_code = this.$store.state.permits.filing_permit._id;

    // GET REQUIREMENTS
    const requirements = this.deepCopy(
      this.$store.state.permits.filing_permit.requirements
    );
    console.log("requirements :", requirements);
    const doc_req = requirements.map(v => {
      return {
        title: v.name,
        status: 0,
        keyword: v.keyword,
        hidden: v.required
      };
    });
    
    doc_req.forEach(v => {
      if (v.hidden)
        this.form.attachments.push({
          doc_type: v.keyword,
          files: []
        });
    });
    console.log('this.form :', this.form);
    this.document_data_source = doc_req;

    // To check payments needs to be pay
    this.updateDocsPayment();
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
    },
    total_payable() {
      var total = this.payments_data_source
        .map(v => v.amount)
        .reduce((t, c) => parseFloat(t) + parseFloat(c));
      this.transaction_details.total_payable = total;
      return total;
    }
  },
  methods: {
    init() {
      const { mode, ref_no } = this.$route.query;
      console.log("this.$route.query :", this.$route.query);
      if (mode && mode === "renewal" && ref_no) {
        this.fetching_data = true;
        this.$store
          .dispatch("GET_APPLICATION_BY_REF", ref_no)
          .then(app => {
            console.log("app :", app);
            this.form.application_type = 1;
            this.form = app;
            this.form._id = undefined;
            this.mapFormForRenewal();
            this.fetching_data = false;
          })
          .catch(err => {
            console.log("GET_APPLICATION_BY_REF err :", err);
            if (err && err.message) this.$message.error(err.message);
            this.$router.push("/app");
            this.fetching_data = false;
          });
      }
    },
    validateStep(validate_all) {
      console.log("validate_all :", validate_all);
      console.log("this.current_step :", this.current_step);
      console.log("this.form :", this.form);

      var { errors, jump_to } = this.validation(validate_all);
      // var errors = [],
      //   jump_to = 0;

      console.log("errors :", errors);
      this.errors = errors;

      // if there is error and validate all then jump to the step
      if (errors.length && validate_all) {
        this.current_step = jump_to;
        window.scrollTo(0, 0);
      }

      // if there is no errors
      if (!errors.length) {
        if (this.current_step === 4) {
          this.transaction_details.payment_breakdown = this.payments_data_source;
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
          console.log("CREATE_BUSINESS_PERMIT result :", result);
          this.$message.success("Successful Payment.");
          this.$message.success("Your application has been received.");
          this.loading = false;
          this.$router.push("/app/tracker");
        })
        .catch(err => {
          this.loading = false;
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
        console.log("this.form.attachments :", this.form.attachments);
        this.$message.info(
          `${this.document_data_source[i].title} file uploaded.`
        );

        const error_index = this.errors.findIndex(
          v => v.field === "attachments"
        );
        if (error_index > -1) this.errors.splice(error_index, 1);

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
      const error_index = this.errors.findIndex(
        v => v.field === "mode_of_payment"
      );
      if (error_index > -1) this.errors.splice(error_index, 1);
      if (this.transaction_details.mode_of_payment === "SA") {
        var payable = parseFloat(this.transaction_details.total_payable) / 2;
        this.transaction_details.amount_payable = payable;
        this.transaction_details.amount_paid = payable;
        this.installment = { label: "1/2 Installment", amount: payable };
      } else if (this.transaction_details.mode_of_payment === "Q") {
        var payable = parseFloat(this.transaction_details.total_payable) / 4;
        this.transaction_details.amount_payable = payable;
        this.transaction_details.amount_paid = payable;
        this.installment = { label: "1/4 Installment", amount: payable };
      } else {
        this.transaction_details.amount_payable = this.transaction_details.total_payable;
        this.transaction_details.amount_paid = this.transaction_details.total_payable;
        this.installment = null;
      }
    },
    validation(validate_all) {
      var errors = [],
        jump_to = 0;

      // Business Owner
      if (validate_all || this.current_step === 1) {
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

        if (
          this.checkDocsNeeded(["residence", "barangay", "police"]) &&
          !this.form.owner_details.civil_status
        ) {
          errors.push({
            field: "required_documents.civil_status",
            error: "Civil Status is a required field."
          });
        }

        if (
          this.checkDocsNeeded(["residence", "barangay", "police"]) &&
          !this.form.owner_details.birthplace
        ) {
          errors.push({
            field: "required_documents.birthplace",
            error: "Place of Birth is a required field."
          });
        }

        if (errors.length) jump_to = 1;
      }

      // Business Details
      if (validate_all || this.current_step === 2) {
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
          errors.push({
            field: "business_details.employees_establishment",
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
        if (
          this.form.application_type === 0 &&
          !this.form.business_details.capital_investment
        ) {
          errors.push({
            field: "business_details.capital_investment",
            error: "Capital Investment is a required field."
          });
        }
        if (
          this.form.application_type === 1 &&
          !this.form.business_details.business_type
        ) {
          errors.push({
            field: "business_details.business_types",
            error: "Business Type is a required field."
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
          if (!this.form.business_address.contact_no) {
            errors.push({
              field: "business_address.contact_no",
              error: "Contact No is a required field."
            });
          }
          if (!this.form.business_address.email) {
            errors.push({
              field: "business_address.email",
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
        if (errors.length) jump_to = 2;
      }
      if (validate_all || this.current_step === 3) {
        if (
          !this.form.business_details.line_of_business ||
          !this.form.business_details.line_of_business.length
        ) {
          errors.push({
            field: "business_details.line_of_business",
            error: "Add atleast one line of business"
          });
          jump_to = 3;
        }
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

      // Validate Mode of Payment
      if (validate_all && !this.transaction_details.mode_of_payment) {
        errors.push({
          field: "mode_of_payment",
          error: "Please choose mode of payment."
        });
        this.$message.error("Please choose mode of payment.");
        jump_to = 4;
      }
      return { errors, jump_to };
    },
    mapFormForRenewal() {
      // Map Attachments
      this.form.attachments.forEach(attachment => {
        const index = this.document_data_source.findIndex(
          v => v.keyword === attachment.doc_type
        );
        this.document_data_source[index].status = 2;
      });

      // Map Dates
      this.form.owner_details.birthdate = moment(
        this.form.owner_details.birthdate
      );
      this.form.business_details.registration_date = moment(
        this.form.business_details.registration_date
      );

      // Map References
    },
    updateCapital(amount) {
      const index = this.payments_data_source.findIndex(
        v => v.fee_type === "application_fee"
      );
      const computed_amount = amount ? parseFloat(amount) / 100 / 20 : 0;
      console.log("computed_amount :", computed_amount);
      this.payments_data_source[index].amount = computed_amount;
    },
    updateGross(amount) {},
    updateDocsPayment(values) {
      const payments = [
        {
          description: "Business Permit Fee",
          fee_type: "application_fee",
          amount: 0
        },
        {
          description: "Convenience Fee",
          fee_type: "convenience_fee",
          amount: 50
        },
        {
          description: "Fire Safety and Inspection Fee",
          fee_type: "local_taxes",
          amount: 3000
        }
      ];
      const data = this.deepCopy(
        this.$store.state.permits.filing_permit.requirements
      ).filter(v => !v.required);
      console.log('data :', data);
      data.forEach(dt => {
        var is_included = values ? values.includes(dt.keyword) : false;
        if (!is_included)
          payments.push({
            description: dt.name,
            fee_type: dt.fee_type,
            amount: dt.amount
          });
      });
      this.payments_data_source = payments;
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
  border: 0.5px solid #888;
  font-size: 12px;
  font-weight: 600;
}

.row-cell {
  /* border-right: 0.5px solid #888; */
  padding: 3px;
}

.documents-table th,
.documents-table td {
  padding: 3px;
}
</style>