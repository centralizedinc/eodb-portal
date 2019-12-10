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
    <a-form>
      <a-form-item label="Do you have a ...">
        <a-checkbox-group @change="onDocumentSelect">
          <a-row>
            <a-col :span="24" v-for="(item, index) in documents" :key="index">
              <a-checkbox :value="item.keyword">{{item.title}}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
    <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
      <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 6 }">
        <a-button-group>
          <a-button disabled>Previous</a-button>
          <a-button type="primary" @click="$emit('next')">Next</a-button>
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
    return {};
  },
  methods: {
    onDocumentSelect(checkedValues) {
      var attachments = [];
      checkedValues.forEach(doc_type => {
        attachments.push({
          doc_type,
          files: []
        });
      });
      this.form.attachments = attachments;
    }
  }
};
</script>

<style>
</style>