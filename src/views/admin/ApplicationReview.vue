<template>
  <a-row type="flex" :gutter="16">
    <a-col :span="14">
      <application-summary :form="form" :read-only="true"></application-summary>
      <a-card style="margin-top:2vh">
        <h2>Requirements</h2>
      </a-card>
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
            <a-button
              size="large"
              icon="issues-close"
              :disabled="rejecting_application || approving_application"
            >For Compliance</a-button>
            <a-popconfirm
              title="Click PROCEED to denied this application."
              okText="PROCEED"
              @confirm="deniedApplication"
            >
              <a-button
                type="danger"
                size="large"
                icon="stop"
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
                size="large"
                icon="check-circle"
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
export default {
  components: {
    ApplicationSummary
  },
  data() {
    return {
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
      this.$store
        .dispatch("APPROVE_DOCKET", {
          docket_reference: this.form.reference_no,
          remarks: this.remarks,
          department_title: this.department.description
        })
        .then(result => {
          console.log("APPROVE_DOCKET result :", result);
          this.$notification.success({
            message: "Approve!",
            description: `You have approved Application #${this.form.reference_no}`
          });
          return this.$store.dispatch("GET_DOCKETS_OUTBOX", true);
        })
        .then(result => {
          console.log("GET_DOCKETS_OUTBOX result :", result);
          this.$router.push("/admin/app/applications");
          this.approving_application = false;
        })
        .catch(err => {
          console.log("APPROVE_DOCKET err :", err);
          this.approving_application = false;
        });
    }
  }
};
</script>

<style>
</style>