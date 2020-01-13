<template>
  <!--  -->
  <a-row>
    <a-col :xs="{span: 24}" :md="{span: 0}" :xl="{span: 0}">
      <!-- 450 -->
      <a-drawer
        placement="left"
        :closable="false"
        :width="300"
        @close="$emit('close')"
        :visible="show"
      >
        <a-row type="flex">
          <!-- options -->
          <a-col :xs="{span: 24}" :md="{span: 22}" :xl="{span: 20}">
            <a-card size="small" title="Payment Options"></a-card>
            <a-tabs @change="navigate">
              <a-tab-pane key="0">
                <template slot="tab">
                  <a-tooltip title="Credit Card">
                    <a-icon type="credit-card" style="font-size: 24px"></a-icon>
                  </a-tooltip>
                </template>
              </a-tab-pane>

              <a-tab-pane key="1" disabled>
                <template slot="tab">
                  <a-tooltip title="7-11 (Over the Counter)">
                    <a-icon type="barcode" style="font-size: 24px"></a-icon>
                  </a-tooltip>
                  <a-badge count="soon" />
                </template>
                <div align="center">
                  <a-icon
                    type="smile"
                    :style="{ fontSize: '100px', color: '#faad14' }"
                    style="margin-top:80px"
                  />
                  <h1 style="margin-top:30px; margin-bottom:50px">
                    7-11 Payment
                    <br />service will be available very soon!
                  </h1>
                </div>
              </a-tab-pane>
            </a-tabs>
          </a-col>

          <a-col :xs="{span: 24}" :md="{span: 22}" :xl="{span: 20}">
            <a-card class="fill-up-form">
              <a-col :xs="{span: 24}" :md="{span: 22}" :xl="{span: 20}">
                <component
                  :is="current_option"
                  :details="payment_details"
                  @validCard="v => is_valid_card=v"
                  @validName="v => is_valid_name=v"
                  @validExpiry="v => is_valid_expiry=v"
                  @validCVC="v => is_valid_cvc=v"
                />
              </a-col>
            </a-card>
          </a-col>

          <a-col :xs="{span: 24}" :md="{span: 22}" :xl="{span: 20}">
            <a-affix :offsetBottom="0" class="payment-total-affix">
              <a-card :bodyStyle="{ padding: '1vh' }">
                <h3>
                  <i>
                    Amount to be paid:
                    <b>{{formatCurrency(payment_amount)}}</b>
                  </i>
                </h3>
                <a-divider style="margin: 1vh 0; background-color: rgba(0, 0, 0, 0.2);" />
                <a-button
                  type="primary"
                  block
                  @click="submit"
                  :loading="loading"
                  :disabled="!is_valid_card || !is_valid_name || !is_valid_expiry || !is_valid_cvc"
                >Submit</a-button>
              </a-card>
            </a-affix>
          </a-col>
        </a-row>
      </a-drawer>
    </a-col>
  </a-row>
</template>

<script>
import CreditCard from "./CreditCard";
import SevenEleven from "./711";

export default {
  props: ["show", "loading", "payment_amount"],
  components: {
    CreditCard,
    SevenEleven
  },
  data() {
    return {
      is_valid_card: false,
      is_valid_name: false,
      is_valid_expiry: false,
      is_valid_cvc: false,
      card: null,
      payment_details: {},
      current_option: "CreditCard",
      tabs: ["CreditCard", "SevenEleven", "OverCounter"]
    };
  },
  mounted() {
    console.log("this.payment_amount :", this.payment_amount);
  },
  methods: {
    navigate(e) {
      this.current_option = this.tabs[e];
    },
    submit() {
      console.log("this.is_valid_card :", this.is_valid_card);
      console.log("this.is_valid_name :", this.is_valid_name);
      console.log("this.is_valid_expiry :", this.is_valid_expiry);
      console.log("this.is_valid_cvc :", this.is_valid_cvc);
      if (
        this.is_valid_card &&
        this.is_valid_name &&
        this.is_valid_expiry &&
        this.is_valid_cvc
      ) {
        $emit("pay", { payment_details, method: current_option.toLowerCase() });
      }
    }
  }
};
</script>

<style>
.ant-drawer-body {
  padding: 0 !important;
}

.payment-total-affix .ant-affix {
  left: 0 !important;
}

.fill-up-form .ant-input,
.fill-up-form .ant-form-item-control-wrapper {
  text-transform: uppercase;
}

.fill-up-form .ant-form-explain {
  font-size: 10px;
  text-transform: none;
  font-weight: bold;
}
</style>