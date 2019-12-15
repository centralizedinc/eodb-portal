<template>
  <div>
  <a-row type="flex" justify="end">
    <a-col :span="4">
        <a-button type="primary" block icon="plus" @click="visible=true" >NEW ROLE</a-button>
    </a-col>
    <a-col :span="24">
         <a-table style="margin-top: 2vh" :dataSource="roles" :columns="cols" :bordered="true" :loading="loading">
             <span slot="date" slot-scope="text">
                {{formatDate(text)}}
            </span>
            <span slot="department" slot-scope="text">
                {{getDepartment(text)}}
            </span>
            <span slot="actions" slot-scope="text,record" style="font-align:center">
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
        <span style="color:#FFFFFF">New Role</span>
    </div>
      <a-form>
        <a-form-item label="Name">
            <a-input placeholder="Enter Name" v-model="role.name"></a-input>
        </a-form-item>
        <a-form-item label="Description">
            <a-textarea placeholder="Description" v-model="role.description" :rows="5"></a-textarea>
        </a-form-item>
        <a-form-item label="Department">
            <a-select v-model="role.department" placeholder="Select Department">
              <a-select-option v-for="office in offices" :key="office._id" :value="office._id">{{`${office.name} - ${office.description}`}}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="User Role is allowed to approve and assess application details" :extra="role.readOnly?'Read Only users are only allowed to view the application details':'Approver Roles are allowed to assess application details'">
            <!-- <a-textarea placeholder="Description" v-model="office.description" :rows="5"></a-textarea> -->
            <a-switch checkedChildren="Approver" unCheckedChildren="Read Only" :checked="!role.readOnly" @click="role.readOnly=!role.readOnly"></a-switch>
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
            role:{
                readOnly:true
            },
            roles:[],
            offices:[],
            cols:[
                {
                    title:'Name',
                    dataIndex:'name',
                },
                {
                    title:'Description',
                    dataIndex:'description',
                },
                {
                    title:'Department',
                    dataIndex:'department',
                     scopedSlots:{customRender:'department'}
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
                    scopedSlots:{customRender:'actions'}
                },
            ]
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            //get offices
            this.loading = true
            this.$http.get('/departments')
            .then(results=>{
                this.loading = false
                this.offices = results.data;
            })
            //get roles
            this.$http.get('/roles')
            .then(results =>{
                 this.roles = results.data;
            })
        },
        onClose(){
            this.role={readOnly:true}
            this.visible = false;
            this.edit_mode = false;
        },
        getDepartment(id){
            return this.offices.find(x => x._id === id).description
        },
        edit(record){
            this.edit_mode = true;
            this.role = this.deepCopy(record)
            this.visible = true
        },
        submit(){
            this.loading = true;
            if(this.edit_mode){
                this.$http.post(`/roles/${this.role._id}`, this.role)
                .then(result=>{
                    console.log(JSON.stringify(result))
                    this.loading = false;
                    this.visible = false;
                    this.$notification.success({
                        message: 'Success',
                        description: 'Role Updated!'
                    })
                    this.role = {readOnly:true}
                    this.init();
                })
                .catch(error=>{
                    console.log(error)
                })
            }else{
                this.$http.post('/roles', this.role)
                .then(result=>{
                    console.log(JSON.stringify(result))
                    this.loading = false;
                    this.visible = false;
                    this.$notification.success({
                        message: 'Success',
                        description: 'New Role Created!'
                    })
                    this.role = {readOnly:true}
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