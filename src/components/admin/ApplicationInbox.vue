<template>
  <div>
    <a-row style="margin-bottom: 5px">
      <a-col :span="8">
        <a-input-search placeholder="Search by Reference No." v-model="search" />
      </a-col>
    </a-row>
    <a-table :dataSource="dockets" :columns="cols" :loading="loading" :bordered="true">
      <span slot="date" slot-scope="text">{{formatDate(text, 'time')}}</span>
      <span
        slot="status"
        slot-scope="text, record"
        :style="`color: ${getStatusColor(record)}; font-weight: bold;`"
      >{{getDepartmentStatus(record)}}</span>
      <span slot="mode" slot-scope="text">{{getDocketMode(text)}}</span>
      <span slot="age" slot-scope="text, record" style="text-align:center">
        <a-tooltip :title="computeAge(record.date_created).display">
          <a-progress :percent="computeAge(record.date_created).percent" :showInfo="false"></a-progress>
        </a-tooltip>
      </span>
      <span slot="actions" slot-scope="text, record">
        <a-button-group>
          <a-tooltip title="View">
            <a-button type="primary" icon="search" @click="view(record)"></a-button>
          </a-tooltip>
          <a-popconfirm
            title="Click PROCEED to claim this application"
            okText="Proceed"
            @confirm="claim(record)"
          >
            <a-tooltip title="Claim">
              <a-button type="primary" ghost icon="login"></a-button>
            </a-tooltip>
          </a-popconfirm>
        </a-button-group>
      </span>
    </a-table>
    <a-drawer placement="right" @close="onClose" :visible="visible" :width="450" theme="dark">
      <div slot="title">
        <span style="color:#FFFFFF">Application Details</span>
      </div>
      <a-row>
        <a-col :span="12">
          <p style="font-weight:bold">REFERENCE NUMBER</p>
          <p style="font-weight:bold">TYPE</p>
          <p style="font-weight:bold">MODE</p>
          <p style="font-weight:bold">STATUS</p>
        </a-col>
        <a-col :span="12">
          <p>{{docket.reference_no}}</p>
          <p>{{docket.permit}}</p>
          <p>{{getDocketMode(docket.application_type)}}</p>
          <p>{{getDepartmentStatus(docket)}}</p>
        </a-col>
        <a-divider></a-divider>
        <template v-if="application_details.permit_type == 'business'">
          <a-col :span="12">
            <p style="font-weight:bold">BUSINESS NAME</p>
            <p style="font-weight:bold">BUSINESS TYPE</p>
            <p style="font-weight:bold">REGISTRATION NUMBER</p>
            <p style="font-weight:bold">TIN</p>
          </a-col>
          <a-col :span="12">
            <p>{{application_details.business_details.business_name}}</p>
            <p>{{application_details.business_details.business_type}}</p>
            <p>{{application_details.business_details.registration_no}}</p>
            <p>{{application_details.business_details.tin}}</p>
          </a-col>
        </template>
        <template v-if="application_details.permit_type == 'cedula'">
          <!-- <a-col :span="12">
            <p style="font-weight:bold">BUSINESS NAME</p>
            <p style="font-weight:bold">BUSINESS TYPE</p>
            <p style="font-weight:bold">REGISTRATION NUMBER</p>
            <p style="font-weight:bold">TIN</p>
          </a-col>
          <a-col :span="12">
            <p>{{application_details}}</p>
          </a-col>-->
        </template>
        <template v-if="application_details.permit_type == 'police'">
          <!-- <a-col :span="12">
            <p>{{application_details}}</p>
          </a-col>-->
        </template>
        <template v-if="application_details.permit_type == 'barangay'">
          <!-- <a-col :span="12">
            <p>{{application_details}}</p>
          </a-col>-->
        </template>

        <a-divider></a-divider>
        <a-col :span="24">
          <a-button type="primary" block @click="claim(docket)" :loading="loading">CLAIM</a-button>
        </a-col>
      </a-row>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      loading: false,
      visible: false,
      application_details: {
        business_details: {}
      },
      docket: {},
      //   dockets: [],
      cols: [
        {
          title: "REFERENCE NO",
          dataIndex: "reference_no"
        },
        {
          title: "TYPE",
          dataIndex: "permit"
        },
        {
          title: "MODE",
          dataIndex: "application_type",
          scopedSlots: { customRender: "mode" }
        },
        {
          title: "STATUS",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "DATE CREATED",
          dataIndex: "date_created",
          scopedSlots: { customRender: "date" }
        },
        {
          title: "AGE",
          dataIndex: "date_created_age",
          scopedSlots: { customRender: "age" }
        },
        {
          title: "ACTIONS",
          dataIndex: "",
          scopedSlots: { customRender: "actions" }
        }
      ]
    };
  },
  created() {
    this.init();
  },
  computed: {
    dockets() {
      var dockets = JSON.parse(
        JSON.stringify(this.$store.state.dockets.dockets_inbox)
      );
      if (this.search) {
        dockets = dockets.filter(v => v.reference_no.indexOf(this.search) > -1);
      }
      return dockets.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
    },
    department() {
      return this.$store.state.admin_session.department;
    }
  },
  methods: {
    init() {
      console.log(
        "this.$store.state.admin_session.admin :",
        this.$store.state.admin_session.admin
      );
      //get records
      this.loading = true;

      this.$store
        .dispatch("GET_DOCKETS_INBOX")
        .then(result => {
          console.log("GET_DOCKETS_INBOX result :", result);
          // this.dockets = results.data;
          return this.$store.dispatch("GET_ADMIN_DEPARTMENT");
        })
        .then(result => {
          console.log("GET_ADMIN_DEPARTMENT result :", result);
          this.loading = false;
        })
        .catch(err => {
          console.log("GET_DOCKETS_INBOX err :", err);
        });
    },
    computeAge(date) {
      var date_created = new Date(date);
      var max = 10;
      var time = new Date().getTime() - date_created.getTime();
      var hours = time / (1000 * 3600);
      var age = time / (1000 * 3600 * 24);
      var display =
        age < 1 ? `${Math.floor(hours)} Hour(s)` : `${Math.floor(age)} Day(s)`;
      return { percent: (age / max) * 100, age, time, display };
    },
    onClose() {
      this.visible = false;
    },
    view(record) {
      console.log(JSON.stringify(record));
      this.docket = record;
      // this.$http
      //   .get(`/dockets/applications/${record.permit}/${record.reference_no}`)
      this.$store
        .dispatch("GET_APPLICATION_BY_REF", record.reference_no)
        .then(result => {
          this.visible = true;
          this.application_details = result;
          console.log(JSON.stringify(this.application_details));
        });
    },
    claim(record) {
      this.loading = true;

      this.$store
        .dispatch("CLAIM_DOCKET", record.reference_no)
        .then(result => {
          console.log("CLAIM_DOCKET result :", result.data);
          return this.$store.dispatch(
            "GET_APPLICATION_BY_REF",
            record.reference_no
          );
        })
        .then(result => {
          this.$store.commit("REVIEW", result);
          this.$notification.success({
            message: "Claimed!",
            description: `You have claimed Application #${record.reference_no}`
          });
          return this.$store.dispatch("GET_DOCKETS_INBOX", true);
        })
        .then(result => {
          return this.$store.dispatch("GET_DOCKETS_OUTBOX", true);
        })
        .then(result => {
          console.log("new result :", result);
          this.loading = false;
          this.$router.push(`/admin/app/application/`);
        })
        .catch(err => {
          this.loading = false;
          console.log("CLAIM_DOCKET err :", err);
        });
      // if (app_already_loaded) {
      //   this.$store.commit("REVIEW", this.application_details);
      //   this.$notification.success({
      //     message: "Claimed!",
      //     description: `You have claimed Application #${record.reference_no}`
      //   });
      //   this.loading = false;

      //   this.$router.push(`/admin/app/application/`);
      // } else {
      //   this.$http
      //     .get(`/dockets/applications/${record.permit}/${record.reference_no}`)
      //     .then(result => {
      //       this.$store.commit("REVIEW", this.application_details);
      //       this.$notification.success({
      //         message: "Claimed!",
      //         description: `You have claimed Application #${record.reference_no}`
      //       });
      //       this.loading = false;

      //       this.$router.push(`/admin/app/application/`);
      //     });
      // }
    },
    getDepartmentStatus(record) {
      console.log("record :", record);
      if (!record) return "";
      const data = record.activities
        ? record.activities.find(v => v.department === this.department._id)
        : null;
      if (!data) return "";
      return this.getDocketStatus(data.status);
    },
    getStatusColor(record) {
      console.log("record :", record);
      if (!record) return "";
      const data = record.activities
        ? record.activities.find(v => v.department === this.department._id)
        : null;
      if (!data) return "";
      const colors = ["blue", "green", "red"];
      return colors[data.status];
    }
  }
};
</script>

<style>
.ant-form-item-label label {
  font-weight: bold;
  color: black;
}
.ant-drawer-header {
  background: #242b30 !important;
}
.ant-drawer-close {
  color: #ffffff;
}
.ant-progress-inner {
  background-color: #1b2229;
}
</style>