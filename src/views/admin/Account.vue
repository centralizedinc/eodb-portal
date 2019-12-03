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
                    <span style="color: #FFFFFF; font-weight: bold">Balita, Ariel A.</span>    
                    <p style="font-size:10px; color: #FFFFFF">Department Head</p>          
                    </a-col>
                </a-row>  
                           
                </a-card>
            </div>
             <a-divider></a-divider>
            <a-form style="margin-top:2vh">
                  <a-form-item label="First Name" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input></a-input>
                  </a-form-item>
                  <a-form-item label="Middle Name" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input></a-input>
                  </a-form-item>
                  <a-form-item label="Last Name" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input></a-input>
                  </a-form-item>
                  <a-form-item label="Email" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input></a-input>
                  </a-form-item>
                  <a-form-item label="Department" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input :disabled="true"></a-input>
                  </a-form-item>
                  <a-form-item label="Role" :labelCol="{span:6}" :wrapperCol="{span:14}">
                      <a-input :disabled="true"></a-input>
                  </a-form-item>
                <a-divider></a-divider>
                <a-form-item >
                      <a-button type="primary" block icon="save">Submit</a-button>
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

}
</script>

<style>
.ant-form-item-label label {
    color: #FFFFFF;
    font-weight: bold
}
</style>