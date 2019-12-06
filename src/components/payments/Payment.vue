<template>
  <a-drawer
    placement="left"
    :closable="false"
    :width="450"
    @close="$emit('close')"
    :visible="show"
  >
    <a-row type="flex">
      <a-col :span="24">
        <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
          <h2 style="color: #FFFFFF">Payment Options</h2>
        </a-card>
        <a-tabs @change="navigate">
          <a-tab-pane key="0">
            <template slot="tab">
              <a-tooltip title="Credit Card">
                <a-icon type="credit-card" style="font-size: 24px"></a-icon>
              </a-tooltip>
            </template>
          </a-tab-pane>
          <a-tab-pane key="1">
            <template slot="tab">
              <a-tooltip title="Online Banking">
                <a-icon type="bank" style="font-size: 24px"></a-icon>
              </a-tooltip>
            </template>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :span="24">
        <a-card>
          <component :is="current_option" :details="payment_details" />

          <a-button type="primary" block @click="$emit('pay', {payment_details, method: current_option})" :loading="loading">Submit</a-button>
        </a-card>
      </a-col>
    </a-row>
  </a-drawer>
</template>

<script>
import CreditCard from "./CreditCard";

export default {
  props: ["show", "loading"],
  components: {
    CreditCard
  },
  data() {
    return {
      card: null,
      payment_details: {},
      current_option: "CreditCard",
      tabs: ["CreditCard", "OnlineBanking", "OverCounter"]
    };
  },
  methods: {
    navigate(e) {
      this.current_option = this.tabs[e];
    }
  }
};
</script>

<style>
.ant-drawer-body {
  padding: 0 !important;
}
</style>