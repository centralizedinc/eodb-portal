<template>
  <div>
    <pdf style="width:100%;" :src="pdf_url" v-show="!loading"></pdf>
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
import BGYCLEARANCE from "./pdf/bgyclearance";
import BUSINESSPERMIT from "./pdf/businesspermit";
import FIREANDSAFETY from "./pdf/fireandsafety";
import POLICECLEARANCE from "./pdf/policeclearance";
import RECEIPT from "./pdf/receipt";
import BUSINESSPERMIT_SAN_ANTONIO from "./pdf/BusinessPermit_San_Antonio";
import CEDULA_SAN_ANTONIO from "./pdf/CommunityTaxCert_San_Antonio";


var printers = {
  BGYCLEARANCE,
  FIREANDSAFETY,
  BUSINESSPERMIT,
  POLICECLEARANCE,
  RECEIPT,
  BUSINESSPERMIT_SAN_ANTONIO,
  CEDULA_SAN_ANTONIO

};

// var printers = {
//   FIREANDSAFETY
// };

//   BUSINESSPERMIT
// };

// PDF Format
// import receipt from "./pdf/receipt";

// var printers = {
//   RECEIPT: receipt
// };

// import BUSINESSPERMIT from "./pdf/businesspermit";

// var printers = {
//   BUSINESSPERMIT
// };

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
    console.log("this.keyword.toUpperCase() :", this.keyword.toUpperCase());
    this.loadPDF();
  },
  methods: {
    loadPDF() {
      /**
       * To bypass the details override the `pdf_details`
       */
      if (this.keyword.toUpperCase() === "BUSINESSPERMIT_SAN_ANTONIO") {
        this.pdf_details = {
          business_name: "REPUBLIC OF GAMERS COMPUTER CAFE",
          business_no: "445433110",
          business_address: "Unit 2320 Pasong Tamo Extension",
          business_owner: "RICHARD BERMUDEZ",
          plate_no: "1546238984",
          ownership_type: "SINGLE PROPRIETORSHIP",
          valid_until: new Date(2019, 11, 31),
          area: "50 sq.m",
          date_issued: new Date(2019, 3, 20),
          application_type: "NEW",
          mode_of_payment: "QUARTERLY",
          transaction_no: "115498845612848",
          transactions: [
            {
              description: "Application Fee",
              amount: 1000
            },
            {
              description: "Convenience Fee",
              amount: 50
            }
          ]
        };
      } else if (this.keyword.toUpperCase() === "RECEIPT") {
        this.pdf_details = {
          transaction_no: "1234567890",
          date: new Date(),
          payor: "Juan Delacruz",
          payment_breakdown: [{
            description: "Application Fee",
            amount: 1000
          },{
            description: "Convenience Fee",
            amount: 150
          }]
        }
      } else if(this.keyword.toUpperCase() === 'POLICECLEARANCE'){
        this.pdf_details = {
          police_no: "B 851852",
          name: "Antonio Basas",
          address: "San Antonio Quezon",
          birth_date: "04/28/1984",
          birth_place: "Marawi",
          findings: "NO DEROGATORY RECORD / INFORMATION",
          purpose: "INTERNATIONAL PASSPORT",
          validity: "Six Months (6) from the Date of Issuance",
          ctc_no: "2178545655",
          date_created: new Date(),
          verified_by_first: "Senior Police Officer Cesar Advincula",
          verified_by_second: "Police Senior Inspector Godfrey Rivera"
        }
      } else if(this.keyword.toUpperCase() === 'BGYCLEARANCE'){
        this.pdf_details = {
          business_name: "Dell Laptop Inc.",
          business_owner: "Godfrey Rivera",
          business_address: "Unit 603 Tritan Bldg. Magallanes Makati City.",
          business_nature: "Information Technology",
          requestor: "Mark Quijom",
          date_created: new Date()
        }
      // } else if(this.keyword.toUpperCase() === 'CEDULA_SAN_ANTONIO'){
      //   this.pdf_details = {
      //      business_name: "Dell Laptop Inc.",
      //     business_owner: "Godfrey Rivera",
      //     business_address: "Unit 603 Tritan Bldg. Magallanes Makati City.",
      //     business_nature: "Information Technology",
      //     requestor: "Mark Quijom",
      //     date_created: new Date()
      //   }
      }
      console.log("this.pdf_details :", this.pdf_details);
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