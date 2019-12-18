<template>
  <a-row  type="flex" :gutter="16" justify="center" align="middle">
      <a-col :span="18">
          <a-card>
              <a-tabs>
                <a-tab-pane key="1" tab="CHANGE PASSWORD">
                    <a-card>
                        <a-form>
                        <a-form-item label="Old Password" extra="Enter your Old Password">
                            <a-input v-model="account.old_password"></a-input>
                        </a-form-item>
                        <a-form-item label="New Password" extra="You cannot use your previous 5 passwords. Password should contain atleast one special character, a number and an uppercase letter">
                            <a-input v-model="account.new_password" ></a-input>
                        </a-form-item>
                        <a-form-item label="Confirm Password" extra="New Password must match this field">
                            <a-input v-model="account.confirm_password" ></a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" icon="save">Change Password</a-button>
                        </a-form-item>
                        </a-form>
                    </a-card>
                </a-tab-pane>
                <a-tab-pane key="2" tab="SETTINGS">
                    <a-card>
                        <a-form>
                            <a-form-item label="Enable two-factor Authentication (2FA)" extra="2FA is a security process to help protect your account. This a 2 step verification process where you will enter first your user crendentials, then portal will ask you to enter a One Time Pin (OTP) sent either thru your email or on yout mobile number.">
                                <a-switch size="large"></a-switch>
                            </a-form-item>
                            <a-form-item label="One-Time Pin Channel" extra="The Channel where the One-Time Pin (OTP) will be sent. The pin sent every login attempt. Make sure you have access to your email or mobile number.">
                                <a-select>
                                  <a-select-option key="1" value="1">Email Address</a-select-option>
                                  <a-select-option key="2" value="2">Phone Number</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Enable Auto Lock Screen" extra="Enabling this feature will auto lock your session, during the time-out. This will protect your account from unauthorized acess.">
                                <a-switch size="large"></a-switch>
                            </a-form-item>
                            <a-form-item label="Lock Screen Time-out" extra="Idle Time. When this time is reached, the portal will enable the auto lock screen feature. ">
                                <a-select>    
                                  <a-select-option key="5" value="5">5 Minutes</a-select-option>  
                                  <a-select-option key="10" value="10">10 Minutes</a-select-option>                            
                                  <a-select-option key="15" value="15">15 Minutes</a-select-option>
                                  <a-select-option key="30" value="30">30 Minutes</a-select-option>
                                  <a-select-option key="60" value="60">1 Hour</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" icon="save">Save Security Settings</a-button>
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
            account:{}
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