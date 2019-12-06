<template>
  <a-layout>
    <a-back-top>
      <a-avatar>
        <a-icon type="up"></a-icon>
      </a-avatar>
    </a-back-top>
    <a-layout-header class="header">
      <a-row justify="start" :gutter="24">
        <a-col :span="1">
          <a-avatar src="https://i.postimg.cc/J47Nvpfn/Dolores-log.png" :size="50"></a-avatar>
        </a-col>
        <a-col :span="10">
          <h3 style="color:#ffffff; margin-left:20px ">Bayan ng Dolores</h3>
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
      <!-- <a-row v-else type="flex" justify="start">
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
          <a-menu-item key="/app/accounts">
            <a-icon type="user-add" />
            <span>My Account</span>
          </a-menu-item>
          <a-menu-item key="logout">
            <a-icon type="logout" />
            <span>Logout</span>
          </a-menu-item>
        </a-menu>
      </a-drawer> -->
    </a-layout-header>
    <!-- ------------------------------------------------ -->
    <a-layout-content class="content" style="margin-top:10vh">
      <a-row type="flex" justify="center">
        <a-col :span="4" style="margin-right:1vw">
          <a-card
            style="margin-top:10vh; margin-bottom:2vh; background: linear-gradient(to right, #469a25, #154102);"
          >
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
                  <a-col :span="12">
                    <h3 style="color:#FFFFFF">{{ user.fname }} {{ user.lname }}</h3>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
          <a-affix :offsetTop="100">
            <a-menu :defaultSelectedKeys="['/app']" mode="inline" @click="nav">
              <!-- <a-menu-item key="/app">
                <a-icon type="bars" />
                <span>Home</span> -->
              </a-menu-item>
              <a-menu-item key="/app">
                <a-icon type="file-exclamation" />
                <span>Permits & Licenses</span>
              </a-menu-item>
              <a-menu-item key="/app/taxes">
                <a-icon type="file-protect" />
                <span>Certificates</span>
              </a-menu-item>
              <a-menu-item key="/app/account">
                <a-icon type="area-chart" />
                <span>Real Property Tax</span>
              </a-menu-item>
              <a-menu-item key="">
                <a-icon type="credit-card" />
                <span>Payments</span>
              </a-menu-item>
              <a-menu-item key="/app/account">
                <a-icon type="user-add" />
                <span>My Profile</span>
              </a-menu-item>
              <a-menu-item key="">
                <a-icon type="sound" />
                <span>Citizen Report</span>
              </a-menu-item>
            </a-menu>
          </a-affix>
        </a-col>
        <a-col :span="14" style="margin-right:1vw; margin-left:1vw">
          <router-view></router-view>
        </a-col>
        <a-col :span="4" style="margin-left:1vw">
          <a-affix :offsetTop="40">
            <a-card
              title="Citizen Report"
              :headStyle="{'background-image':'linear-gradient(#56CAEF, #3C6CB4)',color:'white'}"
              style="margin-top: 10vh, "
            >
              <!-- <p>Emergency Hotline</p> -->
              <a-row>
                <a-col :span="24">
                  <a-card style="background-color:#ff000c; cursor:pointer" class="emergency_btn">
                    <a-row type="flex" justify="center">
                      <a-col :span="26">
                        <!-- <a-icon
                          type="fire"
                          @click="report(1)"
                          style="color:#ffffff;font-size:24px"
                        ></a-icon>-->
                        <h3 style="color:#FFF">FIRE</h3>
                      </a-col>
                    </a-row>
                  </a-card>
                </a-col>
                <a-col :span="24">
                  <a-card style="background-color:#ff000c; cursor:pointer" class="emergency_btn">
                    <a-row type="flex" justify="center">
                      <a-col :span="26">
                        <!-- <a-icon
                          type="sound"
                          @click="report(1)"
                          style="color:#ffffff;font-size:24px"
                        ></a-icon>-->
                        <h3 style="color:#FFF">FLOOD</h3>
                      </a-col>
                    </a-row>
                  </a-card>
                </a-col>
                <a-col :span="24">
                  <a-card style="background-color:#ff000c; cursor:pointer" class="emergency_btn">
                    <a-row type="flex" justify="center">
                      <a-col :span="26">
                        <!-- <a-icon
                          type="alert"
                          @click="report(1)"
                          style="color:#ffffff;font-size:24px"
                        ></a-icon>-->
                        <h3 style="color:#FFF">CIVIL DISTRUBANCE</h3>
                      </a-col>
                    </a-row>
                  </a-card>
                </a-col>
                <a-col :span="24">
                  <a-card style="background-color:#ff000c; cursor:pointer" class="emergency_btn">
                    <a-row type="flex" justify="center">
                      <a-col :span="26">
                        <!-- <a-icon
                          type="safety"
                          @click="report(1)"
                          style="color:#ffffff;font-size:24px"
                        ></a-icon>-->
                        <h3 style="color:#FFF">CRIME</h3>
                      </a-col>
                    </a-row>
                  </a-card>
                </a-col>
                <a-col :span="24" style="margin-top:2vh">
                  <a-button block style="background-color: #333333">
                    <p style="color:#FFFFFF">View Reports</p>
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
          </a-affix>
        </a-col>
      </a-row>
    </a-layout-content>
    <!-- ------------------------------------------------ -->
    <a-layout-footer
      style="background: linear-gradient(to bottom, #469a25, #154102); color: #ffffff"
    >Dolores Quezon</a-layout-footer>

    <a-modal :visible="visible" title="Report Incident" @cancel="handleCancel">
      <GmapMap
        id="map"
        ref="map"
        :center="{ lat: coordinates.lat, lng: coordinates.lng }"
        :zoom="16"
        map-type-id="terrain"
        draggable="true"
        style="width: 100%; height: 300px"
      >
        <GmapMarker :draggable="true" :position="coordinates" :animation="animation" />
      </GmapMap>
      <template slot="footer">
        <a-button
          class="emergencyButton"
          key="submit"
          type="primary"
          block
          :loading="loading"
          @click="submitReport"
        >Confirm and Submit</a-button>
      </template>
    </a-modal>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      user: {},
      visible: false,
      coordinates: { lat: 14.017685, lng: 121.417034 },
      animation: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.user = this.$store.state.user_session.user;
      // console.log('USER_DETAILS ::: ', JSON.stringify(this.$store.state.user_session))
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
      this.$getLocation().then(coordinates => {
        this.coordinates = coordinates;
        this.$gmapApiPromiseLazy().then(() => {
          _self.animation = google.maps.Animation.DROP;
        });
      });
    },
    submitReport() {
      this.visible = false;
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
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
    }
  }
};
</script>

<style>
.emergency_btn:hover {
  background: linear-gradient(to bottom, #ff000c, #ab020a);
  transform: scale(0.95);
}
.emergencyButton {
  background-color: #ff000c !important;
  border-color: #ff000c !important;
  color: #000000 !important;
}
</style>
