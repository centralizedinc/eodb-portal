<template>
  <a-card style="background-color: #242B30;border-radius:10px">
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="24">
                  <span style="color:#B6C2C9; font-weight:bold">REGISTERED USERS   <a-icon type="exclamation-circle"></a-icon></span>
                  
              </a-col>
              <a-col :span="14" style="margin-top:3vh">
                <h2 style="color: #FFFFFF"><a-icon type="user" style="font-size:32px"></a-icon> {{Math.floor(Math.random()* 12345)}}</h2>
                <span style="color:#B6C2C9; font-size:10px; "><a-icon type="up"></a-icon> {{Math.floor(Math.random()* 50)}}% compare to last week</span>                                 
              </a-col>
              <a-col :span="10">
                  <apexchart width="110" type="bar" :options="chartOptions" :series="series" />
              </a-col>
              <a-col :span="24">
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
                    <span style="color:#FFFFFF; font-weight:bold">{{Math.floor(Math.random()* 12345)}}</span>
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
                    <span style="color:#FFFFFF; font-weight:bold">{{Math.floor(Math.random()* 12345)}}</span>
                </a-col>
            </a-row>
            <a-row>
                <!-- Email -->
                <a-col :span="2">
                    <a-badge status="warning" />
                    <!-- <a-avatar size="small" shape="square" icon="mail" style="background-color: #139FA5"></a-avatar> -->
                </a-col> 
                <a-col :span="16">
                    <span style="color:#B6C2C9; font-size:12px">E-mail</span>
                </a-col> 
                <a-col :span="6">
                    <span style="color:#FFFFFF; font-weight:bold">{{Math.floor(Math.random()* 12345)}}</span>
                </a-col>
            </a-row>
            <a-row>
                <!-- Admin -->
                <a-col :span="2">
                    <a-badge status="success" />
                    <!-- <a-avatar size="small" shape="square" icon="user-add" style="background-color: #90CA4B"></a-avatar> -->
                </a-col> 
                <a-col :span="16">
                    <span style="color:#B6C2C9; font-size:12px">Administrators</span>
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
                name: 'Registrations',
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
                //     type: 'datetime',
                //     categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000',
                //     '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001',
                //     '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'
                //     ],
                // },
                // title: {
                //     text: 'Social Media',
                //     align: 'left',
                //     style: {
                //     fontSize: "16px",
                //     color: '#666'
                //     }
                // },
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
                // },
                // markers: {
                //     size: 4,
                //     opacity: 0.9,
                //     colors: ["#FFA41B"],
                //     strokeColor: "#fff",
                //     strokeWidth: 2,
                    
                //     hover: {
                //     size: 7,
                //     }
                // },
                // yaxis: {
                //     min: -10,
                //     max: 40,
                //     title: {
                //     text: 'Engagement',
                //     },
                // }
            }
        }
    }
}
</script>

<style>

</style>