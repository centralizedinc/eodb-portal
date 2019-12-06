<template>
  <div>
    <a-card class="loginCard">
      <!-- <template slot="title">
      <div style="color:#ffffff">Enter Credentials</div>
    </template> -->
      <a-row>
        <a-col :span="8"></a-col>
        <a-col :span="8" align="center">
          <a-avatar
            style="cursor:pointer;"
            @click="$router.push('/')"
            src="https://i.postimg.cc/yN1G8jpk/normal-u4.png"
            :size="90"
          ></a-avatar>
        </a-col>
        <a-col :span="8"></a-col>
      </a-row>
      <a-row>
        <a-col :span="7"></a-col>
        <a-col :span="24">
          <h3 style="color:white; margin-top: 10px" align="center">
            Avoid the hassle, apply for a business permit here!
          </h3>
        </a-col>
        <a-col :span="7"></a-col>
      </a-row>
      <a-row type="flex" style="margin-top:5%" :gutter="16">
        <a-col :span="24">
          <a-button
            block
            style="border: #4267B2;background-color:#4267B2; color:#FFFFFF; height:6vh"
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
            @click="registerGoogle"
            style="border: #DE4935;background-color:#DE4935; color:#FFFFFF ;height:6vh"
          >
            <a-icon type="google"></a-icon>Login using Google
          </a-button>
        </a-col>
      </a-row>
      <a-row type="flex" :gutter="16" style="margin-top:5%; margin-bottom:5%">
        <a-col :span="24">
          <a-button
            block
            @click="registerGoogle"
            style="border: #DE4935;background-color:#1890FF; color:#FFFFFF ; height:6vh"
          >
            <a-icon type="mail"></a-icon>
            Login using e-mail
          </a-button>
        </a-col>
      </a-row>
      <a-divider> <h5 style="color:#FFF; margin-top:5px">or</h5> </a-divider>
      <a-row>
        <a-col :span="24">
          <a-button
            type="link"
            block
            style="color:#1890FF; margin-left:5px"
            @click="signup_visible = true"
            >Create an account
          </a-button>
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
    </a-form> -->
      <!-- REGISRATION -->
    </a-card>
    <a-modal
      class="modal_login"
      v-model="signup_visible"
      title="Create an Account"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button
          style="background-color: #1890ff;
    border-color: #1890ff"
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
          >Submit</a-button
        >
      </template>
      <a-row type="flex" justify="center" :gutter="16">
        <!-- <a-col :span="24">
          <p>Register with facebook or google</p>
        </a-col>
        <a-col :span="12">
          <a-button
            block
            size="large"
            style="border: #4267B2;background-color:#4267B2; color:#FFFFFF"
            @click="registerFacebook"
          >
            <a-icon type="facebook"></a-icon>Facebook
          </a-button>
        </a-col>-->
        <!-- <a-col :span="12">
          <a-button
            block
            size="large"
            @click="registerGoogle"
            style="border: #DE4935;background-color:#DE4935; color:#FFFFFF"
          >
            <a-icon type="google"></a-icon>Google
          </a-button>
        </a-col>-->
        <!-- <a-col :span="24">
          <a-divider>Or</a-divider>
        </a-col>-->
        <a-col :span="24">
          <a-form>
            <!-- <a-form-item
              label="Username"
              :validate-status="validation.name.first.status"
              :help="validation.name.first.message"
            >
              <a-input :disabled="loading" v-model="account.username"></a-input>
            </a-form-item>-->
            <!-- <a-form-item
              :validate-status="validation.name.last.status"
              :help="validation.name.last.message"
            >
              <a-input :disabled="loading" placeholder="Last Name" v-model="account.name.last"></a-input>
            </a-form-item>-->
            <a-col :span="24">
              <a-form-item
                label="Email Address"
                :validate-status="validation.email.status"
                :help="validation.email.message"
              >
                <a-input :disabled="loading" v-model="account.email"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="Enter Password"
                :validate-status="validation.password.status"
                :help="validation.password.message"
              >
                <a-input
                  :disabled="loading"
                  type="password"
                  v-model="account.password"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="Confirm Password"
                :validate-status="validation.confirm.status"
                :help="validation.confirm.message"
              >
                <a-input
                  :disabled="loading"
                  type="password"
                  v-model="account.confirm"
                ></a-input>
              </a-form-item>
            </a-col>
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
          <span style=" line-height: 200%;"
            >In accordance to R.A. 10173 or Data Privacy Act, all collected
            information will be treated with utmost confidentiality and will not
            be subjected to public disclosure.</span
          >
        </a-col>
        <a-col :span="24">
          <br />
          <span
            >By clicking Submit you are agreeing to the Terms and
            Conditions</span
          >
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reveal: false,
      signup_visible: false,
      loading: false,
      account: {
        name: {
          first: "",
          last: ""
        },
        email: "",
        password: "",
        confirm: ""
      },
      validation: {
        name: {
          first: {},
          last: {}
        },
        email: {},
        password: {},
        confirm: {}
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
          fname: "Juan",
          lname: "Dela Cruz",
          email: "juan@yahoo.com",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFfakUP8kC6iKzxMLSQd-HaOJiC47T_gPz_S_UspSIX5BVYX5KQ&s"
        });
        this.$router.push("/app");
      } else {
        this.error_login = true;
      }
    },
    validate() {
      var errors = true;

      // if (!this.account.name.first) {
      //   this.validation.name.first.status = "error";
      //   this.validation.name.first.message = "Please input desired username";
      //   // return false;
      //   errors = false;
      // }
      // if (!this.account.name.last) {
      //   this.validation.name.last.status = "error";
      //   this.validation.name.last.message = "Please input last name";
      //   // return false;
      //   errors = false;
      // }
      if (!this.account.email) {
        this.validation.email.status = "error";
        this.validation.email.message = "Please input email";
        // return false;
        errors = false;
      }
      // if (this.account.password) {
      //   console.log("this.account.password")
      if (
        this.account.confirm &&
        this.account.password !== this.account.confirm
      ) {
        console.log(
          "this.account.confirm && this.account.password !== this.account.confirm"
        );
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
      (this.loading = true), console.log("handleOk");

      if (this.validate()) {
        this.$message.success(
          "Your information has been sent successfully. Please check your email for verification link to activate your account.",
          10
        );
        console.log("walang error registration");
        this.loading = false;
        this.$store.dispatch("SIGN_UP", this.account).then(save_account => {
          console.log("saved account" + JSON.stringify(save_account));
          this.redirect("mainView");
        });
      } else {
        //   this.validation.name.first = "";
        // this.validation.name.last = "";
        // this.validation.email = "";
        // this.validation.password = "";
        // this.validation.confirm = "";
        console.log("may error registration");
        this.loading = false;
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
</style>
