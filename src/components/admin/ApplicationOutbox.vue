<template>
  <div>
    <a-row style="margin-bottom: 5px">
      <a-col :span="8">
        <a-input-search placeholder="Search by Reference No." v-model="search" />
      </a-col>
      <a-col :push="14" :span="2">
        <a-button @click="init(true)" type="secondary" icon="reload">Refresh</a-button>
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
        <a-button-group v-if="checkStatus(record)">
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

        <a-tooltip title="View" v-else>
          <a-button type="primary" icon="search" @click="view(record)"></a-button>
        </a-tooltip>
      </span>
    </a-table>
    <a-drawer :visible="visible" @close="visible=false" :width="800">
      <a-tabs>
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="file-search"></a-icon>Details
          </span>
          {{app_form.permit_type}}
          <application-summary
            :form="app_form"
            v-if="app_form.permit_type=='business'"
            :read-only="true"
          />
          <application-summary-brgy
            :form="app_form"
            :read-only="true"
            v-if="app_form.permit_type=='barangay'"
          ></application-summary-brgy>
          <application-summary-police
            :form="app_form"
            :read-only="true"
            v-if="app_form.permit_type=='police'"
          ></application-summary-police>
          <application-summary-cedula
            :form="app_form"
            :read-only="true"
            v-if="app_form.permit_type=='cedula'"
          ></application-summary-cedula>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="snippets"></a-icon>Activities
          </span>
          <p v-if="!activities || !activities.length" style="text-align: center; font-size: 20px;">
            <i>No Activity.</i>
          </p>
          <a-card
            v-for="item in activities"
            :key="item.doc_type"
            style="margin-top: 2px; text-align: center; border: none;"
            class="activities-cards"
          >
            <span slot="title">
              <b :style="`color: ${getActionColor(item.action)}`">{{getActionText(item.action)}}</b>
              by {{getDepartmentTitle(item.department)}}
              <i>as of {{formatDate(item.date_created, 'time', true)}}</i>
            </span>
            <p>
              <i v-if="item.remarks">{{item.remarks}}</i>
              <i v-else>No comment.</i>
            </p>
            <a-divider style="margin: 5px 0;" />
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <a-icon type="snippets"></a-icon>Attachments
          </span>
          <a-card
            v-for="item in app_form.attachments"
            :key="item.doc_type"
            style="margin-top: 2px; text-align: center"
          >
            <div v-for="file in item.files" :key="file">
              <!-- {{file}} -->
              <!-- v-if="file.type==='image/png' || file.type==='image/jpg' || file.type==='image/jpeg'" -->
              <img
                v-if="file && file.type && file.type.indexOf('image') > -1"
                :src="file.url"
                style="width: 100%;"
              />
              <pdf
                v-else-if="file && file.type && file.type==='application/pdf'"
                :src="file.url"
                style="cursor:zoom; width: 100%"
              ></pdf>
              <pdf v-else :src="file" style="cursor:zoom; width: 100%"></pdf>
            </div>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
  </div>
</template>

<script>
import ApplicationSummary from "@/views/app/BusinessPermit/ApplicationSummary";
import ApplicationSummaryBrgy from "@/views/app/BarangayClearance/ApplicationSummary";
import ApplicationSummaryPolice from "@/views/app/PoliceClearance/ApplicationSummary";
import ApplicationSummaryCedula from "@/views/app/Cedula/ApplicationSummary";

export default {
  components: {
    ApplicationSummary,
    ApplicationSummaryBrgy,
    ApplicationSummaryPolice,
    ApplicationSummaryCedula
  },
  data() {
    return {
      activities: [],
      search: "",
      visible: false,
      app_form: {},
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
    departments() {
      return this.$store.state.dockets.departments;
    },
    dockets() {
      var dockets = JSON.parse(
        JSON.stringify(this.$store.state.dockets.dockets_outbox)
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
    getDepartmentTitle(department) {
      const dept = this.departments.find(v => v._id === department);
      return dept.description;
    },
    getActionColor(action) {
      if (action === "applied") return "blue";
      else if (action === "claim") return "blue";
      else if (action === "approve") return "green";
      else if (action === "reject") return "red";
      else if (action === "compliance") return "yellow";
      else if (action === "done") return "green";
      else return "white";
    },
    getActionText(action) {
      if (action === "applied") return "Applied";
      else if (action === "claim") return "Claimed";
      else if (action === "approve") return "Approved";
      else if (action === "reject") return "Rejected";
      else if (action === "compliance") return "Comply";
      else if (action === "done") return "Done";
      else return "";
    },
    init(refresh) {
      //get records
      this.loading = true;

      this.$store
        .dispatch("GET_DOCKETS_OUTBOX", refresh)
        .then(result => {
          console.log("GET_DOCKETS_OUTBOX result :", result);
          // this.dockets = results.data;
          return this.$store.dispatch("GET_ADMIN_DEPARTMENT");
        })
        .then(result => {
          console.log("GET_ADMIN_DEPARTMENT result :", result);
          return this.$store.dispatch("GET_DEPARTMENTS");
        })
        .then(result => {
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
          this.app_form = result.data;
          console.log(JSON.stringify(this.app_form));
          return this.$store.dispatch(
            "GET_DOCKET_ACTIVITIES_BY_REF",
            this.app_form.reference_no
          );
        })
        .then(result => {
          this.activities = result.data;
          console.log("this.activities :", this.activities);
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
    },
    checkStatus(record) {
      const data = record.activities
        ? record.activities.find(v => v.department === this.department._id)
        : null;
      return data ? data.status === 0 : null;
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