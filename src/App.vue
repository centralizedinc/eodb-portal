<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  data(){
    return{
      refreshing: false,
      registration: null,
      snackBtnText: "",
      snackWithBtnText: "",
      snackWithButtons: false,
      timeout: 0
    }
  },
  created() {
    this.init();
  },
  methods:{
  init() {
      document.addEventListener("swoffline", e => {
        // this.registration = e.detail;
        // this.snackBtnText = 'Refresh';
        this.snackWithBtnText =
          "No internet connection found. App is running in offline mode.";
        // this.snackWithButtons = true;
      });
      document.addEventListener("swUpdated", this.showRefreshUI, {
        once: true
      });
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
      });
    },
    showRefreshUI(e) {
      this.registration = e.detail;
      this.snackBtnText = "Refresh";
      this.snackWithBtnText =
        "Version " + process.env.VUE_APP_VERSION + " is already available!";
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.updateExists = false;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    }  
  }
};
</script>

<style></style>
