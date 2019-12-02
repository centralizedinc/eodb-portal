<template>
  <a-card style="background-color: #242B30">
            <a-row type="flex" align="middle">
              <a-col :span="24">
                  <span style="color:#B6C2C9; font-weight:bold">TRANSACTIONS   <a-icon type="exclamation-circle"></a-icon></span>                  
              </a-col>
               <a-col :span="14" style="margin-top:3vh">
                <h2 style="color: #FFFFFF"><a-icon type="snippets" style="font-size:32px"></a-icon> {{Math.floor(Math.random()* 12345)}}</h2>
                <span style="color:#B6C2C9; font-size:10px; "><a-icon type="up"></a-icon> {{Math.floor(Math.random()* 50)}}% compare to last week</span>                                 
              </a-col>
              <a-col :span="10">
                  <apexchart width="110" type="bar" :options="chartOptions" :series="series" />
              </a-col>
              <a-col :span="24" >
                  <a-divider style="color:#B6C2C9"></a-divider>                                
              </a-col>  
            </a-row>
            <a-row>
                <!-- Facebook -->
                <a-col :span="2" >
                    <a-badge status="processing" />
                    <!-- <a-avatar size="small" shape="square" icon="facebook" style="background-color: #4267B2"></a-avatar> -->
                </a-col>  
                <a-col :span="16">
                    <span style="color:#B6C2C9; font-size:12px">In-progress</span>
                </a-col>
                <a-col :span="6">
                    <span style="color:#FFFFFF; font-weight: bold">{{Math.floor(Math.random()* 12345)}}</span>
                </a-col >
            </a-row>
            <a-row>
                <!-- Google -->
                <a-col :span="2">
                    <a-badge status="success" />
                    <!-- <a-avatar size="small" shape="square" icon="google" style="background-color: #BA4034"></a-avatar> -->
                </a-col> 
                <a-col :span="16">
                    <span style="color:#B6C2C9; font-size:12px">Approved</span>
                </a-col> 
                <a-col :span="6">
                    <span style="color:#FFFFFF; font-weight: bold">{{Math.floor(Math.random()* 12345)}}</span>
                </a-col>
            </a-row>
            <a-row>
                <!-- Email -->
                <a-col :span="2">
                    <a-badge status="error" />
                    <!-- <a-avatar size="small" shape="square" icon="mail" style="background-color: #139FA5"></a-avatar> -->
                </a-col> 
                <a-col :span="16">
                    <span style="color:#B6C2C9; font-size:12px">Denied</span>
                </a-col> 
                <a-col :span="6">
                    <span style="color:#FFFFFF; font-weight: bold">{{Math.floor(Math.random()* 12345)}}</span>
                </a-col>
            </a-row>
            <a-row>
                <!-- Admin -->
                <a-col :span="2">
                    <a-badge status="warning" />
                    <!-- <a-avatar size="small" shape="square" icon="user-add" style="background-color: #90CA4B"></a-avatar> -->
                </a-col> 
                <a-col :span="16">
                    <span style="color:#B6C2C9; font-size:12px">For Compliance</span>
                </a-col> 
                <a-col :span="6">
                    <span style="color:#FFFFFF; font-weight:bold">{{Math.floor(Math.random()* 12345)}}</span>
                </a-col>
            </a-row>
        </a-card>
</template>

<script>
export default {
    data(){
        return {
            series: [{
                name: 'Transactions',
                data: [Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100) ]
            }],
            chartOptions: {
                chart: {
                    type: 'line',
                    sparkline:{enabled:true}
                },
                stroke: {
                    width: 3,
                    curve: 'smooth'
                },

                xaxis: {
                    labels:{show:false},
                    axisBorder:{show:false},
                    
                },
                grid: {show: false},
                // fill: {
                //     type: 'gradient',
                //     gradient: {
                //     shade: 'dark',
                //     gradientToColors: ['#FDD835'],
                //     shadeIntensity: 1,
                //     type: 'horizontal',
                //     opacityFrom: 1,
                //     opacityTo: 1,
                //     stops: [0, 100, 100, 100]
                //     },
                // }
            }
        }
    }
}
</script>

<style>

</style>