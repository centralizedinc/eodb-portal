<template>
  <div style="margin-top:10vh">
    <img style="width: 100%; height:30%" :src="constant_helper.client_details.cover" />
    <a-affix :offsetTop="60">
      <a-tabs style="background-color:#e6e6e6 ; z-index:1000" @change="changeView">
        <!-- <a-tab-pane key="0">
          <template slot="tab">
            <span>
              <a-avatar :src="constant_helper.client_details.avatar" style="margin-right: 1vh" />
              {{ constant_helper.client_details.title }}'s Corner
            </span>
          </template>
        </a-tab-pane>-->

        <a-tab-pane tab="Permits & Licenses" key="0">
          <!-- <permits></permits> -->
        </a-tab-pane>
        <a-tab-pane tab="Certificates" key="1">
          <!-- <public-service></public-service> -->
        </a-tab-pane>
        <a-tab-pane tab="Real Property Tax" key="2">
          <!-- <permits></permits> -->
        </a-tab-pane>
        <a-tab-pane tab="Downloadable Forms" key="3">
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
// import MayorsCorner from "@/components/MayorsCorner";
// import PublicService from "@/components/PublicService";
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
