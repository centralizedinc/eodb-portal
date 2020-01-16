<template>
  <a-row>
    <a-col :span="24">
      <collection-card></collection-card>
    </a-col>
    <a-col :span="24">
      <a-divider style="margin: 10px 0" />
    </a-col>
    <a-col :span="6">
      <a-input-search placeholder="Search" v-model="search" />
    </a-col>
    <a-col :push="16" :span="2">
      <a-button @click="init(true)" type="secondary" icon="reload">Refresh</a-button>
    </a-col>
    <a-col :span="24">
      <a-table
        style="margin-top: 5px;"
        :dataSource="payments"
        :columns="cols"
        :loading="loading"
        :bordered="true"
        @change="handleTableChange"
      >
        <span slot="payment_for" slot-scope="text">{{getPermitType(text)}}</span>
        <span slot="mode_of_payment" slot-scope="text">{{getPaymentMode(text)}}</span>
        <span slot="amount_paid" slot-scope="text">{{formatCurrency(text)}}</span>
        <span slot="date_created" slot-scope="text">{{formatDate(text, 'time')}}</span>
        <div slot="print" slot-scope="text, record" style="text-align: center;">
          <a-tooltip title="Print">
            <a-icon
              type="printer"
              @click="print(record)"
              style="cursor: pointer; color: #1890ff; font-weight: bold;"
            />
          </a-tooltip>
        </div>
      </a-table>
    </a-col>
  </a-row>
</template>

<script>
import CollectionCard from "@/components/admin/CollectionCard";
export default {
  components: {
    CollectionCard
  },
  data() {
    return {
      loading: false,
      cols: [
        {
          title: "Payment for",
          dataIndex: "payment_for",
          sorter: true,
          scopedSlots: { customRender: "payment_for" }
        },
        {
          title: "Mode of Payment",
          dataIndex: "mode_of_payment",
          sorter: true,
          scopedSlots: { customRender: "mode_of_payment" }
        },
        {
          title: "Amount Paid",
          dataIndex: "amount_paid",
          sorter: true,
          scopedSlots: { customRender: "amount_paid" }
        },
        {
          title: "Payment Date",
          dataIndex: "date_created",
          sorter: true,
          scopedSlots: { customRender: "date_created" }
        },
        {
          title: "Print Receipt",
          dataIndex: "print",
          scopedSlots: { customRender: "print" }
        }
      ],
      search: "",
      sorter: {}
    };
  },
  computed: {
    payments() {
      var payments = this.$store.state.payment.record_payments.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
      if (this.search) {
        payments = payments.filter(v => {
          return (
            this.getPermitType(v.payment_for).indexOf(this.search) > -1 ||
            this.getPaymentMode(v.mode_of_payment).indexOf(this.search) > -1 ||
            this.formatCurrency(v.amount_paid).indexOf(this.search) > -1 ||
            this.formatDate(v.date_created).indexOf(this.search) > -1
          );
        });
      }
      payments = this.sortTable(payments);
      return payments;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(refresh) {
      this.loading = true;
      this.$store
        .dispatch("GET_ALL_PAYMENTS", refresh)
        .then(result => {
          this.loading = false;
        })
        .catch(err => {
          console.log("err :", err);
          this.loading = false;
        });
    },
    handleTableChange(pagination, filters, sorter) {
      this.sorter = sorter;
    },
    sortTable(data) {
      var _self = this;
      if (this.sorter.field === "payment_for") {
        data.sort(function(a, b) {
          return _self.getPermitType(a.payment_for).toUpperCase() <
            _self.getPermitType(b.payment_for).toUpperCase()
            ? -1
            : _self.getPermitType(b.payment_for).toUpperCase() <
              _self.getPermitType(a.payment_for).toUpperCase()
            ? 1
            : 0;
        });
      } else if (this.sorter.field === "mode_of_payment") {
        data.sort(function(a, b) {
          return _self.getPaymentMode(a.mode_of_payment).toUpperCase() <
            _self.getPaymentMode(b.mode_of_payment).toUpperCase()
            ? -1
            : _self.getPaymentMode(b.mode_of_payment).toUpperCase() <
              _self.getPaymentMode(a.mode_of_payment).toUpperCase()
            ? 1
            : 0;
        });
      } else if (this.sorter.field === "amount_paid") {
        data.sort((a, b) => b.amount_paid - a.amount_paid);
      } else if (this.sorter.field === "date_created") {
        data.sort(
          (a, b) => new Date(b.date_created) - new Date(a.date_created)
        );
      }
      if (this.sorter.order === "descend") data.reverse();
      return data;
    },
    print(record) {
      var w = window.open(record.attachment);
      w.print();
    }
  }
};
</script>

<style>
</style>