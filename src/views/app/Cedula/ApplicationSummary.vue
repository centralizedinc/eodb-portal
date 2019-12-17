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
      <a-col :span="15">{{form.personal_details.birthplace}}</a-col>
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
      <a-col :span="8">Occupation</a-col>
      <a-col :span="1">:</a-col>
      <a-col :span="15">{{form.personal_details.occupation}}</a-col>
    </a-row>
    <a-divider></a-divider>
    <a-row>
      <a-col :span="24">
        <a-table :columns="columns" :dataSource="data" :pagination="pagination" :loading="loading"></a-table>
      </a-col>
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
            "Gross Receipts or Earningsderived from business during the profession or pursuit of any occupation (P1.00 for every P1,000.00)",
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
          width: "50%"
        },
        {
          title: "Taxable Amount",
          dataIndex: "taxable_amount"
        },
        {
          title: "Community Tax Due",
          dataIndex: "community_tax"
        }
      ]
    };
  }
};
</script>
<style>
</style>