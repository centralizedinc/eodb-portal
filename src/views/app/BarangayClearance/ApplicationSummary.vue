<template>
  <a-card
    :headStyle="{ border: 'none', color: '#7f7f7f', 'font-size': '25px' }"
    :bodyStyle="{ 'padding-top': 0 }"
    title="Application Summary"
  >
    <!-- Part I. Business Owner Information -->
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Part I. Personal Details</a-divider>
    <a-row class="summary-row">
      <a-col :span="8">Last Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform: uppercase">{{form.personal_details.name.last}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">First Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform: uppercase">{{form.personal_details.name.first}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Middle Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform: uppercase"
      >{{form.personal_details.name.middle == null || form.personal_details.name.middle == "" ? "-" : form.personal_details.name.middle}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Date of Birth</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform: uppercase"
      >{{formatDate(form.personal_details.birthdate, null, true)}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Place of Birth</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform: uppercase">{{form.personal_details.birthplace}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Gender</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform: uppercase">{{form.personal_details.gender}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Civil Status</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
        style="text-transform: uppercase"
      >{{form.personal_details.civil_status == null || form.personal_details.civil_status == "" ? "-" : form.personal_details.civil_status}}</a-col>
    </a-row>

    <a-row class="summary-row">
      <a-col :span="8">CTC No.</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform: uppercase">{{form.personal_details.ctc_no}}</a-col>
    </a-row>

    <a-row class="summary-row" v-if="form.purpose.includes('pc')">
      <a-col :span="8">Address</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15" style="text-transform: uppercase">{{residential_address}}</a-col>
    </a-row>

    <!-- Part II. Business Details -->
    <template v-if="form.purpose.includes('bp')">
      <a-divider
        style="color: black;font-weight: bold;margin-top: 5vh"
        orientation="left"
      >Part II. Business Details</a-divider>
      <a-row>
        <a-col :span="8">Business Owner Name</a-col>
        <a-col :span="1">:</a-col>
        <a-col :span="15" style="text-transform: uppercase">{{form.business_details.business_owner}}</a-col>
      </a-row>
      <a-row class="summary-row">
        <a-col :span="8">Business Name</a-col>
        <a-col :span="1">:</a-col>
        <a-col :span="15" style="text-transform: uppercase">{{form.business_details.business_name}}</a-col>
      </a-row>
      <a-row class="summary-row">
        <a-col :span="8">Trade Name/Franchise</a-col>
        <a-col :span="1">:</a-col>
        <a-col :span="15" style="text-transform: uppercase">{{form.business_details.franchise}}</a-col>
      </a-row>

      <a-row class="summary-row">
        <a-col :span="8">Business Address</a-col>
        <a-col :span="1">:</a-col>
        <a-col :span="15" style="text-transform: uppercase">{{business_address}}</a-col>
      </a-row>
    </template>

    <a-row type="flex" justify="space-between" style="margin-top: 5vh;" v-if="!readOnly">
      <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 18 }">
        <a-button-group>
          <a-button @click="$emit('prev')" :disabled="loading">Previous</a-button>
          <a-button type="primary" @click="$emit('payment')" :disabled="loading">Proceed to Payment</a-button>
        </a-button-group>
      </a-col>
      <!-- <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 6 }" style="text-align: right;">
        <a-button :disabled="loading">Save Draft</a-button>
      </a-col>-->
    </a-row>
  </a-card>
</template>

<script>
import regions_data from "../../../assets/references/regions.json";
import provinces_data from "../../../assets/references/provinces.json";

export default {
  props: ["form", "loading", "read-only"],
  data() {
    return {
      regions_data,
      provinces_data,
      line_of_business_columns: [
        {
          title: "Line of Business",
          dataIndex: "description"
        },
        {
          title: "No of Units",
          dataIndex: "units"
        },
        {
          title: "Capitalization",
          dataIndex: "capital_investment"
        },
        {
          title: "Essential",
          dataIndex: "essential"
        },
        {
          title: "Non-Essential",
          dataIndex: "non_essential"
        }
      ],
      residential_address: "",
      business_address: ""
    };
  },
  computed: {
    reg_code() {
      if (this.form.business_details.business_type === "SP") return "DTI";
      else if (
        this.form.business_details.business_type === "P" ||
        this.form.business_details.business_type === "CN"
      )
        return "SEC";
      else if (this.form.business_details.business_type === "CE") return "CDA";
      return "";
    }
  },
  created() {
    console.log('this.form :', this.form);
    this.getBusinessAddress();
    this.getOwnerAddress();
  },
  methods: {
    getRegionByCode(code) {
      const data = this.regions_data.find(v => v.regCode === code);
      return data.regDesc;
    },
    getProvinceByCode(code) {
      const data = this.provinces_data.find(v => v.provCode === code);
      return data.provDesc;
    },
    getOwnerAddress() {
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
      } = this.form.residential_address;
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
          var brgy_data = barangays.find(v => v.brgyCode === barangay);
          var brgy_desc = brgy_data.brgyDesc;
          var result_address = "";
          if (unit_no) result_address += `Unit ${unit_no},`;
          if (bldg_no) result_address += ` ${bldg_no}`;
          if (bldg_name) result_address += ` ${bldg_name}`;
          if (subdivision) result_address += ` ${subdivision}`;
          if (street) result_address += ` ${street}`;
          if (barangay) result_address += ` ${brgy_desc}`;
          if (province)
            result_address += ` ${this.getProvinceByCode(province)}`;
          if (city) result_address += ` ${city_desc}`;
          if (region) result_address += `, ${this.getRegionByCode(region)}`;
          if (postal_code) result_address += `, ${postal_code}`;
          this.residential_address = result_address.toUpperCase();
        });
    },
    getBusinessAddress() {
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
      } = this.form.business_address;
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
          var brgy_data = barangays.find(v => v.brgyCode === barangay);
          var brgy_desc = brgy_data.brgyDesc;
          var result_address = "";
          if (unit_no) result_address += `Unit ${unit_no},`;
          if (bldg_no) result_address += ` ${bldg_no}`;
          if (bldg_name) result_address += ` ${bldg_name}`;
          if (subdivision) result_address += ` ${subdivision}`;
          if (street) result_address += ` ${street}`;
          if (barangay) result_address += ` ${brgy_desc}`;
          if (province)
            result_address += ` ${this.getProvinceByCode(province)}`;
          if (city) result_address += ` ${city_desc}`;
          if (region) result_address += `, ${this.getRegionByCode(region)}`;
          if (postal_code) result_address += `, ${postal_code}`;
          this.business_address = result_address.toUpperCase();
        });
    },
    getBusinessType(type) {
      if (type === "SP") return "Single Proprietorship";
      else if (type === "P") return "Partnership";
      else if (type === "CE") return "Cooperative";
      else if (type === "CN") return "Corporation";
    }
  }
};
</script>

<style>
.summary-row {
  padding-bottom: 1vh;
  padding-left: 1vw;
}
</style>