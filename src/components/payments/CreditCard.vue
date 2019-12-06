<template>
  <div>
    <h2>Credit Card Payment</h2>
    <a-divider></a-divider>
    <div class="card-wrapper" style="margin-bottom: 2vh"></div>
    <a-divider></a-divider>
    <form>
      <!-- <a-input type="text" name="number"></a-input> -->
      <a-form-item
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 14 }"
        label="Credit Card Number"
        :validate-status="loading_card ? 'validating' : errors.card ? 'error': success_card ? 'success':''"
        :help="errors.card"
        has-feedback
      >
        <a-input
          placeholder="•••• •••• •••• ••••"
          type="text"
          name="number"
          class="ant-input"
          v-model="details.card_no"
          @blur="validateCard"
        />
      </a-form-item>
      <a-form-item
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 14 }"
        label="Cardholder Fullname"
        :validate-status="errors.card_name ? 'error':success_card_name ? 'success':''"
        :help="errors.card_name"
        has-feedback
      >
        <input
          placeholder="Enter Fullname"
          type="text"
          name="name"
          class="ant-input"
          v-model="details.card_name"
          @blur="validateName"
        />
      </a-form-item>
      <a-form-item
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 14 }"
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
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 14 }"
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
    </form>
  </div>
</template>

<script>
export default {
  props: ["details"],
  data() {
    return {
      card: null,
      cvc_max: 3,
      errors: {
        card: "",
        card_name: "",
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
  },
  methods: {
    // 
    validateCard() {
      this.errors.card = ""
      if (!this.details.card_no)
        this.errors.card = "Please fill up Credit Card Number.";
      else {
        this.loading_card = true;
        this.success_card = false;
        this.$store
          .dispatch("VALIDATE_CARD", this.details.card_no)
          .then(result => {
            console.log('result card :', result);
            if (result.data.isValid) {
              this.cvc_max = result.data.card.code.size;
              this.success_card = true;
            } else this.errors.card = "Input Credit Card Number is not valid.";
            this.loading_card = false;

            console.log('this.loading_card :', this.loading_card);
            console.log('this.success_card :', this.success_card);
            console.log('this.errors.card :', this.errors.card);
          })
          .catch(err => {
            console.log("err :", err);
            this.loading_card = false;
          });
      }
    },
    validateName() {
      this.errors.card_name = ""
      this.success_card_name = false;
      if (!this.details.card_name)
        this.errors.card_name = "Please fill up Cardholder Fullname.";
      else this.success_card_name = true;
    },
    validateExpiry() {
      this.errors.expiry = ""
      if (!this.details.expiry)
        this.errors.expiry = "Please fill up Expiry Date.";
      else {
        this.loading_expiry = true;
        this.success_expiry = false;
        this.$store
          .dispatch("VALIDATE_EXPIRY", this.details.expiry)
          .then(result => {
            console.log('result expiry :', result);
            if (result.data.isValid) this.success_expiry = true;
            else this.errors.expiry = "Input Expiry Date is not valid.";
            this.loading_expiry = false;
          })
          .catch(err => {
            console.log("err :", err);
            this.loading_expiry = false;
          });
      }
    },
    validateCvc() {
      this.errors.cvc = ""
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
            console.log('result cvc :', result);
            if (result.data.isValid) this.success_cvc = true;
            else this.errors.cvc = "Input CVC is not valid.";
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