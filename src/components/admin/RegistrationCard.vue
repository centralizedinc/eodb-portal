<template>
  <a-card style="background-color: #242B30;border-radius:10px">
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="24">
                  <span style="color:#B6C2C9; font-weight:bold">REGISTERED USERS   <a-icon type="exclamation-circle"></a-icon></span>                  
              </a-col>
              <a-col :span="14" style="margin-top:3vh">
                <h2 style="color: #FFFFFF"><a-icon type="user" style="font-size:32px"></a-icon> {{total}}</h2>
                <span style="color:#B6C2C9; font-size:10px; "><a-icon type="up"></a-icon> {{trend[0].percent}}% compare to last week</span>                                 
              </a-col>
              <a-col :span="10">
                  <apexchart width="110" type="bar" :options="chartOptions" :series="trend" />
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
                    <!-- <span style="color:#FFFFFF; font-weight:bold">{{facebook}}</span> -->
                    <!-- <a-skeleton></a-skeleton> -->
                    <span v-if="!loading" style="color:#FFFFFF; font-weight:bold">{{summary.facebook}}</span>
                    <a-icon v-else type="loading" style="color:#FFFFFF"></a-icon>
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
                    <span v-if="!loading" style="color:#FFFFFF; font-weight:bold">{{summary.google}}</span>
                    <a-icon v-else type="loading" style="color:#FFFFFF"></a-icon>
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
                    <span v-if="!loading" style="color:#FFFFFF; font-weight:bold">{{summary.local}}</span>
                    <a-icon v-else type="loading" style="color:#FFFFFF"></a-icon>
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
                    <span v-if="!loading" style="color:#FFFFFF; font-weight:bold">{{summary.admin}}</span>
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
        init(){}
    },
    asyncComputed: {
        total() {
            return new Promise((resolve, reject)=>{
                this.$http.get('/dashboard/users/total')
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
                this.$http.get('/dashboard/users')
                .then(result=>{                    
                    this.loading=false;
                    var summary = {
                        facebook:result.data.users.find(x => x._id === 'facebook')?result.data.users.find(x => x._id === 'facebook').count:0,
                        google:result.data.users.find(x => x._id === 'google')?result.data.users.find(x => x._id === 'google').count:0,
                        local:result.data.users.find(x => x._id === 'local')?result.data.users.find(x => x._id === 'local').count:0,
                        admin:result.data.admins[0]?result.data.admins[0].count:0
                    }
                    console.log('callling summary', JSON.stringify(summary))
                    resolve(summary)
                })
                .catch(error=>{
                    console.error(error)
                    this.loading=false;
                    resolve({
                        facebook:0,
                        google:0,
                        local:0,
                        admin:0
                    })
                })
            })  
            },
            default: {
                    }
        },
        trend:{
            get(){
            return new Promise((resolve, reject)=>{
                var trend = {name:'Registration', data:[]}
                this.$http.get('/dashboard/users/trend/3')
                .then(result=>{
                    if(result.data){
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
        
    },
    
}
</script>

<style>

</style>