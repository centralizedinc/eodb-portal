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
    >Part I. Business Owner Information</a-divider>
    <a-row class="summary-row">
      <a-col :span="8">Last Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.owner_details.name.last}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">FIrst Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.owner_details.name.first}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Middle Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.owner_details.name.middle}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Date of Birth</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{formatDate(form.owner_details.birthdate)}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Gender</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
      >{{form.owner_details.gender === 'M' ? 'Male' : form.owner_details.gender === 'F' ? 'Female' : ''}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Telephone Number</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.owner_details.telno}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Email Address</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.owner_details.email}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Address</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{owner_address}}</a-col>
    </a-row>

    <!-- Part II. Business Details -->
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Part II. Business Details</a-divider>
    <a-row class="summary-row">
      <a-col :span="8">Application Type</a-col>
      <a-col :span="1">:</a-col>
      <a-col
        :span="15"
      >{{form.application_type === 0 ? 'New' : form.application_type === 0 ? 'Renewal' : ''}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Type of Business</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{getBusinessType(form.business_details.business_type)}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Business Name</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.business_name}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Trade Name/Franchise</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.franchise}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">{{`${reg_code} Registration No`}}</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.registration_no}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">{{`${reg_code} Date of Registration`}}</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.registration_date}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Tax Identification No.(TIN)</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.tin}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">CTC No.</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.ctc_no}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Property Index Number(PIN)</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.pin}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Business Area(in sq m)</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.business_area}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">No of Employees in Establishment</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.employees_establishment}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">No of Employees Residing in LGU</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.employees_residing}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Business Address</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{business_address}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Are you enjoying tax incentive from any Government Entity?</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.enjoying_tax_incentive ? 'YES':'NO'}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Is the place of business rented?</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.is_rented ? 'YES':'NO'}}</a-col>
    </a-row>

    <template v-if="form.business_details.is_rented">
      <a-divider
        style="color: black;font-weight: bold;margin-top: 5vh"
        orientation="left"
      >Part IIA. Rental Details</a-divider>
      <a-row class="summary-row">
        <a-col :span="8">Monthly Rental</a-col>
        <a-col :span="1">:</a-col>
        <a-col :span="15">{{formatCurrency(form.business_address.rental)}}</a-col>
      </a-row>
      <a-row class="summary-row">
        <a-col :span="8">Lessor Name</a-col>
        <a-col :span="1">:</a-col>
        <a-col :span="15">{{form.business_address.lessor_name}}</a-col>
      </a-row>
      <a-row class="summary-row">
        <a-col :span="8">Contact Number</a-col>
        <a-col :span="1">:</a-col>
        <a-col :span="15">{{form.business_address.contact_no}}</a-col>
      </a-row>
      <a-row class="summary-row">
        <a-col :span="8">Email Address</a-col>
        <a-col :span="1">:</a-col>
        <a-col :span="15">{{form.business_address.email}}</a-col>
      </a-row>
      <a-row class="summary-row">
        <a-col :span="8">Business Rental Address</a-col>
        <a-col :span="1">:</a-col>
        <a-col :span="15">{{rental_address}}</a-col>
      </a-row>
    </template>

    <!-- Part III. Business Activity -->
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Part III. Business Activity</a-divider>
    <a-table
      :dataSource="form.business_details.line_of_business"
      :columns="line_of_business_columns"
    ></a-table>

    <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
      <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 18 }">
        <a-button-group>
          <a-button @click="$emit('prev')" :disabled="loading">Previous</a-button>
          <a-button type="primary" @click="$emit('payment')" :disabled="loading">Proceed to Payment</a-button>
        </a-button-group>
      </a-col>
      <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 6 }" style="text-align: right;">
        <a-button :disabled="loading">Save Draft</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import regions_data from "../../../assets/references/regions.json";
import provinces_data from "../../../assets/references/provinces.json";

export default {
  props: ["form", "step", "loading"],
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
      owner_address: "",
      business_address: "",
      rental_address: ""
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
    this.getRentalAddress();
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
      } = this.form.owner_address;
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
          this.owner_address = result_address.toUpperCase();
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
    getRentalAddress() {
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
      } = this.form.business_address.rental_address;
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
          this.rental_address = result_address.toUpperCase();
        })
        .catch((err) => {
          console.log('err :', err);
        })
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