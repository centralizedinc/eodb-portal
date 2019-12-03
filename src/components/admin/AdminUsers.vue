<template>
<div>
  <a-row type="flex" justify="end">
    <a-col :span="4">
        <a-button type="primary" block icon="plus" @click="visible=true" >NEW USER</a-button>
    </a-col>
    <a-col :span="24">
         <a-table style="margin-top: 2vh" :dataSource="admins" :columns="cols">
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
        <span style="color:#FFFFFF">New Administrator</span>
    </div>
      <a-form>
        <a-form-item label="Email">
            <a-input placeholder="Input Email" v-model="admin.email"></a-input>
        </a-form-item>
        <a-form-item label="First Name">
            <a-input placeholder="First Name" v-model="admin.name.first"></a-input>
        </a-form-item>
        <a-form-item label="Middle Name">
            <a-input placeholder="Middle Name" v-model="admin.name.middle"></a-input>
        </a-form-item>
        <a-form-item label="Last Name">
            <a-input placeholder="Last Name" v-model="admin.name.last"></a-input>
        </a-form-item>
        <a-form-item label="Department ">
            <a-input placeholder="Department" v-model="admin.department"></a-input>
        </a-form-item>
        <a-form-item label="Role">
            <a-input placeholder="Role" v-model="admin.role"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" icon="save" block @click="submit" :loading="loading">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
</div> 
      
</template>

<script>
export default {
    data(){
        return {
            loading:false,
            admin:{
                name:{}
            },
            visible:false,
            admins:[],
            cols:[
                {
                    title:'Username',
                    dataIndex:'email',
                },{
                    title:'Department',
                    dataIndex:'department',
                },
                {
                    title:'Role',
                    dataIndex:'role',
                },
                {
                    title:'Date Created',
                    dataIndex:'date_created',
                    scopedSlots:{customRender:'date'}
                },
                {
                    title:'Date Modified',
                    dataIndex:'date_created',
                    scopedSlots:{customRender:'date'}
                },
                {
                    title:'Status   ',
                    dataIndex:'status',
                }
            ]
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.$http.get('/admins')
            .then(users=>{
                this.admins = users.data
            })
            .catch(error=>{
                console.log(error)
            })
        },
        onClose(){
            this.visible = false
        },
        submit(){
            this.$http.post('/admins', this.admin)
            .then(result=>{
                console.log(JSON.stringify(result))
                this.visible = false;
                this.$notification.success({
                    message: 'Success',
                    description: 'New Administrator Created!'
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
.ant-drawer-header{
    background: #242B30
}
.ant-drawer-close {
    color: #ffffff
}
</style>