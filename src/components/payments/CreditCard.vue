<template>
  <div>
    <h2>Credit Card Payment</h2>
    <span
      style="font-size: 12px; font-weight: bold"
    >Please use Visa, MasterCard, or American Express card</span>
    <a-divider></a-divider>
    <a-row type="flex" justify="start">
      <a-col :span="24">
        <div class="card-wrapper" style="margin-bottom: 2vh" width="10%"></div>
      </a-col>
    </a-row>
    <!-- <a-divider></a-divider> -->
    <form>
      <!-- <a-input type="text" name="number"></a-input> -->
      <a-row>
        <a-col :span="24">
          <a-form-item
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
            label="Credit Card Number"
            :validate-status="loading_card ? 'validating' : errors.card ? 'error': success_card ? 'success':''"
            :help="errors.card"
            has-feedback
          >
            <input
              placeholder="•••• •••• •••• ••••"
              type="text"
              name="number"
              maxlength="19"
              class="ant-input"
              v-model="details.number"
              @blur="validateCard"
            />
          </a-form-item>
          <a-form-item
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
            label="Cardholder Fullname"
            :validate-status="errors.name ? 'error':success_card_name ? 'success':''"
            :help="errors.name"
            has-feedback
          >
            <input
              placeholder="Enter Fullname"
              type="text"
              name="name"
              class="ant-input"
              v-model="details.name"
              @blur="validateName"
            />
          </a-form-item>
          <a-form-item
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
            label="Expiry Date"
            :validate-status="loading_expiry ? 'validating':errors.expiry ? 'error':success_expiry ? 'success':''"
            :help="errors.expiry"
            has-feedback
          >
            <input
              placeholder="••/••"
              type="text"
              name="expiry"
              class="ant-input"
              v-model="details.expiry"
              @blur="validateExpiry"
            />
          </a-form-item>
          <a-form-item
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
            label="CVC"
            :validate-status="loading_cvc ? 'validating':errors.cvc ? 'error':success_cvc ? 'success':''"
            :help="errors.cvc"
            has-feedback
          >
            <input
              placeholder="•••"
              type="text"
              name="cvc"
              class="ant-input"
              v-model="details.cvc"
              @blur="validateCvc"
            />
          </a-form-item>
          <br />
          <br />
        </a-col>
      </a-row>
    </form>
  </div>
</template>

<script>
import Card from "card";
export default {
  props: ["details"],
  data() {
    return {
      card: null,
      cvc_max: 4,
      errors: {
        card: "",
        name: "",
        expiry: "",
        cvc: ""
      },
      loading_card: false,
      loading_expiry: false,
      loading_cvc: false,
      success_card: false,
      success_expiry: false,
      success_cvc: false,
      success_card_name: false
    };
  },
  mounted() {
    // this.$emit("mounted");
    this.card = new Card({
      form: "form",
      container: ".card-wrapper"
    });
    console.log("this.card1 :", this.card);
  },
  created() {
    this.card = new Card({
      form: "form",
      container: ".card-wrapper"
    });
    console.log("this.card :", this.card);
  },
  methods: {
    //
    validateCard() {
      this.$emit("validCard", false);
      this.errors.card = "";
      console.log("this.details.number :", this.details.number.length);
      if (!this.details.number)
        this.errors.card = "Please fill up Credit Card Number.";
      else {
        this.loading_card = true;
        this.success_card = false;
        this.$store
          .dispatch("VALIDATE_CARD", this.details.number)
          .then(result => {
            console.log("result card :", result);
            if (result.data.isValid) {
              this.cvc_max = result.data.card.code.size;
              this.success_card = true;
              this.$emit("validCard", true);
            } else this.errors.card = "Input Credit Card Number is not valid.";
            this.loading_card = false;

            console.log("this.loading_card :", this.loading_card);
            console.log("this.success_card :", this.success_card);
            console.log("this.errors.card :", this.errors.card);
          })
          .catch(err => {
            console.log("err :", err);
            this.loading_card = false;
          });
      }
    },
    validateName() {
      this.$emit("validName", false);
      this.errors.name = "";
      this.success_card_name = false;
      if (!this.details.name)
        this.errors.name = "Please fill up Cardholder Fullname.";
      else {
        this.success_card_name = true;
        this.$emit("validName", true);
      }
    },
    validateExpiry() {
      this.$emit("validExpiry", false);
      this.errors.expiry = "";
      if (!this.details.expiry)
        this.errors.expiry = "Please fill up Expiry Date.";
      else {
        this.loading_expiry = true;
        this.success_expiry = false;
        this.$store
          .dispatch("VALIDATE_EXPIRY", this.details.expiry)
          .then(result => {
            console.log("result expiry :", result);
            if (result.data.isValid) {
              this.success_expiry = true;
              this.$emit("validExpiry", true);
            } else this.errors.expiry = "Input Expiry Date is not valid.";
            this.loading_expiry = false;
          })
          .catch(err => {
            console.log("err :", err);
            this.loading_expiry = false;
          });
      }
    },
    validateCvc() {
      this.$emit("validCVC", false);
      this.errors.cvc = "";
      if (!this.details.cvc) this.errors.cvc = "Please fill up CVC.";
      else {
        this.loading_cvc = true;
        this.success_cvc = false;
        this.$store
          .dispatch("VALIDATE_CVV", {
            cvv: this.details.cvc,
            max: this.cvc_max
          })
          .then(result => {
            console.log("result cvc :", result);
            if (result.data.isValid) {
              this.success_cvc = true;
              this.$emit("validCVC", true);
            } else this.errors.cvc = "Input CVC is not valid.";
            this.loading_cvc = false;
          })
          .catch(err => {
            console.log("err :", err);
            this.loading_cvc = false;
          });
      }
    }
  }
};
</script>

<style>
</style>