<template>
  <div>
  <a-row type="flex" justify="end">
    <a-col :span="4">
        <a-button type="primary" block icon="plus" @click="visible=true" >NEW DEPARTMENT</a-button>
    </a-col>
    <a-col :span="24">
         <a-table style="margin-top: 2vh" :dataSource="offices" :columns="cols" :bordered="true" :loading="loading">
             <span slot="date" slot-scope="text">
                {{formatDate(text, 'time')}}
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
        <span style="color:#FFFFFF">New Department</span>
    </div>
      <a-form>
        <a-form-item label="Department Name">
            <a-input placeholder="Enter Name" v-model="office.name"></a-input>
        </a-form-item>
        <a-form-item label="Description">
            <a-textarea placeholder="Description" v-model="office.description" :rows="5"></a-textarea>
        </a-form-item>
        <a-form-item label="System Administrator" :extra="office.admin?'Are you sure you want this new office to have Administrator priviledges? System Administrators can modify the application settings. If you want to continue, hit the submit button otherwise set the System Administrator flag back to NO.':''">
            <!-- <a-textarea placeholder="Description" v-model="office.description" :rows="5"></a-textarea> -->
            <a-switch checkedChildren="YES" unCheckedChildren="NO" :checked="office.admin"  @click="office.admin=!office.admin"></a-switch>
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
            office:{
                admin:false
            },
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
            this.loading = true;
            this.$http.get('/departments')
            .then(results=>{
                this.loading = false
                this.offices = results.data;
            })
        },
        onClose(){
            this.office={admin:false}
            this.visible = false;
            this.edit_mode = false;
        },
        edit(record){
            this.edit_mode = true;
            this.office = this.deepCopy(record)
            this.visible = true
        },
        submit(){
            this.loading = true;
            if(this.edit_mode){
                this.$http.post(`/departments/${this.office._id}`, this.office)
                .then(result=>{
                    console.log(JSON.stringify(result))
                    this.loading = false;
                    this.visible = false;
                    this.$notification.success({
                        message: 'Success',
                        description: 'Department Office Updated!'
                    })
                    this.office = {
                        admin:false
                    }
                    this.init();
                })
                .catch(error=>{
                    console.log(error)
                })

            }else{
                this.$http.post('/departments', this.office)
                .then(result=>{
                    console.log(JSON.stringify(result))
                    this.loading = false;
                    this.visible = false;
                    this.$notification.success({
                        message: 'Success',
                        description: 'New Department Office Created!'
                    })
                    this.office = {
                        admin:false
                    }
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

<style>
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