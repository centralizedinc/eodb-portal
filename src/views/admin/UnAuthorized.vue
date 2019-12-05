<template>
  <a-layout>
    <a-back-top>
      <a-avatar>
        <a-icon type="up" :size="42"></a-icon>
      </a-avatar>
    </a-back-top>
    <a-layout-header class="header" :style="headerStyle">
      <a-row type="flex" justify="start" :gutter="8">
        <a-col :md="2">
          <a-avatar
            style="cursor:pointer"
            @click="$router.push('/')"
            :src="constant_helper.home_header.logo"
            :size="50"
          ></a-avatar>
        </a-col> 
        <a-col :xs="0" :sm="0" :md="0" :lg="4">
          <h3
            style="color:white; margin-left: -6vh; cursor:pointer"
            @click="$router.push('/')"
          >{{constant_helper.home_header.label}}</h3>
        </a-col>
        
        <!-- <a-col :md="2" :lg="0" :push="22">
          <a-icon type="menu" style="cursor:pointer" @click="visible_menu=true"></a-icon>
        </a-col> -->
      </a-row>
      
    </a-layout-header>
    <a-layout-content >
        <div :style="`background-image:url('https://picsum.photos/800?grayscale'); height:100%;background-repeat: no-repeat;
            background-size: cover`">
      <a-row style="height:100vh;background-color:#0912195c" type="flex" justify="center" align="middle">
          <a-col :span="6" style="text-align: center">
            <span style="color:#ffffff;font-size: 64px; font-weight:bold">404</span>
            <br/>
            <span style="color:#ffffff;font-size: 42px;">Unauthorized</span>
            <br/>
             <a-button type="primary" size="large" @click="$router.push('/admin')">Login</a-button>
            
            
          </a-col>
      </a-row>
        </div>
    </a-layout-content>
    <a-layout-footer style="background: #242B30; color: #ffffff">
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
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data(){
      return{
           topLocation: 0,
      }
  },
  methods: {
    handleScroll(event) {
      this.topLocation = window.top.scrollY;
    },
  computed: {
    headerStyle() {
      if (this.topLocation < 50) {
        return "background: transparent";
      } else {
        return "background: #242B30";
      }
    }
  }
  }
}
</script>

<style>

</style>
