<template>
  <div>
    <div v-if="show_summary">
      <a-affix :offsetTop="60">
        <a-card :bodyStyle="{ padding: 0, 'text-align': 'right', 'padding-right': '1vw' }">
          <span style="cursor: pointer;font-size: 25px;color: blue;" @click="show_summary=false">
            Go Back
            <a-icon type="rollback" />
          </span>
        </a-card>
      </a-affix>
      <application-summary :form="app_form" :read-only="true" />
    </div>
    <a-table v-else :columns="cols" :dataSource="dockets" :loading="loading">
      <template slot="permit" slot-scope="text">{{getPermitType(text)}}</template>
      <template slot="date_created" slot-scope="text">{{formatDate(text, 'time', true)}}</template>
      <template slot="status" slot-scope="text">
        <span
          :style="`color: ${text === 0? 'blue' : text === 1? 'green' : text === 2 ? 'red' : ''}`"
        >{{getStatus(text)}}</span>
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

export default {
  props: ["admin"],
  components: {
    ApplicationSummary
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
    getPermitType(type) {
      if (type === "business") return "Business Permit";
      return "";
    },
    getStatus(status) {
      const status_desc = ["In Progress", "Approved", "Rejected"];
      return status_desc[status];
    },
    viewApplication(reference_no, index) {
      this.loading_index = index;
      this.$store
        .dispatch("GET_APPLICATION_BY_REF", reference_no)
        .then(app => {
          console.log("GET_APPLICATION_BY_REF app :", app);
          this.app_form = app;
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