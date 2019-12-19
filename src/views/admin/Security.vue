<template>
  <a-row  type="flex" :gutter="16" justify="center" align="middle">
      <a-col :span="18">
          <a-card>
              <a-tabs>
                <a-tab-pane key="1">
                    <template slot="tab">
                        <a-icon type="lock"></a-icon>
                        <span>CHANGE PASSWORD</span>
                    </template>
                    <a-card>
                        <a-form>
                        <a-form-item label="Old Password" extra="Enter your Old Password">
                            <a-input v-model="account.old_password" type="password"></a-input>
                        </a-form-item>
                        <a-form-item label="New Password" extra="You cannot use your previous 5 passwords. Password should contain atleast one special character, a number and an uppercase letter">
                            <a-input v-model="account.new_password" type="password"></a-input>
                        </a-form-item>
                        <a-form-item 
                                label="Confirm Password" 
                                extra="Re-type your new password. New Password must match this field"
                                has-feedback 
                                :validate-status="account.new_password===account.confirm_password?'':'error'" 
                                :help="account.new_password===account.confirm_password?'':'Password Mismatch'">
                            <a-input v-model="account.confirm_password" type="password" ></a-input>
                        </a-form-item>
                        <a-form-item >
                            <a-button 
                                :loading="loading"
                                type="primary" 
                                icon="save" 
                                :disabled="account.new_password!==account.confirm_password"
                                @click="submit">Change Password</a-button>
                        </a-form-item>
                        </a-form>
                    </a-card>
                </a-tab-pane>
                <a-tab-pane key="2">
                    <template slot="tab">
                        <a-icon type="setting"></a-icon>
                        <span>SETTINGS</span>
                    </template>
                    <a-card>
                        <a-form>
                            <a-form-item label="Enable two-factor Authentication (2FA)" extra="2FA is a security process to help protect your account. This a 2 step verification process where you will enter first your user crendentials, then portal will ask you to enter a One Time Pin (OTP) sent either thru your email or on yout mobile number.">
                                <a-switch size="large" v-model="settings.tfa"></a-switch>
                            </a-form-item>
                            <a-form-item v-if="settings.tfa" label="One-Time Pin Channel" extra="The Channel where the One-Time Pin (OTP) will be sent. The pin sent every login attempt. Make sure you have access to your email or mobile number.">
                                <a-select v-model="settings.tfa_email">
                                  <a-select-option key="1" value="1">Email Address</a-select-option>
                                  <a-select-option key="2" value="2" disabled="true">Phone Number (Not Yet Available)</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Enable Auto Lock Screen" extra="Enabling this feature will auto lock your session, during the time-out. This will protect your account from unauthorized acess.">
                                <a-switch size="large" v-model="settings.als"></a-switch>
                            </a-form-item>
                            <a-form-item v-if="settings.als" label="Lock Screen Time-out" extra="Idle Time. When this time is reached, the portal will enable the auto lock screen feature. ">
                                <a-select v-model="settings.als_timeout">    
                                  <a-select-option key="5" value="5">5 Minutes</a-select-option>  
                                  <a-select-option key="10" value="10">10 Minutes</a-select-option>                            
                                  <a-select-option key="15" value="15">15 Minutes</a-select-option>
                                  <a-select-option key="30" value="30">30 Minutes</a-select-option>
                                  <a-select-option key="60" value="60">1 Hour</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item>
                                <a-button :loading="loading" type="primary" icon="save" @click="saveSettings">Save Security Settings</a-button>
                            </a-form-item>
                        </a-form>
                    </a-card>
                </a-tab-pane>
              </a-tabs>
          </a-card>
      </a-col>
  </a-row>
</template>

<script>
export default {
    data(){
        return{
            loading:false,
            account:{},
            settings:{}
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            // console.log('USER:::', JSON.stringify(this.$store.state.admin_session.admin))
            this.account._id = this.$store.state.admin_session.admin._id
            this.settings = this.$store.state.admin_session.admin.settings?this.$store.state.admin_session.admin.settings:{}
        },
        submit(){
            this.loading = true;
            this.$http.post(`/admins/password/${this.account._id}`, this.account)
            .then(result=>{
                this.loading = false;
                this.$notification.success({
                    message:'Your Password has been updated!',
                    description:'You are automatically logout'
                })
                this.$store.commit('ADMIN_LOGOUT')
                this.$router.push('/admin')
            })
            .catch(error=>{
                this.loading = false;
                console.error(error)
                this.$notification.error({
                    message:'Error!',
                    description:'Invalid Password.'
                })
            })
        },
        saveSettings(){
            this.loading = true;
            this.$http.post(`/admins/settings/${this.account._id}`, this.settings)
            .then(result=>{
                this.loading = false;
                this.$notification.success({
                    message:'Success!',
                    description:'Security Settings was saved.'
                })
                this.$router.push('/admin/app')
            })
            .catch(error=>{
                this.loading = false;
                console.error(error)
                this.$notification.error({
                    message:'Error!',
                    description:'Error on saving user settings. Contact your System Administrator'
                })
            })
        }
    }
}
</script>

<style>
.ant-form-item-label label {
    color: #000000;
    font-weight: bold
}
</style>