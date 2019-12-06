<template>
  <a-table :dataSource="users" :columns="cols"  :customRow="customRow" style="margin-top:2vh" :bordered="true">           
        
        <span slot="platform" slot-scope="text, record">
            <a-icon :type="getPlatformIcon(text)"></a-icon>
        </span>
        <span slot="date" slot-scope="text, record">
            {{formatDate(text)}}
        </span>
        <span slot="action" slot-scope="text, record">
            <a-button-group>
                <a-button type="primary" icon="search"></a-button>
                <a-button  type="danger" icon="delete"></a-button>
            </a-button-group>
        </span>            
    </a-table>
</template>

<script>
export default {
    data(){
        return {
            users:[],
            cols:[
                {
                title:'',
                dataIndex:'method',
                scopedSlots:{customRender:'platform'}
                },
                {
                title:'Username',
                dataIndex:'email',
                // scopedSlots: { customRender: 'category' },
                },
                {
                title:'Date Registered',
                dataIndex: 'date_created',
                scopedSlots:{customRender:'date'}
                },
                {
                title:'Date Modified',
                dataIndex: 'date_modified',
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
                }
            ]
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.$http.get('/accounts')
            .then(accounts =>{
                console.log(JSON.stringify(accounts))
                this.users = accounts.data;
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>

<style>

</style>