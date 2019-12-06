<template>
    <a-row type="flex" justify="center" align="middle" :gutter="24">
        <a-col :span="12">
            <inbox-card></inbox-card>
        </a-col>
        <a-col :span="12">
            <outbox-card></outbox-card>
        </a-col>
        <a-col :span="24" style="margin-top: 2vh">
            <a-table  :dataSource="dockets" :columns="cols">
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
        </a-col>
        <a-drawer
            placement="right"
            @close="onClose"
            :visible="visible"
            :width="500"
            theme="dark"
            >
            <div slot="title">
                <span style="color:#FFFFFF">Application Details</span>
            </div>
            <!-- <a-form>
                <a-form-item label="Department Name">
                    <a-input placeholder="Enter Name" v-model="office.name"></a-input>
                </a-form-item>
                <a-form-item label="Description">
                    <a-textarea placeholder="Description" v-model="office.description" :rows="5"></a-textarea>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" icon="save" :loading="loading" block @click="submit">Submit</a-button>
                </a-form-item>
            </a-form> -->
            </a-drawer>
    </a-row>
</template>

<script>
import InboxCard from '@/components/admin/InboxCard'
import OutboxCard from '@/components/admin/OutboxCard'
import StatusCard from '@/components/admin/StatusCard'
export default {
    components:{
        InboxCard,
        OutboxCard,
        StatusCard
    },
    data(){
        return{
            visible:false,
            application_details:{},
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
            this.$http.get('/dockets')
            .then(results=>{
                this.dockets = results.data
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
            
            this.$http.get(`/dockets/applications/${record.permit}/${record.reference_no}`)
            .then(result=>{
                this.visible=true;
                this.application_details = result.data
                console.log(JSON.stringify(this.application_details))
            })
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
</style>