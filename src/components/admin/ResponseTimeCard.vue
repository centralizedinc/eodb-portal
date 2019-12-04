<template> 
<a-card style="background-color: #242B30;border-radius:10px">
    <a-row>
        <a-col :span="24">
            <span style="color:#B6C2C9; font-weight:bold">APPROVAL RATE   <a-icon type="exclamation-circle"></a-icon></span>                                  
        </a-col>
        <a-col :span="12" style="margin-top: 4vh">
           <h3 style="color: #FFFFFF">Approval Rate {{Math.floor(Math.random()*100)}}%</h3>
        </a-col>
        <a-col :span="24">       
            <apexchart width="700" type="area" :options="chartOptions" :series="series"/>
        </a-col>
    </a-row>
</a-card>
  
</template>

<script>
export default {
    data(){
        return {
            series: [{
          name: 'In-Progress',
          data: [Math.floor(Math.floor(Math.random()*100)), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100)]
        }, {
          name: 'Approved',
          data: [Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100)]
        },
        {
          name: 'Disapproved',
          data: [Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100)]
        }
        ],
        chartOptions: {            
            chart:{
                stacked: true,
                toolbar:{show:false},
            },
        colors: ['#5AC8F9', '#358DDD', '#07589e'],
          dataLabels: {
            enabled: false
          },
          stroke: {
              width: 0,
            curve: 'straight'
          },        
        grid:{
            show: true,
            borderColor: '#434950',
            position: 'back',
            xaxis: {
                lines: {show: true}
            },   
            yaxis: {
                lines: {show: true}
            },
            row: {
                opacity: 0.1
            },
            column: {
                opacity: 0.1
            },
        },
        legend:{
            show:true,
            position:'top',
            horizontalAlign: 'right',
            fontSize:'10',
            markers:{
                width:'8',
                height:'8',
                radius: '8'
            }
        },
        fill: {
  colors: undefined,
  opacity: 0.9,
  type: 'solid',
        },
          xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00",
              "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00",
              "2018-09-19T06:30:00"
            ],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },

          }
        }
        }
    }
}
</script>

<style>

</style>