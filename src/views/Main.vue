<template>
    <a-layout class="main-layout">
      <a-affix :offsetTop="0">
        <a-layout-header style="height: 60px; background: linear-gradient(to right, #00f, #003 )">

        </a-layout-header>
      </a-affix>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
</template>

<script>
export default {

}
</script>

<style>
.main-layout {
    height: 100%;
    background: rgba(0, 0, 200, 0.1);
}
</style>