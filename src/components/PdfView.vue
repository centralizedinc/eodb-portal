<template>
  <div>
    <pdf style="width:100%" :src="pdf_url" v-show="!loading"></pdf>
    <a-row type="flex" justify="center" v-show="loading" style="height:100vh">
      <a-col :span="6">
        Please wait...
        <a-icon theme="twoTone" type="hourglass" style="margin-top: 30vh; font-size:60px" spin></a-icon>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// Libraries
import pdf from "vue-pdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// PDF Format
import RECEIPT from "./pdf/receipt";

var printers = {
  RECEIPT
};

import BUSINESSPERMIT from "./pdf/businesspermit";

var printers = {
  BUSINESSPERMIT
};



pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
  props: ["filekey", "details"],
  data() {
    return {
      pdf_url: "",
      loading: false,
      keyword: this.filekey || this.$route.query.key,
      pdf_details: this.details
    };
  },
  components: {
    pdf
  },
  created() {
    this.loadPDF();
  },
  methods: {
    loadPDF() {
      /**
       * To bypass the details override the `pdf_details`
       */
      this.pdf_details = {
        amount: 0
      };

      // Process PDF
      this.loading = true;
      try {
        const self = this,
          printer = printers[this.keyword.toUpperCase()];
        const document = printer.fillup(this.pdf_details),
          pdfGenerator = pdfMake.createPdf(document);

        pdfGenerator.getBuffer(buffer => {
          var file = new Blob([buffer], {
              type: "application/pdf"
            }),
            dataUrl = URL.createObjectURL(file);
          self.pdf_url = dataUrl;
          self.loading = false;
        });
      } catch (error) {
        console.log("error :", error);
        this.loading = false;
      }
    }
  }
};
</script>

<style>
</style>