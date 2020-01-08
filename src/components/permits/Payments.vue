<template>
  <a-table :columns="cols" :dataSource="payments" :loading="loading || loading_payments">
    <span slot="amount_paid" slot-scope="text">{{formatCurrency(text)}}</span>
    <span slot="payment_for" slot-scope="text">{{getPermitType(text)}}</span>
    <span slot="method" slot-scope="text">{{getPermitMethod(text)}}</span>
    <span slot="date_created" slot-scope="text">{{formatDate(text, 'time', true)}}</span>
    <template slot="action" slot-scope="text, record">
      <a-tooltip title="Print">
        <a-icon
          type="printer"
          @click="print(record)"
          style="cursor: pointer; color: #1890ff; font-weight: bold;"
        />
      </a-tooltip>
    </template>
  </a-table>
</template>

<script>
export default {
  props: ["admin", "loading_payments", "search"],
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
        },
        {
          title: "Action",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  computed: {
    payments() {
      var payments = this.$store.state.payment.payments;
      if(this.search) {
        console.log('payments :', payments);
        payments = payments.filter(v => v.reference_no.indexOf(this.search) > -1);
      }
      return payments
    },
    user() {
      return this.$store.state.user_session.user;
    }
  },
  methods: {
    getPermitMethod(method) {
      if (method === "creditcard") return "Credit Card";
      else if (method === "onlinebanking") return "Online Banking";
      else if (method === "overcounter") return "Over the Counter";
      return "";
    },
    print(record) {
      var w = window.open(record.attachment);
      w.print();
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