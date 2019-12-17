<template>
    <a-row type="flex" justify="center" align="middle" :gutter="24">
        <a-col :span="12">
            <inbox-card></inbox-card>
        </a-col>
        <a-col :span="12">
            <outbox-card></outbox-card>
        </a-col>
        <a-col :span="24" style="margin-top: 2vh">
            <a-tabs >
              <a-tab-pane key="1" >
                  <div slot="tab">
                      <span>INBOX</span>
                  </div>
                  <application-inbox></application-inbox>
              </a-tab-pane>
              <a-tab-pane key="2" >
                  <div slot="tab">
                      <span>OUTBOX</span>
                  </div>
                  <application-outbox></application-outbox>
              </a-tab-pane>
            </a-tabs>
            
        </a-col>
        
    </a-row>
</template>

<script>
import InboxCard from '@/components/admin/InboxCard'
import OutboxCard from '@/components/admin/OutboxCard'
import StatusCard from '@/components/admin/StatusCard'
import ApplicationInbox from '@/components/admin/ApplicationInbox'
import ApplicationOutbox from '@/components/admin/ApplicationOutbox'

export default {
    components:{
        InboxCard,
        OutboxCard,
        StatusCard,
        ApplicationInbox,
        ApplicationOutbox
    },
    data(){
    },
    created(){
        this.init()
    },
    methods:{
        init(){
        },
        
    }
}
</script>

<style>

</style>