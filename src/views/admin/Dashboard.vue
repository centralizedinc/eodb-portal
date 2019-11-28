<template>
  <a-row type="flex" :gutter="16">
    <a-col :span="10">
        <a-card style="background-color: #242B30">
            <a-row type="flex" align="middle">
              <a-col :span="24">
                  <span style="color:#B6C2C9; font-weight:bold">TOTAL COLLECTIONS   <a-icon type="exclamation-circle"></a-icon></span>                                  
              </a-col>
              <a-col :span="10">
                <h2 style="color: #FFFFFF">{{formatCurrency(Math.floor(Math.random()* 12345678.89))}}</h2>
                <span style="color:#B6C2C9; font-size:10px; "><a-icon type="up"></a-icon> {{Math.floor(Math.random()* 50)}}% compare to last week</span>                                 
              </a-col>
              <a-col :span="14">
                  <apexchart type="line" :options="chartOptions" :series="series" />
              </a-col>
              <a-col :span="24" style="margin-top:-5vh">
                  <a-divider style="color:#B6C2C9"></a-divider>
              </a-col>
             
            </a-row>
        </a-card>
    </a-col>
    <a-col :span="7">
        <a-card style="background-color: #242B30">
            <a-row >
              <a-col :span="24">
                  <span style="color:#B6C2C9; font-weight:bold">TRANSACTIONS   <a-icon type="exclamation-circle"></a-icon></span>                  
              </a-col>
              
            </a-row>
        </a-card>
    </a-col>
    <a-col :span="7">
        <a-card style="background-color: #242B30">
            <a-row >
              <a-col :span="24">
                  <span style="color:#B6C2C9; font-weight:bold">REGISTERED USERS   <a-icon type="exclamation-circle"></a-icon></span>
                  
              </a-col>
            </a-row>
        </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
    data(){
        return {
            series: [{
                name: 'Likes',
                data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13]
            }],
            chartOptions: {
                chart: {
                    type: 'line',
                    toolbar:{show:false},
                    tooltip:{enabled:false}
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
                fill: {
                    type: 'gradient',
                    gradient: {
                    shade: 'dark',
                    gradientToColors: ['#FDD835'],
                    shadeIntensity: 1,
                    type: 'horizontal',
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100, 100]
                    },
                },
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