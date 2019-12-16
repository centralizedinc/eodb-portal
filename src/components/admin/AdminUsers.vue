<template>
<div>
  <a-row type="flex" justify="end">
    <a-col :span="4">
        <a-button type="primary" block icon="plus" @click="visible=true" >NEW USER</a-button>
    </a-col>
    <a-col :span="24">
         <a-table style="margin-top: 2vh" :dataSource="admins" :columns="cols" :bordered="true">
             <span slot="date" slot-scope="text">
                {{formatDate(text)}}
            </span>
            <span slot="department" slot-scope="text">
                {{getDepartment(text)}}
            </span>
            <span slot="role" slot-scope="text">
                {{getRole(text)}}
            </span>
            <span slot="actions" slot-scope="text, record">
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
      class="header"
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
            <a-select v-model="admin.department" placeholder="Select Department" @change="changeDept">
              <a-select-option v-for="office in offices" :key="office._id" :value="office._id">{{office.name}}</a-select-option>
            </a-select>
            <!-- <a-input placeholder="Department" v-model="admin.department"></a-input> -->
        </a-form-item>
        <a-form-item label="Role" >
            <a-select v-model="admin.role" placeholder="Select Role">
              <a-select-option v-for="role in department_roles" :key="role._id" :value="role._id">{{role.name}}</a-select-option>
            </a-select>
            <!-- <a-input placeholder="Role" v-model="admin.role"></a-input> -->
        </a-form-item>
        <a-form-item label="Auto-Generate Password" :label-col="{span:10}" :wrapper-col="{span:6}" v-if="!edit_mode">
            <a-switch :checked="generate" @click="generate=!generate" @change="generatePassword"/>
        </a-form-item>  
        <a-form-item label="Password" v-if="!edit_mode">
            <a-input placeholder="Password" v-model="admin.password" :disabled="generate"></a-input>
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
            edit_mode:false,
            loading:false,
            admin:{
                name:{}
            },
            department_roles:[],
            generate:false,
            visible:false,
            offices:[],
            roles:[],
            admins:[],
            cols:[
                {
                    title:'Username',
                    dataIndex:'email',
                },{
                    title:'Department',
                    dataIndex:'department',
                    scopedSlots:{customRender:'department'}
                },
                {
                    title:'Role',
                    dataIndex:'role',
                    scopedSlots:{customRender:'role'}
                },
                {
                    title:'Date Created',
                    dataIndex:'date_created',
                    scopedSlots:{customRender:'date'}
                },
                {
                    title:'Date Modified',
                    dataIndex:'date_modified',
                    scopedSlots:{customRender:'date'}
                },
                {
                    title:'Status   ',
                    dataIndex:'status',
                },
                {
                    title:'Actions',
                    dataIndex:'_id',
                    scopedSlots:{customRender:'actions'}
                }
            ]
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            //get offices
            this.$http.get('/departments')
            .then(results=>{
                this.offices = results.data;
            })
            //get roles
            this.$http.get('/roles')
            .then(results =>{
                 this.roles = results.data;
            })
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
            this.admin ={
                name:{}
            }
        },
        edit(record){
            this.edit_mode = true;
            this.admin = this.deepCopy(record)
            this.visible = true
            this.department_roles = this.roles.filter(x=>x.department === this.admin.department)
        },
        getDepartment(id){
            return this.offices.find(x => x._id === id)?this.offices.find(x => x._id === id).description:''
        },
        getRole(id){
            return this.roles.find(x => x._id === id)?this.roles.find(x => x._id === id).description:''
        },
        changeDept(){
            this.department_roles = this.roles.filter(x=>x.department === this.admin.department)
        },
        generatePassword(){
            if(!this.generate){
                this.admin.password= this.generateRandomPassword()
            }
        },
        generateRandomPassword() {
            var length = 8,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            console.log(retVal)
            return retVal;
        },
        submit(){
            if(this.edit_mode){
                this.$http.post(`/admins/${this.admin._id}`, this.admin)
                .then(result=>{
                    console.log(JSON.stringify(result))
                    this.visible = false;
                    this.$notification.success({
                        message: 'Success',
                        description: 'Admin User updated!'
                    })
                    this.init();
                    this.admin = {
                        name:{}
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            }else{
                this.$http.post('/admins', this.admin)
                .then(result=>{
                    console.log(JSON.stringify(result))
                    this.visible = false;
                    this.$notification.success({
                        message: 'Success',
                        description: 'New Administrator Created!'
                    })
                    this.init();
                    this.admin = {
                        name:{}
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            }
            
        },
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