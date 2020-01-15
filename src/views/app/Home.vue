<template>
  <a-row>
    <a-col :span="24">
      <h1 style="font-weight: 100; letter-spacing:0.1em; margin: 1vh 0;">Welcome, {{user_name}}!</h1>
    </a-col>
    <a-col :span="24">
      <a-card title="Activities" style="margin-top: 2vh;" />
    </a-col>
    <a-col
      :span="24"
      v-for="(item, index) in docket_activities"
      style="margin-top: 1vh;"
      :key="index"
    >
      <!--  :title="`Ref #${item.reference_no} - ${formatDate(item.date_created, null, true)}`" -->
      <a-card>
        <span slot="title">
          Ref #
          <b
            style="cursor: pointer; color: blue;"
            @click="$router.push(`/app/tracker?ref_no=${item.reference_no}`)"
          >{{item.reference_no}}</b>
          - {{formatDate(item.date_created, null, true)}}
        </span>
        <span>
          <b :style="`color: ${getActionColor(item.action)}`">{{getActionText(item.action)}}</b>
          by {{getDepartmentTitle(item.department)}}
        </span>
      </a-card>
    </a-col>
    <!-- <a-col :span="24">
      <a-card>
        <span>Recent Application Progress</span>
        <span style="font-weight: bold;">{{getPermitType(recent.permit_type)}}</span>

        <a-row style="margin-top: 1vh;">
          <a-col :span="24">
            <a-progress :percent="computePercent(recent)" status="active" />
          </a-col>

          <a-col v-for="(item, index) in recent_activities" :key="index" :span=""></a-col>
        </a-row>
      </a-card>
    </a-col>-->

    <!--  -->
  </a-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user_name() {
      return this.$store.state.user_session.user.name.first;
    },
    departments() {
      return this.$store.state.dockets.departments;
    },
    docket_activities() {
      const sorted_activities = this.$store.state.dockets.docket_activities.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
      return sorted_activities;
    }
  },
  created() {
    this.$store.dispatch("GET_PERMIT_TYPES")
    this.$store.dispatch("GET_DEPARTMENTS").then(result => {
      return this.$store.dispatch("GET_DOCKET_ACTIVITIES");
    });
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
      else if (action === "claim") return "Claim";
      else if (action === "approve") return "Approve";
      else if (action === "reject") return "Reject";
      else if (action === "compliance") return "Comply";
      else if (action === "done") return "Done";
      else return "";
    }
    // computePercent(item) {
    //   const done = item.activities.filter(v => v.status !== 0);
    //   return Math.floor((done.length / item.activities.length) * 100);
    // }
  }
};
</script>

<style></style>
