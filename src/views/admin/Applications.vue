<template>
  <!-- <a-row type="flex" justify="center" align="middle" :gutter="8">
    <a-col :span="10">
        <transaction-card></transaction-card>
    </a-col>
    <a-col :span="14"> -->
        <a-row type="flex" justify="center" align="middle" :gutter="8">
          
        <a-col :span="4">
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
        </a-col>
        <a-col :span="24" style="margin-top: 1vh">
            <a-card style="background-color: #242B30">
                <a-table style="background-color: #242B30"></a-table>
            </a-card>            
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
import TransactionCard from '@/components/admin/TransactionCard'
import StatusCard from '@/components/admin/StatusCard'
export default {
    components:{
        TransactionCard,
        StatusCard
    }
}
</script>

<style>

</style>