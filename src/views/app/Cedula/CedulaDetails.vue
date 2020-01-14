<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title" type="flex" justify="space-between">
      <a-col :xs="{span: 0}" :sm="{span: 0}" :md="{span: 21}" :xl="{span: 21}">
        <h1 style="font-size:25px; color: #7e7e7e">New Applicant Registration</h1>
      </a-col>
      <a-col :xs="{span: 21}" :sm="{span: 21}" :md="{span: 0}" :xl="{span: 0}">
        <h1 style="font-size:25px; color: #7e7e7e">
          New Applicant
          <br />Registration
        </h1>
      </a-col>
    </a-row>
    <a-form>
      <a-divider style="color: black;font-weight: bold;" orientation="left">Personal Details</a-divider>
      <!-- <a-row>
        <a-col :xs="{ span: 24 }">
          <a-form-item>
            <a-checkbox @change="onChange">Check this box if the registrant is the applicant</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>-->
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
          :validate-status="
              checkErrors('issued_to') ? 'error' : ''
            "
            :help="checkErrors('issued_to')"
          >
            <span slot="label">
              Issued To
              <i style="color: red">*</i>
            </span>
            <a-select v-model="form.issued_to">
              <a-select-option value="Individual">Individual</a-select-option>
              <a-select-option value="Corporation">Corporation</a-select-option>
              </a-select>
          </a-form-item>
        </a-col>  
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="
              checkErrors('personal_details.cititenship') ? 'error' : ''
            "
            :help="checkErrors('personal_details.cititenship')"
          >
            <span slot="label">
              Citizenship
              <i style="color: red">*</i>
            </span>
           <a-input v-model="form.personal_details.citizenship"></a-input>
          </a-form-item>
        </a-col>  
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="
              checkErrors('personal_details.name.last') ? 'error' : ''
            "
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
            :validate-status="
              checkErrors('personal_details.name.first') ? 'error' : ''
            "
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
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="
              checkErrors('personal_details.birthdate') ? 'error' : ''
            "
            :help="checkErrors('personal_details.birthdate')"
          >
            <span slot="label">
              Birthday
              <i style="color: red">*</i>
            </span>
            <a-date-picker
              style="width: 100%;"
              v-model="form.personal_details.birthdate"
              :disabledDate="v => disableDateInBirthdate(v, true)"
              :defaultPickerValue="defaultBdayPickerValue"
              :showToday="false"
            ></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="
              checkErrors('personal_details.birthplace') ? 'error' : ''
            "
            :help="checkErrors('personal_details.birthplace')"
          >
            <span slot="label">
              Birthplace
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.personal_details.birthplace" placeholder="Enter Municipality"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">
              ICR No.
              <i>(if alien)</i>
            </span>
            <a-input v-model="form.personal_details.icr_no"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 5 }">
          <a-form-item
            :validate-status="
              checkErrors('personal_details.gender') ? 'error' : ''
            "
            :help="checkErrors('personal_details.gender')"
          >
            <span slot="label">
              Gender
              <i style="color: red">*</i>
            </span>
            <a-select v-model="form.personal_details.gender">
              <a-select-option value="male">Male</a-select-option>
              <a-select-option value="female">Female</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item>
            <span slot="label">Civil Status</span>
            <a-select v-model="form.personal_details.civil_status">
              <a-select-option value="single">Single</a-select-option>
              <a-select-option value="married">Married</a-select-option>
              <a-select-option value="widowed">Widowed</a-select-option>
              <a-select-option value="separated">Separated</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 5 }">
          <a-form-item>
            <span slot="label">Height(cm)</span>
            <a-input-number v-model="form.personal_details.height"/>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 5 }">
          <a-form-item>
            <span slot="label">Weight(kg)</span>
            <a-input-number v-model="form.personal_details.weight"/>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">
              Occupation
              <!-- <i style="color: red">*</i> -->
            </span>

            <a-input v-model="form.personal_details.occupation"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">
              TIN
              <i>(if any)</i>
            </span>
            <input
              type="text"
              name="number"
              class="ant-input"
              maxlength="11"
              v-model="form.personal_details.tin"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <a-form-item
            :validate-status="
              checkErrors('tax.taxable.basic') ? 'error' : ''
            "
            :help="checkErrors('tax.taxable.basic')"
          >
            <span slot="label">
              Basic Community Tax
              <i style="color: red">*</i>
            </span>
            <a-select v-model="form.tax.taxable.basic" @change="computation">
              <a-select-option value="voluntary">Voluntary</a-select-option>
              <a-select-option value="exempted">Exempted</a-select-option>
            </a-select>
            <!-- <a-input v-model="form.tax.basic"></a-input> -->
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <a-form-item>
            <span slot="label">Income from Real Property</span>

            <a-input v-model="form.tax.taxable.property_income" @change="computation"></a-input>
          </a-form-item>
          <!-- <a-form-item>
            <span slot="label">Additional Community Tax</span>
            <a-input v-model="form.tax.taxable.additional" @change="computation"></a-input>
          </a-form-item>-->
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <a-form-item>
            <span slot="label">Gross Receipts or Earnings</span>

            <a-tooltip placement="bottom">
              <template slot="title">
                <span>Gross Receipts or Earnings derived business during the preceding year</span>
              </template>
              <a-input v-model="form.tax.taxable.business_income" @change="computation"></a-input>
            </a-tooltip>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <a-form-item>
            <span slot="label">Salaries/Gross Receipts/Earnings</span>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>
                  Salaries or Gross Receipts or Earnings derived exercise of
                  profession or pursuit of any occupation
                </span>
              </template>
              <a-input v-model="form.tax.taxable.profession_income" @change="computation"></a-input>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">Income from Real Property</span>

            <a-input v-model="form.tax.taxable.property_income" @change="computation"></a-input>
          </a-form-item>
        </a-col>
      </a-row>-->
      <!-- table -->

      <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
        <a-col :sm="{ span: 24 }" :md="{ span: 24 }" :xl="{ span: 24 }">
          <a-button-group>
            <!-- <a-button @click="$emit('prev')">Previous</a-button> -->
            <a-button type="primary" @click="$emit('next')">Next</a-button>
          </a-button-group>
        </a-col>
        <!-- <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
          <a-button>Save Draft</a-button>
        </a-col>-->
      </a-row>
    </a-form>
  </a-card>
</template>


<script>
import moment from "moment";

export default {
  props: ["form", "step", "errors", "computation_formula"],
  data() {
    return {};
  },
  mounted() {
    // this.form.tax.taxable.basic = "exempted";
  },
  computed: {
    defaultBdayPickerValue() {
      return moment(
        new Date(
          new Date().getFullYear() - 18,
          new Date().getMonth(),
          new Date().getDate()
        )
      );
    }
  },

  methods: {
    checkErrors(field) {
      var form_error = this.errors.find(v => v.field === field);
      return form_error ? form_error.error : null;
    },
    computation() {
      var taxable_basic = this.form.tax.taxable.basic,
        community_basic = 0,
        community_business_income = 0,
        taxable_business_income = this.form.tax.taxable.business_income,
        community_profession_income = 0,
        taxable_profession_income = this.form.tax.taxable.profession_income,
        community_property_income = 0,
        taxable_property_income = this.form.tax.taxable.property_income,
        total = 0,
        interest = 0,
        total_amount_paid = 0,
        month = new Date().getMonth();

      try {
        if (this.computation_formula) eval(this.computation_formula);
      } catch (error) {
        console.log("computation_formula ctc :", error);
      }
      this.form.tax.community.basic = community_basic;
      this.form.tax.community.business_income = community_business_income;
      this.form.tax.community.profession_income = community_profession_income;
      this.form.tax.community.property_income = community_property_income;
      this.form.tax.total = total;
      this.form.tax.interest = interest;
      this.form.tax.total_amount_paid = total_amount_paid;

      // taxable_basic==='voluntary'?(community_basic=5):(community_basic=1);community_business_income=(parseFloat(taxable_business_income)||0)/1000;community_profession_income=(parseFloat(taxable_profession_income)||0)/1000;community_property_income=(parseFloat(taxable_property_income)||0)/1000;total=community_basic+community_business_income+community_profession_income+community_property_income;interest=0;total_amount_paid=total+parseFloat(interest);

      // this.form.tax.taxable.basic == "voluntary"
      //   ? (this.form.tax.community.basic = 5)
      //   : (this.form.tax.community.basic = 1);
      // this.form.tax.community.business_income =
      //   (this.form.tax.taxable.business_income || 0) / 1000;
      // this.form.tax.community.profession_income =
      //   (this.form.tax.taxable.profession_income || 0) / 1000;
      // this.form.tax.community.property_income =
      //   (this.form.tax.taxable.property_income || 0) / 1000;
      // this.form.tax.total =
      //   (this.form.tax.community.basic || 0) +
      //   (this.form.tax.community.business_income || 0) +
      //   (this.form.tax.community.profession_income || 0) +
      //   (this.form.tax.community.property_income || 0);
      // this.form.tax.interest = 0;
      // this.form.tax.total_amount_paid =
      //   (this.form.tax.total || 0) + (this.form.tax.interest || 0);
      // console.log(
      //   "this.form.tax.taxable.property_income: " +
      //     this.form.tax.community.property_income
      // );
      console.log("computation of tax: " + JSON.stringify(this.form.tax));
    }
  }
};
</script>
<style></style>
