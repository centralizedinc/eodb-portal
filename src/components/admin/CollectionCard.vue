<template>
  <a-card style="background-color: #242B30;border-radius:10px">
    <a-row type="flex" align="middle" :gutter="24">
        <a-col :span="24">
            <span style="color:#B6C2C9; font-weight:bold">TOTAL COLLECTIONS   <a-icon type="exclamation-circle"></a-icon></span>                                  
        </a-col>
        <a-col :span="12">
            <h2 style="color: #FFFFFF">{{formatCurrency(total)}}</h2>
            <span style="color:#B6C2C9; font-size:10px; "><a-icon type="up"></a-icon> {{Math.floor(Math.random()* 50)}}% compare to last week</span>                                 
        </a-col>
        <a-col :span="12">
            <apexchart width="180" type="area" :options="chartOptions" :series="trend" />
        </a-col>
        <a-col :span="24">
            <a-divider style="color:#B6C2C9"></a-divider>                                
        </a-col>                          
    </a-row>
    <a-row type="flex" justify="start" :gutter="16">
        <a-col :span="12">
            <span style="color:#B6C2C9; font-size: 12px">Application Fees</span>
            <p style="color: #FFFFFF">{{formatCurrency(Math.random()* 12345.89)}}</p>
            <div style="margin-top:-15px; width: 80%">
                <a-progress percent="75" :showInfo="false" size="small" strokeColor="#589EE6" status="active"></a-progress>
            </div>
            
        </a-col>
        <a-col :span="12">
            <span style="color:#B6C2C9; font-size: 12px">Tax Payments</span>
            <p style="color: #FFFFFF">{{formatCurrency(Math.random()* 12345.89)}}</p>
            <div style="margin-top:-15px; width: 80%">
                <a-progress percent="25" :showInfo="false" size="small" strokeColor="#01ACAC" status="active"></a-progress>
            </div>
        </a-col>
    </a-row>
</a-card>
</template>

<script>
export default {
    data(){
        return {
            series: [{
                name: 'Collections',
                data: [Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100) ]
            }],
            chartOptions: {
                chart: {
                    type: 'line',
                    sparkline: {enabled: true}
                },
                stroke: {
                    width: 2,
                    curve: 'smooth'
                },
                tooltip: {
                    x:{show:false}
                },

                // xaxis: {
                //     labels:{show:false},
                //     axisBorder:{show:false},
                    
                // },
                // grid: {show: false},
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
                }
            }
        }
    },
    asyncComputed: {
        total(){
            return new Promise((resolve, reject)=>{
                this.$http.get('/dashboard/collections/total')
                .then(result=>{
                    resolve(result.data)
                })
                .catch(error=>{
                    console.error(error)
                    resolve(0)
                })
            })
        },
        trend:{
            get(){
            return new Promise((resolve, reject)=>{
                var trend = {name:'Collections', data:[]}
                this.$http.get('/dashboard/collections/trend/3')
                .then(result=>{
                    if(result.data){
                        result.data.series.forEach(elem=>{
                            trend.data.push(elem.collection)
                        })
                    }
                    resolve([trend])                        
                })
                .catch(error=>{
                    console.error(error)
                    resolve([trend])
                })
            })
            },
            default:[{name:'Collections', data:[]}]
        }
    }
}

</script>

<style>
.ant-progress-inner {
    background-color: #1B2229
}
</style>