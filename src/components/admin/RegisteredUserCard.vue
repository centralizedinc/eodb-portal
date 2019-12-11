<template>
  <a-card style="background-color: #242B30;border-radius:10px">
            <a-row type="flex" align="middle">
              <a-col :span="24">
                  <span style="color:#B6C2C9; font-weight:bold">REGISTERED USERS   <a-icon type="exclamation-circle"></a-icon></span>                  
              </a-col>
               <a-col :span="14" style="margin-top:3vh">
                <h2 style="color: #FFFFFF"><a-icon type="team" style="font-size:32px"></a-icon> {{Math.floor(Math.random()* 12345)}}</h2>
                <span style="color:#B6C2C9; font-size:10px; "><a-icon type="up"></a-icon> {{Math.floor(Math.random()* 50)}}% compare to last week</span>                                 
              </a-col>
              <a-col :span="10">
                  <apexchart width="150" type="area" :options="chartOptions" :series="series" />
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
                    <span style="color:#B6C2C9; font-size:12px">Facebook</span>
                </a-col>
                <a-col :span="6">
                    <span style="color:#FFFFFF; font-weight: bold">{{Math.floor(Math.random()* 12345)}}</span>
                </a-col >
            </a-row>
            <a-row>
                <!-- Google -->
                <a-col :span="2">
                    <a-badge status="error" />
                    <!-- <a-avatar size="small" shape="square" icon="google" style="background-color: #BA4034"></a-avatar> -->
                </a-col> 
                <a-col :span="16">
                    <span style="color:#B6C2C9; font-size:12px">Google</span>
                </a-col> 
                <a-col :span="6">
                    <span style="color:#FFFFFF; font-weight: bold">{{Math.floor(Math.random()* 12345)}}</span>
                </a-col>
            </a-row>
            <a-row>
                <!-- Google -->
                <a-col :span="2">
                    <a-badge status="success" />
                    <!-- <a-avatar size="small" shape="square" icon="google" style="background-color: #BA4034"></a-avatar> -->
                </a-col> 
                <a-col :span="16">
                    <span style="color:#B6C2C9; font-size:12px">Email</span>
                </a-col> 
                <a-col :span="6">
                    <span style="color:#FFFFFF; font-weight: bold">{{Math.floor(Math.random()* 12345)}}</span>
                </a-col>
            </a-row>
        </a-card>
</template>

<script>
export default {
    data(){
        return {
            user_count:{},
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
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            console.log('DASHBOARDING ::::')
            this.$http.get('/dashboard/users')
            .then(result=>{
                console.log('DASHBOARD',JSON.stringify(result.data))
                this.user = result.data
                
            })
        }
    }
}
</script>

<style>

</style>