<template>
  <div>
  <a-row type="flex" justify="end">
    <a-col :span="4">
        <a-button type="primary" block icon="plus" @click="visible=true" >NEW RECORD</a-button>
    </a-col>
    <a-col :span="24">
         <a-table style="margin-top: 2vh" :dataSource="settings" :columns="cols" :bordered="true" :loading="loading">
             <span slot="date" slot-scope="text">
                {{formatDate(text)}}
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button-group>                    
                    <a-button type="primary" icon="edit" @click="edit(record)"></a-button>
                </a-button-group>
            </span>
         </a-table>
    </a-col>   
  </a-row>
  <a-drawer
      placement="right"
      @close="onClose"
      :visible="visible"
      :width="500"
      theme="dark"
    >
    <div slot="title">
        <span style="color:#FFFFFF">New Reference</span>
    </div>
      <a-form>
        <a-form-item label="Code">
            <a-input placeholder="Enter code" v-model="setting.code"></a-input>
        </a-form-item>
        <a-form-item label="Value">
            <a-textarea placeholder="Value" v-model="setting.value" :rows="5"></a-textarea>
        </a-form-item>       
        <a-form-item>
            <a-button type="primary" icon="save" :loading="loading" block @click="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
</div> 
</template>

<script>
export default {
    data(){
        return{
            edit_mode:false,
            loading:false,
            visible:false,
            settings:[],
            setting:{},
            cols:[
                {
                    title:'Code',
                    dataIndex:'code',
                },
                {
                    title:'Value',
                    dataIndex:'value',
                },
                {
                    title:'Status',
                    dataIndex:'status',
                },
                {
                    title:'Date Created',
                    dataIndex:'date_created',
                    scopedSlots:{customRender:'date'}
                },
                {
                    title:'Date Modfied',
                    dataIndex:'date_modified',
                    scopedSlots:{customRender:'date'}
                },
                {
                    title:'Actions',
                    dataIndex:'_id',
                    scopedSlots:{customRender:'action'}
                },
            ]
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.loading = true
            this.$http.get('/settings')
            .then(results =>{
                console.log(JSON.stringify(results))
                this.loading = false
                 this.settings = results.data.result;
            })
        },
        onClose(){
            this.visible = false;
            this.setting = {}
        },
        edit(record){
            this.edit_mode = true;
            this.setting = this.deepCopy(record)
            this.visible = true
        },
        submit(){
            this.loading = true;
            if(this.edit_mode){
                this.$http.post(`/settings/${this.setting._id}`, this.setting)
                .then(result=>{
                    console.log(JSON.stringify(result))
                    this.loading = false;
                    this.visible = false;
                    this.setting = {}
                    this.$notification.success({
                        message: 'Success',
                        description: 'Record Updated!'
                    })
                    this.init();
                })
                .catch(error=>{
                    console.log(error)
                })
            }else{
                this.$http.post('/settings', this.setting)
                .then(result=>{
                    console.log(JSON.stringify(result))
                    this.loading = false;
                    this.visible = false;
                    this.setting = {}
                    this.$notification.success({
                        message: 'Success',
                        description: 'New Record Created!'
                    })
                    this.init();
                })
                .catch(error=>{
                    console.log(error)
                })
            }
        }
    }
}
</script>

<style >
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