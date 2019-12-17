<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title">
      <a-col :span="22" style="font-size: 25px;">New Applicant Registration</a-col>
      <a-col :span="2" style="text-align: right;">
        <!-- <a-tooltip placement="left">
          <span slot="title">
            Secure Business Permit in 6 steps (all fields marked with an asterisk
            <i
              style="color: red;"
            >*</i> is required.)
          </span>
          <a-icon type="info-circle" />
        </a-tooltip>-->
      </a-col>
    </a-row>
    <!-- form start -->
    <a-form>
      <a-divider style="color: black;font-weight: bold;" orientation="left">Personal Details</a-divider>
      <!-- <a-row>
        <a-col :xs="{ span: 24 }">
          <a-form-item>
            <a-checkbox @change="onChange">Check this box if the registrant is the applicant</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>-->
      <!-- <a-form-item></a-form-item> -->
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.name.last') ? 'error': ''"
            :help="checkErrors('personal_details.name.last')"
          >
            <span slot="label">
              Last Name
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.personal_details.name.last"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.name.first') ? 'error': ''"
            :help="checkErrors('personal_details.name.first')"
          >
            <span slot="label">
              First Name
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.personal_details.name.first"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item>
            <span slot="label">Middle Name</span>
            <a-input v-model="form.personal_details.name.middle"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-form-item>
            <span slot="label">Suffix</span>
            <a-input v-model="form.personal_details.name.suffix"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
</style>