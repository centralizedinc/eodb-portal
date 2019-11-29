<template>
  <a-row type="flex" justify="space-between">
    <!-- Steps -->
    <a-col :xs="{ span: 0 }" :md="{ span: 5 }">
      <a-affix :offsetTop="60" class="form-affix">
        <a-card :bodyStyle="{ padding: '10px', height: '100%' }" style="height: 100%;">
          <a-steps direction="vertical" :current="current_step" class="form-stepper">
            <a-step
              title="Business Owner Information"
              description="Individual or entity who owns a business. All fields marked with an asterisk(*) is required."
            />
            <a-step
              title="Business Details"
              description="Details of business. All fields marked with an asterisk(*) is required."
            />
            <a-step
              title="Business Activity"
              description="Activities of business. All fields marked with an asterisk(*) is required."
            />
            <a-step title="Application Summary" description="Application Summary" />
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
        :step="current_step"
        @changeStep="changeStep"
        @submit="submit"
      />
    </a-col>

    <a-col :xs="{ span: 24 }" :md="{ span: 6 }" style="margin-top: 19vh;">
      <a-affix :offsetTop="60">
        <!-- Attachments -->
        <a-card title="Required Documents"></a-card>

        <!-- Payment Details -->
        <a-card style="margin-top: 5vh;" title="Fees"></a-card>
      </a-affix>
    </a-col>
  </a-row>
</template>

<script>
import BusinessOwner from "./BusinessOwner";
import BusinessDetails from "./BusinessDetails";
import BusinessActivity from "./BusinessActivity";
import ApplicationSummary from "./ApplicationSummary";

export default {
  components: {
    BusinessOwner,
    BusinessDetails,
    BusinessActivity,
    ApplicationSummary
  },
  data() {
    return {
      current_step: 0,
      form_components: [
        "BusinessOwner",
        "BusinessDetails",
        "BusinessActivity",
        "ApplicationSummary"
      ],
      form: {
        application_type: "",
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
          no_of_employees: "",
          telno: "",
          mobile: "",
          email: "",
          enjoying_tax_incentive: false,
          specify_entity: "",
          line_of_business: []
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
      }
    };
  },
  methods: {
    changeStep(v) {
      this.current_step = v;
      window.scrollTo(0, 0);
    },
    submit() {
      this.$store
        .dispatch("CREATE_BUSINESS_PERMIT", this.form)
        .then(result => {
          console.log("result.data :", result.data);
        })
        .catch(err => {
          console.log("err :", err);
        });
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
</style>