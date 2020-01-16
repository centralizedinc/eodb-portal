<template>
  <a-layout>
    <a-back-top>
      <a-avatar>
        <a-icon type="up"></a-icon>
      </a-avatar>
    </a-back-top>
    <a-layout-header class="header">
      <a-row type="flex" justify="space-between" :gutter="16">
        <a-col
          style="margin-left: -30px "
          :xs="{span: 10}"
          :sm="{span: 10}"
          :md="{span: 10}"
          :lg="{span: 16}"
          :xl="{span: 16}"
          :xxl="{span: 16}"
        >
          <img
            style="width: auto; height: 55px; margin-top: -8px;"
            src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/smartjuan_logo.png"
          />
        </a-col>

        <!-- navbutton for smaller screen -->
        <a-col
          :push="2"
          :xs="{span: 3}"
          :sm="{span: 3}"
          :md="{span: 3}"
          :lg="{span: 0}"
          :xl="{span: 0}"
          :xxl="{span: 0}"
        >
          <a-button shape="circle" icon="menu-fold" @click="show_drawer=true" />
        </a-col>

        <!-- desktop -->
        <a-col
          :xs="{span: 0}"
          :sm="{span: 0}"
          :md="{span: 0}"
          :lg="{span: 7, push: 1}"
          :xl="{span: 7, push: 2}"
          :xxl="{span: 7, push: 3}"
        >
          <img
            style="width: auto; height: 50px; margin-top: -5px"
            src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/SA_logo.png"
          />
          <img
            style="width: auto; height: 35px; margin-top: -5px"
            src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/slogan.png"
          />
        </a-col>

        <a-col
          :xs="{span: 0}"
          :sm="{span: 0}"
          :md="{span: 0}"
          :lg="{span: 1, pull: .5}"
          :xl="{span: 1, }"
          :xxl="{span: 1}"
          style="text-align: left"
        >
          <!-- <a-dropdown>
            <a-menu slot="overlay">
               <a-menu-item key="1">
                <a-icon type="notification" />Notification
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="2">
                <a-icon type="lock" />Lock Screen
              </a-menu-item>
              <a-menu-item key="1" @click="logout">
                <a-icon type="logout" />Logout
              </a-menu-item>
            </a-menu>
            <a-tooltip placement="left">
              <a-icon type="logout" style="color:#ffffff; margin-right:1px"></a-icon>
              <a-icon style="fontSize: 8px; margin-left: 5px" type="caret-down" />
            </a-tooltip>
          </a-dropdown>-->

          <a-icon @click="logout" type="logout" />
        </a-col>
        <!-- <a-col :span="1">
            <a-tooltip placement="left">
              <span slot="title">Lock Screen</span>
              <a-icon type="setting" style="color:#ffffff"></a-icon> </a-tooltip
        ></a-col>-->
        <!-- <a-col :span="1">
            <a-tooltip placement="left">
              <span slot="title">Logout</span>
              <a-icon
                @click="logout"
                type="logout"
                style="color:#ffffff; cursor:pointer"
              ></a-icon>
            </a-tooltip>
        </a-col>-->
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
      </a-drawer>-->
    </a-layout-header>

    <!-- ------------------------------------------------ -->
    <a-layout-content class="content" style="margin-top:4%; background-color: #EEEEEE">
      <a-row type="flex" justify="space-around" style="margin-top: 45px">
        <!--  -->
        <a-col
          :xs="{ span: 0 }"
          :sm="{ span: 0 }"
          :md="{ span: 0 }"
          :lg="{ span: 4 }"
          :xl="{ span: 4 }"
          :xxl="{ span: 4 }"
          style="margin-right:2px"
        >
          <a-card
            style="margin-bottom:10px; color: #f2f2f2; margin-top: 5% ; border: 0px; background-color: transparent"
          >
            <a-row type="flex" justify="space-between">
              <a-col
                :xs="{ span: 8}"
                :sm="{ span: 8}"
                :md="{ span: 8}"
                :lg="{ span: 8}"
                :xl="{ span: 10}"
                :xxl="{ span: 10}"
              ></a-col>
              <a-col
                :xs="{ span: 8}"
                :sm="{ span: 8}"
                :md="{ span: 8}"
                :lg="{ span: 8}"
                :xl="{ span: 4}"
                :xxl="{ span: 4}"
              >
                <a-avatar
                  :src="user.avatar"
                  :size="54"
                  style="margin-top:-100%; border: 2px solid #ffffff; font-weight: bold;"
                >{{ user && user.name && user.name.first ? user.name.first[0] + "" + user.name.last[0] : "" }}</a-avatar>
              </a-col>
              <a-col
                :xs="{ span: 8}"
                :sm="{ span: 8}"
                :md="{ span: 8}"
                :lg="{ span: 8}"
                :xl="{ span: 10}"
                :xxl="{ span: 10}"
              ></a-col>
            </a-row>
            <br />
            <a-col>
              <h3
                align="center"
                style="color:black; font-size: 14px; text-transform: uppercase"
              >{{ user.name.first }} {{ user.name.last }}</h3>
            </a-col>
          </a-card>

          <a-affix :offsetTop="100">
            <a-menu
              style="background-color: transparent; margin-top: 10px"
              v-model="selected_menu"
              mode="inline"
              @click="nav"
            >
              <a-menu-item key="/app">
                <a-icon type="home" />
                <span>Home</span>
              </a-menu-item>
              <a-menu-item key="/app/mayor_corner">
                <a-icon type="star" />
                <span>
                  Mayor's Corner
                  <a-badge count="soon" />
                </span>
              </a-menu-item>
              <a-menu-item key="/app/permits">
                <a-icon type="file-ppt" />
                <span>Permits & Licenses</span>
              </a-menu-item>
              <a-menu-item key="/app/forms">
                <a-icon type="file-protect" />
                <span>
                  Civil Reg Forms
                  <a-badge count="soon" />
                </span>
              </a-menu-item>
              <a-menu-item key="/app/rpt">
                <a-icon type="area-chart" />
                <span>
                  Real Property Tax
                  <a-badge count="soon" />
                </span>
              </a-menu-item>
              <a-menu-item key="/app/tracker">
                <a-icon type="compass" />
                <span>Application Tracker</span>
              </a-menu-item>
              <a-menu-item key="/app/account">
                <a-icon type="user-add" />
                <span>My Profile</span>
              </a-menu-item>
              <a-menu-item key="logout">
                <a-icon type="logout" />
                <span>Logout</span>
              </a-menu-item>
              <!-- <a-menu-item key>
                  <a-icon type="sound" />
                  <span>Citizen Report</span>
              </a-menu-item>-->
            </a-menu>
          </a-affix>
        </a-col>

        <!-- mobile -->
        <a-drawer
          style="background-color: snow"
          placement="left"
          @close="show_drawer=!show_drawer"
          :visible="show_drawer"
          :closable="false"
        >
          <a-card
            style="margin-bottom:2vh; color: #f2f2f2; margin-top: 40px ; border: 0px; background-color: transparent"
          >
            <a-row type="flex" justify="center">
              <a-col
                :xs="{span:8}"
                :sm="{span:8}"
                :md="{span:8}"
                :lg="{span:8}"
                :xl="{span:8}"
                :xxl="{span:8}"
              ></a-col>
              <a-col
                :xs="{span:8}"
                :sm="{span:8}"
                :md="{span:8}"
                :lg="{span:8}"
                :xl="{span:8}"
                :xxl="{span:8}"
              >
                <a-avatar
                  :src="user.avatar"
                  :size="54"
                  style="margin-top:-100%; border: 2px solid #ffffff; font-weight: bold;"
                >{{ user && user.name && user.name.first ? user.name.first[0] + "" + user.name.last[0] : "" }}</a-avatar>
              </a-col>
              <a-col
                :xs="{span:8}"
                :sm="{span:8}"
                :md="{span:8}"
                :lg="{span:8}"
                :xl="{span:8}"
                :xxl="{span:8}"
              ></a-col>
              <br />
              <a-row type="flex" justify="center">
                <a-col
                  :xs="{span:24}"
                  :sm="{span:24}"
                  :md="{span:24}"
                  :lg="{span:24}"
                  :xl="{span:24}"
                  :xxl="{span:24}"
                >
                  <h3
                    align="center"
                    style="color:black; font-size: 14px; text-transform: uppercase"
                  >{{ user.name.first }} {{ user.name.last }}</h3>
                </a-col>
              </a-row>
            </a-row>
          </a-card>
          <a-menu
            style="background-color: transparent"
            v-model="selected_menu"
            mode="inline"
            @click="nav"
          >
            <a-menu-item key="/app">
              <a-icon type="home" />
              <span>Home</span>
            </a-menu-item>
            <a-menu-item key="/app/mayor_corner">
              <a-icon type="star" />
              <span>
                Mayor's Corner
                <a-badge count="soon" />
              </span>
            </a-menu-item>
            <a-menu-item key="/app/permits">
              <a-icon type="file-ppt" />
              <span>Permits & Licenses</span>
            </a-menu-item>
            <a-menu-item key="/app/forms">
              <a-icon type="file-protect" />
              <span>
                Civil Reg Forms
                <a-badge count="soon" />
              </span>
            </a-menu-item>
            <a-menu-item key="/app/rpt">
              <a-icon type="area-chart" />
              <span>
                Real Property Tax
                <a-badge count="soon" />
              </span>
            </a-menu-item>
            <a-menu-item key="/app/tracker">
              <a-icon type="compass" />
              <span>Application Tracker</span>
            </a-menu-item>
            <a-menu-item key="/app/account">
              <a-icon type="user-add" />
              <span>My Profile</span>
            </a-menu-item>
            <a-menu-item key="logout">
              <a-icon type="logout" />
              <span>Logout</span>
            </a-menu-item>
            <!-- <a-menu-item key>
                <a-icon type="sound" />
                <span>Citizen Report</span>
            </a-menu-item>-->
          </a-menu>
        </a-drawer>
        <!--  -->
        <a-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 24}"
          :lg="{span: 14}"
          :xl="{span: 14}"
          :xxl="{span: 14}"
          style="padding-right: 20px; padding-left:20px"
        >
          <img
            style="width: 100%; height:auto"
            src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/cover.png"
          />
          <router-view></router-view>
        </a-col>

        <!--  -->
        <a-col
          :xs="{span: 22}"
          :sm="{span: 22}"
          :md="{span: 22}"
          :lg="{span: 4}"
          :xl="{span: 4}"
          :xxl="{span: 4}"
          style="margin-left:10px"
        >
          <!-- <a-affix :offsetTop="60"> -->

          <a-card
            :headStyle="{
                  background: 'linear-gradient(to bottom, #3D6FB5, #56C9EE)',
                  color: 'white',
                  'font-weight': 'bold',
                  'font-size': '100%',
                  padding: '5px 10px',
                  'min-height': '2%',
                  'border-radius': '8px 8px 0px 0px'
                }"
            :bodyStyle="{ padding: 0 }"
            class="document-card"
          >
            <a-row slot="title">
              <a-col :span="22">My Documents</a-col>
              <a-col :span="2">
                <a-tooltip placement="left">
                  <span
                    slot="title"
                  >Displays a list of all the documents you have applied, both active and expired.</span>
                  <a-icon type="info-circle" />
                </a-tooltip>
              </a-col>
            </a-row>
          </a-card>
          <!-- my docs -->
          <a-card :bodyStyle="{ padding: '10px' }">
            <a-carousel class="attachments-carousel">
              <div v-for="(v, i) in permits_attachments" :key="i">
                <a-row type="flex" align="top" :gutter="10">
                  <a-col
                    :span="attachments_span"
                    v-for="(item, index) in v"
                    :key="index"
                    class="attachment-item"
                    @click="openAttachment(item.epermit_attachment.url)"
                  >
                    <a-tooltip>
                      <div slot="title">
                        <span
                          style="font-weight:bold;"
                        >{{item.business_no || item.police_no || item.barangay_no || item.cedula_no }}</span>
                        <br />
                        <span>{{getPermitType(item.permit_type)}}</span>
                      </div>
                      <div>
                        <img
                          v-if="item.epermit_attachment && item.epermit_attachment.type && item.epermit_attachment.type.indexOf('image') > -1"
                          :src="item.epermit_attachment.url"
                          style="cursor:zoom; width: 100%"
                        />
                        <pdf
                          v-else-if="item.epermit_attachment && item.epermit_attachment.type && item.epermit_attachment.type==='application/pdf'"
                          :src="item.epermit_attachment.url"
                          style="cursor:zoom; width: 100%"
                        ></pdf>
                        <img
                          v-else
                          src="http://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png"
                          style="cursor:zoom; width: 100%"
                        />
                      </div>
                    </a-tooltip>
                  </a-col>
                </a-row>
              </div>
            </a-carousel>
            <!--<a-row :gutter="5" type="flex" align="top">
              <a-col :span="12" v-for="(item, index) in permits" :key="index">
                <a-tooltip>
                  <div slot="title">
                    <span
                      style="font-weight:bold;"
                    >{{item.business_no || item.police_no || item.barangay_no || item.cedula_no }}</span>
                    <br />
                    <span>{{getPermitType(item.permit_type)}}</span>
                  </div>
                  <a-card
                    @click="view(item.epermit_attachment)"
                    :bodyStyle="{ padding: '10px' }"
                    style="margin-top: 2px; text-align: center"
                  >
                    <img
                      v-if="item.epermit_attachment && item.epermit_attachment.type && item.epermit_attachment.type.indexOf('image') > -1"
                      :src="item.epermit_attachment.url"
                      style="width: 100%;"
                    />
                    <pdf
                      v-else-if="item.epermit_attachment && item.epermit_attachment.type && item.epermit_attachment.type==='application/pdf'"
                      :src="item.epermit_attachment.url"
                      style="cursor:zoom; width: 100%"
                    ></pdf>
                    <img
                      v-else
                      src="http://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png"
                      style="cursor:zoom; width: 100%"
                    />
                  </a-card>
                </a-tooltip>
              </a-col>
            </a-row>-->
          </a-card>
          <!-- </a-affix> -->
          <!-- <a-card>
              <span slot="title">
                <a-icon type="folder"></a-icon>My Documents
              </span>
              <a-card
                @click="view(item.epermit_attachment)"
                v-for="item in ePermits"
                :key="item.epermit_attachment"
                style="margin-top: 2px; text-align: center"
              >
                <pdf
                  :src="item.epermit_attachment"
                  style="cursor:zoom;display: inline-block; width: 100%"
                ></pdf>
                <p style="font-weight:bold">{{item.business_no}}</p>
                <span>{{item.business_details.business_name}}</span>
              </a-card>
          </a-card>-->
          <!-- <a-table :columns="doc_col" :dataSource="documents"></a-table> -->
          <!-- <a-affix :offsetTop="40">
              <a-card
                :headStyle="{
                  'background-image': 'linear-gradient(#56CAEF, #3C6CB4)',
                  color: 'white'
                }"
              >
                <a-row slot="title">
                  <a-col :span="21">Citizen Report</a-col>
                  <a-col :span="2">
                    <a-tooltip placement="left">
                      <span slot="title">
                        Report an emergency, calamity or crime and the alert
                        system tells the Command Center's server about the type of
                        emergency, name and address of establishment, contact
                        number of reporter (if any), along with other important
                        pieces of information
                      </span>
                      <a-icon type="info-circle" />
                    </a-tooltip>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-card class="emergency_btn btnStyle hoverFire">
                      <a-row type="flex" justify="center">
                        <a-col :span="26">
                          <h4 style="color:#FFF">Fire</h4>
                        </a-col>
                      </a-row>
                    </a-card>
                  </a-col>
                  <a-col :span="24">
                    <a-card class="emergency_btn btnStyle hoverFlood">
                      <a-row type="flex" justify="center">
                        <a-col :span="26">
                          <h4 style="color:#FFF">Flood</h4>
                        </a-col>
                      </a-row>
                    </a-card>
                  </a-col>
                  <a-col :span="24">
                    <a-card class="emergency_btn btnStyle hoverDisturbance">
                      <a-row type="flex" justify="center">
                        <a-col :span="26">
                          <h4 style="color:#FFF">Civil Disturbance</h4>
                        </a-col>
                      </a-row>
                    </a-card>
                  </a-col>
                  <a-col :span="24">
                    <a-card class="emergency_btn btnStyle hoverCrime">
                      <a-row type="flex" justify="center">
                        <a-col :span="26">
                          <h4 style="color:#FFF">Crime</h4>
                        </a-col>
                      </a-row>
                    </a-card>
                  </a-col>
                  <a-col :span="24" style="margin-top:2vh">
                    <a-divider style="color: #D7D7D7"></a-divider>
                    <a-button type="danger" block>View Reports</a-button>
                  </a-col>
                </a-row>
              </a-card>
          </a-affix>-->
        </a-col>
      </a-row>
    </a-layout-content>
    <!-- ------------------------------------------------ -->
    <!-- <a-layout-footer
        style="background: linear-gradient(to bottom, #469a25, #154102); color: #ffffff"
    >San Antonio, Quezon City</a-layout-footer>-->
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
          @click="submitReport"
        >Confirm and Submit</a-button>
      </template>
    </a-modal>
  </a-layout>
</template>

<script>
import pdf from "vue-pdf";
export default {
  components: {
    pdf
  },
  data() {
    return {
      show_drawer: false,
      collapsed: false,
      user: {},
      visible: false,
      coordinates: {
        lat: 14.017685,
        lng: 121.417034
      },
      animation: {},
      selected_menu: [this.$route.fullPath],
      documents: [{}],
      divisor: 1,
      attachments_span: 24
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      this.selected_menu = [this.$route.fullPath];
    }
  },
  methods: {
    openAttachment(url) {
      window.open(url, "_blank");
    },
    init() {
      this.user = this.$store.state.user_session.user;
      this.$store.dispatch("GET_PERMITS");
      this.$store.dispatch("GET_BUSINESS_PERMIT");
    },
    view(link) {
      window.open(link);
    },
    nav(e) {
      console.log("this.$route :", this.$route);
      if (e.key === "logout") {
        this.logout();
      } else if (e.key === "report") {
        this.$refs.report_modal.report();
        this.visible_report = true;
      } else {
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
          _self.$store.dispatch("LOGOUT");
          _self.$router.push("/");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    handleCancel() {
      this.visible = false;
    }
  },
  computed: {
    ePermits() {
      var permits = [];
      if (this.$store.state.permits.permits) {
        this.$store.state.permits.permits.forEach(permit => {
          if (permit.epermit_attachment && permit.epermit_attachment.url) {
            permits.push(permit);
          }
        });
      }
      return permits;
    },
    permits_attachments() {
      this.divisor =
        this.permits.length <= 7
          ? 1
          : this.permits.length <= 40
          ? 4
          : this.permits.length <= 60
          ? 6
          : 9;
      this.attachments_span =
        this.permits.length <= 7
          ? 24
          : this.permits.length <= 40
          ? 12
          : 8
      const quotient = Math.ceil(this.permits.length / this.divisor);
      var index = 0;
      var permits_attachments = [];
      for (let i = 0; i < quotient; i++) {
        var attachments = [];
        for (var x = 0; x < this.divisor; x++) {
          if (this.permits.length > index)
            attachments.push(this.permits[index]);
          else break;
          index++;
        }
        permits_attachments.push(attachments);
      }
      return permits_attachments;
    },
    permits() {
      var permits = JSON.parse(
        JSON.stringify(this.$store.state.permits.permits_records)
      );
      return permits.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
    }
  }
};
</script>

<style>
.attachments-carousel .slick-list {
  margin-bottom: 3vh;
}

.attachments-carousel .slick-dots {
  bottom: 0px;
}

.attachments-carousel .attachment-item {
  margin-bottom: 10px;
  cursor: zoom-in;
}

.attachments-carousel .attachment-item:hover {
  border: 1px solid #56caef !important;
}

.attachments-carousel .slick-dots li button {
  background: #56caef;
}

.attachments-carousel .slick-dots li.slick-active button {
  background: blue !important;
}

.header {
  background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1));
}

.emergency_btn:hover {
  background: linear-gradient(to bottom, #ff000c, #ab020a);
  transform: scale(0.95);
}

.emergencyButton {
  background-color: #ff000c !important;
  border-color: #ff000c !important;
  color: #000000 !important;
}

.btnStyle {
  background-color: #ff000c;
  cursor: pointer;
  border-radius: 5px !important;
}

.hoverFire:hover {
  background: url("https://is5-ssl.mzstatic.com/image/thumb/Purple71/v4/71/db/0d/71db0da5-57b3-7197-8e9c-1813cc06e6e7/source/256x256bb.jpg")
    no-repeat;
}

.hoverFlood:hover {
  background: url("https://i.postimg.cc/xdC52XCm/flood.jpg") no-repeat;
}

.hoverDisturbance:hover {
  background: url("https://i.postimg.cc/bwLgWxz8/disturb.jpg") no-repeat;
}

.hoverCrime:hover {
  background: url("https://i.postimg.cc/WbGX6RCd/crime.jpg") no-repeat;
}
</style>
