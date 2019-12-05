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
    <div  v-if="$breakpoint.lgAndUp" :style="`${constant_helper.login_background ? `background:url('${constant_helper.login_background}')`: ''}; height:100%;background-repeat: no-repeat;background-size: cover`">
      <!-- desktop version -->
      <a-row style="height:100vh" type="flex" justify="end" align="center" :gutter="16">        
        <a-col
          :lg="8"
          :xl="8"
          style="margin-top:40vh"
        >
        <title-component data-aos="fade-up"/>
        </a-col>
        <a-col :lg="8"
          :xl="8" style="margin-top:20vh; margin-right:5vh">
          <login />
        </a-col>
      </a-row>
      </div>
       <!-- mobile version -->
      <div v-else :style="`${constant_helper.login_background_mobile ? `background:url('${constant_helper.login_background_mobile}')`: ''}; height:100%;background-repeat: no-repeat;background-size: cover`">
        <a-row  type="flex" justify="center" align="center" style="100vh">
          <a-col :xs="22" :sm="18" style="margin-top:20vh">
            <login/>
          </a-col>
          <a-col :xs="22" :sm="22" style="margin-top:5vh">
            <title-component/>
          </a-col>
        </a-row>   
      </div>      
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:-1vh; margin-left:5vh; margin-right:5vh"
    >
      <a-col :s="24" :md="12" :lg="6" >
        <a href="#pl">
        <a-card style="background-color:#1890FF; color:#FFFFFF"
        :bodyStyle="{ display: 'flex', 'justify-content': 'center', 'align-items': 'center' }"
        >
        
 <p style="margin-top:10pv, margin-bottom:10pv">Permits & Licenses</p>
        
        </a-card>
        </a>
      </a-col>
      <a-col :s="24" :md="12" :lg="6" >
        <a href=#cert>
        <a-card style="background-color:#1890FF; color:#FFFFFF"
        :bodyStyle="{ display: 'flex', 'justify-content': 'center', 'align-items': 'center' }"
        >
        
 <p style="margin-top:10pv, margin-bottom:10pv color:#FFFFFF">Certificate</p>
 
 <!-- <a-anchor style="background-color:#1890FF; color:#FFFFFF" :affix="false">
 <a-anchor-link style="background-color:#1890FF; color:#FFFFFF" href="#cert" title="Certificate" />
 </a-anchor> -->
        </a-card>
        </a>
      </a-col>
      <a-col :s="24" :md="12" :lg="6" >
        <a href="#rpt">
        <a-card style="background-color:#1890FF; color:#FFFFFF"
        :bodyStyle="{ display: 'flex', 'justify-content': 'center', 'align-items': 'center' }"
        >
        
 <p style="margin-top:10pv, margin-bottom:10pv">Real Property Tax</p>
       
        </a-card>
        </a>
      </a-col>
      <a-col :s="24" :md="12" :lg="6" >
        <a href="#rec">
          <a-card style="background-color:#1890FF; color:#FFFFFF"
          :bodyStyle="{ display: 'flex', 'justify-content': 'center', 'align-items': 'center' }"
          >        
            <p style="margin-top:10pv, margin-bottom:10pv">Report Emergency / Calamity</p>
          </a-card>
        </a>
      </a-col>
    </a-row>
    
    <!-- ease of doing business -->
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh"
    >
      <a-col :span="24" data-aos="fade-up">
        <h1 align="center">Ease of Doing Business</h1>
        <h2 align="center">in {{constant_helper.home_header.label}}</h2>
      </a-col>
      <a-col :span="8" data-aos="fade-up">
        <img
          width="90%"
          src="https://i.postimg.cc/MGz98Q0W/San-Antonio-Quezon-Halljf-0128-03.jpg"
          alt
        />
      </a-col>
      <a-col :span="14" data-aos="fade-up">
        <p>SmartJuan is a One Stop Shop eGovernment Service of San Antonio, Quezon that expedites the application process for business registration, in compliance with the Ease of Doing Business Act under Republic Act No. 11032.
San Antonio Quezon, under the leadership of Mayor Erick Wagan, created a unified and automated application to make it easier for all its constituents to put up or renew businesses and to pay their local taxes hassle free. It also features a zero-contact policy for complete transparency.</p>
        <a-button type="primary" style="margin-top:10pv; text-align:right">Apply Now</a-button>
      </a-col>
    </a-row>

    
    <!-- permits & licenses -->
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh;"
      id="pl"
    >
      <a-col :span="24" data-aos="fade-up">
        <h1 >Permits & Licenses</h1>
        <a-divider></a-divider>
      </a-col>
      <a-col :span="14" data-aos="fade-up">
        <div >
          In compliance with the Ease of Doing Business Act, registration and application of Permits and Licenses for all the constituents of {{constant_helper.home_header.label}} is now available online. Users can now apply for business permits anytime, anywhere. Apply, pay, view, track and manage ALL application in one place through SmartJuan.
        </div>
      </a-col>
      <a-col :span="8" data-aos="fade-up">
        <!-- <a-icon type="file-text" /> -->
        <img
          src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/icloud/macos-mojave-ios12-macbook-ipad-pro-iphone-x-set-up-icloud-drive-hero.jpg"
          width="90%"
          alt
        />
      </a-col>
    </a-row>
    <!-- Certificates -->
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh"
      id="cert"
    >
      <a-col :span="24" data-aos="fade-up">
        <h1>Certificates</h1>
      </a-col>
      <a-col :span="8" data-aos="fade-up">
        <img
          width="90%"
          src="https://basecamp.com/assets/general/devices-medium-1047d88c14b1c02d9415d18799ccd289eb16d6733166b4529f317faeb28621c6.png"
          alt
        />
      </a-col>
      <a-col :span="14" data-aos="fade-up">
        <p>Request for issuance of certified copies of births, marriages and deaths.</p>
      </a-col>
    </a-row>
    <!-- real property tax -->
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh;"
      id="rpt"
    >
      <a-col :span="24" data-aos="fade-up">
        <h1>Real Property Tax</h1>
        <a-divider></a-divider>
      </a-col>
      <a-col :span="14" data-aos="fade-up">
        <div>
          Filing and Payment of Real Property Tax (RPT) will now be a little easier for the people of {{constant_helper.home_header.label}}. Regardless of where you are or just being in the comfort of your home, you can now file and pay your real property tax obligations online using SmartJuan.
        </div>
      </a-col>
      <a-col :span="8" data-aos="fade-up">
        <img
          src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/icloud/macos-mojave-ios12-macbook-ipad-pro-iphone-x-set-up-icloud-drive-hero.jpg"
          width="90%"
          alt
        />
      </a-col>
    </a-row>
    <!-- Report Emergency / Calamity -->
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh"
      id="rec"
    >
      <a-col :span="24" data-aos="fade-up">
        <h1>Report Emergency / Calamity</h1>
      </a-col>
      <a-col :span="8" data-aos="fade-up">
        <!-- <a-icon type="warning" /> -->
        <img
          width="90%"
          src="https://basecamp.com/assets/general/devices-medium-1047d88c14b1c02d9415d18799ccd289eb16d6733166b4529f317faeb28621c6.png"
          alt
        />
      </a-col>
      <a-col :span="14" data-aos="fade-up">
        <p>To protect the community, emergency management has to keep the response teams well informed about situations-in-progress. This tool efficiently gather, analyze, and associate critical information in a timely manner. In this way, response times can be optimized and help protect first responders in the field.</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import breakpoint from '@/plugins/breakpoints'
import Login from '@/components/Login'
import TitleComponent from '@/components/Title'
export default {
  components:{
    Login,
    TitleComponent
  },
  data() {
    return {
      loading: false,
    }
  },
  created() {
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
  methods: {
    
  }
};
</script>
<style>
.textShadow {
  text-shadow: -2px 5px 4px #000000;
}
</style>