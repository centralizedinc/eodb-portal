<template>
    <div :style="constant_helper.theme.default">
           <a-card  
              title="Profile"
        style="margin-top:10%" 
        :tabList="tabListNoTitle"
        :activeTabKey="noTitleKey"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
        >
        <a-form  v-if="noTitleKey === 'personal_details'">
            <a-form-item
            label="Last Name *">
                 <a-input/>
            </a-form-item>
            <a-form-item
            label="First Name *">
                 <a-input/>
            </a-form-item>
            <a-form-item
            label="Middle Name">
                 <a-input/>
            </a-form-item>
            <a-form-item
            label="Suffix">
                 <a-input/>
            </a-form-item>
            <a-button type="primary" style="width:100%">Save Changes</a-button>
        </a-form>
        <a-form  v-if="noTitleKey === 'change_password'">
            <a-form-item
            label="Current Password">
                 <a-input type="password"/>
            </a-form-item>
            <a-form-item
            label="New Password">
                 <a-input type="password"/>
            </a-form-item>
            <a-form-item
            label="Verify Password">
                 <a-input type="password"/>
            </a-form-item>
            <a-button type="primary" style="width:100%">Save Changes</a-button>
        </a-form>
        </a-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
        //     tabList: [
        //   {
        //     key: 'tab1',
        //     // tab: 'tab1',
        //     scopedSlots: { tab: 'customRender' },
        //   },
        //   {
        //     key: 'tab2',
        //     tab: 'tab2',
        //   },
        // ],
        // contentList: {
        //   tab1: 'content1',
        //   tab2: 'content2',
        // },
            tabListNoTitle: [
          {
            key: 'personal_details',
            tab: 'Personal Details',
          },
          {
            key: 'change_password',
            tab: 'Change Password',
          },
        ],
         key: 'tab1',
        noTitleKey: 'personal_details',
        }
    },
    methods: {
      onTabChange(key, type) {
        console.log(key, type);
        this[type] = key;
      },
    },
    created(){
        
    }
}
</script>
<style>

</style>