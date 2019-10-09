<template>
  <a-layout>
    <!-- <a-layout-sider style="margin-top:10vh; ">
      <a-menu :defaultSelectedKeys="['/app']" mode="inline" @click="nav">
        <a-menu-item key="app">
                <a-icon type="layout" />
                <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="app/permits">
                <a-icon type="form" />
                <span>Permits</span>
        </a-menu-item>
        <a-menu-item key="app/taxes">
                <a-icon type="form" />
                <span>Local Taxes</span>
        </a-menu-item>
        <a-menu-item key="app/reports">
                <a-icon type="form" />
                <span> Incident Reports</span>
        </a-menu-item>
        <a-menu-item key="logout">
                <a-icon type="logout" />
                <span>Logout</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider> -->
    <a-layout-header class="header">
      <a-row justify="start" :gutter="24">
        <!-- <a-col :span="1">
          <a-icon type="menu" style="color:#ffffff; cursor:pointer"></a-icon>
        </a-col> -->
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
    <a-layout-content style="margin-left:1vw; margin-right: 1vw; margin-top:15vh">
      <a-tabs>
        <a-tab-pane key="0" tab="Dashboard"></a-tab-pane>
        <a-tab-pane key="1" tab="Permits"></a-tab-pane>
        <a-tab-pane key="2" tab="Local Taxes"></a-tab-pane>
        <a-tab-pane key="3" tab="Incident Reports"></a-tab-pane>
      </a-tabs>
      <h2>{{$route.name}}</h2>
      <!-- <a-divider></a-divider> -->
      <router-view />
    </a-layout-content>
    <!-- <a-layout-footer style="background: linear-gradient(to left, #0575e6, #021b79); color: #ffffff">
      <a-row>
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
    </a-layout-footer>-->
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      coordinates: { lat: 13.9413957, lng: 121.6234471 }
    };
  },
  methods: {
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