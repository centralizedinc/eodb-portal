<template>
<div style="background-color: #242B30; height:100vh">
  <a-row type="flex" justify="center" align="middle" >
      <a-col :span="2" style="margin-top: 20vh">
          <a-avatar style="border: 2px solid #FFFFFF" shape="square" :size="100" src="http://lorempixel.com/200/200/people/">
          </a-avatar>
      </a-col>
      <a-col :span="24" style="margin-top: 2vh; text-align:center">
          <span style="font-weight: bold; font-size:24px; color:#FFFFFF">Balita, Ariel A.</span>
          <p style="font-size:10px; color:#FFFFFF">(Locked)</p>
      </a-col>
      <a-col :span="24"></a-col>
    <a-col :span="6" style="margin-top: 5vh">
        <a-input style="text-align:center"  type="password" placeholder="Enter Password" size="large"></a-input>
    </a-col>
    <a-col :span="24"></a-col>
    <a-col :span="6" style="margin-top: 2vh">
        <a-button type="primary" block icon="unlock" size="large" @click="$router.push('/admin/app')">Login</a-button>
    </a-col>
  </a-row>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>