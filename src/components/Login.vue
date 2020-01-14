<template>
  <div>
    <a-card class="loginCard">
      <!-- <template slot="title">
      <div style="color:#ffffff">Enter Credentials</div>
      </template>-->
      <a-row>
        <a-col :span="8"></a-col>
        <a-col :span="8" align="center">
          <a-avatar
            style="cursor:pointer;"
            @click="$router.push('/')"
            src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/SA_logo.png"
            :size="95"
          ></a-avatar>
        </a-col>
        <a-col :span="8"></a-col>
      </a-row>
      <a-row>
        <!-- <a-col :span="7"></a-col> -->
        <a-col :span="24">
          <h3
            style="letter-spacing: 1px; color:white; margin-top: 10px; font-size: 16px"
            align="center"
          >
            Avoid the hassle,
            <br />apply your business permit here!
          </h3>
        </a-col>
        <a-col :span="7"></a-col>
      </a-row>
      <a-row type="flex" style="margin-top:5%" :gutter="16">
        <a-col :span="24">
          <a-button
            block
            class="loginButtonStyle"
            style="border: #4267B2;background-color:#4267B2; color:#FFFFFF; font-size: 14px; hover"
            @click="registerFacebook"
          >
            <a-icon type="facebook"></a-icon>Login using Facebook
          </a-button>
        </a-col>
      </a-row>
      <a-row type="flex" :gutter="16" style="margin-top:5%">
        <a-col :span="24">
          <a-button
            block
            class="loginButtonStyle"
            @click="registerGoogle"
            style="border: #DE4935;background-color:#DE4935; color:#FFFFFF ; font-size: 14px; hover"
          >
            <a-icon type="google"></a-icon>Login using Google
          </a-button>
        </a-col>
      </a-row>
      <a-row type="flex" :gutter="16" style="margin-top:5%; margin-bottom:5%">
        <a-col :span="24">
          <a-button
            block
            @click="signin_visible = true"
            class="loginButtonStyle"
            style="border: #DE4935;background-color:#1890FF; color:#FFFFFF ;  font-size: 14px; hover"
          >
            <a-icon type="mail"></a-icon>Login using e-mail
          </a-button>
        </a-col>
      </a-row>
      <a-divider>
        <h5 style="color:#FFF; margin-top:5px">or</h5>
      </a-divider>
      <a-row>
        <a-col :span="24">
          <a-button
            type="link"
            block
            class="linkHover"
            style="color: #1890ff; margin-left: 5px; font-size: 14px; hover"
            @click="signup_visible = true"
          >Create an account</a-button>
        </a-col>
      </a-row>
      <!-- <a-form>
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
      </a-form>-->
      <!-- REGISRATION -->
    </a-card>
    <a-modal class="modal_login" v-model="signup_visible" title="Create an Account">
      <template slot="footer">
        <a-button key="back" @click="handleCancel" :disabled="registration_loading">Return</a-button>
        <a-button
          style="background-color: #1890ff; border-color: #1890ff"
          key="submit"
          type="primary"
          :loading="registration_loading"
          @click="handleOk"
        >Submit</a-button>
      </template>
      <a-row type="flex" justify="center" :gutter="16">
        <a-col :span="24">
          <a-form class="account-form">
            <a-row :gutter="5">
              <a-col :span="12">
                <a-form-item
                  :validate-status="validation.name.first.status"
                  :help="validation.name.first.message"
                >
                  <span slot="label">
                    First Name
                    <i style="color: red">*</i>
                  </span>
                  <a-input
                    :disabled="registration_loading"
                    placeholder="First Name"
                    v-model="account.name.first"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  :validate-status="validation.name.last.status"
                  :help="validation.name.last.message"
                >
                  <span slot="label">
                    Last Name
                    <i style="color: red">*</i>
                  </span>
                  <a-input
                    :disabled="registration_loading"
                    placeholder="Last Name"
                    v-model="account.name.last"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item
              :validate-status="validation.email.status"
              :help="validation.email.message"
            >
              <span slot="label">
                Email Address
                <i style="color: red">*</i>
              </span>
              <a-input
                :disabled="registration_loading"
                placeholder="Email Address"
                v-model="account.email"
              ></a-input>
            </a-form-item>
            <a-form-item
              :validate-status="validation.password.status"
              :help="validation.password.message"
            >
              <span slot="label">
                Enter Password
                <i style="color: red">*</i>
              </span>
              <a-input
                :disabled="registration_loading"
                placeholder="Password"
                type="password"
                v-model="account.password"
              ></a-input>
            </a-form-item>
            <a-form-item
              :validate-status="validation.confirm.status"
              :help="validation.confirm.message"
            >
              <span slot="label">
                Confirm Password
                <i style="color: red">*</i>
              </span>
              <a-input
                :disabled="registration_loading"
                placeholder="Confirm Password"
                type="password"
                v-model="account.confirm"
              ></a-input>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="24">
          <a-divider>Terms & Conditions</a-divider>
        </a-col>
        <a-col :span="24">
          <div style="font-weight: 700">Registration</div>
          <span style=" line-height: 200%;">
            The information provided is certified as true and correct.
            <br />Registrant should validate their account by clicking the
            verification link sent to the supplied email address.
            <br />Registrant should not create multiple false accounts.
            <br />Registrant should keep their account credentials and will not
            share to anyone.
          </span>
        </a-col>
        <a-col :span="24">
          <br />
          <div style="font-weight: 700">Disclaimer</div>
          <span style=" line-height: 200%;">
            In accordance to R.A. 10173 or Data Privacy Act, all collected
            information will be treated with utmost confidentiality and will not
            be subjected to public disclosure.
          </span>
        </a-col>
        <a-col :span="24">
          <br />
          <span>By clicking Submit you are agreeing to the Terms and Conditions</span>
        </a-col>
      </a-row>
    </a-modal>

    <!-- LOGIN -->
    <a-modal :visible="signin_visible" @cancel="signin_visible = false" :footer="null">
      <div slot="title" style="text-align: center; padding-top: 3vh;">
        <h1 style="color: #888;">Login to Continue</h1>
        <h3 style="color: black">Welcome Back!</h3>
      </div>
      <a-form>
        <a-form-item :validate-status="login_err ? 'error' : ''">
          <a-input
            v-model="login_account.email"
            placeholder="Email"
            @keypress.enter="login"
            :disabled="loading"
          >
            <a-icon type="user" slot="prefix"></a-icon>
          </a-input>
        </a-form-item>
        <a-form-item :validate-status="login_err ? 'error' : ''" :help="login_err">
          <a-input
            v-model="login_account.password"
            placeholder="Password"
            :type="reveal ? 'text' : 'password'"
            @keypress.enter="login"
            :disabled="loading"
          >
            <a-icon type="lock" slot="prefix"></a-icon>
            <a-tooltip slot="suffix">
              <span slot="title">
                {{
                reveal ? "Hide Password" : "Show Password"
                }}
              </span>
              <a-icon
                :type="reveal ? 'eye' : 'eye-invisible'"
                @click="reveal = !reveal"
                style="cursor:pointer"
              />
            </a-tooltip>
          </a-input>
        </a-form-item>
      </a-form>
      <a-button type="primary" block @click="login" :loading="loading">LOGIN</a-button>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reveal: false,
      signin_visible: false,
      signup_visible: false,
      loading: false,
      account: {
        name: {
          first: "",
          last: "",
          middle: ""
        },
        email: "",
        password: "",
        confirm: ""
      },
      validation: {
        name: {
          first: {},
          last: {},
          middle: {}
        },
        email: {},
        password: {},
        confirm: {}
      },
      error_login: false,
      registration_loading: false,
      login_account: {
        email: "",
        password: ""
      },
      login_err: ""
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
      this.login_err = "";
      this.loading = true;
      if (this.login_account.email && this.login_account.password) {
        this.$store
          .dispatch("LOGIN", this.login_account)
          .then(result => {
            this.$router.push("/app");
            console.log("LOGIN result :", result);
            this.$message.success(
              `Welcome ${result.account.name.first}. You are now login.`
            );
            this.loading = false;
            window.eodb_pwa.askPermission(result.account._id);
          })
          .catch(err => {
            this.$message.error(err.message);
            this.login_err = err.message;
            this.loading = false;
          });
      } else {
        this.login_err = "Please Input Email and Password.";
      }
    },
    validate() {
      var errors = true;
      this.validation = {
        name: {
          first: {},
          last: {},
          middle: {}
        },
        email: {},
        password: {},
        confirm: {}
      };

      if (!this.account.name.first) {
        this.validation.name.first.status = "error";
        this.validation.name.first.message = "Please input desired username";
        // return false;
        errors = false;
      }
      if (!this.account.name.last) {
        this.validation.name.last.status = "error";
        this.validation.name.last.message = "Please input last name";
        // return false;
        errors = false;
      }
      if (!this.account.email) {
        this.validation.email.status = "error";
        this.validation.email.message = "Please input email";
        // return false;
        errors = false;
      }

      if (
        this.account.password &&
        this.account.confirm &&
        this.account.password !== this.account.confirm
      ) {
        this.validation.password.status = "error";
        this.validation.password.message =
          "Password and Confirm Password does not match";
        // return false;
        errors = false;
      }
      // }
      if (!this.account.password) {
        console.log("!this.account.password");
        this.validation.password.status = "error";
        this.validation.password.message = "Please input password";
        // return false;
        errors = false;
      }
      if (!this.account.confirm) {
        this.validation.confirm.status = "error";
        this.validation.confirm.message = "Please input confirm password";
        // return false;
        errors = false;
      }
      console.log("errors data: " + errors);
      return errors;
    },
    handleCancel() {
      console.log("handleCancel");
      this.account.name.first = "";
      this.account.name.last = "";
      this.account.email = "";
      this.account.password = "";
      this.account.confirm = "";
      this.signup_visible = false;
    },
    handleOk() {
      console.log("handleOk");

      if (this.validate()) {
        this.registration_loading = true;
        console.log("walang error registration");
        this.$store
          .dispatch("SIGN_UP", this.account)
          .then(save_account => {
            console.log("saved account" + JSON.stringify(save_account));
            this.$message.success(
              "Your information has been sent successfully. Please check your email for verification link to activate your account.",
              10
            );
            // this.account = {
            //   name: {
            //     first: "",
            //     last: "",
            //     middle: ""
            //   },
            //   email: "",
            //   password: "",
            //   confirm: ""
            // };
            this.registration_loading = false;
            this.signup_visible = false;
            // this.redirect("mainView");
          })
          .catch(err => {
            if (err.message) this.$message.error(err.message);
            this.registration_loading = false;
          });
      } else {
        console.log("may error registration");
      }
    }
  }
};
</script>

<style>
.loginCard {
  background: #333333a6 !important;
  border-radius: 20px 20px 20px 20px !important;
  border: none !important;
  margin-top: -35% !important;
}

.account-form .ant-form-item {
  margin: 0 !important;
}

.account-form .ant-form-item-label {
  font-weight: bold !important;
}

.loginButtonStyle:hover {
  /* background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1)); */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transform: scale(1.1);
}
.linkHover:hover {
  color: #56caef !important;
  transform: scale(1.1);
}
</style>
