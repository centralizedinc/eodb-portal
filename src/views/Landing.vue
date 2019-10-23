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
          <a-col data-aos="fade-up" :xs="22" :sm="22" style="margin-top:15vh">
            <title-component/>
          </a-col>
          <a-col :xs="22" :sm="18" style="margin-top:5vh; margin-bottom: 20vh">
            <login/>
          </a-col>
        </a-row>   
      </div>   
    
   
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh"
    >
      <a-col :md="24" :lg="8" >
        <a-card title=" Report Emergency/Calamity">
          To protect our community, emergency management has to keep our response teams well informed about situations-in-progress. This tool efficiently gather, analyze, and associate critical information in a timely manner. In this way, we can optimize response times and help protect first responders in the field.
          <a-divider></a-divider>
          <a-button type="primary">Report</a-button>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="8">
        <a-card title="News/Announcements">
          <p>Stay updated with all the latest and official News and Announcements of {{constant_helper.home_header.label}}.</p>
          <a-divider></a-divider>
          <a-button type="primary" @click="$router.push('/news')">Read More</a-button>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="8">
        <a-card title="Permits and Certificates">
          In compliance with the Ease of Doing Business Act, online registration and application of Permits and Certificates for all the constituents of {{constant_helper.home_header.label}} is now available through this Portal. The public may apply online, but only registered members can view, track and manage ALL their application.
          <a-divider></a-divider>
          <a-button type="primary" @click="$router.push('/permits')">Apply Now</a-button>
        </a-card>
      </a-col>
    </a-row>
    
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh"
    >
      <a-col :span="24" data-aos="fade-up">
        <h1>Permits and Certificates</h1>
        <a-divider></a-divider>
      </a-col>
      <a-col :span="8" data-aos="fade-up">
        <img
          width="100%"
          src="https://basecamp.com/assets/general/devices-medium-1047d88c14b1c02d9415d18799ccd289eb16d6733166b4529f317faeb28621c6.png"
          alt
        />
      </a-col>
      <a-col :span="14" data-aos="fade-up">
        <p>In compliance with the Ease of Doing Business Act, online registration and application of Permits and Certificates for all the constituents of {{constant_helper.home_header.label}} is now available through this Portal. The public may apply online, but only registered members can view, track and manage ALL their application.</p>
      </a-col>
    </a-row>
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh;"
    >
      <a-col :span="24" data-aos="fade-up">
        <h1>News/Announcements</h1>
        <a-divider></a-divider>
      </a-col>
      <a-col :span="14" data-aos="fade-up">
        <div>Stay updated with all the latest and official News and Announcements of {{constant_helper.home_header.label}}.</div>
      </a-col>
      <a-col :span="8" data-aos="fade-up">
        <img
          src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/icloud/macos-mojave-ios12-macbook-ipad-pro-iphone-x-set-up-icloud-drive-hero.jpg"
          width="100%"
          alt
        />
      </a-col>
    </a-row>
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh; margin-bottom:10vh"
    >
      <a-col :span="24" data-aos="fade-up">
        <h1>Report Emergency/Calamity</h1>
        <a-divider></a-divider>
      </a-col>
      <a-col :span="14" data-aos="fade-up">
        <p>To protect our community, emergency management has to keep our response teams well informed about situations-in-progress. This tool efficiently gather, analyze, and associate critical information in a timely manner. In this way, we can optimize response times and help protect first responders in the field.</p>
      </a-col>
      <a-col :span="8" data-aos="fade-up">
        <img
          width="100%"
          src="https://bjango.com/images/mac/skalapreview2/skala-preview-hero.jpg"
          alt
        />
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