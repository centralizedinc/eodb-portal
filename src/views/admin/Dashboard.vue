<template>
  <!-- <a-card title="Incident Map"> -->
    <div>
      <a-row type="flex" justify="center" :gutter="16" >
        <a-col :span="6">
          <a-card style="background: linear-gradient(to right, #2c3e50, #3498db);">
            <a-row type="flex" align="middle">
              <a-col :span="6">
                <a-icon type="user" style="color:#ffffff;font-size:64px"></a-icon>
              </a-col>
              <a-col :span="18">
                <h2 style="margin-bottom:0px; color:#ffffff;text-align:right">New Registrations</h2>
                <h3 style="margin-bottom:0px; color:#ffffff;width:100%;text-align:right;font-size:32px">{{random_user}}</h3>
              </a-col>
            </a-row>
          </a-card>
        </a-col>

        <a-col :span="6">
          <a-card style="background: linear-gradient(to right, #134e5e, #71b280); ">
            <a-row type="flex" align="middle">
              <a-col :span="6">
                <a-icon type="form" style="color:#ffffff;font-size:64px"></a-icon>
              </a-col>
              <a-col :span="18">
                <h2 style="margin-bottom:0px; color:#ffffff;text-align:right">Permit Applications</h2>
                <h3 style="margin-bottom:0px; color:#ffffff;width:100%;text-align:right;font-size:32px">{{random_permits}}</h3>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      
        <a-col :span="6">
          <a-card style="background: linear-gradient(to right, #d1913c, #ffd194);">
            <a-row type="flex" align="middle">
              <a-col :span="6">
                <a-icon type="file-exclamation" style="color:#ffffff;font-size:64px"></a-icon>
              </a-col>
              <a-col :span="18">
                <h2 style="margin-bottom:0px; color:#ffffff;text-align:right">Local Taxes</h2>
                <h3 style="margin-bottom:0px; color:#ffffff;width:100%;text-align:right;font-size:32px">{{random_taxes}}</h3>
              </a-col>
            </a-row>
          </a-card>
        </a-col>

        <a-col :span="6">
          <a-card style="background: linear-gradient(to right, #403a3e, #be5869); ">
            <a-row type="flex" align="middle">
              <a-col :span="6">
                <a-icon type="alert" style="color:#ffffff;font-size:64px"></a-icon>
              </a-col>
              <a-col :span="18">
                <h2 style="margin-bottom:0px; color:#ffffff;text-align:right">Emergency Reports</h2>
                <h3 style="margin-bottom:0px; color:#ffffff;width:100%;text-align:right;font-size:32px">{{random_reports}}</h3>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
        <GmapMap
          id="map"
          ref="map"
          :center="{lat:coordinates.lat, lng:coordinates.lng}"
          :zoom="16"
          map-type-id="terrain"
          draggable="true"
          style="width: 100%; height: 800px; margin-top:5vh"
          :options="{
              zoomControl: true,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: true,
              disableDefaultUi: false
            }"
        >

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
    </div>
      <!-- </a-card> -->
</template>

<script>
export default {
    data() {
        return {
            coordinates: { lat: 13.9413957, lng: 121.6234471 }
        }
    },
    computed:{
      random_user(){
        return (Math.floor(Math.random()*100))+5
      },
      random_permits(){
        return (Math.floor(Math.random()*100))+5
      },
      random_taxes(){
        return (Math.floor(Math.random()*100))+5
      },
      random_reports(){
        return (Math.floor(Math.random()*100))+5
      }
    }
}
</script>

<style>

</style>