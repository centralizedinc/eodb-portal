<template>
  <a-layout class="main-layout">
    <a-affix :offsetTop="0" style="height: 60px;">
      <a-layout-header class="header">
        <a-row type="flex" justify="space-between" :gutter="16">
          <a-col
            style="margin-left: -30px"
            :xs="{span: 15}"
            :sm="{span: 15}"
            :md="{span: 9, offset: 1 }"
            :lg="{span: 9, offset: 1}"
            :xl="{span: 7, offset:1}"
            :xxl="{span: 9, offset: 1}"
          >
            <img
              style="width: auto; height: 55px; margin-top: -8px;"
              src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/smartjuan_logo.png"
            />
          </a-col>

          <!-- home button -->
          <a-col
            :xs="{span: 0}"
            :sm="{span: 0}"
            :md="{span: 9, push: 3}"
            :lg="{span: 9, push: 5}"
            :xl="{span: 9, push: 7}"
            :xxl="{span: 9, push: 8}"
          >
            <img
              style="width: auto; height: 50px; margin-top: -5px;"
              src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/SA_logo.png"
            />
            <img
              style="width: auto; height: 35px; margin-top: -5px; "
              src="https://eodb-portal.s3-ap-northeast-1.amazonaws.com/images/slogan.png"
            />
          </a-col>
          <a-col
            :xs="{span: 6}"
            :sm="{span: 6}"
            :md="{span: 2}"
            :lg="{span: 2}"
            :xl="{span: 2}"
            :xxl="{span: 2}"
            style="text-align: left"
          >
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="$router.push('/app')">
                  <a-icon type="arrow-left" />Back to Home
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="2">
                  <a-icon type="lock" />Lock Screen
                </a-menu-item>
              </a-menu>
              <a-tooltip placement="left">
                <a-icon type="home" style="color:#ffffff; margin-right:1px"></a-icon>
                <a-icon style="fontSize: 8px; margin-left: 5px" type="caret-down" />
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
.header {
  background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1));
}
.main-layout {
  height: 100%;
  background: whitesmoke;
}
</style>
