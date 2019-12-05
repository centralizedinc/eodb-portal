<template>
  <a-layout>
    <a-back-top>
      <a-avatar>
        <a-icon type="up" :size="42"></a-icon>
      </a-avatar>
    </a-back-top>
    <a-layout-header class="header" :style="headerStyle">
      <a-row type="flex" justify="start" :gutter="8">
        <a-col :md="2">
          <a-avatar
            style="cursor:pointer"
            @click="$router.push('/')"
            :src="constant_helper.home_header.logo"
            :size="50"
          ></a-avatar>
        </a-col> 
        <a-col :xs="0" :sm="0" :md="0" :lg="4">
          <h3
            style="color:white; margin-left: -6vh; cursor:pointer"
            @click="$router.push('/')"
          >{{constant_helper.home_header.label}}</h3>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
        <div :style="`background-image:url('https://picsum.photos/800?grayscale'); height:100%;background-repeat: no-repeat; background-size: cover`">
      <a-row style="height:100vh;background-color:#0912195c" type="flex" justify="center" align="middle">
          <a-col :span="6">
            <div style="text-align:center">
                <a-avatar style="border: 2px solid #FFFFFF" shape="square" :size="100" src="http://lorempixel.com/200/200/people/">
            </a-avatar>
            <br/>
            <span style="color:#ffffff;font-size: 24px; font-weight:bold">{{$store.state.admin_session.admin.email}}</span>
            <p style="color:#ffffff;font-size: 10px">(Locked)</p>
           </div>
            <a-form>             
              <a-form-item style="text-align:middle">
                <a-input size="large" placeholder="Enter Password" :type="reveal?'text':'password'" v-model="credentials.password" >
                  <!-- <a-icon slot="prefix" type="lock" /> -->
                  <a-icon
                    slot="suffix"
                    :type="reveal?'eye':'eye-invisible'"
                    @click="reveal=!reveal"
                    style="cursor:pointer"
                  />
                </a-input>
              </a-form-item>
              <!-- <a-divider></a-divider> -->
              <a-button size="large" type="primary" block @click="unlock" :loading="loading">Login</a-button>
              <a-button size="large" type="link" style="color:#FFFFFF" block @click="logout">Not you? Login as a different user</a-button>
              </a-form>
              <!-- </a-card> -->
          </a-col>
      </a-row>
        </div>
    </a-layout-content>
    <a-layout-footer style="background: #242B30; color: #ffffff">
      <a-row>
        <a-col :span="18">
          <p>© Copyright 2019 CCCI Inc. - All Rights Reserved</p>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#4267B2">
            <a-icon type="facebook"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#EA4335">
            <a-icon type="google"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#4267B2">
            <a-icon type="twitter"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background:#00AFF0">
            <a-icon type="skype"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#FF2500">
            <a-icon type="youtube"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar
            size="large"
            style="background:radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);"
          >
            <a-icon type="instagram"></a-icon>
          </a-avatar>
        </a-col>
      </a-row>
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      loading:false,
      credentials:{},
      topLocation: 0,
    };
  },
  methods: {
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      console.log("event ::: ", JSON.stringify(window.top.scrollY));
      this.topLocation = window.top.scrollY;
    },
    unlock(){
      this.loading=true
      this.$http.post('/admin/auth', this.credentials)
      .then(result=>{
        this.loading = false;
        console.log('result', JSON.stringify(result.data))
        if(result && result.data && result.data.model && result.data.model.is_authenticated){
          this.$store.commit('UNLOCK_SCREEN', result.data.model.account)
          this.$router.push(this.$store.state.screens.locked_screen)
          
        }else{
          this.credentials = {}
          this.$notification.error(
          {
            message: 'Unauthorized!',
            description: 'Invalid Credentials. Please try again.'
          }
        )
        }
        
      })
      .catch(error=>{
        this.loading = false;
        console.error(error)
        this.credentials = {}
        this.$notification.error(
          {
            message: 'Unauthorized!',
            description: 'Invalid Credentials. Please try again.'
          }
        )
      })
    },
    logout(){
      var _self = this
        this.$confirm({
          title: `Are you sure you want to logout ${this.credentials.email}?`,
          content: 'Clicking OK will delete any unsaved work.',
          onOk() {
            _self.$notification.success({
              message:'Success!',
              description:'Logout Successful'
            })
             _self.$store.commit('ADMIN_LOGOUT')
             _self.$router.push('/admin')
          },
          onCancel() {},
        });
     
    }
  },
  created() {
    // console.log('EMAIL:::',JSON.stringify(this.$store.state.admin_session.admin.account.email))
    this.credentials.email = this.$store.state.admin_session.admin.email
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  computed: {
    headerStyle() {
      if (this.topLocation < 50) {
        return "background: transparent";
      } else {
        return "background: #242B30";
      }
    }
  }
};
</script>

<style>
</style>
