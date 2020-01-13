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
      <a-col :span="15" style="text-transform:uppercase">{{form.personal_details.name.last}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">First Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">{{form.personal_details.name.first}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Middle Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">
        {{
        form.personal_details.name.middle == null|| form.personal_details.name.middle == ""
        ? " - "
        : form.personal_details.name.middle
        }}
      </a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Suffix</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">
        {{
        form.personal_details.name.suffix == null
        ? " - " || form.personal_details.name.suffix == ""
        : form.personal_details.name.suffix
        }}
      </a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Birthday</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{formatDate(form.personal_details.birthdate, null, true)}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Gender</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">{{form.personal_details.gender}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Civil Status</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">
        {{
        form.personal_details.civil_status == null ||
        form.personal_details.civil_status == ""
        ? " - "
        : form.personal_details.civil_status
        }}
      </a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Birthplace</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">{{form.personal_details.birthplace}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">If other country</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.personal_details.other_country == null || form.personal_details.other_country == "" ? "-" : form.personal_details.other_country}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">ICR No. (if alien)</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.personal_details.icr_no == null || form.personal_details.icr_no == "" ? "-" : form.personal_details.icr_no}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Height (cm)</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">{{form.personal_details.height}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Weight (kg)</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">{{form.personal_details.weight}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Blood Type</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">{{form.personal_details.blood_type}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Identification Marks</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.personal_details.identification_marks == null || form.personal_details.identification_marks== "" ? "-": form.personal_details.identification_marks}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Complexion</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">{{form.personal_details.complexion}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Educational Attainment</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.personal_details.educational_attainment}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Occupation</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">{{form.personal_details.occupation}}</a-col>
    </a-row>
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Part II. Family Background</a-divider>
    <a-row class="summary-row">
      <a-col :span="8">Father Last Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{(form.family_background.father_info.name.last == null || form.family_background.father_info.name.last == "" ? "-" : form.family_background.father_info.name.last)}}</a-col>
    </a-row>

    <a-row class="summary-row">
      <a-col :span="8">First Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{(form.family_background.father_info.name.first == null || form.family_background.father_info.name.first == "" ? "-" : family_background.father_info.name.first)}}</a-col>
    </a-row>

    <a-row class="summary-row">
      <a-col :span="8">Middle Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{(form.family_background.father_info.name.middle == null || form.family_background.father_info.name.middle == "" ? "-": form.family_background.father_info.name.middle)}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Suffix</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{(form.family_background.father_info.name.suffix == null || form.family_background.father_info.name.suffix == "" ? "-" : form.family_background.father_info.name.suffix)}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Birth Place</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{(form.family_background.father_info.birthplace == null || form.family_background.father_info.birthplace == "" ? "-" : form.family_background.father_info.birthplace)}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">If other country</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{(form.family_background.father_info.other_country == null || form.family_background.father_info.other_country == "" ? "-" : form.family_background.father_info.other_country)}}</a-col>
    </a-row>
    <!-- mother -->
    <br />
    <a-row class="summary-row">
      <a-col :span="8">Mother Last Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{(form.family_background.mother_info.name.last == null || form.family_background.mother_info.name.last == "" ? "-" : form.family_background.mother_info.name.last)}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">First Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{(form.family_background.mother_info.name.first == null || form.family_background.mother_info.name.first =="" || form.family_background.mother_info.name.first == " " || form.family_background.mother_infor.name.first == undefined ? "-" : form.family_background.mother_info.name.first)}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Middle Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.family_background.mother_info.name.middle == null || form.family_background.mother_info.name.middle =="" ? "-" : form.family_background.mother_info.name.middle}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Suffix</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.family_background.mother_info.name.suffix == null || form.family_background.mother_info.name.suffix == "" ? "-" : form.family_background.mother_info.name.suffix }}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Birth Place</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.family_background.mother_info.birthplace == null || form.family_background.mother_info.birthplace == "" ? "-" : form.family_background.mother_info.birthplace}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">If other country</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.family_background.mother_info.other_country == null || form.family_background.mother_info.other_country == "" ? "-" : form.family_background.mother_info.other_country}}</a-col>
    </a-row>
    <!-- spouse -->
    <br />
    <a-row class="summary-row">
      <a-col :span="8">Spouse Last Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.family_background.spouse_info.name.last == null || form.family_background.spouse_info.name.last == "" ? "-" : form.family_background.spouse_info.name.last }}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">First Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.family_background.spouse_info.name.first == null || form.family_background.spouse_info.name.first == "" ? "-" : form.family_background.spouse_info.name.first}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Middle Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.family_background.spouse_info.name.middle == null || form.family_background.spouse_info.name.middle == "" ? "-" : form.family_background.spouse_info.name.middle}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Suffix</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.family_background.spouse_info.name.suffix == null || form.family_background.spouse_info.name.suffix == "" ? "-" : form.family_background.spouse_info.name.suffix}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Birth Place</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.family_background.spouse_info.birthplace == null || form.family_background.spouse_info.birthplace == "" ? "-" : form.family_background.spouse_info.birthplace}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">If other country</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform:uppercase"
      >{{form.family_background.spouse_info.other_country == null || form.family_background.spouse_info.other_country == "" ? "-" : form.family_background.spouse_info.other_country}}</a-col>
    </a-row>
    <!-- contact address -->
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Part III. Contact / Address</a-divider>
    <a-row class="summary-row">
      <a-col :span="8">Address</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">
        {{address}}
        <!-- {{form.address_details.region}}{{form.address_details.province}}
        {{form.address_details.city}}{{form.address_details.barangay}}{{form.address_details.postal_code}}-->
      </a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Telephone</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">{{form.contact_details.tel_no}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Mobile</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">{{form.contact_details.mobile}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Email</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform:uppercase">{{form.contact_details.email}}</a-col>
    </a-row>
    <!-- button -->
    <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
      <!-- <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 6 }"> -->
      <a-col :span="24">
        <a-button-group>
          <a-button @click="$emit('prev')">Previous</a-button>
          <a-button type="primary" @click="$emit('payment')">Proceed to Payment</a-button>
        </a-button-group>
      </a-col>
      <!-- <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
        <a-button>Save Draft</a-button>
      </a-col>-->
    </a-row>
  </a-card>
</template>
<script>
import regions_data from "@/assets/references/regions.json";
import provinces_data from "../../../assets/references/provinces.json";

console.log("regions_data :", regions_data);

export default {
  props: ["form", "step", "errors"],
  data() {
    return {
      address: ""
    };
  },
  created() {
    console.log("this.regions_datasss :", regions_data);
    this.getAddress();
  },
  methods: {
    getRegionByCode(code) {
      const data = regions_data.find(v => v.regCode === code);
      return data.regDesc;
    },
    getProvinceByCode(code) {
      const data = provinces_data.find(v => v.provCode === code);
      return data.provDesc;
    },
    getAddress() {
      const {
        unit_no,
        bldg_no,
        bldg_name,
        subdivision,
        street,
        barangay,
        province,
        city,
        region,
        postal_code
      } = this.form.address_details;
      var city_desc = "";
      import(`../../../assets/references/cities/${province}.json`)
        .then(data => {
          const cities = data.default;
          var city_data = cities.find(v => v.citymunCode === city);
          city_desc = city_data.citymunDesc;
          return import(`../../../assets/references/barangay/${city}.json`);
        })
        .then(data => {
          const barangays = data.default;
          console.log("barangay :", barangay);
          console.log("barangays :", barangays);
          var brgy_data = barangays.find(
            v => v.brgyCode.toString() === barangay.toString()
          );
          var brgy_desc = brgy_data.brgyDesc;
          console.log("brgy desc: " + JSON.stringify(brgy_desc));
          var result_address = "";
          if (unit_no) result_address += `Unit ${unit_no},`;
          if (bldg_no) result_address += ` ${bldg_no}`;
          if (bldg_name) result_address += ` ${bldg_name}`;
          if (subdivision) result_address += ` ${subdivision}`;
          if (street) result_address += ` ${street}`;
          if (barangay) result_address += ` ${brgy_desc}`;
          if (province) result_address += `${this.getProvinceByCode(province)}`;
          if (city) result_address += ` ${city_desc}`;
          if (region) result_address += `, ${this.getRegionByCode(region)}`;
          if (postal_code) result_address += `, ${postal_code}`;

          this.address = result_address.toUpperCase();
          console.log("result_address data: " + JSON.stringify(this.address));
        })
        .catch(err => {
          console.log("err :", err);
        });
    }
  }
};
</script>
<style>
</style>