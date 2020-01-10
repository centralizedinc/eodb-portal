<template>
  <div id="app">
    <a-affix :offsetTop="0">
      <a-alert
        :message="title"
        :description="description"
        type="info"
        showIcon
        v-if="show"
        :banner="true"
        :closeText="button"
        :closable="true"
        :afterClose="refreshApp"
      />
    </a-affix>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      refreshing: false,
      registration: null,
      title: "",
      description: "",
      button: "",
      show: false,
      timeout: 0
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      document.addEventListener("swoffline", e => {
        this.title = "No Connection";
        this.button = "Retry";
        this.description =
          "No internet connection found. App is running in offline mode.";
      });
      document.addEventListener("swUpdated", this.showRefreshUI, {
        once: true
      });
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
      });
      document.addEventListener("refresh_activities", e => {
        this.title = "New Activity detected";
        this.button = "Retry";
        this.description = "New Updates available";
      });
    },
    showRefreshUI(e) {
      this.registration = e.detail;
      this.button = "Refresh";
      this.title = "New Version Available";
      this.description = "New version is already available! Please refresh.";
      this.show = true;
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
