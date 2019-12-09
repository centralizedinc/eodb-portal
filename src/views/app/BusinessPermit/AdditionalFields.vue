<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title">
      <a-col :span="22" style="font-size: 25px;">Checklist</a-col>
      <a-col :span="2" style="text-align: right;">
        <a-tooltip placement="left">
          <span slot="title">
            Secure Business Permit in 7 steps (all fields marked with an asterisk
            <i
              style="color: red;"
            >*</i> is required.)
          </span>
          <a-icon type="info-circle" />
        </a-tooltip>
      </a-col>
    </a-row>

    <!-- Fill up forms -->
    <a-form class="required-form">
      <i
        style="font-weight: 600;"
      >The following details are needed to fill in the additional required documents.</i>
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
        <a-input v-model="form.required_documents.occupation" placeholder="Occupation/Profession" />
      </a-form-item>
      <!-- Height -->
      <a-form-item v-if="checkDocsNeeded(['residence'])" style="font-weight: bold;" label="Height">
        <a-input v-model="form.required_documents.height" placeholder="Height" />
      </a-form-item>
      <!-- Weight -->
      <a-form-item v-if="checkDocsNeeded(['residence'])" style="font-weight: bold;" label="Weight">
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
    </a-form>

    <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
      <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 6 }">
        <a-button-group>
          <a-button @click="$emit('prev')">Previous</a-button>
          <a-button type="primary" @click="submitRequiredDocs">Next</a-button>
        </a-button-group>
      </a-col>
      <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
        <a-button>Save Draft</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  props: ["form", "documents"],
  data() {
    return {
      required_docs: [],
      errors: []
    };
  },
  mounted() {
    this.checkRequiredDocs();
  },
  methods: {
    checkErrors(field) {
      var form_error = this.errors.find(v => v.field === field);
      return form_error ? form_error.error : null;
    },
    checkDocsNeeded(keywords) {
      var show = false;
      keywords.forEach(key => {
        if (this.required_docs.includes(key)) show = true;
      });
      return show;
    },
    checkRequiredDocs() {
      this.required_docs = [];
      this.documents.forEach(doc => {
        if (
          this.form.attachments.findIndex(v => v.doc_type === doc.keyword) ===
          -1
        )
          this.required_docs.push(doc.keyword);
      });

      if (this.required_docs.length)
        this.$message.info(
          "The following details are needed to fill in the additional required documents."
        );
      else this.$emit("next");
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
        this.$emit("next");
      }
    }
  }
};
</script>

<style>
.required-form .ant-form-item {
  margin: 0;
}
</style>