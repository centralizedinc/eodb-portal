<template>
  <div>
  <a-row type="flex" justify="end">
    <a-col :span="4">
        <a-button type="primary" block icon="plus" @click="visible=true" >NEW ROLE</a-button>
    </a-col>
    <a-col :span="24">
         <a-table style="margin-top: 2vh" :dataSource="roles" :columns="cols">
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
              <a-select-option v-for="office in offices" :key="office._id" :value="office._id">{{office.name}}</a-select-option>
            </a-select>
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
            role:{},
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
        },
        onClose(){
            this.visible = false;
        },
        submit(){
            this.loading = true;
            this.$http.post('/roles', this.role)
            .then(result=>{
                console.log(JSON.stringify(result))
                this.loading = false;
                this.visible = false;
                this.$notification.success({
                    message: 'Success',
                    description: 'New Role Created!'
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