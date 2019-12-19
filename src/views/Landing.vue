<template>
  <div>
    <div id="fb-root"></div>
    <div
      class="fb-customerchat"
      attribution="setup_tool"
      :page_id="constant_helper.chatbot.page_id"
      :theme_color="constant_helper.chatbot.theme_color"
      :logged_in_greeting="constant_helper.chatbot.greetings"
      :logged_out_greeting="constant_helper.chatbot.greetings"
    ></div>

    <!-- <div  v-if="$breakpoint.lgAndUp" :style="`${constant_helper.login_background ? `background:url('${constant_helper.login_background}')`: ''}; height:100%;background-repeat: no-repeat;background-size: cover`"> -->

    <!-- desktop version -->
    <div
      v-if="$breakpoint.lgAndUp"
      :style="
        `background-image:url('${randomImage}'); height:100%; background-repeat: no-repeat; background-size: cover`
      "
    >
      <a-row style="height:100%">
        <a-row>
          <a-col :span="8"></a-col>
          <a-col :span="8" style="text-align: center">
            <img
              style="width: 65%; height: auto; margin-top: 25px; margin-bottom: 10px;"
              src="https://i.postimg.cc/CK4CJSKP/smartjuan-logo.png"
            />
          </a-col>
          <a-col :span="8"></a-col>
        </a-row>

        <a-col :lg="8" :xl="8" style="margin-top:40vh">
          <title-component data-aos="fade-up" />
        </a-col>
        <a-col :lg="8" :xl="8" style="margin-top:12%; margin-bottom: 25px;">
          <login />
        </a-col>
      </a-row>
    </div>

    <!-- mobile version -->
    <!-- <div v-else :style="`${constant_helper.login_background_mobile ? `background:url('${constant_helper.login_background_mobile}')`: ''}; height:100%;background-repeat: no-repeat;background-size: cover`"> -->
    <div
      v-else
      :style="
        `background-image:url('${randomImage}'); height:100%;background-repeat: no-repeat; background-size: cover`
      "
    >
      <a-row type="flex" justify="center" align="center">
        <a-col :xs="18" :sm="18">
          <img
            style="width: 100%; height: auto; margin-top: 25px; margin-bottom: 10px;"
            src="https://i.postimg.cc/CK4CJSKP/smartjuan-logo.png"
          />
        </a-col>
        <a-col :xs="18" :sm="18" style="margin-top:30%; margin-bottom: 25px">
          <login />
        </a-col>
        <a-col :xs="22" :sm="22" style="margin-top:5vh">
          <title-component />
        </a-col>
      </a-row>
    </div>

    <!-- buttons -->
    <a-row
      :gutter="2"
      type="flex"
      align="middle"
      style="margin-top: 15px; margin-left: 35px;  padding: 2px"
    >
      <a-col :xs="24" :s="12" :md="12" :lg="6">
        <a href="#pl">
          <a-card
            class="cardButton"
            :bodyStyle="{
              display: 'flex',
              'justify-content': 'center'
            }"
          >
            <p class="textStyle">Apply Permits & Licenses</p>
          </a-card>
        </a>
      </a-col>
      <a-col :xs="24" :s="24" :md="12" :lg="6">
        <a href="#cert">
          <a-card
            class="cardButton"
            :bodyStyle="{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center'
            }"
          >
            <p class="textStyle">Civil Registry Forms</p>

            <!-- <a-anchor style="background-color:#1890FF; color:#FFFFFF" :affix="false">
            <a-anchor-link style="background-color:#1890FF; color:#FFFFFF" href="#cert" title="Certificate" />
            </a-anchor>-->
          </a-card>
        </a>
      </a-col>
      <a-col :xs="24" :s="24" :md="12" :lg="6">
        <a href="#rpt">
          <a-card
            class="cardButton"
            :bodyStyle="{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center'
            }"
          >
            <p class="textStyle">Pay Real Property Tax</p>
          </a-card>
        </a>
      </a-col>
      <a-col :xs="24" :s="24" :md="12" :lg="6">
        <a href="#rec">
          <a-card
            class="cardButton"
            :bodyStyle="{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center'
            }"
          >
            <p class="textStyle">Be a Citizen Reporter</p>
          </a-card>
        </a>
      </a-col>
    </a-row>

    <!-- ease of doing business -->
    <a-row :gutter="16" type="flex" align="middle" class="descStyle">
      <a-col :span="24" data-aos="fade-up">
        <p align="center" style="font-size: 44px; font-weight: 100">
          Ease of doing business in San Antonio Quezon
        </p>
        <!-- <p align="center" style="font-size: 24px; font-weight: 200">
          in San Antonio
        </p>-->
      </a-col>
      <a-col :span="8" data-aos="fade-right">
        <!-- <img
          style="border-radius: 20px"
          width="90%"
          src="https://i.postimg.cc/MGz98Q0W/San-Antonio-Quezon-Halljf-0128-03.jpg"
          alt
        />-->
        <img
          style="border-radius: 20px; -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent) , to(rgba(250, 250, 250, 0.1)));}"
          width="100%"
          src="https://images.pexels.com/photos/1405500/pexels-photo-1405500.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          alt="San Antonio Municipal Hall"
        />
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="14" data-aos="fade-up">
        <p style="line-height: 220%; font-size: 16px; font-weight: 100">
          SmartJuan is a One Stop Shop eGovernment Service of San Antonio,
          Quezon that expedites the application process for business
          registration, in compliance with the Ease of Doing Business Act under
          Republic Act No. 11032. San Antonio Quezon, under the leadership of
          Mayor Erick Wagan, created a unified and automated application to make
          it easier for all its constituents to put up or renew businesses and
          to pay their local taxes hassle free. It also features a zero-contact
          policy for complete transparency.
        </p>
        <!-- <a-button type="primary" style=" text-align:center; height: 50px"
          >Apply Now</a-button
        >-->
      </a-col>
    </a-row>

    <!-- permits & licenses -->
    <a-row :gutter="16" type="flex" align="middle" class="descStyle" id="pl">
      <a-col :span="24" data-aos="fade-up">
        <a-divider orientation="left" class="titleDiv"
          >Permits & Licenses</a-divider
        >
      </a-col>
      <a-col :span="15" data-aos="fade-up">
        <div style="line-height: 220%; font-size: 16px; font-weight: 100">
          In compliance with the Ease of Doing Business Act, registration and
          application of Permits and Licenses for all the constituents of San
          Antonio is now available online. Users can now apply for business
          permits anytime, anywhere. Apply, pay, view, track and manage ALL
          application in one place through SmartJuan.
        </div>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="8" data-aos="fade-left">
        <!-- <a-icon type="file-text" /> -->
        <img
          src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/permits.png"
          width="60%"
          alt
        />
      </a-col>
    </a-row>
    <!-- Certificates -->
    <a-row :gutter="16" type="flex" align="middle" class="descStyle" id="cert">
      <a-col :span="24" data-aos="fade-up">
        <a-divider orientation="left" class="titleDiv"
          >Civil Registry Forms
        </a-divider>
      </a-col>
      <a-col :span="15" data-aos="fade-up">
        <div style="line-height: 220%; font-size: 16px; font-weight: 100">
          Request for issuance of certified copies of births, marriages and
          deaths. <br /><a-badge count="This service will be available soon" />
        </div>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="8" data-aos="fade-left">
        <img
          width="60%"
          src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/cert.png"
          alt
        />
      </a-col>
    </a-row>
    <!-- real property tax -->
    <a-row :gutter="16" type="flex" align="middle" class="descStyle" id="rpt">
      <a-col :span="24" data-aos="fade-up">
        <a-divider orientation="left" class="titleDiv"
          >Real Property Tax</a-divider
        >
      </a-col>
      <a-col :span="15" data-aos="fade-up">
        <div style="line-height: 220%; font-size: 16px; font-weight: 100">
          Filing and Payment of Real Property Tax (RPT) will now be easier for
          the people of San Antonio Quezon. Regardless of where you are or just
          being in the comfort of your home, you can now file and pay your real
          property tax obligations online using SmartJuan.
        </div>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="8" data-aos="fade-left">
        <img
          src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/rpt.png"
          width="60%"
          alt
        />
      </a-col>
    </a-row>
    <!-- Report Emergency / Calamity -->
    <a-row :gutter="16" type="flex" align="middle" class="descStyle" id="rec">
      <a-col :span="24" data-aos="fade-up">
        <a-divider orientation="left" class="titleDiv"
          >Citizen Report
        </a-divider>
      </a-col>
      <a-col :span="15" data-aos="fade-up">
        <div style="line-height: 220%; font-size: 16px; font-weight: 100">
          Report crime, emergency, or calamity in San Antonio using SmartJuan.
          This alert system tells the Command Center's server about the type of
          emergency, name and address of establishment, along with other
          important pieces of information.
          <a-badge count="This service will be available soon" />
        </div>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="8" data-aos="fade-left">
        <!-- <a-icon type="warning" /> -->
        <img
          width="60%"
          src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/citizenReport.png"
          alt
        />
      </a-col>
    </a-row>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import breakpoint from "@/plugins/breakpoints";
import Login from "@/components/Login";
import TitleComponent from "@/components/Title";
export default {
  components: {
    Login,
    TitleComponent
  },
  data() {
    return {
      loading: false,
      randomImage: "",
      paths: [
        "https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/landing.png",
        "https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/landing2.jpg",
        "https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/landing3.jpg",
        "https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/landing4.jpg",
        "https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/landing5.jpg",
        "https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/landing6.jpg"
      ]
    };
  },
  created() {
    this.randomImage = this.paths[
      Math.floor(Math.random() * this.paths.length)
    ];
    console.log("randomimage## :", this.randomImage);

    if (this.constant_helper.chatbot && this.constant_helper.chatbot.appId) {
      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
      console.log(
        "this.constant_helper.chatbot :",
        this.constant_helper.chatbot
      );
      const appId = this.constant_helper.chatbot.appId;
      window.fbAsyncInit = function() {
        FB.init({
          appId: appId,
          xfbml: true,
          version: "v4.0"
        });
      };
    }
  },
  methods: {}
};
</script>
<style>
.titleDiv {
  font-size: 24px !important;
  color: #1890ff !important;
  font-weight: 200 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
}
.textShadow {
  text-shadow: -2px 5px 4px #000000;
}

.cardButton:hover {
  background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1));
  transform: scale(1.3);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.cardButton {
  /* background-color: rgba(240, 242, 245, 0.205) !important; */
  background-color: #1890ff !important;
  color: #ffffff !important;
  /* border-radius: 5px !important; */
  /* border-color: white !important; */
  border-style: inherit !important;
  letter-spacing: 1px !important;
  font-weight: 200 !important;
  cursor: pointer !important;
  width: 90% !important;
  text-align: center !important;
}

.textStyle {
  margin-top: 1em !important;
  margin-bottom: 1em !important;
  font-stretch: ultra-expanded !important;
  font-size: 12px !important;
}

.descStyle {
  margin-top: 10vh !important;
  margin-left: 6vw !important;
  margin-right: 6vw !important;
}
</style>
