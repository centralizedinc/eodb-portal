<template>
  <a-table :columns="cols" :dataSource="dockets" :loading="loading">
    <template slot="permit" slot-scope="text">{{getPermitType(text)}}</template>
    <template slot="date_created" slot-scope="text">{{formatDate(text, null, true)}}</template>
    <template slot="status" slot-scope="text">
      <span
        :style="`color: ${text === 0? 'blue' : text === 1? 'green' : text === 2 ? 'red' : ''}`"
      >{{getStatus(text)}}</span>
    </template>
    <template slot="action" slot-scope="text, record">
      <a-popconfirm
        title="Click PROCEED to redirect in Renewal Form."
        okText="Proceed"
        cancelText="Cancel"
        @confirm="renewApplication(record)"
      >
        <a-button type="link">Renew</a-button>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script>
export default {
  props: ["admin"],
  data() {
    return {
      loading: false,
      cols: [
        {
          title: "Business Number",
          dataIndex: "business_no"
        },
        {
          title: "License/Permit Applied",
          dataIndex: "permit_type",
          scopedSlots: { customRender: "permit_type" }
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
      ]
    };
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("GET_BUSINESS_PERMIT")
      .then(result => {
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
      });
  },
  computed: {
    permits() {
      const permits = JSON.parse(
        JSON.stringify(this.$store.state.permits.permits)
      );
      return permits.sort(
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
    renewApplication(record) {
      console.log("record :", record);
      this.$router.push(
        `/permits/business?mode=renewal&ref_no=${record.reference_no}`
      );
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