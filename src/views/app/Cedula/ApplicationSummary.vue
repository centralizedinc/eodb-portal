<template>
  <a-card
    :headStyle="{ border: 'none', color: '#7f7f7f', 'font-size': '25px' }"
    :bodyStyle="{ 'padding-top': 0 }"
    title="Application Summary"
  >
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Part I. Personal Details</a-divider>
    <a-col :xs="{span: 12}" :md="{span:20}" :xl="{span:20}">
          <a-row class="summary-row">
            <a-col :span="8">Issued To</a-col>
            <a-col :span="1">:</a-col>
            <a-col :span="15" style="text-transform:uppercase">{{form.issued_to}}</a-col>
          </a-row>
          <a-row class="summary-row">
            <a-col :span="8">Citizenship</a-col>
            <a-col :span="1">:</a-col>
            <a-col :span="15" style="text-transform:uppercase">{{form.personal_details.citizenship}}</a-col>
          </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Last Name</a-col>
      <a-col :span="1">:</a-col>

      <a-col :span="15" style="text-transform:uppercase">{{form.personal_details.name.last}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">First Name</a-col>
      <a-col :span="1">:</a-col>

      <a-col :span="10" style="text-transform:uppercase">{{form.personal_details.name.first}}</a-col>
    </a-row>

    <a-row class="summary-row">
      <a-col :span="8">Middle Name</a-col>
      <a-col :span="1">:</a-col>

      <!-- <a-col :span="15">{{ form.personal_details.name.middle }}</a-col> -->
      <a-col :span="15" style="text-transform:uppercase">
        {{
        form.personal_details.name.middle == null || form.personal_details.name.suffix == "" || form.personal_details.name.suffix == undefined
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
        form.personal_details.name.suffix == null || form.personal_details.name.suffix == ""
        ? " - "
        : form.personal_details.name.suffix
        }}
      </a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Birthday</a-col>
      <a-col :span="1">:</a-col>

      <a-col
        :span="10"
        style="text-transform:uppercase"
      >{{formatDate(form.personal_details.birthdate, null, true)}}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Gender</a-col>
      <a-col :span="1">:</a-col>

      <a-col :span="15" style="text-transform:uppercase">{{ form.personal_details.gender }}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Civil Status</a-col>
      <a-col :span="1">:</a-col>

      <!-- <a-col :span="15">{{form.personal_details.civil_status}}</a-col> -->
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

      <a-col :span="10" style="text-transform:uppercase">{{ form.personal_details.birthplace }}</a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">If other country</a-col>
      <a-col :span="1">:</a-col>

      <a-col :span="15" style="text-transform:uppercase">
        {{
        form.personal_details.other_country == null ||
        form.personal_details.other_country == ""
        ? " - "
        : form.personal_details.other_country
        }}
      </a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">ICR No. (if alien)</a-col>
      <a-col :span="1">:</a-col>

      <!-- <a-col :span="15">{{ form.personal_details.icr_no }}</a-col> -->
      <a-col :span="15" style="text-transform:uppercase">
        {{
        form.personal_details.icr_no == null || form.personal_details.icr_no == ""
        ? " - "
        : form.personal_details.icr_no
        }}
      </a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Height (cm)</a-col>
      <a-col :span="1">:</a-col>

      <a-col :span="15" style="text-transform:uppercase">
        {{
        form.personal_details.height == null ||
        form.personal_details.height == ""
        ? " - "
        : form.personal_details.height
        }}
      </a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Weight (kg)</a-col>
      <a-col :span="1">:</a-col>

      <a-col :span="15" style="text-transform:uppercase">
        {{
        form.personal_details.weight == null ||
        form.personal_details.weight == ""
        ? " - "
        : form.personal_details.weight
        }}
      </a-col>
    </a-row>
    <a-row class="summary-row">
      <a-col :span="8">Occupation</a-col>
      <a-col :span="1">:</a-col>

      <a-col :span="15" style="text-transform:uppercase">
        {{
        form.personal_details.occupation == null ||
        form.personal_details.occupation == ""
        ? " - "
        : form.personal_details.occupation
        }}
      </a-col>
    </a-row>
    <br />
  <a-divider
          style="color: black;font-weight: bold;margin-top: 5vh"
          orientation="left"
        >Part II. Address</a-divider>
        <a-row type="flex" justify="start">
          <a-col :xs="{span: 12}" :md="{span:20}" :xl="{span:20}">
            <a-row class="summary-row">
              <a-col :span="8">Address</a-col>
              <a-col :span="1">:</a-col>
              <a-col :span="15" style="text-transform:uppercase">
                {{address}}!
                <!-- {{form.address.region}}{{form.address.province}}
                {{form.address.city}}{{form.address.barangay}}{{form.address.postal_code}}-->
              </a-col>
            </a-row>
          </a-col>
        </a-row>
    <a-divider></a-divider>
    <a-row type="flex" justify="start">
      <a-col :xs="{span: 24}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}" :xl="{span:24}">
        <a-table
          :scroll="{ x: 300, y: 300 }"
          :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
        >
          <template slot="taxable_amount" slot-scope="text, record, index">
            <span v-if="index > 1 && index < 5">Php {{ text }}</span>
          </template>
          <template slot="community_tax" slot-scope="text, record, index">
            <span v-if="index == 0 || index > 1">Php {{ text }}</span>
          </template>
        </a-table>
      </a-col>
    </a-row>
    <!-- button -->
    <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
      <a-col :sm="{ span: 24 }" :md="{ span: 24 }" :xl="{ span: 24 }">
        <a-button-group>
          <a-button @click="$emit('prev')">Previous</a-button>
          <a-button type="primary" @click="$emit('payment')">Proceed to Payment</a-button>
        </a-button-group>
      </a-col>
      <!-- <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
        <a-button>Save Draft</a-button>
      </a-col>-->
    </a-row>
    </a-col>
  </a-card>
</template>
<script>
import regions_data from "@/assets/references/regions.json";
import provinces_data from "../../../assets/references/provinces.json";

export default {
  props: ["form", "step", "errors"],
  data() {
    return {
      data: [
        {
          name: "Basic Community Tax (P5.00) Voluntary or Exempted (P1.00)",
          taxable_amount: null,
          community_tax: null
        },
        {
          name: "Additional Community Tax (Tax not to exceed P5,000.00)",
          taxable_amount: null,
          community_tax: null
        },
        {
          name:
            "Gross Receipts or Earnings derived from business during the profession or pursuit of any occupation (P1.00 for every P1,000.00)",
          taxable_amount: null,
          community_tax: null
        },
        {
          name:
            "Salaries or Gross Receipts or Earnings derived from exercise of profession or pursuit of any occupation (P1.00 for every P1,000.00)",
          taxable_amount: null,
          community_tax: null
        },
        {
          name: "Income from Real Property (P1.00 for every P1,000)",
          taxable_amount: null,
          community_tax: null
        },
        {
          name: "Total",
          taxable_amount: null,
          community_tax: null
        },
        {
          name: "Interest",
          taxable_amount: null,
          community_tax: null
        },
        {
          name: "Total Amount Paid",
          taxable_amount: null,
          community_tax: null
        }
      ],
      loading: false,
      columns: [
        {
          title: "",
          dataIndex: "name",
          width: 100,
          fixed: "left"
        },
        {
          title: "Taxable Amount",
          dataIndex: "taxable_amount",
          scopedSlots: { customRender: "taxable_amount" }
        },
        {
          title: "Community Tax Due",
          dataIndex: "community_tax",
          scopedSlots: { customRender: "community_tax" }
        }
      ]
    };
  },
  mounted() {
    console.log("form data: " + JSON.stringify(this.form));
    this.form.tax.taxable.basic == "voluntary"
      ? (this.data[0].community_tax = 5)
      : (this.data[0].community_tax = 1);
    this.form.tax.community.basic = this.data[0].community_tax;
    // this.data[0].taxable_amount;
    // this.data[1].taxable_amount;
    // this.data[2].taxable_amount;
    this.data[2].taxable_amount = this.form.tax.taxable.business_income;
    this.data[2].community_tax = this.form.tax.taxable.business_income / 1000;
    this.form.tax.community.business_income = this.data[2].community_tax;
    // this.data[3].taxable_amount;
    this.data[3].taxable_amount = this.form.tax.taxable.profession_income;
    this.data[3].community_tax = this.form.tax.taxable.profession_income / 1000;
    this.form.tax.community.profession_income = this.data[3].community_tax;
    // this.data[4].taxable_amount;
    this.data[4].taxable_amount = this.form.tax.taxable.property_income;
    this.data[4].community_tax = this.form.tax.taxable.property_income / 1000;
    this.form.tax.community.property_income = this.data[4].community_tax;
    this.data[5].community_tax =
      this.data[0].community_tax +
      this.data[1].community_tax +
      this.data[2].community_tax +
      this.data[3].community_tax +
      this.data[4].community_tax;
    this.form.tax.total = this.data[5].community_tax;
    this.data[6].community_tax = 0;
    this.form.tax.interest = this.data[6].community_tax;
    this.data[7].community_tax =
      this.data[5].community_tax + this.data[6].community_tax;
    this.form.tax.total_amount_paid = this.data[7].community_tax;
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
      } = this.form.address;
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
<style></style>

