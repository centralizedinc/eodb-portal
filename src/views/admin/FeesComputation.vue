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
        >
          <span slot="permit_type" slot-scope="text">{{getPermitType(text)}}</span>
          <span slot="application_type" slot-scope="text">{{getAppType(text)}}</span>
          <span slot="date" slot-scope="text">{{formatDate(text, 'time', true)}}</span>
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
        <span>
          <i style="color: red;">*</i>
          Use `{#amount}` for the replacement of base amount.
        </span>
        <a-form-item label="Computation">
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
          scopedSlots: { customRender: "permit_type" }
        },
        {
          title: "Application Type",
          dataIndex: "application_type",
          scopedSlots: { customRender: "application_type" }
        },
        {
          title: "Computation",
          dataIndex: "computation"
        },
        {
          title: "Remarks",
          dataIndex: "remarks"
        },
        {
          title: "Date Created",
          dataIndex: "date_created",
          scopedSlots: { customRender: "date" }
        },
        {
          title: "Date Modfied",
          dataIndex: "date_modified",
          scopedSlots: { customRender: "date" }
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
          value: 0
        },
        {
          name: "Renew",
          value: 1
        }
      ],
      edit_mode: false
    };
  },
  computed: {
    computations() {
      return this.$store.state.payment.fees_computations;
    },
    permit_types() {
      return this.$store.state.permits.permit_types;
    }
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("GET_PERMIT_TYPES")
      .then(result => {
        return this.$store.dispatch("GET_ALL_FEES_COMPUTATION");
      })
      .then(result => {
        this.loading = false;
      })
      .catch(err => {
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
      this.computation = {};
    },
    submit() {
      if (this.edit_mode) {
        this.$store
          .dispatch("UPDATE_FEES_COMPUTATION", this.computation)
          .then(result => {
            console.log("result :", result);
            this.computation = {};
            this.visible = false;
          })
          .catch(err => {
            console.log("err :", err);
          });
      } else {
        this.$store
          .dispatch("CREATE_FEES_COMPUTATION", this.computation)
          .then(result => {
            console.log("result :", result);
            this.computation = {};
            this.visible = false;
          })
          .catch(err => {
            console.log("err :", err);
          });
      }
    },
    getPermitType(type) {
      return this.permit_types.find(v => v._id === type).name;
    },
    getAppType(type) {
      return this.application_types.find(v => v.value === type).name;
    }
  }
};
</script>

<style>
</style>