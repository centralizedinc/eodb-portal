<template>
  <a-row type="flex" :gutter="16">
    <a-col :span="10">
        <collection-card></collection-card>
    </a-col>
    <a-col :span="7">
        <transaction-card></transaction-card>
    </a-col>
    <a-col :span="7">
        <registration-card></registration-card>
    </a-col>
    <!-- Response TIME -->
    <a-col :span="16" style="margin-top: 2vh">
        <response-time-card></response-time-card>
    </a-col>
    <a-col :span="8" style="margin-top: 2vh">
        <emergency-card></emergency-card>
    </a-col>
     <a-col :span="12" style="margin-top: 2vh">
        <department-rate></department-rate>
    </a-col>
    <a-col :span="12" style="margin-top: 2vh">
        <top-performers></top-performers>
    </a-col>
  </a-row>
</template>

<script>
import CollectionCard from '@/components/admin/CollectionCard'
import TransactionCard from '@/components/admin/TransactionCard'
import RegistrationCard from '@/components/admin/RegistrationCard'
import ResponseTimeCard from '@/components/admin/ResponseTimeCard'
import EmergencyCard from '@/components/admin/EmergencyCard'
import DepartmentRate from '@/components/admin/DepartmentRate'
import TopPerformers from '@/components/admin/TopPerformers'

export default {
    components:{
        CollectionCard,
        TransactionCard,
        RegistrationCard,
        ResponseTimeCard,
        EmergencyCard,
        DepartmentRate,
        TopPerformers
    },
    data(){
        return {
            series: [{
                name: 'Likes',
                data: [Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100) ]
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