<template>
  <a-card style="background-color: #242B30;border-radius:10px">
    <a-row type="flex" align="middle">
        <a-col :span="24" style="margin-bottom: 2vh">
            <span style="color:#B6C2C9; font-weight:bold">{{title.toUpperCase()}}  </span>                  
        </a-col>
        <a-col :span="12">
            <a-icon :type="icon" :style="`color: ${color};font-size:32px`"></a-icon>
        </a-col>
        <a-col :span="12">
            <h2 style="color: #FFFFFF;font-size:24px">{{stat}}</h2>
        </a-col>
    </a-row>
</a-card>
</template>

<script>
export default {
    props:['title', 'help', 'icon', 'stat', 'color' ]

}
</script>

<style>

</style>