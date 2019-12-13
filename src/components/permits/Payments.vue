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
      <div v-if="record.status === 1">
        <a @click="() => view_data(record)">Renew</a>
      </div>
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
      ]
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
  computed: {
    dockets() {
      return this.$store.state.dockets.dockets;
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