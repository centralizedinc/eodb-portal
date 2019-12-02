<template>

 <a-row type="flex" justify="center" :gutter="16">
     <a-col :span="6">
         <status-card title="facebook" icon="facebook" color="#1990FF" :stat="Math.floor(Math.random()* 123)"></status-card>
     </a-col>
     <a-col :span="6">
         <status-card title="google" icon="google" color="#F5222D" :stat="Math.floor(Math.random()* 123)"></status-card>
     </a-col>
     <a-col :span="6">
         <status-card title="email" icon="mail" color="#FAAD14" :stat="Math.floor(Math.random()* 123)"></status-card>
     </a-col>
     <a-col :span="6">
         <status-card title="administrators" icon="team" color="#52C41A" :stat="Math.floor(Math.random()* 123)"></status-card>
     </a-col>
    <a-col :span="24" style="margin-top:1vh">
        <a-card>
            <a-tabs >
              <a-tab-pane key="1" >
                  <div slot="tab">
                      <span>REGISTERED USERS</span>
                  </div>
                  <registered-users></registered-users>
              </a-tab-pane>
              <a-tab-pane key="2">
                  <div slot="tab">
                      <span>ADMINISTRATORS</span>
                  </div>
                  <admin-users></admin-users>
              </a-tab-pane>
            </a-tabs>
            
        </a-card>
    </a-col>
 </a-row>
  
</template>

<script>
import StatusCard from '@/components/admin/StatusCard'
import RegisteredUsers from '@/components/admin/Users'
import AdminUsers from '@/components/admin/AdminUsers'
export default {
components:{
    StatusCard,
    RegisteredUsers,
    AdminUsers
},
  data(){
    return{
    cols:[{

    }],
      admin_cols:[{
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