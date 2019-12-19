<template>
  <a-table :columns="cols" :dataSource="payments" :loading="loading">
    <span slot="amount_paid" slot-scope="text">{{formatCurrency(text)}}</span>
    <span slot="payment_for" slot-scope="text">{{getPermitType(text)}}</span>
    <span slot="method" slot-scope="text">{{getPermitMethod(text)}}</span>
    <span slot="date_created" slot-scope="text">{{formatDate(text, 'time', true)}}</span>
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
          title: "Transaction No",
          dataIndex: "transaction_no"
        },
        {
          title: "Reference No",
          dataIndex: "reference_no"
        },
        {
          title: "Amount",
          dataIndex: "amount_paid",
          scopedSlots: { customRender: "amount_paid" }
        },
        {
          title: "Permit Type",
          dataIndex: "payment_for",
          scopedSlots: { customRender: "payment_for" }
        },
        {
          title: "Method",
          dataIndex: "method",
          scopedSlots: { customRender: "method" }
        },
        {
          title: "Payment Date",
          dataIndex: "date_created",
          scopedSlots: { customRender: "date_created" }
        }
      ]
    };
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("GET_PAYMENTS")
      .then(result => {
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
      });
  },
  computed: {
    payments() {
      return this.$store.state.payment.payments;
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
    getPermitMethod(method) {
      if(method === "creditcard") return "Credit Card"
      else if(method === "onlinebanking") return "Online Banking"
      else if(method === "overcounter") return "Over the Counter"
      return ""
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