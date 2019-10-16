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
      <a-affix :offsetTop="40">
        <a-card>
      <a-tabs @change="changeView">
        <a-tab-pane key="0">
          <template slot="tab">            
            <span><a-icon type="layout"></a-icon> Dashboard</span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="1" >
          <template slot="tab">            
            <span><a-icon type="form"></a-icon> Permits</span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template slot="tab">            
            <span><a-icon type="file-exclamation"></a-icon> Local Taxes</span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="3">
          <template slot="tab">            
            <span><a-icon type="alert"></a-icon> Emergency Reports</span>
          </template>
        </a-tab-pane>
        <a-tab-pane key="4">
          <template slot="tab">            
            <span><a-icon type="idcard"></a-icon> Posts</span>
          </template>
        </a-tab-pane>
        <!-- <a-tab-pane key="5" tab="Chatbot"></a-tab-pane> -->
      </a-tabs>
      </a-card>
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
import Posts from '@/views/admin/Posts'
export default {
  components:{
    Dashboard,
    Permits,
    Taxes,
    Reports,
    Posts
  },
  data() {
    return {
      coordinates: { lat: 15.667300, lng: 120.734993 },
      current_view: 'Dashboard',
      views:['Dashboard','Permits','Taxes','Reports', 'Posts']
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
.ant-tabs-tab-active{
  font-size: 24px
}
</style>