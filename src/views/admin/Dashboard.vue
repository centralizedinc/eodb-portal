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
      <a-divider></a-divider>
        <GmapMap
          id="map"
          ref="map"
          :center="{lat:coordinates.lat, lng:coordinates.lng}"
          :zoom="16"
          map-type-id="terrain"
          draggable="true"
          style="width: 100%; height: 100vh;"
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
        <a-row type="flex" align="middle" justify="end" style="margin-top:-90vh; margin-right:1vw"> 
          <a-col :span="3">
            <a-card style="background: rgba(236, 7, 7, 0.48);">
              <a-row type="flex" align="middle">
              <a-col :span="4">
                <a-icon type="fire" style="color:#ffffff;font-size:42px"></a-icon>
              </a-col>
              <a-col :span="18">
                <h3 style="margin-bottom:0px; color:#ffffff;text-align:right">Fire</h3>
                <h3 style="margin-bottom:0px; color:#ffffff;width:100%;text-align:right;font-size:32px">{{fire_coordinates.length}}</h3>
              </a-col>
            </a-row>
            </a-card>
          </a-col>
          <a-col :span="24"></a-col>
          <a-col :span="3">
            <a-card style="background: rgba(13, 111, 30, 0.51);">
              <a-row type="flex" align="middle">
              <a-col :span="4">
                <a-icon type="alert" style="color:#ffffff;font-size:42px"></a-icon>
              </a-col>
              <a-col :span="18">
                <h3 style="margin-bottom:0px; color:#ffffff;text-align:right">Flood</h3>
                <h3 style="margin-bottom:0px; color:#ffffff;width:100%;text-align:right;font-size:32px">{{flood_coordinates.length}}</h3>
              </a-col>
            </a-row>
            </a-card>

          </a-col>
          <a-col :span="24"></a-col>
          <a-col :span="3">
            <a-card style="background: rgba(107, 109, 7, 0.51)">
              <a-row type="flex" align="middle">
              <a-col :span="4">
                <a-icon type="safety" style="color:#ffffff;font-size:42px"></a-icon>
              </a-col>
              <a-col :span="18">
                <h3 style="margin-bottom:0px; color:#ffffff;text-align:right">Crime</h3>
                <h3 style="margin-bottom:0px; color:#ffffff;width:100%;text-align:right;font-size:32px">{{crime_coordinates.length}}</h3>
              </a-col>
            </a-row>
            </a-card>

          </a-col>
          <a-col :span="24"></a-col>
        </a-row>
    </div>
      <!-- </a-card> -->
</template>

<script>
import fire_icon from "@/assets/fire_icon_20.png";
import civil_disturbance_icon from "@/assets/civil_disturbance_icon_20.png";
import flood_icon from "@/assets/flood_icon_20.png";
import crime_icon from "@/assets/crime_icon_20.png";

export default {
    data() {
        return {
          fire_icon,
      civil_disturbance_icon,
      flood_icon,
      crime_icon,
            coordinates: { lat: 13.9413957, lng: 121.6234471 }
        }
    },
    methods:{
      
    },
    computed:{
      /**
       * for testing purposes only
       */
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
      },
      /**
       * ########################
       */
      fire_coordinates() {
        return this.reports.filter(v => v.report_type === 1)
      },
      civil_disturbance_coordinates() {
        return this.reports.filter(v => v.report_type === 2);
      },
      flood_coordinates() {
        return this.reports.filter(v => v.report_type === 3);
      },
      crime_coordinates() {
        return this.reports.filter(v => v.report_type === 4);
      },
      reports() {
        return this.deepCopy(this.$store.state.reports.reports);
      }
    }
}
</script>

<style>

</style>