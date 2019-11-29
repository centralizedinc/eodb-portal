<template>
  <a-card
    :headStyle="{ border: 'none', color: '#7f7f7f', 'font-size': '25px' }"
    :bodyStyle="{ 'padding-top': 0 }"
    title="Business Activity"
  >
    <a-divider
      style="color: #7f7f7f;font-weight: bold;margin-top: 5vh"
      orientation="left"
    >Line of Business</a-divider>
    <a-button type="primary" @click="showLineBusiness">Add</a-button>
    <a-table
      :dataSource="form.business_details.line_of_business"
      :columns="line_of_business_columns"
    >
      <template slot="action" slot-scope="text, record, index">
        <a-icon type="remove" @click="removeLineBusiness(index)" />
      </template>
    </a-table>
    <a-modal :visible="show_line_of_business" title="Add Line of Business" :footer="null">
      <a-row :gutter="10">
        <a-col :xs="{ span: 24 }" :sm="{ span: 21 }">
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
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-button type="primary" @click="addLineBusiness">Add</a-button>
        </a-col>
      </a-row>
    </a-modal>
  </a-card>
</template>

<script>
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
      line_of_business: [
        {
          code: "01411",
          description: "Beef cattle farming (including feed lot fattening)"
        },
        {
          code: "01430",
          description: "Dairy farming"
        },
        {
          code: "01450",
          description: "Hog farming"
        },
        {
          code: "14199",
          description: "Manufacture of other wearing apparel, n.e.c."
        },
        {
          code: "20294",
          description: "Manufacture of glues and adhesive"
        }
      ],
      line_of_business_items: []
    };
  },
  methods: {
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
    onSearchLine(search_value) {
      console.log("value :", search_value);
      var data = [...this.line_of_business_items];
      var new_data = data.filter(v => {
        var search =
          v.code.indexOf(search_value) > -1 ||
          v.description.indexOf(search_value) > -1;
        console.log("search :", search);
        return search;
      });
      console.log("data :", new_data);
      this.line_of_business_items = new_data;
    },
    addLineBusiness() {
      console.log("new_line_of_business :", this.new_line_of_business);
    },
    removeLineBusiness(index) {
      this.form.business_details.line_of_business.splice(i, 1);
    }
  }
};
</script>

<style>
</style>