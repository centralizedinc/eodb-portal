<template>
  <a-layout class="main-layout">
    <a-affix :offsetTop="0">
      <a-layout-header
        a-im
        style="height: 60px; background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1) )"
      >
        <a-row>
          <a-col :span="22"></a-col>
          <a-col :span="2">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>Home</span>
              </template>
              <!-- <a-icon type="home"  @click="$router.push('/app')"/> -->
              <a-button
                icon="home"
                shape="circle"
                @click="$router.push('/app')"
              />
            </a-tooltip>
          </a-col>
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
