<template>
  <a-card title="Citizen Report">
    <a-row type="flex" align="center" :gutter="16">
      <a-col :span="6">
        <a-card
          :style="constant_helper.theme.button"
          @click="report_type='1'"
          class="emergency_btn"
        >
          <a-row type="flex" justify="center">
            <a-col :span="12">
              <a-icon :type="report_type==='1'?'check':'fire'" style="color:#ffffff;font-size:24px"></a-icon>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          :style="constant_helper.theme.button"
          @click="report_type='2'"
          class="emergency_btn"
        >
          <a-row type="flex" justify="center">
            <a-col :span="12">
              <a-icon
                :type="report_type==='2'?'check':'sound'"
                @click="report(1)"
                style="color:#ffffff;font-size:24px"
              ></a-icon>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          :style="constant_helper.theme.button"
          @click="report_type='3'"
          class="emergency_btn"
        >
          <a-row type="flex" justify="center">
            <a-col :span="12">
              <a-icon
                :type="report_type==='3'?'check':'alert'"
                style="color:#ffffff;font-size:24px"
              ></a-icon>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          :style="constant_helper.theme.button"
          @click="report_type='4'"
          class="emergency_btn"
        >
          <a-row type="flex" justify="center">
            <a-col :span="12">
              <a-icon
                :type="report_type==='4'?'check':'safety'"
                style="color:#ffffff;font-size:24px"
              ></a-icon>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-divider></a-divider>
    <GmapMap
      id="map"
      ref="map"
      :center="center"
      :zoom="16"
      map-type-id="terrain"
      draggable="true"
      style="width: 100%; height: 300px"
      @click="mapClick"
    >
      <!-- Current Location -->
      <GmapMarker
        :draggable="true"
        :position="coordinates"
        @dragend="markerDragEnd"
        :animation="marker_animation"
        @animation_changed="resetAnimation"
      />

      <!-- Fire -->
      <GmapMarker
        v-for="(coordinate, index) in fire_coordinates"
        :key="`fire${index}`"
        :title="`Fire incident: Reported as of ${formatDate(coordinate.date_created)}`"
        :draggable="false"
        :icon="fire_icon"
        :position="coordinate"
        :animation="animation"
        @click="coordinate.open=!coordinate.open"
      >
        <GmapInfoWindow v-if="coordinate.open" @closeclick="coordinate.open=false">
          <b>Fire incident</b>
          : Reported as of
          <b>{{formatDate(coordinate.date_created)}}</b>
        </GmapInfoWindow>
      </GmapMarker>

      <!-- Civil Disturbance -->
      <GmapMarker
        v-for="(coordinate, index) in civil_disturbance_coordinates"
        :key="`civil${index}`"
        :title="`Civil Disturbance: Reported as of ${formatDate(coordinate.date_created)}`"
        :draggable="false"
        :icon="civil_disturbance_icon"
        :position="coordinate"
        :animation="animation"
      />

      <!-- Flood -->
      <GmapMarker
        v-for="(coordinate, index) in flood_coordinates"
        :key="`flood${index}`"
        :title="`Flood Incident: Reported as of ${formatDate(coordinate.date_created)}`"
        :draggable="false"
        :icon="flood_icon"
        :position="coordinate"
        :animation="animation"
      />

      <!-- Crime -->
      <GmapMarker
        v-for="(coordinate, index) in crime_coordinates"
        :key="`crime${index}`"
        :title="`Crime Incident: Reported as of ${formatDate(coordinate.date_created)}`"
        :draggable="false"
        :icon="crime_icon"
        :position="coordinate"
        :animation="animation"
      />
    </GmapMap>

    <a-textarea rows="5" placeholder="Write comments here..." style="margin-top:2vh"></a-textarea>
    <a-divider></a-divider>
    <a-button block type="primary" @click="sendReport">Submit</a-button>
  </a-card>
</template>

<script>
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "Messenger");
window.extAsyncInit = function() {
  // the Messenger Extensions JS SDK is done loading
  console.log("Done loading messenger extension");
};

import fire_icon from "@/assets/fire_icon_20.png";
import civil_disturbance_icon from "@/assets/civil_disturbance_icon_20.png";
import flood_icon from "@/assets/flood_icon_20.png";
import crime_icon from "@/assets/crime_icon_20.png";

export default {
  data() {
    return {
      report_type: 0,
      fire_icon,
      civil_disturbance_icon,
      flood_icon,
      crime_icon,
      center: { lat: 13.960837, lng: 121.591532 },
      coordinates: { lat: 13.960837, lng: 121.591532 },
      marker_animation: 0,
      animation: 0,
      fire_coordinates: [],
      civil_disturbance_coordinates: [],
      flood_coordinates: [],
      crime_coordinates: []
    };
  },
  created() {
    this.report(this.$route.params.type);
  },
  watch: {
    coordinates: {
      handler(val) {
        this.center = val;
      },
      deep: true
    }
  },
  methods: {
    report(num) {
      this.fire_coordinates = [];
      this.civil_disturbance_coordinates = [];
      this.flood_coordinates = [];
      this.crime_coordinates = [];
      this.visible = true;
      var _self = this;
      this.$getLocation().then(coordinates => {
        this.coordinates = coordinates;
        console.log("num :", num);
        if (num === 1 || num === "1")
          this.fire_coordinates = this.generateSampleCoordinates(
            coordinates,
            5
          );
        else if (num === 2 || num === "2")
          this.civil_disturbance_coordinates = this.generateSampleCoordinates(
            coordinates,
            5
          );
        else if (num === 3 || num === "3")
          this.flood_coordinates = this.generateSampleCoordinates(
            coordinates,
            5
          );
        else if (num === 4 || num === "4")
          this.crime_coordinates = this.generateSampleCoordinates(
            coordinates,
            5
          );
        else {
          this.fire_coordinates = this.generateSampleCoordinates(
            coordinates,
            5
          );
          this.civil_disturbance_coordinates = this.generateSampleCoordinates(
            coordinates,
            5
          );
          this.flood_coordinates = this.generateSampleCoordinates(
            coordinates,
            5
          );
          this.crime_coordinates = this.generateSampleCoordinates(
            coordinates,
            5
          );
        }
        this.$gmapApiPromiseLazy().then(() => {
          _self.animation = google.maps.Animation.DROP;
        });
      });
    },
    generateSampleCoordinates(coordinate, count_range) {
      var coordinates = [];
      var cnt = 0;
      while (cnt < Math.floor(Math.random() * (count_range || 5))) {
        const lat = this.getRandomInRange(0.05, -0.05),
          lng = this.getRandomInRange(0.05, -0.05);
        coordinates.push({
          lat: coordinate.lat + lat,
          lng: coordinate.lng + lng,
          date_created: new Date(),
          open: false
        });
        cnt++;
      }
      return coordinates;
    },
    getRandomInRange(from, to) {
      return (Math.random() * (to - from) + from) * 1;
    },
    mapClick(e) {
      this.coordinates.lat = e.latLng.lat();
      this.coordinates.lng = e.latLng.lng();
      this.marker_animation = google.maps.Animation.DROP;
    },
    markerDragEnd(e) {
      this.coordinates.lat = e.latLng.lat();
      this.coordinates.lng = e.latLng.lng();
      this.marker_animation = google.maps.Animation.DROP;
    },
    resetAnimation(e) {
      setTimeout(function(params) {
        this.marker_animation = 0;
      }, 1000);
    },
    sendReport() {
      this.$http
        .post(
          `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.VUE_APP_CHATBOT_TOKEN}`,
          {
            recipient: { id: this.$route.params.sender },
            message: {
              text:
                "We have received your report! Dispatch is on its way, stay safe!",
              quick_replies: [
                {
                  content_type: "text",
                  title: "Not Now",
                  payload: "RESET"
                }
              ]
            }
          }
        )
        .then(result => {
          MessengerExtensions.requestCloseBrowser(
            function success() {
              window.close();
            },
            function error(err) {
              window.close();
            }
          );
        })
        .catch(err => {
          MessengerExtensions.requestCloseBrowser(
            function success() {
              window.close();
            },
            function error(err) {
              window.close();
            }
          );
        });
    }
  }
};
</script>

<style>
</style>