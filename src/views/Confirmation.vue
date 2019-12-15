<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 24 }" :md="{ span: 12 }" :xl="{ span: 24}" v-if="platform==='local'">
        <a-row>
          <a-col :span="24" style="background-color:#66bb6a">
            <div align="center">
              <a-icon
                type="check-circle"
                :style="{fontSize:'100px', color: '#FFF'}"
                style="margin-top:80px"
              />
              <h1 style="margin-top:30px; margin-bottom:50px">Your account has been confirmed!</h1>
            </div>
          </a-col>
        </a-row>
        <a-card>
          <h1 align="center" style="margin-top:50px">
            We have successfully updated your account.
            <br />You can login now securely
          </h1>

          <a-row>
            <a-col :span="24" align="middle">
              <a-button
                style="background-color: #66bb6a;
    color: #FFF; margin-top:40px; width:20%; height:50px"
                align="middle"
                @click="$router.push('/')"
              >LOGIN</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  created() {
    var data = new Buffer(this.$route.query.data, "base64").toString();
    console.log("process.env.VUE_APP_HOME_URI :", process.env.VUE_APP_HOME_URI);
    console.log("platform :", this.platform);
    console.log("data :", data);

    if (this.platform === "local") {
      this.$store
        .dispatch("CONFIRM_ACCOUNT", this.$route.query.data)
        .then(result => {
          console.log("CONFIRM_ACCOUNT result.data :", result.data);
          if (result.data.model) {
            this.is_success = true;
            this.$message.success(result.data.message);
          } else {
            this.$message.error(result.data.error.message);
            this.is_success = false;
          }
        })
        .catch(err => {});
    } else {
      // if (this.platform === "facebook") {
      //   console.log("facebook data: " + JSON.stringify(data));
      //   this.$store.commit("FB_LOGIN", JSON.parse(data));
      // } else if (this.platform === "google") {
      //   this.$store.commit("GOOGLE_LOGIN", JSON.parse(data));
      // }
      this.$store.commit("LOGIN", JSON.parse(data));
      window.opener.location.href = `${process.env.VUE_APP_HOME_URI}app`;
      window.opener.location.reload();
      window.close();
    }
  },
  computed: {
    platform() {
      return this.$route.query.platform;
    }
  }
};
</script>

<style>
</style>
