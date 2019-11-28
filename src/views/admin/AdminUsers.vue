<template>

 <a-row type="flex" justify="center" :gutter="16">
    <a-col :span="24">
        <a-table :dataSource="reports" :columns="cols"  :customRow="customRow">
           
            <span slot="category" slot-scope="text, record">
                <img :src="getCategory(text)"/>
            </span>
            <span slot="date" slot-scope="text, record">
                {{formatDate(text)}}
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button-group>
                    <a-button type="primary">Confirm</a-button>
                    <a-button  type="danger">Remove</a-button>
                </a-button-group>
            </span>
            
        </a-table>
    </a-col>
 </a-row>
  
</template>

<script>
export default {

  data(){
    return{
      cols:[{
                title:'Username',
                dataIndex:'report_type',
                scopedSlots: { customRender: 'category' },
                },
                {
                title:'Date Registered',
                dataIndex:'user'
                },
                {
                title:'Role',
                dataIndex:'date',
                scopedSlots:{customRender:'date'}
                },
                {
                title:'Department',
                dataIndex:'date',
                scopedSlots:{customRender:'date'}
                },
                {
                title:'Status',
                dataIndex:'status'
                },
                {
                title:'Actions',
                key:'action',
                scopedSlots: { customRender: 'action' },
                },
                ]
    }
  }
}
</script>

<style>

</style>