<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title" type="flex" justify="space-between">
      <a-col :xs="{span: 21}" :md="{span: 14}" :xl="{span: 7}">
        <h1 style="font-size:25px;">Document Checklist</h1>
      </a-col>

      <a-col :span="2" style="text-align: right;">
        <a-tooltip placement="left">
          <span slot="title">
            Secure Business Permit in 6 steps (all fields marked with an asterisk
            <i
              style="color: red;"
            >*</i> is required.)
          </span>
          <a-icon type="info-circle" />
        </a-tooltip>
      </a-col>
    </a-row>

    <a-form layout="vertical">
      <a-form-item>
        <a-col :xs="{span: 24}" :md="{span: 24}" :xl="{span: 24}">
          <span style="text-align: left !important ; text-transform: initial !important">
            Below are the list of requirements needed to apply for a business permit.
            Select ✅ each of the requirement you
            <b>
              <u style="color: black">DO NOT HAVE</u>
            </b>.
            <br />
            <br />
            <i
              style="font-weight: bold; color: red; font-size: 12px"
            >(Note: Selected requirement (except DTI/SEC/CDA certificate) will be instantly applied within this app)</i>
          </span>
        </a-col>
        <a-form-item label></a-form-item>
        <a-checkbox-group v-model="lack_documents" @change="onDocumentSelect">
          <a-row>
            <a-col :span="24" v-for="(item, index) in documents" :key="index">
              <a-checkbox :value="item.keyword" v-if="!item.hidden">{{item.title}}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
    </a-form>

    <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
      <!-- <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 6 }"> -->
      <a-col :span="24">
        <a-button-group>
          <a-button disabled>Previous</a-button>
          <a-button type="primary" @click="$emit('next')">Next</a-button>
        </a-button-group>
      </a-col>
      <!-- <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
        <a-button>Save Draft</a-button>
      </a-col>-->
    </a-row>
  </a-card>
</template>

<script>
export default {
  props: ["form", "documents", "checkSelectedDocs"],
  data() {
    return {
      lack_documents: []
    };
  },
  mounted() {
    this.lack_documents = JSON.parse(JSON.stringify(this.selected_documents));
  },
  watch: {
    selected_documents() {
      this.lack_documents = JSON.parse(JSON.stringify(this.selected_documents));
    }
  },
  // created() {
  // var docs = [];
  // this.form.attachments.forEach(attachment => {
  //   docs.push(attachment.doc_type);
  // });
  // this.selected_documents = docs;
  // console.log('this.form.attachments :', this.form.attachments);
  // var attachments = this.form.attachments.map(v => v.doc_type),
  //   selected_documents = [];
  //   console.log('attachments :', attachments);
  // this.documents.forEach(doc => {
  //   console.log('doc.keyword :', doc.keyword);
  //   if (!attachments.includes(doc.keyword))
  //     selected_documents.push(doc.keyword);
  // });
  // console.log("selected_documents :", selected_documents);
  // this.selected_documents = selected_documents;
  // },
  // watch: {
  //   checkSelectedDocs() {
  //     console.log("this.form.attachments :", this.form.attachments);
  //     var attachments = this.form.attachments.map(v => v.doc_type),
  //       selected_documents = [];
  //     console.log("attachments :", attachments);
  //     this.documents.forEach(doc => {
  //       console.log("doc.keyword :", doc.keyword);
  //       if (!attachments.includes(doc.keyword))
  //         selected_documents.push(doc.keyword);
  //     });
  //     console.log("selected_documents :", selected_documents);
  //     this.selected_documents = selected_documents;
  //     this.$emit("updateDocsPayment", this.selected_documents);
  //   }
  // },
  computed: {
    selected_documents() {
      var attachments = this.form.attachments.map(v => v.doc_type),
        selected_documents = [];
      console.log("attachments :", attachments);
      this.documents.forEach(doc => {
        console.log("doc.keyword :", doc.keyword);
        if (!attachments.includes(doc.keyword))
          selected_documents.push(doc.keyword);
      });
      console.log("selected_documents :", selected_documents);
      this.$emit("updateDocsPayment", selected_documents);
      return selected_documents;
    }
  },
  methods: {
    onDocumentSelect(checkedValues) {
      console.log("checkedValues :", checkedValues);
      var attachments = [];
      // Reuse required
      this.documents.forEach(doc => {
        if (doc.hidden) {
          var req_docs = this.form.attachments.find(
            v => v.doc_type === doc.keyword
          );
          attachments.push(req_docs);
        } else if (!checkedValues.includes(doc.keyword)) {
          var existing_attachment = this.form.attachments.find(
            v => v.doc_type === doc.keyword
          );
          if (existing_attachment) attachments.push(existing_attachment);
          else
            attachments.push({
              doc_type: doc.keyword,
              files: []
            });
        }
        console.log("#attachments :", attachments);
      });
      this.form.attachments = attachments;
      this.$emit("updateDocsPayment", checkedValues);

      // console.log("checkedValues :", checkedValues);
      // var attachments = [];
      // // Reuse required
      // this.documents.forEach(doc => {
      //   if (doc.hidden) {
      //     var req_docs = this.form.attachments.find(
      //       v => v.doc_type === doc.keyword
      //     );
      //     attachments.push(req_docs);
      //   }
      //   console.log("#attachments :", attachments);
      // });

      // checkedValues.forEach(doc_type => {
      //   var index = this.form.attachments.findIndex(
      //     v => v.doc_type === doc_type
      //   );
      //   if (index > -1) attachments.push(this.form.attachments[index]);
      //   else attachments.push({ doc_type, files: [] });
      // });
      // console.log("attachments :", attachments);
      // this.form.attachments = attachments;
      // this.$emit("updateDocsPayment", checkedValues);
    }
  }
};
</script>

<style>
</style>