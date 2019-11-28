<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :md="{ span: 12 }" v-if="platform==='local'">
      <a-card title="Success">
        <a-button type="primary" block @click="$router.push('/')">LOGIN</a-button>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
  created() {
    var data = new Buffer(this.$route.query.data, "base64").toString();
    console.log("process.env.VUE_APP_HOME_URI :", process.env.VUE_APP_HOME_URI);
    console.log("data :", data);
    if (this.platform !== "local") {
      if (this.platform === "facebook") {
        console.log("facebook data: " + JSON.stringify(data) ) 
        this.$store.commit("FB_LOGIN", JSON.parse(data));
      } else if (this.platform === "google") {
        this.$store.commit("GOOGLE_LOGIN", JSON.parse(data));
      }
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
