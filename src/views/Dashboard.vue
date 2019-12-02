<template>
  <a-layout>
    <a-back-top>
      <a-avatar>
        <a-icon type="up"></a-icon>
      </a-avatar>
    </a-back-top>
    <a-layout-header class="header" :style="constant_helper.theme.default">
      <!-- desktop site -->
      <a-row justify="start" :gutter="24" v-if="$breakpoint.lgAndUp">
        <a-col :span="1">
          <a-avatar :src="constant_helper.home_header.logo" :size="50"></a-avatar>
        </a-col>
        <a-col :span="10">
          <h3 style="color:#ffffff;margin-left:10px;">{{constant_helper.home_header.label}}</h3>
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
      <!-- mobile site -->
      <a-row v-else type="flex" justify="start">
        <a-col :xs="3" :sm="2" :md="2">
          <a-avatar :src="constant_helper.home_header.logo" :size="50"></a-avatar>          
        </a-col>
        <a-col :xs="20" :sm="21" :md="21">
            <h3 style="color:#ffffff;margin-left:20px ">{{constant_helper.home_header.label}}</h3>
          </a-col>
        <a-col :span="1">
          <a-icon :type="visible_menu?'close':'menu'" style="cursor:pointer" @click="visible_menu=true"></a-icon>
        </a-col> 
      </a-row>
      <a-drawer
        placement="left"
        :visible="visible_menu"
        @close="visible_menu=false"
        :closable="false"
      >
      <a-row type="flex" align="middle" :gutter="16" :style="`${menuStyle};height: 20vh`">
        <a-col :xs="6" :sm="6" :md="6">
          <a-avatar :src="user.avatar" :size="54" shape="square" style="border: 2px solid #ffffff" ></a-avatar>
        </a-col>
        <a-col :xs="17" :sm="17" :md="17" style="text-align:left">
          <h3 style="color:#FFFFFF">{{user.fname}} {{user.lname}}</h3>
        </a-col>
       
      </a-row>
       <a-divider></a-divider>
        <a-menu :defaultSelectedKeys="['/app']" mode="inline" @click="nav">
        <a-menu-item key="/app">
            <a-icon type="layout" />
            <span>Home</span>
          </a-menu-item>
          <a-menu-item key="report">
            <a-icon type="alert" />
            <span>Emergency</span>
          </a-menu-item>
          <a-menu-item key="/app/permits">
            <a-icon type="file-exclamation" />
            <span>My Permits</span>
          </a-menu-item>
          <a-menu-item key="/app/taxes">
            <a-icon type="file-protect" />
            <span>My Taxes</span>
          </a-menu-item>
          <a-menu-item key="/app/account">
            <a-icon type="user-add" />
            <span>My Account</span>
          </a-menu-item>
          <a-menu-item key="logout">
            <a-icon type="logout" />
            <span>Logout</span>
          </a-menu-item>
        </a-menu>
      </a-drawer>
    </a-layout-header>
    <a-layout-content
      class="content"
      :style="`${constant_helper.theme.background} margin-top:5vh`"
    >
      <a-row type="flex" justify="center" >
        <a-col :span="4" style="margin-right:1vw" v-if="$breakpoint.lgAndUp">
          <a-card :style="`margin-top:10vh; margin-bottom:2vh; ${constant_helper.theme.default}`">
            <a-row type="flex" justify="center">
              <a-col :span="8">
                <a-avatar
                  :src="user.avatar"
                  :size="54"
                  style="margin-top:-10vh; border: 2px solid #ffffff"
                ></a-avatar>
              </a-col>
              <a-col :span="24">
                <a-row type="flex" justify="center">
                  <a-col :span="24" style="text-align: center">
                    <h3 style="color:#FFFFFF">{{user.fname}} {{user.lname}}</h3>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
          <a-affix :offsetTop="100">
            <a-menu
              :defaultSelectedKeys="['/app']"
              mode="inline"
              @click="nav"
              style="background-color: #e6e6e6"
            >
              <a-menu-item key="/app">
                <a-icon type="layout" />
                <span>Home</span>
              </a-menu-item>
              <a-menu-item key="/app/permits">
                <a-icon type="file-exclamation" />
                <span>My Permits</span>
              </a-menu-item>
              <a-menu-item key="/app/taxes">
                <a-icon type="file-protect" />
                <span>My Taxes</span>
              </a-menu-item>
              <a-menu-item key="/app/account">
                <a-icon type="user-add" />
                <span>My Account</span>
              </a-menu-item>
              <a-menu-item key="logout">
                <a-icon type="logout" />
                <span>Logout</span>
              </a-menu-item>
            </a-menu>
          </a-affix>
        </a-col>
        <a-col  :xs="22" :sm="22" :md="22" :lg="14" :xl="14" style="margin-right:1vw; margin-left:1vw">
          <router-view></router-view>
        </a-col>
        <a-col :span="4" style="margin-left:1vw" v-if="$breakpoint.lgAndUp">
          <a-affix :offsetTop="40">
            <a-card
              :bodyStyle="{'background-color':'#e6e6e6'}"
              :headStyle="{'background-color':'#afadad'}"
              title="Citizen Report"
              style="margin-top: 8vh"
            >
              <p>Emergency Hotline</p>
              <a-row>
                <a-col :span="12">
                  <a-tooltip>
                    <span slot="title">Fire</span>
                    <a-card
                      :style="constant_helper.theme.button"
                      class="emergency_btn"
                      @click="report(1)"
                    >
                      <a-row type="flex" justify="center">
                        <a-col :span="20">
                          <a-icon type="fire" style="color:#ffffff;font-size:24px"></a-icon>
                        </a-col>
                      </a-row>
                    </a-card>
                  </a-tooltip>
                </a-col>
                <a-col :span="12">
                  <a-tooltip>
                    <span slot="title">Civil Disturbance</span>
                    <a-card
                      :style="constant_helper.theme.button"
                      class="emergency_btn"
                      @click="report(2)"
                    >
                      <a-row type="flex" justify="center">
                        <a-col :span="20">
                          <a-icon type="sound" style="color:#ffffff;font-size:24px"></a-icon>
                        </a-col>
                      </a-row>
                    </a-card>
                  </a-tooltip>
                </a-col>
                <a-col :span="12">
                  <a-tooltip>
                    <span slot="title">Flood</span>
                    <a-card
                      :style="constant_helper.theme.button"
                      class="emergency_btn"
                      @click="report(3)"
                    >
                      <a-row type="flex" justify="center">
                        <a-col :span="20">
                          <a-icon type="alert" style="color:#ffffff;font-size:24px"></a-icon>
                        </a-col>
                      </a-row>
                    </a-card>
                  </a-tooltip>
                </a-col>
                <a-col :span="12">
                  <a-tooltip>
                    <span slot="title">Crime</span>
                    <a-card
                      :style="constant_helper.theme.button"
                      class="emergency_btn"
                      @click="report(4)"
                    >
                      <a-row type="flex" justify="center">
                        <a-col :span="20">
                          <a-icon type="safety" style="color:#ffffff;font-size:24px; "></a-icon>
                        </a-col>
                      </a-row>
                    </a-card>
                  </a-tooltip>
                </a-col>
                <a-col :span="24" style="margin-top:2vh">
                  <a-button block ghost type="primary" @click="report(0)">View Reports</a-button>
                </a-col>
              </a-row>
            </a-card>
          </a-affix>
        </a-col>
        <report-modal ref="report_modal" v-else :visible_report="visible_report" @close="visible_report=false"/>
      </a-row>
    </a-layout-content>
    <a-layout-footer
      :style="`${constant_helper.theme.default} color: #ffffff`"
    >{{constant_helper.home_header.label}}</a-layout-footer>

    <a-modal
      class="report-modal"
      :visible="visible"
      @cancel="visible=false"
      v-bind="report_mode > 0 ? '': { footer: null }"
      title="Report Incident"
    >
      <GmapMap
        id="map"
        ref="map"
        :center="{lat:coordinates.lat, lng:coordinates.lng}"
        :zoom="16"
        map-type-id="terrain"
        draggable="true"
        style="width: 100%; height: 300px"
        @click="setCoordinate"
      >
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

      <!-- <a-card>
        <a-card-grid></a-card-grid>
      </a-card>-->
      <template slot="footer" v-if="report_mode > 0">
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="submitReport"
        >Confirm and Submit</a-button>
      </template>
    </a-modal>
  </a-layout>
</template>

<script>
// import fire_icon from "@/assets/fire_icon.png";
import fire_icon from "@/assets/fire_icon_20.png";
import civil_disturbance_icon from "@/assets/civil_disturbance_icon_20.png";
import flood_icon from "@/assets/flood_icon_20.png";
import crime_icon from "@/assets/crime_icon_20.png";

import ReportModal from '@/components/ReportModal'

export default {
  components:{
    ReportModal
  },
  data() {
    return {
      visible_report:false,
      visible_menu:false,
      fire_icon,
      civil_disturbance_icon,
      flood_icon,
      crime_icon,
      report_mode: 0,
      loading: false,
      collapsed: false,
      user: {},
      visible: false,
      center: { lat: 13.960837, lng: 121.591532 },
      coordinates: { lat: 13.960837, lng: 121.591532 },
      animation: {}
    };
  },
  created() {
    this.init();
  },
  computed: {
    fire_coordinates() {
      if (this.report_mode === 0 || this.report_mode === 1)
        return this.reports.filter(v => v.report_type === 1);
      else return [];
    },
    civil_disturbance_coordinates() {
      if (this.report_mode === 0 || this.report_mode === 2)
        return this.reports.filter(v => v.report_type === 2);
      else return [];
    },
    flood_coordinates() {
      if (this.report_mode === 0 || this.report_mode === 3)
        return this.reports.filter(v => v.report_type === 3);
      else return [];
    },
    crime_coordinates() {
      if (this.report_mode === 0 || this.report_mode === 4)
        return this.reports.filter(v => v.report_type === 4);
      else return [];
    },
    reports() {
      return this.deepCopy(this.$store.state.reports.reports);
    }
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
    init() {
      this.user = this.$store.state.user_session.user;
      console.log('USER_DETAILS ::: ', JSON.stringify(this.$store.state.user_session))
    },
    nav(e) {
      if (e.key === "logout") {
        this.logout();
      } else if(e.key === "report") {
        this.$refs.report_modal.report()
        this.visible_report =true
      }else {
        this.$router.push(e.key);
      }
    },
    report(num) {
      this.visible = true;
      var _self = this;
      this.report_mode = num;
      this.$getLocation().then(coordinates => {
        this.coordinates = coordinates;
        console.log("num :", num);
        this.$gmapApiPromiseLazy().then(() => {
          _self.animation = google.maps.Animation.DROP;
        });
      });
    },
    setCoordinate(e) {
      if (this.report_mode > 0) {
        this.coordinates.lat = e.latLng.lat();
        this.coordinates.lng = e.latLng.lng();
      }
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
          date_created: new Date()
        });
        cnt++;
      }
      return coordinates;
    },
    getRandomInRange(from, to) {
      return (Math.random() * (to - from) + from) * 1;
    },
    submitReport() {
      this.visible = false;
      this.$store.commit("SEND_REPORTS", {
        status:'Unconfirmed',
        date:new Date(),
        user:`${this.user.lname}, ${this.user.fname}`,
        report_type: this.report_mode,
        coordinates: this.coordinates
      });
      this.$notification.success({
        message: "Thank you for your concern",
        description: "Your Report has been sent. Stay safe!"
      });
    },
    logout() {
      var _self = this;
      this.$confirm({
        title: "Logout Confirmation",
        content: "Are you sure you want to logout?",
        okText: "Yes",
        cancelText: "No",
        onOk() {
          console.log("OK");
          _self.$router.push("/");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    onSearch() {}
  },
  computed:{
    menuStyle(){
      return this.constant_helper.theme.default;
    }
  }
};
</script>

<style>
.report-modal .ant-modal-body {
  padding: 0px;
}
</style>
