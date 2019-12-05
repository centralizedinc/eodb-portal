<template>
  <!-- <a-row type="flex" justify="center" align="middle" :gutter="8">
    <a-col :span="10">
        <transaction-card></transaction-card>
    </a-col>
    <a-col :span="14"> -->
        <a-row type="flex" justify="center" align="middle" :gutter="24">
          <a-col :span="12">
              <inbox-card></inbox-card>
          </a-col>
           <a-col :span="12">
              <outbox-card></outbox-card>
          </a-col>
        <!-- <a-col :span="4">
            <status-card title="approved" icon="file-done" color="#4FBC1C" :stat="Math.floor(Math.random()* 12345)"></status-card>
        </a-col> 
        <a-col :span="4" >
            <status-card title="denied" icon="audit" color="#FF0000" :stat="Math.floor(Math.random()* 12345)"></status-card>
        </a-col>
        <a-col :span="4" >
            <status-card title="pending" icon="file-exclamation" color="#FAAD14" :stat="Math.floor(Math.random()* 12345)"></status-card>
        </a-col>
        <a-col :span="6">
            <status-card title="inbox" icon="snippets" color="#589EE6" :stat="Math.floor(Math.random()* 12345)"></status-card>
        </a-col>
        <a-col :span="6">
            <status-card title="queue" icon="file-sync" color="#01ACAC" :stat="Math.floor(Math.random()* 12345)"></status-card>
        </a-col> -->
        <a-col :span="24" style="margin-top: 2vh">
            <!-- <a-card style="background-color: #242B30"> -->
                <a-table  :dataSource="dockets" :columns="cols"></a-table>
            <!-- </a-card>             -->
        </a-col>
    </a-row>
    <!-- </a-col> -->
    <!-- <a-col :span="24" style="margin-top: 1vh">

        <a-card style="background-color: #242B30">
            <a-table style="background-color: #242B30"></a-table>
        </a-card>
        
    </a-col> -->
  <!-- </a-row> -->
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
            dockets:[],
            cols:[
                {
                    title:'REFERENCE NO',
                    dataIndex:'reference_no',
                },
                {
                    title:'TYPE',
                    dataIndex:'application_type',
                },
                ,
                {
                    title:'STATUS',
                    dataIndex:'status',
                },
                {
                    title:'DATE CREATED',
                    dataIndex:'date_created',
                },
                {
                    title:'DATE MODIFIED',
                    dataIndex:'date_created',
                },
                {
                    title:'ACTIONS',
                    dataIndex:'date_created',
                    
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
        }
    }
}
</script>

<style>

</style>