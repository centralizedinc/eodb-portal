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
      <a-col :span="15">{{form.owner_details.gender}}</a-col>
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
      <a-col :span="15">{{getAddress(form.owner_address)}}</a-col>
    </a-row>

    <!-- Part II. Business Details -->
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Part II. Business Details</a-divider>
    <a-row class="summary-row">
      <a-col :span="8">Application Type</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.application_type}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Type of Business</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.business_details.business_type}}</a-col>
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
      <a-col :span="15">{{getAddress(form.business_address)}}</a-col>
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
      <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :xl="{ span: 10 }">
        <a-button-group>
          <a-button @click="$emit('changeStep', step-1)">Previous</a-button>
          <a-button type="primary" @click="$emit('submit')">Submit</a-button>
        </a-button-group>
      </a-col>
      <a-col :xs="{ span: 24 }" :sm="{ span: 6 }" :xl="{ span: 11 }">
        <a-button>Save Draft</a-button>
      </a-col>
      <a-col :xs="{ span: 24 }" :sm="{ span: 6 }" :xl="{ span: 3 }">
        <a-button type="danger">Close</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  props: ["form", "step"],
  data() {
    return {
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
      ]
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
  methods: {
    getAddress(address) {
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
      } = address;
      var result_address = "";
      if (unit_no) result_address += `Unit ${unit_no},`;
      if (bldg_no) result_address += ` ${bldg_no}`;
      if (bldg_name) result_address += ` ${bldg_name}`;
      if (subdivision) result_address += ` ${subdivision}`;
      if (street) result_address += ` ${street}`;
      if (barangay) result_address += ` ${barangay}`;
      if (province) result_address += ` ${province}`;
      if (city) result_address += ` ${city}`;
      if (region) result_address += `, ${region}`;
      if (postal_code) result_address += `, ${postal_code}`;
      return result_address;
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