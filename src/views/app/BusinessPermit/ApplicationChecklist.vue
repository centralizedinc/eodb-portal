<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title">
      <a-col :span="22" style="font-size: 25px;">Document Checklist</a-col>
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
    <a-form>
      <a-form-item label="Check all your lacking documents">
        <a-checkbox-group v-model="selected_documents" @change="onDocumentSelect">
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
      selected_documents: []
    };
  },
  created() {
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
  },
  watch: {
    checkSelectedDocs() {
      console.log("this.form.attachments :", this.form.attachments);
      var attachments = this.form.attachments.map(v => v.doc_type),
        selected_documents = [];
      console.log("attachments :", attachments);
      this.documents.forEach(doc => {
        console.log("doc.keyword :", doc.keyword);
        if (!attachments.includes(doc.keyword))
          selected_documents.push(doc.keyword);
      });
      console.log("selected_documents :", selected_documents);
      this.selected_documents = selected_documents;
      this.$emit("updateDocsPayment", this.selected_documents);
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