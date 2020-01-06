<template>
  <a-row type="flex" :gutter="16">
    <a-col :span="14">
      <a-tabs>
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="file-search"></a-icon>Details
          </span>
          <application-summary :form="form" :read-only="true"></application-summary>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="snippets"></a-icon>Attachments
          </span>
          <a-card
            @click="view(item.epermit_attachment)"
            v-for="item in form.attachments"
            :key="item.doc_type"
            style="margin-top: 2px; text-align: center"
          >
            <div v-for="file in item.files" :key="file">
              <!-- {{file}} -->
              <!-- <img :src="file" style="width: 100%;" /> -->
              <pdf :src="file" style="cursor:zoom; width: 100%"></pdf>
            </div>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col :span="10">
      <a-affix :offsetTop="10">
        <a-card style="background-color: #242B30;border-radius:10px">
          <a-list size="large" bordered :dataSource="checklist" style="background-color: #FFFFFF">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :title="item.name" :description="item.description">
                <a-checkbox slot="avatar"></a-checkbox>
              </a-list-item-meta>
            </a-list-item>
            <h2 slot="header">Application Checklist</h2>
          </a-list>

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
                :disabled="rejecting_application"
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
import provinces_data from "../../assets/references/provinces.json";
import pdf from "vue-pdf";

export default {
  components: {
    ApplicationSummary,
    pdf
  },
  data() {
    return {
      provinces_data,
      form: {
        owner_details: {
          name: {}
        },
        owner_address: {},
        business_details: {},
        business_address: {}
      },
      checklist: ["Police Clearance", "Barangay Clearance"],
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
    }
  },
  methods: {
    init() {
      this.$http
        .get("/checklists")
        .then(results => {
          this.checklist = results.data;
          return this.$store.dispatch("GET_ADMIN_DEPARTMENT");
        })
        .then(result => {
          console.log("GET_ADMIN_DEPARTMENT result :", result);
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
            if (results.permit.details.permit_type === "business")
              return this.getAddress(results.permit.details.business_address);
            // else if(results.permit.details.permit_type === 'cedula') // Cedula has no address
            // return this.getAddress(results.permit.details.business_address);
            else if (results.permit.details.permit_type === "barangay") {
              var getAddresses = [];
              // If requesting for residential certificate
              if (results.permit.details.purpose.includes("pc"))
                getAddresses.push(
                  this.getAddress(results.permit.details.residential_address)
                );
              // If requesting barangay clearance for business permit
              if (results.permit.details.purpose.includes("bp"))
                getAddresses.push(
                  this.getAddress(results.permit.details.business_address)
                );
              if (getAddresses.length) return Promise.all(getAddresses);
            } else if (results.permit.details.permit_type === "police")
              return this.getAddress(results.permit.details.address_details);
          }
        })
        .then(address => {
          console.log("getAddress result :", address);
          if (results.permit) {
            if (results.permit.is_approve) {
              if (results.permit.details.permit_type === "business") {
                const valid_until = new Date(
                  results.permit.details.date_created
                );
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
                  application_type: this.getApplicationType(
                    results.permit.details.business_details.application_types
                  ),
                  mode_of_payment: this.getPaymentMode(
                    results.permit.payments.mode_of_payment
                  ),
                  transaction_no: results.permit.payments.transaction_no,
                  transactions: results.permit.payments.payment_breakdown
                };
                return this.$upload(details, "BUSINESSPERMIT_SAN_ANTONIO");
              } else if (results.permit.details.permit_type === "cedula") {
                // const details = {};
                // return this.$upload(details, "CEDULA");
              } else if (results.permit.details.permit_type === "barangay") {
                const details = {
                  business_name:
                    results.permit.details.business_details.business_name,
                  business_owner: "",
                  business_address: address[0] || "",
                  residential_address: address[1] || "",
                  business_nature:
                    results.permit.details.business_details.business_type,
                  requestor: "",
                  date_created: results.permit.details.date_created
                };
                return this.$upload(details, "BGYCLEARANCE");
              } else if (results.permit.details.permit_type === "police") {
                const details = {
                  police_no: results.permit.details.police_no,
                  name: `${results.permit.details.personal_details.name.first} ${results.permit.details.personal_details.name.last}`,
                  address,
                  birth_date: results.permit.details.personal_details.birthday,
                  birth_place:
                    results.permit.details.personal_details.birthplace,
                  findings: "",
                  purpose: "",
                  validity: "",
                  ctc_no: results.permit.details.personal_details.ctc_no,
                  date_created: results.permit.details.date_created,
                  verified_by_first: "",
                  verified_by_second: ""
                };
                return this.$upload(details, "POLICECLEARANCE");
              }
            }
            // if(!results.permit.is_approve) return this.$upload(results.permit.details, "BUSINESSPERMIT_SAN_ANTONIO")
          }
        })
        .then(blob => {
          if (blob) {
            if (results.permit.details.permit_type === "business") {
              var file = new File(
                [blob],
                `business-permit-${Date.now()}-smart-juan.pdf`,
                {
                  type: "application/pdf",
                  lastModified: Date.now()
                }
              );
              var form_data = new FormData();
              form_data.append("file", file);
              return this.$store.dispatch("SAVE_EPERMIT_ATTACHMENT", {
                business_no: results.permit.details.business_no,
                form_data
              });
            } else if (results.permit.details.permit_type === "cedula") {
              var file = new File([blob], `ctc-${Date.now()}-smart-juan.pdf`, {
                type: "application/pdf",
                lastModified: Date.now()
              });
              var form_data = new FormData();
              form_data.append("file", file);
              return this.$store.dispatch("SAVE_CEDULA_EPERMIT_ATTACHMENT", {
                cedula_no: results.permit.details.cedula_no,
                form_data
              });
            } else if (results.permit.details.permit_type === "police") {
              var file = new File(
                [blob],
                `police-clearance-${Date.now()}-smart-juan.pdf`,
                {
                  type: "application/pdf",
                  lastModified: Date.now()
                }
              );
              var form_data = new FormData();
              form_data.append("file", file);
              return this.$store.dispatch("SAVE_POLICE_EPERMIT_ATTACHMENT", {
                police_no: results.permit.details.police_no,
                form_data
              });
            } else if (results.permit.details.permit_type === "barangay") {
              var file = new File(
                [blob],
                `barangay-clearance-${Date.now()}-smart-juan.pdf`,
                {
                  type: "application/pdf",
                  lastModified: Date.now()
                }
              );
              var form_data = new FormData();
              form_data.append("file", file);
              return this.$store.dispatch("SAVE_BARANGAY_EPERMIT_ATTACHMENT", {
                barangay_no: results.permit.details.barangay_no,
                form_data
              });
            }
          }
        })
        .then(result => {
          console.log("SAVE_EPERMIT_ATTACHMENT result :", result);
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
    getBusinessType(type) {
      if (type === "SP") return "Single Proprietorship";
      else if (type === "P") return "Partnership";
      else if (type === "CE") return "Cooperative";
      else if (type === "CN") return "Corporation";
    },
    getApplicationType(type) {
      const types = ["NEW", "RENEWAL"];
      return types[type];
    },
    getPaymentMode(mode) {
      if (mode === "A") return "Annual";
      else if (mode === "SA") return "Semi Annual";
      else if (mode === "Q") return "Quarterly";
      else return "";
    },
    view(url) {}
  }
};
</script>

<style>
</style>