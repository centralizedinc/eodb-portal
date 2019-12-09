<template>
  <a-row type="flex" :gutter="16">
    <a-col :span="14">
        <application-summary :form="form" :read-only="true"></application-summary> 
        <a-card style="margin-top:2vh">
            <h2 >Requirements</h2>
        </a-card>
    </a-col>
    <a-col :span="10">
        <a-affix :offsetTop="10">
            <a-card style="background-color: #242B30;border-radius:10px">
                <a-list size="large" bordered :dataSource="checklist" style="background-color: #FFFFFF">
                    <a-list-item slot="renderItem" slot-scope="item">
                        <a-list-item-meta :title="item.name" :description="item.description">
                            <a-checkbox slot="avatar"></a-checkbox> 
                        </a-list-item-meta>
                    </a-list-item>
                    <h2 slot="header">Application Checklist</h2>
                </a-list>
                                    
                <a-textarea style="margin-top: 1vh" :rows="3" placeholder="Remarks"></a-textarea>
                <a-divider></a-divider>
                <a-button-group>
                    
                    <a-button  size="large" icon="issues-close">For Compliance</a-button>   
                    <a-button type="danger" size="large" icon="stop" >Denied</a-button>                     
                    <a-button type="primary" size="large" icon="check-circle">Approved</a-button>
                </a-button-group>            
            </a-card>
        </a-affix>
    </a-col>
  </a-row>
</template>

<script>
import ApplicationSummary from '@/views/app/BusinessPermit/ApplicationSummary'
export default {
    
    components:{
        ApplicationSummary
    },
    data(){
        return {
            form:{
                owner_details:{
                    name:{}
                },
                owner_address:{},
                business_details:{},
                business_address:{}
            },
            checklist:[
                'Police Clearance',
                'Barangay Clearance'
            ]
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.$http.get('/checklists')
            .then(results =>{
                this.checklist = results.data
            })
            this.form = this.$store.state.admin_session.review
        }
    }
}
</script>

<style>

</style>