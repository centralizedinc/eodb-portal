<template>
  <a-table :columns="cols" :dataSource="draft_apps" :loading="loading">
    <template slot="permit" slot-scope="text">{{getPermitType(text)}}</template>
    <template slot="date_created" slot-scope="text">{{formatDate(text, null, true)}}</template>
    <template slot="action" slot-scope="text, record">
        <a-button-group>
            <a-button type="primary" @click="continueApplication(record)">Continue</a-button>
            <a-button type="error" @click="deleteApplication(record)">Delete</a-button>
        </a-button-group>
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
    draft_apps() {
      return this.$store.state.dockets.draft_apps;
    },
    user() {
      return this.$store.state.user_session.user;
    }
  },
  methods: {
    continueApplication(record) {
        console.log('continueApplication record :', record);
    },
    deleteApplication(record) {
        console.log('deleteApplication record :', record);
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