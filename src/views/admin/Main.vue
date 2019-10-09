<template>
  <a-layout>
    <a-layout-header class="header">
      <a-row justify="start" :gutter="24">
        <a-col :span="1">
          <a-avatar :src="constant_helper.home_header.logo" :size="50"></a-avatar>
        </a-col>
        <a-col :span="10">
          <h3 style="color:#ffffff;margin-left:20px ">{{constant_helper.home_header.label}}</h3>
        </a-col>
        <a-col :span="10">
          <a-input-search placeholder="Search" @search="onSearch" />
        </a-col>
        <a-col :span="1">
          <a-icon type="notification" style="color:#ffffff"></a-icon>
        </a-col>
        <a-col :span="1">
          <a-icon type="setting" style="color:#ffffff"></a-icon>
        </a-col>
        <a-col :span="1">
          <a-icon type="logout" style="color:#ffffff; cursor:pointer" @click="logout"></a-icon>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content style="margin-left:1vw; margin-right: 1vw; margin-top:12vh">
      <a-affix :offsetTop="20">
      <a-tabs @change="changeView">
        <a-tab-pane key="0" tab="Dashboard"></a-tab-pane>
        <a-tab-pane key="1" tab="Permits"></a-tab-pane>
        <a-tab-pane key="2" tab="Local Taxes"></a-tab-pane>
        <a-tab-pane key="3" tab="Incident Reports"></a-tab-pane>
        <a-tab-pane key="4" tab="Posts"></a-tab-pane>
        <a-tab-pane key="5" tab="Chatbot"></a-tab-pane>
      </a-tabs>
      </a-affix>
      <!-- <h2>{{$route.name}}</h2> -->
      <!-- <router-view /> -->
      <component :is="current_view" style="margin-top:5vh"/>
    </a-layout-content>
  </a-layout>
</template>

<script>
import Dashboard from '@/views/admin/Dashboard'
import Permits from '@/views/admin/Permits'
import Taxes from '@/views/admin/Taxes'
import Reports from '@/views/admin/IncidentReports'
export default {
  components:{
    Dashboard,
    Permits,
    Taxes,
    Reports
  },
  data() {
    return {
      coordinates: { lat: 13.9413957, lng: 121.6234471 },
      current_view: 'Dashboard',
      views:['Dashboard','Permits','Taxes','Reports',]
    };
  },
  methods: {
    changeView(key) {
      this.current_view = this.views[key];
      window.scrollTo(0, 0);
    },
    onSearch(){
        return null;
      },
    nav(e) {
      if (e.key === "logout") {
        this.logout();
      } else {
        // this.$router.push(e.key);
      }
    },
    logout(){

    }
  }
};
</script>

<style>
</style>