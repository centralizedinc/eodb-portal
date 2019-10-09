<template>
  <a-card>
      <a-table :columns="cols" :dataSource="taxes"></a-table>
  </a-card>
</template>

<script>
export default {
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