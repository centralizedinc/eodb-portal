<template>
  <a-card>
      <!-- <a-table :columns="cols" :dataSource="taxes"></a-table> -->
      <taxes/>
  </a-card>
</template>

<script>
import Taxes from '@/components/taxes/Transactions'
export default {
    components:{
        Taxes
    },
    data(){
        return {
            cols:[{
                    title:"Tax Type",
                    dataIndex: "type",
                },
                {
                    title: "TCT/OCT",
                    dataIndex: "title_no"
                },
                {
                    title: "Amount Due",
                    dataIndex: "amount"
                },
                {
                    title: "Status",
                    dataIndex: "status"
                },
                {
                    title: "Payment Date",
                    dataIndex: "date"
                }],
            taxes:[]
        }
    }
}
</script>

<style>

</style>