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
                <a-list-item slot="renderItem" slot-scope="item, index">
                    <a-checkbox></a-checkbox> <span style="margin-left:2vh">{{item}}</span>
                </a-list-item>
                <h2 slot="header">Application Checklist</h2>
                </a-list>
                                    
                <a-textarea style="margin-top: 1vh" :rows="3" placeholder="Remarks"></a-textarea>
                <a-divider></a-divider>
                <a-button-group>
                    <a-button type="danger" size="large" icon="stop" >Denied</a-button>
                    <a-button type="primary" size="large" icon="issues-close">For Compliance</a-button>                        
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
    }
}
</script>

<style>

</style>