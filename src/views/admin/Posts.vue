<template>
   <a-card>
       <!-- <a-affix :offsetTop="40"> -->
    <a-tabs tabPosition="left">
        <a-tab-pane key="0" tab="Mayor's Corner">     
            <a-row type="flex" justify="end">
              <a-col :span="24">
                  <a-textarea rows="4" placeholder="Write new post here..." v-model="message"></a-textarea>
              </a-col>
              <a-col :span="10" style="margin-top: 2vh; text-align: right">
                  <a-button-group>
                      <a-button icon="video-camera">Attach Video</a-button>
                      <a-button icon="picture">Attach Image</a-button>
                    <a-button type="primary" icon="share-alt" @click="post">Submit</a-button>
                    
                </a-button-group>
              </a-col>
            </a-row>
            <a-divider></a-divider>         
            <mayors-corner></mayors-corner>  
        </a-tab-pane>
        <a-tab-pane key="1" tab="Public Service">  
            <public-service :admin="true"></public-service>      
        </a-tab-pane>  
    </a-tabs>
    <!-- </a-affix> -->
  </a-card>
</template>

<script>
import MayorsCorner from '@/components/MayorsCorner'
import PublicService from '@/components/PublicService'
export default {
    components:{
        MayorsCorner,
        PublicService
    },
    data(){
        return {
            message:''
        }
    },
    created(){
        this.init()
    },
    methods: {
        init() {
            
        },  
        post(){
            this.$store.commit('POST_MAYOR_CORNER', 
                {
                    date: new Date(),
                    message: this.message,
                    attachments: [],
                    likes: 0
                }
            )
            this.message = ''
            this.$notification.success({
                message: 'Success',
                description:'Your message was successfully posted.'
            })
        }      
    }
}
</script>

<style>

</style>