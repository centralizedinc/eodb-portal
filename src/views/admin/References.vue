<template>
  <div>
  <a-row type="flex" justify="end">
    <a-col :span="4">
        <a-button type="primary" block icon="plus" @click="visible=true" >NEW RECORD</a-button>
    </a-col>
    <a-col :span="24">
         <a-table style="margin-top: 2vh" :dataSource="settings" :columns="cols">
             <span slot="date" slot-scope="text, record">
                {{formatDate(text)}}
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
            ]
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.$http.get('/settings')
            .then(results =>{
                console.log(JSON.stringify(results))
                 this.settings = results.data.result;
            })
        },
        onClose(){
            this.visible = false;
        },
        submit(){
            this.loading = true;
            this.$http.post('/settings', this.setting)
            .then(result=>{
                console.log(JSON.stringify(result))
                this.loading = false;
                this.visible = false;
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
</script>

<style>

</style>