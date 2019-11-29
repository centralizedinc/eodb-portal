<template>
  <a-card style="background-color: #242B30">
      <a-row type="flex" align="middle">
        <a-col :span="24">
            <span style="color:#B6C2C9; font-weight:bold">EMERGENCY REPORTS   <a-icon type="exclamation-circle"></a-icon></span>            
        </a-col>
        <a-col :span="24">
          <GmapMap
            id="map"
            ref="map"
            :center="{lat:coordinates.lat, lng:coordinates.lng}"
            :zoom="14"
            map-type-id="roadmap"
            draggable="true"
            style="width: 100%; height: 340px; margin-top:5vh"
            :options="{
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                disableDefaultUi: false
                }"
          >
            <!-- <GmapMarker :draggable="true" :position="coordinates" /> -->
          </GmapMap>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <a-row>
        <!-- Email -->
        <a-col :span="2">
            <a-badge status="error" />
            <!-- <a-avatar size="small" shape="square" icon="mail" style="background-color: #139FA5"></a-avatar> -->
        </a-col> 
        <a-col :span="18">
            <span style="color:#B6C2C9; font-size:12px">Fire</span>
        </a-col> 
        <a-col :span="4">
            <span style="color:#FFFFFF; font-weight:bold">{{Math.floor(Math.random()* 10)}}</span>
        </a-col>
    </a-row>
    <a-row>
        <!-- Email -->
        <a-col :span="2">
            <a-badge status="processing" />
            <!-- <a-avatar size="small" shape="square" icon="mail" style="background-color: #139FA5"></a-avatar> -->
        </a-col> 
        <a-col :span="18">
            <span style="color:#B6C2C9; font-size:12px">Flood</span>
        </a-col> 
        <a-col :span="4">
            <span style="color:#FFFFFF; font-weight:bold">{{Math.floor(Math.random()* 10)}}</span>
        </a-col>
    </a-row>
    <a-row>
        <!-- Email -->
        <a-col :span="2">
            <a-badge status="warning" />
            <!-- <a-avatar size="small" shape="square" icon="mail" style="background-color: #139FA5"></a-avatar> -->
        </a-col> 
        <a-col :span="18">
            <span style="color:#B6C2C9; font-size:12px">Crime</span>
        </a-col> 
        <a-col :span="4">
            <span style="color:#FFFFFF; font-weight:bold">{{Math.floor(Math.random()* 10)}}</span>
        </a-col>
    </a-row>
    <a-row>
        <!-- Email -->
        <a-col :span="2">
            <a-badge status="success" />
            <!-- <a-avatar size="small" shape="square" icon="mail" style="background-color: #139FA5"></a-avatar> -->
        </a-col> 
        <a-col :span="18">
            <span style="color:#B6C2C9; font-size:12px">Civil Disturbance</span>
        </a-col> 
        <a-col :span="4">
            <span style="color:#FFFFFF; font-weight:bold">{{Math.floor(Math.random()* 10)}}</span>
        </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
    data(){
        return {
            coordinates: { lat: 15.667300, lng: 120.734993 },
        }
    }
}
</script>

<style>

</style>