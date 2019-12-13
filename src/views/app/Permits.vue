<template>
  <div style="margin-top:10vh; background-color:#EEEEEE">
    <img
      style="width: 100%; height:30%"
      :src="constant_helper.client_details.cover"
    />
    <a-affix :offsetTop="60">
      <a-tabs
        style="background-color: #EEEEEE; z-index:1000"
        @change="changeView"
      >
        <a-tab-pane tab="Permits & Licenses" key="2">
          <!-- <permits></permits> -->
        </a-tab-pane>
        <a-tab-pane tab="Certificates" key="3">
          <!-- <public-service></public-service> -->
        </a-tab-pane>
        <a-tab-pane tab="Real Property Tax" key="4">
          <!-- <permits></permits> -->
        </a-tab-pane>
        <a-tab-pane tab="Payments" key="5">
          <!-- <downloadable-forms></downloadable-forms> -->
        </a-tab-pane>
      </a-tabs>
    </a-affix>
    <div style="margin-top: 5vh; margin-bottom: 5vh">
      <component v-bind:is="currentView" :full="true"></component>
    </div>
  </div>
</template>

<script>
import Permits from "@/components/Permits";
import LocalTaxes from "@/components/Taxes";
import DownloadableForms from "@/components/DownloadableForms";
import cover_image from "@/assets/cover.jpg";

export default {
  components: {
    // MayorsCorner,
    // PublicService,
    Permits,
    LocalTaxes,
    DownloadableForms
  },
  data() {
    return {
      currentView: "Permits",
      visible: false,

      tabView: ["Permits", "DownloadableForms", "LocalTaxes"],
      cover_image
    };
  },
  methods: {
    changeView(key) {
      console.log("key:::", key);
      this.currentView = this.tabView[key];
      // window.scrollTo(0, 0);
    }
  }
};
</script>

<style></style>
