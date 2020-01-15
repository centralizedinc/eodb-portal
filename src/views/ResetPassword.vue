<template>
  <a-layout>
    <a-layout-header class="header">
      <a-row type="flex" justify="space-between" :gutter="16">
        <a-col
          style="margin-left: -30px"
          :xs="{span: 15}"
          :sm="{span: 15}"
          :md="{span: 9, offset: 1 }"
          :lg="{span: 9, offset: 1}"
          :xl="{span: 7, offset:1}"
          :xxl="{span: 9, offset: 1}"
        >
          <img
            style="width: auto; height: 55px; margin-top: -8px;"
            src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/smartjuan_logo.png"
          />
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <a-row style="height: 700px" type="flex" justify="center" align="middle">
        <a-col :span="8" v-if="!hide_form">
          <a-card
            class="card-container"
            title="Reset Password"
            :headStyle="{ 
                background: 'linear-gradient(to right, #56caef, rgba(60, 108, 180, 1))', 
                color: 'white',
                'font-weight': 'bold',
                'border-radius': '20px 20px 0 0 !important'
            }"
          >
            <a-form style="font-weight: bold;">
              <a-form-item
                label="New Password"
                :validate-status="error.new_password ? 'error' : ''"
                :help="error.new_password"
              >
                <!-- <a-input v-model="password.new_password"></a-input> -->
                <a-input
                  v-model="password.new_password"
                  placeholder="New Password"
                  :type="reveal ? 'text' : 'password'"
                  @keypress.enter="updatePassword"
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
              <a-form-item
                label="Confirm Password"
                :validate-status="error.confirm_password ? 'error' : ''"
                :help="error.confirm_password"
              >
                <!-- <a-input v-model="password.confirm_password"></a-input> -->
                <a-input
                  v-model="password.confirm_password"
                  placeholder="Confirm Password"
                  :type="reveal_confirm ? 'text' : 'password'"
                  @keypress.enter="updatePassword"
                  :disabled="loading"
                >
                  <a-icon type="lock" slot="prefix"></a-icon>
                  <a-tooltip slot="suffix">
                    <span slot="title">
                      {{
                      reveal_confirm ? "Hide Password" : "Show Password"
                      }}
                    </span>
                    <a-icon
                      :type="reveal_confirm ? 'eye' : 'eye-invisible'"
                      @click="reveal_confirm = !reveal_confirm"
                      style="cursor:pointer"
                    />
                  </a-tooltip>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  style="font-weight: bold;"
                  block
                  :loading="loading"
                  @click="updatePassword"
                >UPDATE PASSWORD</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
        <a-col :span="8" v-else>
          <div align="center">
            <a-icon
              type="smile"
              :style="{ fontSize: '100px', color: '#faad14' }"
              style="margin-top:80px"
            />
            <h1 style="margin-top:30px; color: #7e7e7e">Your request is invalid!</h1>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      password: {
        confirm_password: "",
        new_password: ""
      },
      error: {
        confirm_password: "",
        new_password: "",
        message: ""
      },
      hide_form: true,
      reveal: false,
      reveal_confirm: false
    };
  },
  created() {
    console.log("this.$route.params.code :", this.$route.params.code);
    this.hide_form = false;
    this.$store
      .dispatch("CHECK_PASSWORD_RESET", this.$route.params.code)
      .then(result => {
        console.log("result :", result);
      })
      .catch(err => {
        this.$message.error(err.message);
        this.hide_form = true;
      });
  },
  methods: {
    updatePassword() {
      this.error = {
        new_password: "",
        confirm_password: "",
        message: ""
      };
      if (!this.password.new_password) {
        this.error.new_password = "Please input new password.";
      } else if (
        !this.password.confirm_password ||
        this.password.confirm_password !== this.password.new_password
      ) {
        this.error.confirm_password =
          "New Password and Confirm Password does not match.";
      } else {
        this.loading = true;
        this.$store
          .dispatch("RESET_PASSWORD", {
            password: this.password,
            code: this.$route.params.code
          })
          .then(result => {
            this.$message.success(result.message);
            this.loading = false;
            this.$router.push("/");
          })
          .catch(err => {
            this.error.message = err.message;
            this.$message.error(err.message);
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style>
.header {
  background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1));
}
.main-layout {
  height: 100%;
  background: whitesmoke;
}
.card-container {
  background: #333333a6 !important;
  border-radius: 20px 20px 20px 20px !important;
  border: none !important;
}
</style>