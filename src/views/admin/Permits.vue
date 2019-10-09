<template>
    <a-card>
  <a-tabs tabPosition="left">
    <a-tab-pane key="0" tab="For Approval">   
        <a-table :dataSource="for_approval" :columns="col_approval" style="margin-top:5vh">
        </a-table>     
    </a-tab-pane>
    <a-tab-pane key="1" tab="Approved">  
        <a-table :dataSource="for_approval" :columns="col_approval" style="margin-top:5vh">
        </a-table>       
    </a-tab-pane>
    <a-tab-pane key="2" tab="Disapproved">   
        <a-table :dataSource="for_approval" :columns="col_approval" style="margin-top:5vh">
        </a-table>      
    </a-tab-pane>
  </a-tabs>
  </a-card>
</template>

<script>
export default {
    data(){
        return{
            for_approval:[],
    col_approval:[{
        title: "Permit Type",
        dataIndex: "type",
    },
    {
        title: "Business Name",
        dataIndex: "name",
    },
    {
        title: "Submitted by",
        dataIndex: "submitted_by",
    },
    {
        title: "Submitted Date",
        dataIndex: "date",
    },
    {
        title: "View",
        dataIndex: "view",
    }]
        }
    }
}
</script>

<style>

</style>