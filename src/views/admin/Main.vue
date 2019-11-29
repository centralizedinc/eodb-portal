<template>
  <div id="components-layout-demo-basic">    
    <a-layout>
      <a-layout-sider :trigger="null" collapsible v-model="collapsed" theme="dark"  :width="220" style="background-color: #242B30">
        <a-card style="border: none; height: 20vh; width: 100%;background-repeat: no-repeat;background-size: cover; background-image: url('https://picsum.photos/100');">
          <a-row type="flex" justify="start" align="middle">
            <a-col :span="10">
              <a-avatar style="border: 1px solid #FFFFFF" shape="square" :size="64" src="http://lorempixel.com/200/200/people/">
              </a-avatar>              
            </a-col>
            <a-col :span="14">
              <span style="color: #FFFFFF; font-weight: bold">Balita, Ariel A.</span>    
              <p style="font-size:10px; color: #FFFFFF">Department Head</p>          
            </a-col>
          </a-row>
        </a-card>
         <a-menu 
              theme="dark" 
              mode="inline" 
              v-model="active_menu"
              :defaultSelectedKeys="['1']"
              style="background-color: #242B30; margin-top:5vh"  >
        <a-menu-item key="1">
          <a-icon type="appstore" :style="getMenuStyle('1')" />
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="snippets" :style="getMenuStyle('2')"/>
          <span>Applications</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="reconciliation" :style="getMenuStyle('3')" />
          <span>Collections</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="team" :style="getMenuStyle('4')" />
          <span>Users</span>
        </a-menu-item>
        <a-sub-menu key="5" :style="`background-color: #242B30`" >
          <span slot="title"><a-icon type="setting" /><span>Settings</span></span>          
          <a-menu-item key="51">
             <a-icon type="bank" :style="getMenuStyle('51')" />
            <span>Departments</span>
          </a-menu-item>
          <a-menu-item key="52">
            <a-icon type="cluster" :style="getMenuStyle('52')" />
            <span>User Roles</span>
          </a-menu-item>
          <a-menu-item key="53">
            <a-icon type="table" :style="getMenuStyle('53')" />
            <span>Reference Tables</span>
          </a-menu-item>          
        </a-sub-menu>
        <a-divider></a-divider>
        <a-menu-item key="6">
          <a-icon type="user" :style="getMenuStyle('6')"/>
          <span>Account</span>
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="lock" :style="getMenuStyle('7')" />
          <span>Security</span>
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="logout" :style="getMenuStyle('8')" />
          <span>Logout</span>
        </a-menu-item>
         </a-menu>          
      </a-layout-sider>
      <a-layout>
        <a-layout-header theme="dark" style="background-color: #242B30">
          <a-row>
            <a-col :span="20">
              <h3 style="color:#FFFFFF; font-weight:bold">SmartJuan</h3>
            </a-col>
            <a-col :span="1">
              <a-icon style="color:#FFFFFF;" type="mail"></a-icon>
            </a-col>
             <a-col :span="1">
              <a-icon style="color:#FFFFFF;" type="setting"></a-icon>
            </a-col>
            <a-col :span="2">
              <a-avatar style="border: 1px solid #FFFFFF; margin-left: 20px" shape="square" :size="36" src="http://lorempixel.com/200/200/people/"/>              
            </a-col>
          </a-row>
        </a-layout-header>
        <a-layout-content style="margin-left:2vh; margin-right:2vh; margin-top:2vh">
          <a-row type="flex" justify="end" align="middle" >
            <a-col :span="18">
              <h1>{{$route.name}}</h1>
            </a-col>
            <a-col :span="6">
              <a-breadcrumb>
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
                <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
              </a-breadcrumb>
            </a-col>
          </a-row>
          <router-view/>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active_menu:''
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      console.log()
    },
    getMenuStyle(indx){
      if(this.active_menu[0]===indx){
        return 'font-size:24px; color:#01acac'
      }else{
        return 'font-size:12px; color:#FFFFFF'
      }
      
    }
  }
}
</script>

<style>
 .ant-menu-dark .ant-menu-inline.ant-menu-sub{
   background: #242B30;
 }
</style>
