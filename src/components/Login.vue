<template>
  <a-card style="background: rgba(59, 79, 99, 0.62)">
    <template slot="title">
      <div style="color:#ffffff">Enter Credentials</div>
    </template>
    <a-form>
      <a-form-item :validate-status="error_login ? 'error': ''">
        <a-input size="large" v-model="account.email" placeholder="Email">
          <a-icon slot="prefix" type="mail" />
        </a-input>
      </a-form-item>
      <a-form-item :validate-status="error_login ? 'error': ''">
        <a-input
          size="large"
          v-model="account.password"
          placeholder="Password"
          :type="reveal?'text':'password'"
        >
          <a-icon slot="prefix" type="lock" />
          <a-icon
            slot="suffix"
            :type="reveal?'eye':'eye-invisible'"
            @click="reveal=!reveal"
            style="cursor:pointer"
          />
        </a-input>
      </a-form-item>
      <a-form-item
        :validate-status="error_login ? 'error': ''"
        :help="error_login ? 'Invalid Email or Password' : ''"
      ></a-form-item>
      <a-button size="large" block ghost @click="login">Login</a-button>
      <a-divider></a-divider>
      <p style="color:white">Login using facebook or google accounts</p>
      <a-row type="flex" :gutter="16">
        <a-col :span="12">
          <a-button
            block
            style="border: #4267B2;background-color:#4267B2; color:#FFFFFF"
            @click="registerFacebook"
          >
            <a-icon type="facebook"></a-icon>Facebook
          </a-button>
        </a-col>
        <a-col :span="12">
          <a-button
            block
            @click="registerGoogle"
            style="border: #DE4935;background-color:#DE4935; color:#FFFFFF"
          >
            <a-icon type="google"></a-icon>Google
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      reveal: false,
      account: {
        email: "",
        password: ""
      },
      error_login: false
    };
  },
  methods: {
    registerFacebook() {
      window.open(
        `${process.env.VUE_APP_BASE_API_URI}/auth/facebook`,
        "",
        "width=500,height=450"
      );
      this.signup_visible = false;
    },
    registerGoogle() {
      window.open(
        `${process.env.VUE_APP_BASE_API_URI}/auth/google`,
        "",
        "width=500,height=450"
      );
      this.signup_visible = false;
    },
    login() {
      console.log("login");
      this.error_login = false;
      if (this.account.email && this.account.password) {
        this.$store.commit("LOGIN", {
          fname: "Mark",
          lname: "Bautista",
          email: "mquijom@centralizedinc.com",
          avatar: "https://mdbootstrap.com/img/Photos/Avatars/img%20%289%29.jpg"
        });
        this.$router.push("/app");
      } else {
        this.error_login = true;
      }
    }
  }
};
</script>

<style>
</style>