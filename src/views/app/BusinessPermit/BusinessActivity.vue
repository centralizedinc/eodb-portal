<template>
  <a-card
    :headStyle="{ border: 'none', color: '#7f7f7f', 'font-size': '25px' }"
    :bodyStyle="{ 'padding-top': 0 }"
    title="Business Activity"
  >
    <!-- LINE OF BUSINESS -->
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Line of Business</a-divider>
    <a-button type="primary" @click="showLineBusiness">Add</a-button>
    <a-table
      :dataSource="form.business_details.line_of_business"
      :columns="line_of_business_columns"
    >
      <template slot="action" slot-scope="text, record, index">
        <a-tooltip>
          <span slot="title">Remove</span>
          <a-icon
            type="delete"
            style="color: red; cursor: pointer;"
            @click="removeLineBusiness(index)"
          />
        </a-tooltip>
      </template>
      <template slot="units" slot-scope="text, record, index">
        <a-input v-model="form.business_details.line_of_business[index].units" />
      </template>
      <template slot="capital_investment" slot-scope="text, record, index">
        <a-input v-model="form.business_details.line_of_business[index].capital_investment" />
      </template>
      <template slot="essential" slot-scope="text, record, index">
        <a-input v-model="form.business_details.line_of_business[index].essential" />
      </template>
      <template slot="non_essential" slot-scope="text, record, index">
        <a-input v-model="form.business_details.line_of_business[index].non_essential" />
      </template>
    </a-table>
    <a-modal
      :visible="show_line_of_business"
      @cancel="show_line_of_business=false"
      title="Add Line of Business"
      :footer="null"
    >
      <a-row :gutter="10">
        <a-col :xs="{ span: 24 }" :sm="{ span: 21 }">
          <a-form>
            <a-form-item
              :validate-status="line_of_business_error ? 'error' : ''"
              :help="line_of_business_error"
            >
              <a-select
                v-model="new_line_of_business"
                showSearch
                placeholder="Select"
                style="width: 100%"
                mode="multiple"
                :filterOption="filterLineBusiness"
              >
                <a-select-option
                  v-for="item in line_of_business_items"
                  :key="item.code"
                  :value="item.code"
                >{{item.code}} - {{item.description}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-button type="primary" @click="addLineBusiness">Add</a-button>
        </a-col>
      </a-row>
    </a-modal>

    <!-- MEASURE OR PAX -->
    <a-divider
      style="color: black;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Measure or Pax</a-divider>
    <a-button type="primary" @click="showMeasureOrPax">Add Measure or Pax</a-button>
    <a-table :dataSource="form.business_details.measure_or_pax" :columns="measure_or_pax_columns">
      <template slot="action" slot-scope="text, record, index">
        <a-tooltip>
          <span slot="title">Remove</span>
          <a-icon
            type="delete"
            style="color: red; cursor: pointer;"
            @click="removeMeasureOrPax(index)"
          />
        </a-tooltip>
      </template>
      <!-- <template slot="unit" slot-scope="text, record, index">
        <a-input v-model="form.business_details.measure_or_pax[index].unit" />
      </template>
      <template slot="capacity" slot-scope="text, record, index">
        <a-input v-model="form.business_details.measure_or_pax[index].capacity" />
      </template>
      <template slot="measure_or_pax" slot-scope="text, record, index">
        <a-input v-model="form.business_details.measure_or_pax[index].measure_or_pax" />
      </template>-->
      <template slot="line_of_business" slot-scope="text">
        <!-- <a-input v-model="form.business_details.measure_or_pax[index].line_of_business" /> -->
        {{line_of_business.find(v=>v.code === text).description}}
      </template>
    </a-table>
    <a-modal
      :visible="show_measure_or_pax"
      @cancel="show_measure_or_pax=false"
      title="Add Measure or Pax"
      okText="Add"
      @ok="addMeasureOrPax"
    >
      <a-form>
        <a-form-item
          style="font-weight: bold;"
          :validate-status="checkErrors('measure_or_pax_errors', 'unit') ? 'error' : ''"
          :help="checkErrors('measure_or_pax_errors', 'unit')"
        >
          <span slot="label">
            Number of Unit
            <i style="color: red;">*</i>
          </span>
          <a-input-number style="width: 100%;" v-model="new_measure_or_pax.unit" />
        </a-form-item>
        <a-form-item style="font-weight: bold;" label="Capacity">
          <a-input-number style="width: 100%;" v-model="new_measure_or_pax.capacity" />
        </a-form-item>
        <a-form-item
          style="font-weight: bold;"
          :validate-status="checkErrors('measure_or_pax_errors', 'measure_or_pax') ? 'error' : ''"
          :help="checkErrors('measure_or_pax_errors', 'measure_or_pax')"
        >
          <span slot="label">
            Measure or Pax
            <i style="color: red;">*</i>
          </span>
          <a-select v-model="new_measure_or_pax.measure_or_pax">
            <a-select-option value disabled>Select Measure or Pax</a-select-option>
            <a-select-option
              v-for="(item, index) in measure_or_pax"
              :key="index"
              :value="item"
            >{{item}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          style="font-weight: bold;"
          :validate-status="checkErrors('measure_or_pax_errors', 'line_of_business') ? 'error' : ''"
          :help="checkErrors('measure_or_pax_errors', 'line_of_business')"
        >
          <span slot="label">
            Line of Business
            <i style="color: red;">*</i>
          </span>
          <a-select v-model="new_measure_or_pax.line_of_business">
            <a-select-option value disabled>Select Line of Business</a-select-option>
            <a-select-option
              v-for="(item, index) in form.business_details.line_of_business"
              :key="index"
              :value="item.code"
            >{{`${item.code} - ${item.description}`}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
      <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 9 }" :xl="{ span: 6 }">
        <a-button-group>
          <a-button @click="$emit('changeStep', step-1)">Previous</a-button>
          <a-button type="primary" @click="$emit('changeStep', step+1)">Next</a-button>
        </a-button-group>
      </a-col>
      <a-col :xs="{ span: 24 }" :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 15 }">
        <a-button>Save Draft</a-button>
      </a-col>
      <a-col :xs="{ span: 24 }" :sm="{ span: 6 }" :md="{ span: 3 }">
        <a-button type="danger">Close</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import line_of_business from "./line_of_business.json";
import measure_or_pax from "./measure_or_pax.json";

export default {
  props: ["form", "step"],
  data() {
    return {
      line_of_business_columns: [
        {
          title: "Code",
          dataIndex: "code"
        },
        {
          title: "Description",
          dataIndex: "description"
        },
        {
          title: "Units",
          dataIndex: "units",
          scopedSlots: { customRender: "units" }
        },
        {
          title: "Capital Investment",
          dataIndex: "capital_investment",
          scopedSlots: { customRender: "capital_investment" }
        },
        {
          title: "Essential",
          dataIndex: "essential",
          scopedSlots: { customRender: "essential" }
        },
        {
          title: "Non Essential",
          dataIndex: "non_essential",
          scopedSlots: { customRender: "non_essential" }
        },
        {
          title: "",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      show_line_of_business: false,
      new_line_of_business: [],
      line_of_business,
      line_of_business_items: [],
      line_of_business_error: "",
      show_measure_or_pax: false,
      measure_or_pax,
      measure_or_pax_columns: [
        {
          title: "Number of Unit",
          dataIndex: "unit"
        },
        {
          title: "Capacity",
          dataIndex: "capacity"
        },
        {
          title: "Measure or Pax",
          dataIndex: "measure_or_pax"
        },
        {
          title: "Line of Business",
          dataIndex: "line_of_business",
          scopedSlots: { customRender: "line_of_business" }
        },
        {
          title: "",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      new_measure_or_pax: {
        unit: 0,
        capacity: 0,
        measure_or_pax: "",
        line_of_business: ""
      },
      measure_or_pax_errors: []
    };
  },
  methods: {
    // For Line of Business
    showLineBusiness() {
      var data = [...this.line_of_business];
      var line_of_business =
        this.form &&
        this.form.business_details &&
        this.form.business_details.line_of_business
          ? this.form.business_details.line_of_business
          : [];
      var new_data = data.filter(v => {
        var findLine =
          line_of_business && line_of_business.length
            ? line_of_business.findIndex(a => a.code === v.code)
            : -1;
        return findLine === -1;
      });
      this.line_of_business_items = new_data;
      this.show_line_of_business = true;
    },
    filterLineBusiness(inputValue, option) {
      var data = this.line_of_business_items.find(v => v.code === option.key);
      return (
        data.code.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
        data.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },
    addLineBusiness() {
      console.log("new_line_of_business :", this.new_line_of_business);
      this.line_of_business_error = "";
      if (!this.new_line_of_business || !this.new_line_of_business.length) {
        this.line_of_business_error = "Please select line of business.";
        return;
      }
      if (!this.form.business_details.line_of_business)
        this.form.business_details.line_of_business = [];
      this.new_line_of_business.forEach(code => {
        var lineObj = this.line_of_business.find(v => v.code === code);
        this.form.business_details.line_of_business.push({
          code,
          description: lineObj.description,
          units: 0,
          capital_investment: 0,
          essential: 0,
          non_essential: 0
        });
      });
      this.show_line_of_business = false;
      this.new_line_of_business = [];
    },
    removeLineBusiness(i) {
      this.form.business_details.line_of_business.splice(i, 1);
    },

    // For Measure or pax
    showMeasureOrPax() {
      this.new_measure_or_pax = {
        unit: 0,
        capacity: 0,
        measure_or_pax: "",
        line_of_business: ""
      };
      this.show_measure_or_pax = true;
    },
    addMeasureOrPax() {
      console.log("new_measure_or_pax :", this.new_measure_or_pax);
      this.validateMeasureOrPax();
      if (this.measure_or_pax_errors && this.measure_or_pax_errors.length)
        return;
      if (!this.form.business_details.measure_or_pax)
        this.form.business_details.measure_or_pax = [];
      this.form.business_details.measure_or_pax.push(this.new_measure_or_pax);
      this.show_measure_or_pax = false;
    },
    validateMeasureOrPax() {
      this.measure_or_pax_errors = [];
      if (!this.new_measure_or_pax.unit)
        this.measure_or_pax_errors.push({
          field: "unit",
          error: "Number of Unit is a required field."
        });
      if (!this.new_measure_or_pax.measure_or_pax)
        this.measure_or_pax_errors.push({
          field: "measure_or_pax",
          error: "Measure or Pax is a required field."
        });
      if (!this.new_measure_or_pax.line_of_business)
        this.measure_or_pax_errors.push({
          field: "line_of_business",
          error: "Line of Business is a required field."
        });
    },
    removeMeasureOrPax(i) {
      this.form.business_details.measure_or_pax.splice(i, 1);
    },

    checkErrors(key, field) {
      console.log(key);
      if (!key || !field || !this[key]) {
        console.log("Invalid key or field.");
        return;
      }
      var obj = this[key].find(v => v.field === field);
      return obj ? obj.error : "";
    }
  }
};
</script>

<style>
</style>