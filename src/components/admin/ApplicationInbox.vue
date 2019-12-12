<template>
<div> 
  <a-table  :dataSource="dockets" :columns="cols" :loading="loading" :bordered="true">
    <span slot="date" slot-scope="text">
        {{formatDate(text, 'time')}}
    </span>
    <span slot="status" slot-scope="text">
        {{getDocketStatus(text)}}
    </span>
    <span slot="mode" slot-scope="text">
        {{getDocketMode(text)}}
    </span>
    <span slot="age" slot-scope="text" style="text-align:center">
        <a-tooltip :title="computeAge(text).display">
            <a-progress :percent="computeAge(text).percent" :showInfo="false">
            </a-progress>
        </a-tooltip>
    </span>
    <span slot="actions" slot-scope="text, record">
        <a-button-group>
            <a-tooltip title="View">
            <a-button type="primary" icon="search" @click="view(record)"></a-button>
            </a-tooltip>
            <a-tooltip title="Claim">
            <a-button type="primary" ghost icon="login"></a-button>
            </a-tooltip>                
        </a-button-group>
    </span>
</a-table>
    <a-drawer
        placement="right"
        @close="onClose"
        :visible="visible"
        :width="450"
        theme="dark"
        >
        <div slot="title">
            <span style="color:#FFFFFF">Application Details</span>
        </div>
        <a-row>
            <a-col :span="12">
                <p style="font-weight:bold">REFERENCE NUMBER</p>
                <p style="font-weight:bold">TYPE</p>
                <p style="font-weight:bold">MODE</p>
                <p style="font-weight:bold">STATUS</p>
            </a-col>
            <a-col :span="12">
                <p>{{docket.reference_no}}</p>
                <p>{{docket.permit}}</p>
                <p>{{getDocketMode(docket.application_type)}}</p>
                <p>{{getDocketStatus(docket.status)}}</p>
            </a-col>
            <a-divider></a-divider>
            <a-col :span="12">
                <p style="font-weight:bold">BUSINESS NAME</p>
                <p style="font-weight:bold">BUSINESS TYPE</p>
                <p style="font-weight:bold">REGISTRATION NUMBER</p>
                <p style="font-weight:bold">TIN</p>                
            </a-col>
            <a-col :span="12">
                <p>{{application_details.business_details.business_name}}</p>
                <p>{{application_details.business_details.business_type}}</p>
                <p>{{application_details.business_details.registration_no}}</p>
                <p>{{application_details.business_details.tin}}</p>
            </a-col>
            <a-divider></a-divider>
            <a-col :span="24">
                <a-button type="primary" block @click="claim(docket)">CLAIM</a-button>
            </a-col>
        </a-row>
    </a-drawer>
</div>
</template>

<script>
export default {
    data(){
        return{
            loading:false,
            visible:false,
            application_details:{
                business_details:{}
            },
            docket:{},
            dockets:[],
            cols:[
                {
                    title:'REFERENCE NO',
                    dataIndex:'reference_no',
                },
                {
                    title:'TYPE',
                    dataIndex:'permit',
                },
                {
                    title:'MODE',
                    dataIndex:'application_type',
                    scopedSlots:{customRender:'mode'}
                },
                {
                    title:'STATUS',
                    dataIndex:'status',
                    scopedSlots:{customRender:'status'}
                },
                {
                    title:'DATE CREATED',
                    dataIndex:'date_created',
                    scopedSlots:{customRender:'date'}
                },
                {
                    title:'AGE',
                    dataIndex:'date_created',
                    scopedSlots:{customRender:'age'}
                },
                {
                    title:'ACTIONS',
                    dataIndex:'',
                    scopedSlots:{customRender:'actions'}
                    
                },
                
            ]
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            //get records
            this.loading=true;
            this.$http.get('/dockets')
            .then(results=>{
                this.dockets = results.data
                this.loading=false;
            })
        },
        computeAge(date){
            var date_created = new Date(date)
            var max = 10
            var time = ((new Date()).getTime() - date_created.getTime())
            var hours = time /(1000*3600)
            var age  = time / (1000 * 3600 * 24)
            var display = age<1?`${Math.floor(hours)} Hour(s)`:`${Math.floor(age)} Day(s)`
            return {percent:(age/max)*100, age, time, display}

        },
        onClose(){
            this.visible = false;
        },
        view(record){
            console.log(JSON.stringify(record))
            this.docket = record
            this.$http.get(`/dockets/applications/${record.permit}/${record.reference_no}`)
            .then(result=>{
                this.visible=true;
                this.application_details = result.data
                console.log(JSON.stringify(this.application_details))
            })
        },
        claim(record){
            this.loading = true;
            this.$store.commit('REVIEW', this.application_details )
            this.$notification.success(
                {
                    message: 'Claimed!',
                    description: `You have claimed Application #${record.reference_no}`
                })
                this.loading = false;
                
                this.$router.push(`/admin/app/application/`)
        }
    }
}
</script>

<style>
.ant-form-item-label label{
    font-weight: bold;
    color:black
}
.ant-drawer-header{
    background: #242B30 !important
}
.ant-drawer-close {
    color: #ffffff
}
.ant-progress-inner {
    background-color: #1B2229
}
</style>