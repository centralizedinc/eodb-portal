<template>
  <a-card
    :headStyle="{ border: 'none', color: '#7f7f7f', 'font-size': '25px' }"
    :bodyStyle="{ 'padding-top': 0 }"
    title="Application Summary"
  >
    <!-- Personal details -->
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Part I. Personal Details</a-divider>
    <a-row class="summary-row">
      <a-col :span="8">Last Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.name.last}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">First Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.name.first}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Middle Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.name.middle}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Suffix</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.name.suffix}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Birthday</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.birthday}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Gender</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.gender}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Civil Status</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.civil_status}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Birthplace</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.Birthplace}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">If other country</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.other_country}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">ICR No. (if alien)</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.icr}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Height (cm)</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.height}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Weight (kg)</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.weight}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Blood Type</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.blood_type}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Identification Marks</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.identification_marks}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Complexion</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.complexion}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Educational Attainment</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.educational_attainment}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Occupation</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.occupation}}</a-col>
    </a-row>
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Part II. Family Background</a-divider>
    <a-row class="summary-row">
      <a-col :span="8">Father Last Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.father_info.name.last}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">First Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.father_info.name.first}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Middle Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.father_info.name.middle}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Suffix</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.father_info.name.suffix}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Birth Place</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.father_info.birthplace}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">If other country</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.father_info.other_country}}</a-col>
    </a-row>
    <!-- mother -->
    <br />
    <a-row class="summary-row">
      <a-col :span="8">Mother Last Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.mother_info.name.last}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">First Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.mother_info.name.first}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Middle Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.mother_info.name.middle}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Suffix</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.mother_info.name.suffix}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Birth Place</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.mother_info.birthplace}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">If other country</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.mother_info.other_country}}</a-col>
    </a-row>
    <!-- spouse -->
    <br />
    <a-row class="summary-row">
      <a-col :span="8">Spouse Last Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.spouse_info.name.last}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">First Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.spouse_info.name.first}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Middle Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.spouse_info.name.middle}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Suffix</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.spouse_info.name.suffix}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Birth Place</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.spouse_info.birthplace}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">If other country</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.family_background.spouse_info.other_country}}</a-col>
    </a-row>
    <!-- contact address -->
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Part III. Contact / Address</a-divider>
    <a-row class="summary-row">
      <a-col :span="8">Address</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">
        {{form.address_details.region}}{{form.address_details.province}}
        {{form.address_details.city}}{{form.address_details.barangay}}{{form.address_details.postal_code}}
      </a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Telephone</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.contact_details.tel_no}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Mobile</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.contact_details.mobile}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Email</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.contact_details.email}}</a-col>
    </a-row>
    <!-- button -->
    <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
      <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 6 }">
        <a-button-group>
          <a-button @click="$emit('prev')">Previous</a-button>
          <a-button type="primary" @click="$emit('next')">To Proceed</a-button>
        </a-button-group>
      </a-col>
      <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
        <a-button>Save Draft</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
export default {
  props: ["form", "step", "errors"],
  data() {
    return {};
  }
};
</script>
<style>
</style>