<template>
  <a-layout>
    <a-back-top>
      <a-avatar>
        <a-icon type="up" :size="42"></a-icon>
      </a-avatar>
    </a-back-top>
    <!-- <a-layout-header class="header" :style="{background: '#333333',height:'40px'}">
     <p style="margin-top:-10px; color:#D7D7D7" > <a-button type="link" shape="round" style="color: #1890FF">Create an account</a-button>
     to track and manage your application, engage in information you care about and be a part of the concerned citizens of {{constant_helper.name_display}}
      <a-button type="link" style="margin-left:15%; color: #1890FF" >Sign in</a-button>
      </p>

    </a-layout-header> -->
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
    <!-- <a-layout-footer :style="`${constant_helper.theme.default} color: #ffffff`">
      <a-row>
        <a-col :span="24">
          <h1 style="color:#ffffff">Get in touch</h1>
          <a-divider></a-divider>
          <p>
            <a-icon style="margin-right: 5px" type="phone"></a-icon>Hotline: 123-3456
          </p>
          <p>
            <a-icon style="margin-right: 5px" type="global"></a-icon>Website:
            <a
              style="color:#ffffff"
              :href="constant_helper.client_details.website.label"
            >{{constant_helper.client_details.website.label}}</a>
          </p>
          <p>
            <a-icon style="margin-right: 5px" type="facebook"></a-icon>Facebook:
            <a
              style="color:#ffffff"
              :href="constant_helper.client_details.facebook.label"
            >{{constant_helper.client_details.facebook.label}}</a>
          </p>
          <a-divider></a-divider>
        </a-col>

        <a-col :span="18">
          <p>© Copyright 2019 CCCI Inc. - All Rights Reserved</p>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#4267B2">
            <a-icon type="facebook"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#EA4335">
            <a-icon type="google"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#4267B2">
            <a-icon type="twitter"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background:#00AFF0">
            <a-icon type="skype"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#FF2500">
            <a-icon type="youtube"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar
            size="large"
            style="background:radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);"
          >
            <a-icon type="instagram"></a-icon>
          </a-avatar>
        </a-col>
      </a-row>
    </a-layout-footer> -->
    <a-layout-footer :style="{ background: '#555555' }">
      <a-row type="flex" justify="center">
        <a-col :span="24">
          <h1 align="center" class="slogan_style">
            Pasyal tayo sa San Antonio
          </h1>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col :span="24">
          <h4 align="center" style="color:#FFF">
            Office of the Mayor: (042) 545-4091<br />
            Website: https://sanantonio.quezon.gov.ph<br />
            Facebook: SanAntonio Quezon<br />
            © Copyright 2019 CCCI Inc. - All Rights Reserved
          </h4>
        </a-col>
      </a-row>
    </a-layout-footer>

    <!-- REGISRATION -->

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
    <!-- Report Modal -->
    <a-modal v-model="visible_report" title="Report Incident">
      <a-row type="flex" align="center" :gutter="16">
        <a-col :span="6">
          <a-card
            :style="constant_helper.theme.button"
            @click="report_type = '1'"
            class="emergency_btn"
          >
            <a-row type="flex" justify="center">
              <a-col :span="12">
                <a-icon
                  :type="report_type === '1' ? 'check' : 'fire'"
                  style="color:#ffffff;font-size:24px"
                ></a-icon>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card
            :style="constant_helper.theme.button"
            @click="report_type = '2'"
            class="emergency_btn"
          >
            <a-row type="flex" justify="center">
              <a-col :span="12">
                <a-icon
                  :type="report_type === '2' ? 'check' : 'sound'"
                  @click="report(1)"
                  style="color:#ffffff;font-size:24px"
                ></a-icon>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card
            :style="constant_helper.theme.button"
            @click="report_type = '3'"
            class="emergency_btn"
          >
            <a-row type="flex" justify="center">
              <a-col :span="12">
                <a-icon
                  :type="report_type === '3' ? 'check' : 'alert'"
                  style="color:#ffffff;font-size:24px"
                ></a-icon>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card
            :style="constant_helper.theme.button"
            @click="report_type = '4'"
            class="emergency_btn"
          >
            <a-row type="flex" justify="center">
              <a-col :span="12">
                <a-icon
                  :type="report_type === '4' ? 'check' : 'safety'"
                  style="color:#ffffff;font-size:24px"
                ></a-icon>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
      <GmapMap
        id="map"
        ref="map"
        :center="{ lat: coordinates.lat, lng: coordinates.lng }"
        :zoom="16"
        map-type-id="terrain"
        draggable="true"
        style="width: 100%; height: 300px; margin-top:5vh"
      >
        <GmapMarker
          :draggable="true"
          :position="coordinates"
          :animation="animation"
        />
      </GmapMap>
      <a-textarea
        style="margin-top: 2vh"
        :rows="3"
        placeholder="Add Comments here..."
      ></a-textarea>
      <template slot="footer">
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="submitReport"
          >Confirm and Submit</a-button
        >
      </template>
    </a-modal>

    <a-modal v-model="guest_visible" title="Contact Details" @ok="submit">
      <a-row type="flex" justify="center" :gutter="16">
        <a-col :span="24">
          <a-form>
            <a-form-item>
              <a-input placeholder="Name">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input placeholder="Contact Number">
                <a-icon slot="prefix" type="phone" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input placeholder="Email">
                <a-icon slot="prefix" type="mail" />
              </a-input>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-modal>

    <a-modal v-modal="login_visible">
      <a-card
        style="background: rgba(59, 79, 99, 0.62)"
        border-radius="20px 0px 0px 20px"
      >
        <template slot="title">
          <div style="color:#ffffff">Enter Credentials</div>
        </template>
        <a-form>
          <a-form-item>
            <a-input size="large" placeholder="Email">
              <a-icon slot="prefix" type="mail" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              placeholder="Password"
              :type="reveal ? 'text' : 'password'"
            >
              <a-icon slot="prefix" type="lock" />
              <a-icon
                slot="suffix"
                :type="reveal ? 'eye' : 'eye-invisible'"
                @click="reveal = !reveal"
                style="cursor:pointer"
              />
            </a-input>
          </a-form-item>
          <a-button size="large" block ghost @click="$router.push('/app')"
            >Login</a-button
          >
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
    </a-modal>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      visible_menu: false,
      guest_visible: false,
      signup_visible: false,
      login_visible: false,
      visible_report: false,
      visible: false,
      topLocation: 0,
      reveal: false,
      loading: false,
      coordinates: { lat: 15.6673, lng: 120.734993 },
      animation: {},
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
      report_type: ""
    };
  },
  methods: {
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      console.log("event ::: ", JSON.stringify(window.top.scrollY));
      this.topLocation = window.top.scrollY;
    },
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
    report() {
      this.visible_report = true;
      var _self = this;
      this.$getLocation().then(coordinates => {
        this.coordinates = coordinates;
        this.$gmapApiPromiseLazy().then(() => {
          _self.animation = google.maps.Animation.DROP;
        });
      });
    },
    submitReport() {
      // this.visible_report = false
      var _self = this;
      this.$confirm({
        title: "You are about to submit a report as guest.",
        content:
          "For faster response, please enter your name & contact no. or Sign-up",
        okText: "Sign-up",
        cancelText: "Continue as guest",
        onOk: _self.signup,
        onCancel: _self.continue
      });
    },
    signup() {
      this.visible_report = false;
      this.signup_visible = true;
    },
    continue() {
      this.guest_visible = true;
    },
    submit() {
      console.log("sumbit home");
      this.guest_visible = false;
      this.visible_report = false;
      this.$notification.success({
        message: "Thank you for your concern",
        description: "Your Report has been sent. Stay safe!"
      });
    },
    validate() {
      var errors = true;

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
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  computed: {
    headerStyle() {
      if (this.topLocation < 50) {
        return "background: transparent";
      } else {
        return this.constant_helper.theme.default;
      }
    },
    menuStyle() {
      return this.constant_helper.theme.default;
    }
  }
};
</script>

<style>
.modal_login {
  width: 55% !important;
}
.slogan_style {
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.65);
  font-size: 20px;
  text-transform: uppercase;
  color: #ffffff;
  text-align: center;
}
</style>
