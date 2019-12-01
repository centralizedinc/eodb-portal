<template>
  <a-row type="flex" justify="center" align="middle" :gutter="8">
    <a-col :span="10">
        <transaction-card></transaction-card>
    </a-col>
    <a-col :span="14">
        <a-row type="flex" justify="center" align="middle" :gutter="8">
          <a-col :span="12">
            <status-card title="inbox" icon="snippets" :stat="Math.floor(Math.random()* 12345)"></status-card>
        </a-col>
        <a-col :span="12">
            <status-card title="queue" icon="file-sync" :stat="Math.floor(Math.random()* 12345)"></status-card>
        </a-col>
        <a-col :span="8" style="margin-top: 1vh">
            <status-card title="approved" icon="file-done" :stat="Math.floor(Math.random()* 12345)"></status-card>
        </a-col>
        <a-col :span="8" style="margin-top: 1vh">
            <status-card title="denied" icon="audit" :stat="Math.floor(Math.random()* 12345)"></status-card>
        </a-col>
        <a-col :span="8" style="margin-top: 1vh">
            <status-card title="pending" icon="file-exclamation" :stat="Math.floor(Math.random()* 12345)"></status-card>
        </a-col>
        </a-row>
    </a-col>
    <a-col :span="24" style="margin-top: 1vh">

        <a-card style="background-color: #242B30">
            <a-table style="background-color: #242B30"></a-table>
        </a-card>
        
    </a-col>
  </a-row>
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