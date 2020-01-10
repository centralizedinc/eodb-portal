<template>
  <div>
    <a-table :columns="cols" :dataSource="dockets" :loading="loading">
      <template slot="permit" slot-scope="text">{{getPermitType(text)}}</template>
      <template slot="date_created" slot-scope="text">{{formatDate(text, 'time', true)}}</template>
      <template slot="status" slot-scope="text">
        <span
          :style="`color: ${text === 0? 'blue' : text === 1? 'green' : text === 2 ? 'red' : ''}`"
        >{{getDocketStatus(text)}}</span>
      </template>
      <template slot="action" slot-scope="text, record, index">
        <a-icon type="loading" v-if="loading_index===index" />
        <a-icon
          v-else
          :disabled="loading_index>-1"
          type="search"
          style="cursor: pointer; color: blue; font-size: 20px;"
          @click="viewApplication(record.reference_no, index)"
        ></a-icon>
      </template>
    </a-table>
    <a-drawer :visible="show_summary" @close="show_summary=false" :width="800">
      <a-tabs>
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="file-search"></a-icon>Details
          </span>
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
    <!-- <a-modal :visible="show_summary" :width="1200" @cancel="show_summary=false" :footer="null">
      <a-row>
        <a-col :xs="{ span: 24 }" :md="{ span: 12 }">
          <application-summary :form="app_form" :read-only="true" />
        </a-col>
      </a-row>
    </a-modal>-->
  </div>
</template>

<script>
import ApplicationSummary from "../../views/app/BusinessPermit/ApplicationSummary";
import ApplicationSummaryBrgy from "@/views/app/BarangayClearance/ApplicationSummary";
import ApplicationSummaryPolice from "@/views/app/PoliceClearance/ApplicationSummary";
import ApplicationSummaryCedula from "@/views/app/Cedula/ApplicationSummary";
import pdf from "vue-pdf";

export default {
  props: ["admin", "loading", "search"],
  components: {
    ApplicationSummary,
    ApplicationSummaryBrgy,
    ApplicationSummaryPolice,
    ApplicationSummaryCedula,
    pdf
  },
  data() {
    return {
      cols: [
        {
          title: "Reference No",
          dataIndex: "reference_no"
        },
        {
          title: "License/Permit Applied",
          dataIndex: "permit",
          scopedSlots: { customRender: "permit" }
        },
        {
          title: "Date Submitted",
          dataIndex: "date_created",
          scopedSlots: { customRender: "date_created" }
        },
        {
          title: "Status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      show_summary: false,
      app_form: {},
      loading_index: -1
    };
  },
  mounted() {
    if (this.$route.query.ref_no)
      this.viewApplication(this.$route.query.ref_no);
  },
  computed: {
    dockets() {
      var dockets = JSON.parse(
        JSON.stringify(this.$store.state.dockets.dockets)
      );
      if (this.search) {
        dockets = dockets.filter(v => v.reference_no.indexOf(this.search) > -1);
      }
      return dockets.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
    },
    user() {
      return this.$store.state.user_session.user;
    },
    departments() {
      return this.$store.state.dockets.departments;
    },
    docket_activities() {
      return this.$store.state.dockets.docket_activities;
    },
    activities() {
      var activities = this.docket_activities
        .filter(v => v.reference_no === this.app_form.reference_no)
        .sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
      return activities;
    }
  },
  methods: {
    viewApplication(reference_no, index) {
      this.loading_index = index;

      this.$store
        .dispatch("GET_APPLICATION_BY_REF", reference_no)
        .then(app => {
          console.log("GET_APPLICATION_BY_REF app :", app);
          this.app_form = app;
          return this.$store.dispatch("GET_DEPARTMENTS");
        })
        .then(result => {
          console.log("result :", result);
          return this.$store.dispatch("GET_DOCKET_ACTIVITIES", true);
        })
        .then(result => {
          console.log("#result :", result);
          this.show_summary = true;
          this.loading_index = -1;
        })
        .catch(err => {
          console.log("GET_APPLICATION_BY_REF err :", err);
          this.loading_index = -1;
        });
    },
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
      else if (action === "claim") return "Claim";
      else if (action === "approve") return "Approve";
      else if (action === "reject") return "Reject";
      else if (action === "compliance") return "Comply";
      else if (action === "done") return "Done";
      else return "";
    }
  }
};
</script>
<style>
p.dotted {
  border-style: dotted;
}
p.dashed {
  border-style: dashed;
}
p.solid {
  border-style: solid;
}
p.double {
  border-style: double;
}
p.groove {
  border-style: groove;
}
p.ridge {
  border-style: ridge;
}
p.inset {
  border-style: inset;
}
p.outset {
  border-style: outset;
}
p.none {
  border-style: none;
}
p.hidden {
  border-style: hidden;
}
p.mix {
  border-style: dotted dashed solid double;
}

.activities-cards .ant-card-head-title {
  padding: 4px 0;
  text-align: left;
}

.activities-cards .ant-card-head {
  min-height: 30px;
  border: none;
}

.activities-cards .ant-card-body {
  padding: 5px 24px !important;
  text-align: left;
  text-indent: 30px;
}
</style>