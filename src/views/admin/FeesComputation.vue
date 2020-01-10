<template>
  <div>
    <a-row type="flex" justify="end">
      <a-col :span="4">
        <a-button type="primary" block icon="plus" @click="visible=true">NEW COMPUTATION</a-button>
      </a-col>
      <a-col :span="24">
        <a-table
          style="margin-top: 2vh"
          :dataSource="computations"
          :columns="cols"
          :bordered="true"
          :loading="loading"
          :scroll="{x:true}"
        >
          <span slot="permit_type" slot-scope="text">{{getPermitCode(text).name}}</span>
          <span slot="application_type" slot-scope="text">{{getAppType(text)}}</span>
          <span slot="date_created" slot-scope="text">{{formatDate(text, 'time', true)}}</span>
          <span slot="date_modified" slot-scope="text">{{formatDate(text, 'time', true)}}</span>
          <span slot="actions" slot-scope="text,record" style="font-align:center">
            <a-button-group>
              <a-button type="primary" icon="edit" @click="edit(record)"></a-button>
            </a-button-group>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-drawer placement="right" @close="onClose" :visible="visible" :width="500" theme="dark">
      <div slot="title">
        <span style="color:#FFFFFF">New Computation</span>
      </div>
      <a-form>
        <a-form-item label="Permit Type">
          <a-select v-model="computation.permit_type" :disabled="loading">
            <a-select-option
              v-for="(item, index) in permit_types"
              :key="index"
              :value="item._id"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Application Type">
          <a-select v-model="computation.application_type" :disabled="loading">
            <a-select-option
              v-for="(item, index) in application_types"
              :key="index"
              :value="item.value"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Computation">
          <template slot="extra">
            <span>- Use `{#amount}` for the replacement of base amount</span>
            <br />
            <span>
              - CTC or Cedula, use these keywords for computation:
              <a-tooltip placement="left">
                <div slot="title">
                  <p v-for="(item, index) in cedula_hints" :key="index">
                    <code style="font-weight: bold;">{{item.code}}</code>
                    - {{item.description}}
                  </p>
                </div>
                <a-icon type="info-circle" />
              </a-tooltip>
            </span>
          </template>
          <a-textarea
            placeholder="Computation"
            v-model="computation.computation"
            :rows="5"
            :disabled="loading"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="Remarks">
          <a-textarea
            placeholder="Remarks"
            v-model="computation.remarks"
            :rows="5"
            :disabled="loading"
          ></a-textarea>
        </a-form-item>
        <a-divider>Test Computation</a-divider>
        <a-form-item>
          <a-select v-model="computation_mode" style="width: 100%">
            <a-select-option :value="0">Default</a-select-option>
            <a-select-option :value="1">Cedula Computation</a-select-option>
          </a-select>
        </a-form-item>

        <template v-if="computation_mode===1">
          <a-form-item label="Basic Community Tax">
            <span slot="extra">Equivalent Amount: {{cedula_tax.community_basic}}</span>
            <a-select v-model="cedula_tax.taxable_basic" @change="computeCedula">
              <a-select-option value="voluntary">Voluntary</a-select-option>
              <a-select-option value="exempted">Exempted</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Income from Real Property">
            <span slot="extra">Equivalent Amount: {{cedula_tax.community_property_income}}</span>
            <a-input v-model="cedula_tax.taxable_property_income" @change="computeCedula" />
          </a-form-item>
          <a-form-item
            label="Gross Receipts or Earnings derived business during the preceding year"
          >
            <span slot="extra">Equivalent Amount: {{cedula_tax.community_business_income}}</span>
            <a-input v-model="cedula_tax.taxable_business_income" @change="computeCedula" />
          </a-form-item>
          <a-form-item label="Salaries or Gross Receipts or Earnings derived">
            <span slot="extra">Equivalent Amount: {{cedula_tax.community_profession_income}}</span>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>
                  Salaries or Gross Receipts or Earnings derived exercise of
                  profession or pursuit of any occupation
                </span>
              </template>
              <a-input v-model="cedula_tax.taxable_profession_income" @change="computeCedula"></a-input>
            </a-tooltip>
          </a-form-item>
          <p>
            <b>
              Total:
              <span>{{cedula_tax.total}}</span>
            </b>
            <br />
            <b>
              Interest:
              <span>{{cedula_tax.interest}}</span>
            </b>
            <br />
            <b>
              Total Amount Paid:
              <span>{{cedula_tax.total_amount_paid}}</span>
            </b>
          </p>
        </template>

        <template v-else>
          <a-form-item label="Base Amount">
            <a-input-number v-model="base_amount" style="width: 100%" />
          </a-form-item>
          <p>
            <b>
              Result:
              <span>{{computed_base_amount}}</span>
            </b>
          </p>
        </template>
        <a-form-item>
          <a-button type="primary" icon="save" :loading="loading" block @click="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loading: false,
      cols: [
        {
          title: "Permit Type",
          dataIndex: "permit_type",
          scopedSlots: { customRender: "permit_type" },
          width: '2%'
        },
        {
          title: "Application Type",
          dataIndex: "application_type",
          scopedSlots: { customRender: "application_type" },
          width: '0.5%'
        },
        {
          title: "Computation",
          dataIndex: "computation",
          width: '10%'
        },
        {
          title: "Remarks",
          dataIndex: "remarks"
        },
        {
          title: "Date Created",
          dataIndex: "date_created",
          scopedSlots: { customRender: "date_created" }
        },
        {
          title: "Date Modified",
          dataIndex: "date_modified",
          scopedSlots: { customRender: "date_modified" }
        },
        {
          title: "Actions",
          dataIndex: "_id",
          scopedSlots: { customRender: "actions" }
        }
      ],
      computation: {},
      application_types: [
        {
          name: "New",
          value: "0"
        },
        {
          name: "Renew",
          value: "1"
        }
      ],
      edit_mode: false,
      base_amount: 0,
      cedula_hints: [
        {
          code: "taxable_basic",
          description: "Basic Community Tax: voluntary or exempted"
        },
        {
          code: "community_basic",
          description: "Equivalent amount of Basic Community Tax"
        },
        {
          code: "taxable_business_income",
          description:
            "Gross Receipts or Earnings derived business during the preceding year value"
        },
        {
          code: "community_business_income",
          description:
            "Equivalent amount of Gross Receipts or Earnings derived business during the preceding year"
        },
        {
          code: "taxable_profession_income",
          description: "Salaries or Gross Receipts or Earnings derived value"
        },
        {
          code: "community_profession_income",
          description:
            "Equivalent amount of Salaries or Gross Receipts or Earnings derived"
        },
        {
          code: "taxable_property_income",
          description: "Income from Real Property value"
        },
        {
          code: "community_property_income",
          description: "Equivalent amount of Income from Real Property"
        },
        {
          code: "total",
          description: "Total amount of income"
        },
        {
          code: "interest",
          description: "Interest of Income"
        },
        {
          code: "total_amount_paid",
          description: "(Total amount - Interest)"
        }
      ],
      computation_mode: 0,
      cedula_tax: {}
    };
  },
  computed: {
    computations() {
      return this.$store.state.payment.fees_computations;
    },
    permit_types() {
      return this.$store.state.permits.permit_types;
    },
    computed_base_amount() {
      if (this.base_amount && this.computation.computation) {
        var computation_function = this.computation.computation.replace(
          /{#amount}/g,
          parseFloat(this.base_amount)
        );
        return eval(computation_function);
      } else return 0;
    }
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("GET_PERMIT_TYPES")
      .then(result => {
        console.log("GET_PERMIT_TYPES result :", result);
        return this.$store.dispatch("GET_ALL_FEES_COMPUTATION");
      })
      .then(result => {
        console.log("GET_ALL_FEES_COMPUTATION result :", result);
        this.loading = false;
      })
      .catch(err => {
        console.log("GET_PERMIT_TYPES err :", err);
        this.loading = false;
      });
  },
  methods: {
    edit(record) {
      this.computation = record;
      this.edit_mode = true;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
      this.edit_mode = false;
      this.base_amount = 0;
      this.computation = {};
      this.cedula_tax = {};
      this.computation_mode = 0;
    },
    submit() {
      this.loading = true;
      if (this.edit_mode) {
        this.$store
          .dispatch("UPDATE_FEES_COMPUTATION", this.computation)
          .then(result => {
            console.log("result :", result);
            this.computation = {};
            this.visible = false;
            this.loading = false;
            this.edit_mode = false;
            this.base_amount = 0;
            return this.$store.dispatch("GET_ALL_FEES_COMPUTATION", true);
          })
          .catch(err => {
            console.log("err :", err);
            this.loading = false;
            this.edit_mode = false;
            this.base_amount = 0;
          });
      } else {
        this.$store
          .dispatch("CREATE_FEES_COMPUTATION", this.computation)
          .then(result => {
            console.log("result :", result);
            this.computation = {};
            this.visible = false;
            this.loading = false;
            this.edit_mode = false;
            this.base_amount = 0;
            return this.$store.dispatch("GET_ALL_FEES_COMPUTATION", true);
          })
          .catch(err => {
            console.log("err :", err);
            this.loading = false;
            this.edit_mode = false;
            this.base_amount = 0;
          });
      }
    },
    getAppType(type) {
      console.log("typ :", type);
      const app = this.application_types.find(
        v => parseInt(v.value) === parseInt(type)
      );
      console.log("app :", app);
      return app.name;
    },
    computeCedula() {
      var taxable_basic = this.cedula_tax.taxable_basic,
        community_basic = 0,
        community_business_income = 0,
        taxable_business_income = this.cedula_tax.taxable_business_income,
        community_profession_income = 0,
        taxable_profession_income = this.cedula_tax.taxable_profession_income,
        community_property_income = 0,
        taxable_property_income = this.cedula_tax.taxable_property_income,
        total = 0,
        interest = 0,
        total_amount_paid = 0;

      try {
        if (this.computation.computation) eval(this.computation.computation);
      } catch (error) {
        console.log("computation_formula ctc :", error);
      }
      this.cedula_tax.community_basic = community_basic;
      this.cedula_tax.community_business_income = community_business_income;
      this.cedula_tax.community_profession_income = community_profession_income;
      this.cedula_tax.community_property_income = community_property_income;
      this.cedula_tax.total = total;
      this.cedula_tax.interest = interest;
      this.cedula_tax.total_amount_paid = total_amount_paid;
    }
  }
};
</script>

<style>
.ant-tooltip {
  max-width: 25vw;
}
</style>