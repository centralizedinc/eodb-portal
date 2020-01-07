<template>
  <div>
    <a-table :dataSource="dockets" :columns="cols" :loading="loading" :bordered="true">
      <span slot="date" slot-scope="text">{{formatDate(text, 'time')}}</span>
      <span
        slot="status"
        slot-scope="text, record"
        :style="`color: ${getStatusColor(record)}; font-weight: bold;`"
      >{{getDepartmentStatus(record)}}</span>
      <span slot="mode" slot-scope="text">{{getDocketMode(text)}}</span>
      <span slot="age" slot-scope="text" style="text-align:center">
        <a-tooltip :title="computeAge(text).display">
          <a-progress :percent="computeAge(text).percent" :showInfo="false"></a-progress>
        </a-tooltip>
      </span>
      <span slot="actions" slot-scope="text, record">
        <a-button-group v-if="record.status === 0">
          <a-tooltip title="Evaluate">
            <a-button type="primary" icon="file-search" @click="evaluate(record)"></a-button>
          </a-tooltip>
          <a-popconfirm
            title="Click PROCEED to unclaim this application"
            okText="Proceed"
            @confirm="unclaim(record)"
          >
            <a-tooltip title="Unclaim">
              <a-button type="primary" ghost icon="logout"></a-button>
            </a-tooltip>
          </a-popconfirm>
        </a-button-group>
      </span>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      application_details: {},
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
      ],
      loading: false
    };
  },
  created() {
    this.init();
  },
  computed: {
    dockets() {
      const dockets = JSON.parse(
        JSON.stringify(this.$store.state.dockets.dockets_outbox)
      );
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
      //get records
      this.loading = true;

      this.$store
        .dispatch("GET_DOCKETS_OUTBOX")
        .then(result => {
          console.log("GET_DOCKETS_OUTBOX result :", result);
          // this.dockets = results.data;
          return this.$store.dispatch("GET_ADMIN_DEPARTMENT");
        })
        .then(result => {
          console.log("GET_ADMIN_DEPARTMENT result :", result);
          this.loading = false;
        })
        .catch(err => {
          console.log("GET_DOCKETS_OUTBOX err :", err);
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

      this.$http
        .get(`/dockets/applications/${record.permit}/${record.reference_no}`)
        .then(result => {
          this.visible = true;
          this.application_details = result.data;
          console.log(JSON.stringify(this.application_details));
        });
    },
    evaluate(record) {
      console.log("record :", record);
      this.$store
        .dispatch("GET_APPLICATION_BY_REF", record.reference_no)
        .then(result => {
          console.log("GET_APPLICATION_BY_REF result :", result);
          this.$store.commit("REVIEW", result);
          this.$router.push(`/admin/app/application/`);
        })
        .catch(err => {
          console.log("GET_APPLICATION_BY_REF err :", err);
        });
    },
    unclaim(record) {
      this.loading = true;
      this.$store
        .dispatch("UNCLAIM_DOCKET", record.reference_no)
        .then(result => {
          console.log("unclaim result :", result);
          return this.$store.dispatch("GET_DOCKETS_OUTBOX", true);
        })
        .then(result => {
          return this.$store.dispatch("GET_DOCKETS_INBOX", true);
        })
        .then(result => {
          this.loading = false;
        })
        .catch(err => {
          console.log("unclaim err :", err);
          this.loading = false;
        });
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
</style>