<template>
    <a-row  type="flex" :gutter="16" justify="center" align="middle">
    
          <a-col :span="12" style="background-color: #242B30">
              <div style="border: none; height: 20vh; width: 100%; background:center;background-repeat: no-repeat;background-size: cover; background-image: url('https://picsum.photos/300');"> 
                <a-card style="border: none; height: 20vh; width: 100%; background:#000000a6">                
                <a-row type="flex" justify="start" align="middle">
                    <a-col :span="10">
                    <a-avatar style="border: 1px solid #FFFFFF" shape="square" :size="64" src="http://lorempixel.com/200/200/people/">
                    </a-avatar>              
                    </a-col>
                    <a-col :span="14">
                    <span style="color: #FFFFFF; font-weight: bold">{{getFullName()}}</span>    
                    <p style="font-size:10px; color: #FFFFFF">{{$store.state.admin_session.admin.role}}</p>          
                    </a-col>
                </a-row>  
                           
                </a-card>
            </div>
             <a-divider></a-divider>
            <a-form style="margin-top:2vh">
                  <a-form-item label="First Name" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input v-model="admin.name.first"></a-input>
                  </a-form-item>
                  <a-form-item label="Middle Name" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input v-model="admin.name.middle"></a-input>
                  </a-form-item>
                  <a-form-item label="Last Name" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input v-model="admin.name.last"></a-input>
                  </a-form-item>
                  <a-form-item label="Email" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input v-model="admin.email"></a-input>
                  </a-form-item>
                  <a-form-item label="Department" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input :disabled="true" v-model="admin.department"></a-input>
                  </a-form-item>
                  <a-form-item label="Role" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input :disabled="true" v-model="admin.role"></a-input>
                  </a-form-item>
                <a-divider></a-divider>
                <a-form-item >
                      <a-button type="primary" size="large" block icon="save" @click="save">Submit</a-button>
                  </a-form-item>
                </a-form>  
          </a-col>
        <!-- <a-col :span="12">
            <div style="border: none; height: 20vh; width: 100%; background:center;background-repeat: no-repeat;background-size: cover; background-image: url('https://picsum.photos/300');"> 
                <a-card style="border: none; height: 20vh; width: 100%; background:#000000a6">
                
                <a-row type="flex" justify="start" align="middle">
                    <a-col :span="10">
                    <a-avatar style="border: 1px solid #FFFFFF" shape="square" :size="64" src="http://lorempixel.com/200/200/people/">
                    </a-avatar>              
                    </a-col>
                    <a-col :span="14">
                    <span style="color: #FFFFFF; font-weight: bold">Balita, Ariel A.</span>    
                    <p style="font-size:10px; color: #FFFFFF">Department Head</p>          
                    </a-col>
                </a-row>                    
                </a-card>
            </div>
        </a-col>
        <a-col :span="12">
            <a-form>
              <a-form-item >
                <span slot="label" style="color:#FFFFFF">First Name</span>
                  <a-input></a-input>
              </a-form-item>
              <a-form-item >
                <span slot="label" style="color:#FFFFFF">First Name</span>
                  <a-input></a-input>
              </a-form-item>
              <a-form-item >
                <span slot="label" style="color:#FFFFFF">First Name</span>
                  <a-input></a-input>
              </a-form-item>
              <a-form-item >
                <span slot="label" style="color:#FFFFFF">First Name</span>
                  <a-input></a-input>
              </a-form-item>
              <a-form-item >
                <span slot="label" style="color:#FFFFFF">First Name</span>
                  <a-input></a-input>
              </a-form-item>

            </a-form>
        </a-col> -->
    </a-row>
</template>

<script>
export default {
    data(){
        return{
            admin:{}
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.admin = this.deepCopy(this.$store.state.admin_session.admin)
        },
        getFullName(){
            var admin = this.$store.state.admin_session.admin
            if(admin.name){
                return `${admin.name.last}, ${admin.name.first} ${admin.name.middle?admin.name.middle.substring(0,1)+'.':''}`
            }else{
                return admin.email
            }
        },
        save(){
            var _self = this
            this.$confirm({
            title: 'You are about to save the changes on your profile. Do you wish to continue?',
            content: 'Click OK will save the changes and log you out of the system.',
            onOk() {
                _self.$http.post(`/admins/${_self.admin._id}`, _self.admin)
                .then(result=>{
                    _self.$notification.success({
                        message:'Success!',
                        description:'Your account has been updated'
                    })
                    _self.$store.commit('ADMIN_LOGOUT')
                    _self.$router.push('/admin')
                })
                .catch(error=>{
                    _self.$notification.error({
                        message:'Error!',
                        description:'There was a problem updating the account. Please try again.'
                    })
                })
            },
            onCancel() {},
            });
            
        }
    }
}
</script>

<style >
.ant-drawer-header{
    background: #242B30
}
.ant-form-item-label label {
    color: #FFFFFF;
    font-weight: bold
}
</style>