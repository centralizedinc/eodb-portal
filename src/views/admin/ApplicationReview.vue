<template>
  <a-row type="flex" :gutter="16">
    <a-col :span="14">
      <a-tabs>
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="file-search"></a-icon>Details
          </span>
          <application-summary :form="form" :read-only="true" v-if="form.permit_type=='business'"></application-summary>
          <application-summary-brgy
            :form="form"
            :read-only="true"
            v-if="form.permit_type=='barangay'"
          ></application-summary-brgy>
          <application-summary-police
            :form="form"
            :read-only="true"
            v-if="form.permit_type=='police'"
          ></application-summary-police>
          <application-summary-cedula
            :form="form"
            :read-only="true"
            v-if="form.permit_type=='cedula'"
          ></application-summary-cedula>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="snippets"></a-icon>Attachments
          </span>
          <a-card
            v-for="item in form.attachments"
            :key="item.doc_type"
            style="margin-top: 2px; text-align: center"
          >
            <div v-for="file in item.files" :key="file">
              <!-- {{file}} -->
              <!-- v-if="file.type==='image/png' || file.type==='image/jpg' || file.type==='image/jpeg'" -->
              <img v-if="file.type.indexOf('image') > -1" :src="file.url" style="width: 100%;" />
              <pdf
                v-else-if="file.type==='application/pdf'"
                :src="file.url"
                style="cursor:zoom; width: 100%"
              ></pdf>
              <pdf v-else :src="file" style="cursor:zoom; width: 100%"></pdf>
            </div>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col :span="10">
      <a-affix :offsetTop="10">
        <a-card style="background-color: #242B30;border-radius:10px">
          <a-checkbox-group v-model="selected_checklist" style="width: 100%;">
            <a-list size="large" bordered :dataSource="checklist" style="background-color: #FFFFFF">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta :title="item.name" :description="item.description">
                  <a-checkbox slot="avatar" :value="item.name"></a-checkbox>
                </a-list-item-meta>
              </a-list-item>
              <h2 slot="header">Application Checklist</h2>
            </a-list>
          </a-checkbox-group>

          <a-textarea
            style="margin-top: 1vh"
            :rows="3"
            placeholder="Remarks"
            v-model="remarks"
            :disabled="rejecting_application || approving_application"
          />
          <a-divider></a-divider>
          <a-button-group>
            <a-button :disabled="rejecting_application || approving_application">For Compliance</a-button>
            <a-popconfirm
              title="Click PROCEED to denied this application."
              okText="PROCEED"
              @confirm="deniedApplication"
            >
              <a-button
                type="danger"
                :disabled="approving_application"
                :loading="rejecting_application"
              >Denied</a-button>
            </a-popconfirm>
            <a-popconfirm
              title="Click PROCEED to approve this application."
              okText="PROCEED"
              @confirm="approveApplication"
            >
              <a-button
                type="primary"
                :disabled="rejecting_application || selected_checklist.length !== checklist.length"
                :loading="approving_application"
              >Approved</a-button>
            </a-popconfirm>
          </a-button-group>
        </a-card>
      </a-affix>
    </a-col>
  </a-row>
</template>

<script>
import ApplicationSummary from "@/views/app/BusinessPermit/ApplicationSummary";
import ApplicationSummaryBrgy from "@/views/app/BarangayClearance/ApplicationSummary";
import ApplicationSummaryPolice from "@/views/app/PoliceClearance/ApplicationSummary";
import ApplicationSummaryCedula from "@/views/app/Cedula/ApplicationSummary";
import provinces_data from "../../assets/references/provinces.json";
import pdf from "vue-pdf";

export default {
  components: {
    ApplicationSummary,
    ApplicationSummaryBrgy,
    ApplicationSummaryPolice,
    ApplicationSummaryCedula,
    pdf
  },
  data() {
    return {
      selected_checklist: [],
      provinces_data,
      form: {
        owner_details: {
          name: {}
        },
        owner_address: {},
        business_details: {},
        business_address: {}
      },
      // checklist: ["Police Clearance", "Barangay Clearance"],
      remarks: "",
      rejecting_application: false,
      approving_application: false
    };
  },
  created() {
    this.init();
  },
  computed: {
    department() {
      return this.$store.state.admin_session.department;
    },
    checklist() {
      var data = this.$store.state.admin_session.checklist.find(
        v => v.permit_type === this.form.permit_type
      );
      return data ? data.checklist : [];
    }
  },
  methods: {
    init() {
      this.$store
        .dispatch("GET_CHECKLIST_BY_DEPARTMENT")
        .then(results => {
          return this.$store.dispatch("GET_ADMIN_DEPARTMENT");
        })
        .then(result => {
          this.loading = false;
        })
        .catch(err => {
          console.log("checklists err :", err);
        });
      this.form = this.$store.state.admin_session.for_review;
      console.log("this.form::: ", JSON.stringify(this.form));
    },
    getProvinceByCode(code) {
      const data = this.provinces_data.find(v => v.provCode === code);
      return data.provDesc;
    },
    deniedApplication() {
      this.rejecting_application = true;
      this.$store
        .dispatch("REJECT_DOCKET", {
          docket_reference: this.form.reference_no,
          remarks: this.remarks,
          department_title: this.department.description
        })
        .then(result => {
          console.log("REJECT_DOCKET result :", result);
          this.$notification.success({
            message: "Denied!",
            description: `You have denied Application #${this.form.reference_no}`
          });
          return this.$store.dispatch("GET_DOCKETS_OUTBOX", true);
        })
        .then(result => {
          console.log("GET_DOCKETS_OUTBOX result :", result);
          this.$router.push("/admin/app/applications");
          this.rejecting_application = false;
        })
        .catch(err => {
          console.log("REJECT_DOCKET err :", err);
          this.rejecting_application = false;
        });
    },
    approveApplication() {
      this.approving_application = true;
      var results = {};
      this.$store
        .dispatch("APPROVE_DOCKET", {
          docket_reference: this.form.reference_no,
          remarks: this.remarks,
          department_title: this.department.description
        })
        .then(result => {
          if (!result.data.errors) results = result.data;
          console.log("APPROVE_DOCKET result :", result);
          this.$notification.success({
            message: "Approve!",
            description: `You have approved Application #${this.form.reference_no}`
          });
          if (results.permit) {
            if (Array.isArray(results.permit.details))
              return this.processBarangay(results.permit.details);
            //barangay
            else if (results.permit.details.permit_type === "business")
              return this.processBusiness(results);
            //business
            else if (results.permit.details.permit_type === "cedula")
              return this.processCedula(results.permit.details);
            //cedula
            else if (results.permit.details.permit_type === "police")
              return this.processPolice(results.permit.details); //police
          }
          // return this.getPermitsAddress(results.permit.details);
        })
        .then(result => {
          console.log("result of other permits :", result);
          return this.$store.dispatch("GET_DOCKETS_OUTBOX", true);
        })
        .then(result => {
          this.$router.push("/admin/app/applications");
          this.approving_application = false;
        })
        .catch(err => {
          console.log("APPROVE_DOCKET err :", err);
          this.approving_application = false;
        });
    },
    processBarangay(details) {
      var promises = [];
      details.forEach(detail => {
        promises.push(function() {
          return new Promise((resolve, reject) => {
            this.getPermitsAddress(detail)
              .then(address => {
                return this.uploadBarangayPermit(detail, address);
              })
              .then(blob => {
                if (blob) return this.saveEpermit(blob, detail);
              })
              .then(result => {
                resolve(result);
              })
              .catch(err => {
                reject(err);
              });
          });
        });
      });
      return Promise.all(promises);
    },
    processBusiness(results) {
      return new Promise((resolve, reject) => {
        this.getPermitsAddress(results.permit.details)
          .then(address => {
            const valid_until = new Date(results.permit.details.date_created);
            const details = {
              business_name:
                results.permit.details.business_details.business_name,
              business_no: results.permit.details.business_no,
              business_address: address,
              business_owner: `${results.permit.details.owner_details.name.first} ${results.permit.details.owner_details.name.last}`,
              plate_no: results.permit.details.reference_no,
              ownership_type: this.getBusinessType(
                results.permit.details.business_details.business_type
              ),
              valid_until,
              area: `${results.permit.details.business_details.business_area} sq.m`,
              date_issued: new Date(valid_until.getFullYear() + 1, 11, 31),
              application_type: this.getDocketMode(
                results.permit.details.business_details.application_types
              ),
              mode_of_payment: this.getPaymentMode(
                results.permit.payments.mode_of_payment
              ),
              transaction_no: results.permit.payments.transaction_no,
              transactions: results.permit.payments.payment_breakdown
            };
            return this.$upload(details, "BUSINESSPERMIT_SAN_ANTONIO");
          })
          .then(blob => {
            return this.saveEpermit(blob, results.permit.details);
          })
          .then(result => {
            if (
              results.permit.details.permit_type === "business" &&
              results.permit.application.details.lack_documents &&
              results.permit.application.details.lack_documents.length &&
              results.permit.other_permits &&
              results.permit.other_permits.length
            ) {
              return this.generateOtherDocsForBusiness(
                results.permit.other_permits
              );
            }
          })
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    processCedula(details) {
      return new Promise((resolve, reject) => {
        this.$upload(details, "CEDULA_SAN_ANTONIO")
          .then(blob => {
            return this.saveEpermit(blob, details);
          })
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    processPolice(details) {
      return new Promise((resolve, reject) => {
        this.getPermitsAddress(details)
          .then(address => {
            return this.uploadPolicePermit(details, address);
          })
          .then(blob => {
            if (blob) return this.saveEpermit(blob, details);
          })
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    saveEpermit(blob, details) {
      var file_name =
          details.permit_type === "business"
            ? `business-permit-${Date.now()}-smart-juan.pdf`
            : details.permit_type === "cedula"
            ? `ctc-${Date.now()}-smart-juan.pdf`
            : details.permit_type === "police"
            ? `police-clearance-${Date.now()}-smart-juan.pdf`
            : details.permit_type === "barangay"
            ? `barangay-clearance-${Date.now()}-smart-juan.pdf`
            : "",
        file = new File([blob], file_name, {
          type: "application/pdf",
          lastModified: Date.now()
        });
      var form_data = new FormData();
      form_data.append("file", file);
      if (details.permit_type === "business")
        return this.$store.dispatch("SAVE_EPERMIT_ATTACHMENT", {
          business_no: details.business_no,
          form_data
        });
      else if (details.permit_type === "cedula")
        return this.$store.dispatch("SAVE_CEDULA_EPERMIT_ATTACHMENT", {
          cedula_no: details.cedula_no,
          form_data
        });
      else if (details.permit_type === "police")
        return this.$store.dispatch("SAVE_POLICE_EPERMIT_ATTACHMENT", {
          police_no: details.police_no,
          form_data
        });
      else if (details.permit_type === "barangay")
        return this.$store.dispatch("SAVE_BARANGAY_EPERMIT_ATTACHMENT", {
          barangay_no: details.barangay_no,
          form_data
        });
    },
    uploadBarangayPermit(details, address) {
      if (details.barangay_type === "residential") {
        const permit_details = {
          business_name: details.business_details.business_name,
          business_owner: "",
          business_address: address[0] || "",
          residential_address: address[1] || "",
          business_nature: details.business_details.business_type,
          requestor: "",
          date_created: details.date_created
        };
        return this.$upload(permit_details, "BGYCLEARANCE");
      } else if (details.barangay_type === "business") {
        const permit_details = {
          business_name: details.business_details.business_name,
          business_owner: "",
          business_address: address[0] || "",
          residential_address: address[1] || "",
          business_nature: details.business_details.business_type,
          requestor: "",
          date_created: details.date_created
        };
        return this.$upload(permit_details, "BRGY_BUSINESS_CLEARANCE");
      }
    },
    uploadPolicePermit(details, address) {
      const permit_details = {
        police_no: details.police_no,
        name: `${details.personal_details.name.first} ${details.personal_details.name.last}`,
        address,
        birth_date: details.personal_details.birthdate,
        birth_place: details.personal_details.birthplace,
        findings: "",
        purpose: "",
        validity: "",
        ctc_no: details.personal_details.ctc_no,
        date_created: details.date_created,
        verified_by_first: "",
        verified_by_second: ""
      };
      return this.$upload(permit_details, "POLICECLEARANCE");
    },
    getPermitsAddress(details) {
      if (details.permit_type === "business")
        return this.getAddress(details.business_address);
      // else if(details.permit_type === 'cedula') // Cedula has no address
      // return this.getAddress(details.business_address);
      else if (details.permit_type === "barangay") {
        var getAddresses = [];
        // If requesting for residential certificate
        if (details.purpose.includes("pc"))
          getAddresses.push(this.getAddress(details.residential_address));
        // If requesting barangay clearance for business permit
        if (details.purpose.includes("bp"))
          getAddresses.push(this.getAddress(details.business_address));
        if (getAddresses.length) return Promise.all(getAddresses);
      } else if (details.permit_type === "police")
        return this.getAddress(details.address_details);
    },
    generateOtherDocsForBusiness(permits) {
      var promises = [];
      permits.forEach(permit => {
        // get address, generate and upload epermit, save
        if (Array.isArray(permit)) return this.processBarangay(permit);
        //barangay
        else if (permit.permit_type === "cedula")
          return this.processCedula(permit);
        //cedula
        else if (permit.permit_type === "police")
          return this.processPolice(permit); //police
      });
      return Promise.all(promises);
    },
    getAddress(address) {
      return new Promise((resolve, reject) => {
        const {
          unit_no,
          bldg_no,
          bldg_name,
          subdivision,
          street,
          barangay,
          province,
          city,
          region,
          postal_code
        } = address;
        var city_desc = "";
        import(`../../assets/references/cities/${province}.json`)
          .then(data => {
            const cities = data.default;
            var city_data = cities.find(v => v.citymunCode === city);
            city_desc = city_data.citymunDesc;
            return import(`../../assets/references/barangay/${city}.json`);
          })
          .then(data => {
            const barangays = data.default;
            var brgy_data = barangays.find(v => v.brgyCode === barangay);
            var brgy_desc = brgy_data.brgyDesc;
            var result_address = "";
            if (unit_no) result_address += `Unit ${unit_no},`;
            if (bldg_no) result_address += ` ${bldg_no}`;
            if (bldg_name) result_address += ` ${bldg_name}`;
            if (barangay) result_address += ` ${brgy_desc}`;
            if (city) result_address += ` ${city_desc}`;
            if (province)
              result_address += ` ${this.getProvinceByCode(province)}`;
            if (postal_code) result_address += `, ${postal_code}`;
            resolve(result_address.toUpperCase());
          })
          .catch(err => {
            console.log("err :", err);
            reject(err);
          });
      });
    },
    view(url) {}
  }
};
</script>

<style>
</style>