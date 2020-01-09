<template>
  <a-layout class="main-layout">
    <a-affix :offsetTop="0" style="height: 60px;">
      <a-layout-header
        a-im
        style="height: 60px; background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1) )"
      >
        <a-row>
          <a-col
            style="padding-left: 0px !important"
            :xs="{span: 4}"
            :sm="{span: 4}"
            :md="{span: 4}"
            :lg="{span: 4}"
          >
            <img
              style="width: auto; height: 55px; margin-top: -8px;"
              src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/smartjuan_logo.png"
            />
          </a-col>
          <a-col
            :xs="{span: 1}"
            :sm="{span: 2}"
            :md="{span: 10}"
            :lg="{span: 16}"
            :xl="{span: 14}"
            :xxl="{span: 14}"
          ></a-col>
          <a-col
            :xs="{span: 0}"
            :sm="{span: 0}"
            :md="{span: 0}"
            :lg="{span: 1}"
            :xl="{span: 1}"
            :xxl="{span: 1}"
          >
            <img
              style="width: auto; height: 50px; margin-top: -5px;"
              src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/SA_logo.png"
            />
          </a-col>
          <a-col
            :xs="{span: 0}"
            :sm="{span: 0}"
            :md="{span: 0}"
            :lg="{span: 0}"
            :xl="{span: 2}"
            :xxl="{span: 2}"
          >
            <img
              style="width: auto; height: 35px; margin-top: -5px; "
              src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/slogan.png"
            />
          </a-col>
          <a-col
            :xs="{span: 15}"
            :sm="{span: 16}"
            :md="{span: 14}"
            :lg="{span: 2}"
            :xl="{span: 2}"
            :xxl="{span: 2}"
          ></a-col>
          <a-col style="text-align: center">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="$router.push('/app')">
                  <a-icon type="home" />Home
                </a-menu-item>
                <a-menu-item key="2">
                  <a-icon type="lock" />Lock Screen
                </a-menu-item>
                <!-- <a-menu-divider />
                <a-menu-item key="3" @click="logout"
                  ><a-icon type="logout" />Logout</a-menu-item
                >-->
              </a-menu>
              <a-tooltip placement="left">
                <a-icon type="setting" style="color:#ffffff; padding-right:8px"></a-icon>
                <a-icon type="caret-down" style="fontSize: 8px; color:#ffffff" />
              </a-tooltip>
            </a-dropdown>
          </a-col>

          <!-- <a-tooltip placement="bottom">
              <template slot="title">
                <span>Home</span>
          </template>-->
          <!-- <a-icon type="home"  @click="$router.push('/app')"/> -->
          <!-- <a-button
                icon="home"
                shape="circle"
                @click="$router.push('/app')"
              />
          </a-tooltip>-->
        </a-row>
      </a-layout-header>
    </a-affix>
    <a-layout-content>
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {};
</script>

<style>
.main-layout {
  height: 100%;
  background: rgba(0, 0, 200, 0.1);
}
</style>
