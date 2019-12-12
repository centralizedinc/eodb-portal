<template>
  <a-card style="background-color: #242B30;border-radius:10px">
            <a-row type="flex" align="middle">
              <a-col :span="24">
                  <span style="color:#B6C2C9; font-weight:bold">TRANSACTIONS   <a-icon type="exclamation-circle"></a-icon></span>                  
              </a-col>
               <a-col :span="14" style="margin-top:3vh">
                <h2 style="color: #FFFFFF"><a-icon type="snippets" style="font-size:32px"></a-icon> {{total}}</h2>
                <span style="color:#B6C2C9; font-size:10px; "><a-icon :type="trend[0].trend<0?'down':'up'"></a-icon> {{trend[0].percent}}% compare to last week</span>                                 
              </a-col>
              <a-col :span="10">
                  <apexchart width="110" type="bar" :options="chartOptions" :series="trend" />
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
                    <span v-if="!loading" style="color:#FFFFFF; font-weight: bold">{{summary.inProgress}}</span>
                    <a-icon v-else type="loading" style="color:#FFFFFF"></a-icon>
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
                    <span v-if="!loading" style="color:#FFFFFF; font-weight: bold">{{summary.done}}</span>
                    <a-icon v-else type="loading" style="color:#FFFFFF"></a-icon>
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
                    <span v-if="!loading" style="color:#FFFFFF; font-weight: bold">{{summary.denied}}</span>
                    <a-icon v-else type="loading" style="color:#FFFFFF"></a-icon>
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
                    <span v-if="!loading" style="color:#FFFFFF; font-weight:bold">{{summary.forCompliance}}</span>
                    <a-icon v-else type="loading" style="color:#FFFFFF"></a-icon>
                </a-col>
            </a-row>
        </a-card>
</template>

<script>
export default {
    data(){
        return {
            loading:true,
            series: [{
                name: 'Transactions',
                data: [Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100) ]
            }],
            chartOptions: {
                chart: {
                    type: 'line',
                    sparkline:{enabled:true}
                },
                tooltip: {
                    x:{show:false}
                }
            }
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
        }
    },
    asyncComputed: {
        total() {
            return new Promise((resolve, reject)=>{
                this.$http.get('/dashboard/transactions/total')
                .then(result=>{
                    resolve(result.data)
                })
                .catch(error=>{
                    console.error(error)
                    resolve(0)
                })
            })    
        },
        summary:{
            get(){
            return new Promise((resolve, reject)=>{
                this.$http.get('/dashboard/transactions')
                .then(result=>{
                    this.loading=false;
                    var summary = {
                        inProgress:result.data.find(x => x._id == 0)?result.data.find(x => x._id == 0).count:0,
                        done:result.data.find(x => x._id == 1)?result.data.find(x => x._id == 1).count:0,
                        denied:result.data.find(x => x._id == 2)?result.data.find(x => x._id == 2).count:0,
                        forCompliance:result.data.find(x => x._id == 3)?result.data.find(x => x._id == 3).count:0
                    }
                    resolve(summary)
                })
                .catch(error=>{
                    console.error(error)
                    this.loading=false;
                    resolve({
                        inProgress:0,
                        done:0,
                        denied:0,
                        forCompliance:0
                    })
                })
            })  
            },
            default: {
                        inProgress:0,
                        done:0,
                        denied:0,
                        forCompliance:0
                    }
        },
        trend:{
            get(){
            return new Promise((resolve, reject)=>{
                var trend = {name:'Transactions', data:[]}
                this.$http.get('/dashboard/transactions/trend/3')
                .then(result=>{
                    if(result.data.series){
                        result.data.series.forEach(elem=>{
                            trend.data.push(elem.count)
                        })
                        trend.trend = result.data.trend
                        trend.percent = result.data.percent
                    }
                    resolve([trend])                        
                })
                .catch(error=>{
                    console.error(error)
                    resolve([trend])
                })
            })
            },
            default:[{name:'Transactions', data:[]}]
        }
    }
}
</script>

<style>

</style>