<template>
<a-layout>
  <a-layout-sider style="margin-top:10vh; ">
      <a-menu :defaultSelectedKeys="['/app']" mode="inline" @click="nav">
        <a-menu-item key="/admin/app">
                <a-icon type="layout" />
                <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="/admin/app/permits">
                <a-icon type="form" />
                <span>Permits</span>
        </a-menu-item>
        <a-menu-item key="/admin/app/taxes">
                <a-icon type="form" />
                <span>Local Taxes</span>
        </a-menu-item>
        <a-menu-item key="/admin/app/reports">
                <a-icon type="form" />
                <span> Incident Reports</span>
        </a-menu-item>
        <a-menu-item key="logout">
                <a-icon type="logout" />
                <span>Logout</span>
        </a-menu-item>
      </a-menu>
  </a-layout-sider>
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
  <a-layout-content  style="margin-left:1vw; margin-right: 1vw; margin-top:15vh">
      <h2>{{$route.name}}</h2>
        <a-divider></a-divider>
      <a-card title="Incident Map">
          <GmapMap
        id="map"
        ref="map"
        :center="{lat:coordinates.lat, lng:coordinates.lng}"
        :zoom="16"
        map-type-id="terrain"
        draggable="true"
        style="width: 100%; height: 300px; margin-top:5vh"
      >
        <GmapMarker :draggable="true" :position="coordinates" :animation="animation" />
        <!-- Current Location -->
        <GmapMarker
          :draggable="true"
          @dragend="setCoordinate"
          :position="coordinates"
          :animation="animation"
        />

        <!-- Fire -->
        <GmapMarker
          v-for="(coordinate, index) in fire_coordinates"
          :key="`fire${index}`"
          :title="`Fire incident: Reported as of ${formatDate(coordinate.date_created)}`"
          :draggable="false"
          :icon="fire_icon"
          :position="coordinate.coordinates"
          :animation="animation"
        />

        <!-- Civil Disturbance -->
        <GmapMarker
          v-for="(coordinate, index) in civil_disturbance_coordinates"
          :key="`civil${index}`"
          :title="`Civil Disturbance: Reported as of ${formatDate(coordinate.date_created)}`"
          :draggable="false"
          :icon="civil_disturbance_icon"
          :position="coordinate.coordinates"
          :animation="animation"
        />

        <!-- Flood -->
        <GmapMarker
          v-for="(coordinate, index) in flood_coordinates"
          :key="`flood${index}`"
          :title="`Flood Incident: Reported as of ${formatDate(coordinate.date_created)}`"
          :draggable="false"
          :icon="flood_icon"
          :position="coordinate.coordinates"
          :animation="animation"
        />

        <!-- Crime -->
        <GmapMarker
          v-for="(coordinate, index) in crime_coordinates"
          :key="`crime${index}`"
          :title="`Crime Incident: Reported as of ${formatDate(coordinate.date_created)}`"
          :draggable="false"
          :icon="crime_icon"
          :position="coordinate.coordinates"
          :animation="animation"
        />
      </GmapMap>
      </a-card>
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
    </a-layout-footer> -->
</a-layout>
</template>

<script>
export default {
  data(){
    return {
      coordinates: { lat: 13.9413957, lng: 121.6234471 },
    }
  },
  methods:{
    nav(e) {
      if (e.key === "logout") {
        this.logout();
      } else {
        this.$router.push(e.key);
      }
    },
  }
}
</script>

<style>

</style>