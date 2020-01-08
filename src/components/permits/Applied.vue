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
              <img v-if="file && file.type && file.type.indexOf('image') > -1" :src="file.url" style="width: 100%;" />
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
  props: ["admin"],
  components: {
    ApplicationSummary,
    ApplicationSummaryBrgy,
    ApplicationSummaryPolice,
    ApplicationSummaryCedula,
    pdf
  },
  data() {
    return {
      loading: false,
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
  created() {
    this.loading = true;
    this.$store
      .dispatch("GET_DOCKETS")
      .then(result => {
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
      });
  },
  mounted() {
    if (this.$route.query.ref_no)
      this.viewApplication(this.$route.query.ref_no);
  },
  computed: {
    dockets() {
      const dockets = JSON.parse(
        JSON.stringify(this.$store.state.dockets.dockets)
      );
      return dockets.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
    },
    user() {
      return this.$store.state.user_session.user;
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
          console.log("app form: " + JSON.stringify(this.app_form));
          this.show_summary = true;
          this.loading_index = -1;
        })
        .catch(err => {
          console.log("GET_APPLICATION_BY_REF err :", err);
          this.loading_index = -1;
        });
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
</style>