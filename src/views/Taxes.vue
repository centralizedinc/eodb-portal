<template>
<div :style="constant_helper.theme.default">
    
  <a-row  type="flex" justify="center" :gutter="8" >
      <a-col :xs="22" :sm="22" :md="20" :lg="20" :xl="20" style="margin-top:15vh">
          <h1 style="color:#FFFFFF">Pay Your Local Taxes</h1>
          <a-divider></a-divider>
      </a-col>
      <a-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" style="margin-bottom: 10vh">
          <taxes></taxes>
      </a-col>
  </a-row>
</div>
</template>

<script>
import Taxes from '@/components/Taxes'
export default {
    components: {Taxes}

}
</script>

<style>

</style>