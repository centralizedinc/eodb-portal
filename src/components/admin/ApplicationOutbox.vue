<template>
  <div>
    <a-table :dataSource="dockets" :columns="cols" :loading="loading" :bordered="true">
      <span slot="date" slot-scope="text">{{formatDate(text, 'time')}}</span>
      <span slot="status" slot-scope="text">{{getDocketStatus(text)}}</span>
      <span slot="mode" slot-scope="text">{{getDocketMode(text)}}</span>
      <span slot="age" slot-scope="text" style="text-align:center">
        <a-tooltip :title="computeAge(text).display">
          <a-progress :percent="computeAge(text).percent" :showInfo="false"></a-progress>
        </a-tooltip>
      </span>
      <span slot="actions" slot-scope="text, record">
        <a-button-group>
          <a-tooltip title="Evaluate">
            <a-button type="primary" icon="file-search" @click="evaluate(record)"></a-button>
          </a-tooltip>
        </a-button-group>
      </span>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      application_details: {},
      cols: [
        {
          title: "REFERENCE NO",
          dataIndex: "reference_no"
        },
        {
          title: "TYPE",
          dataIndex: "permit"
        },
        {
          title: "MODE",
          dataIndex: "application_type",
          scopedSlots: { customRender: "mode" }
        },
        {
          title: "STATUS",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "DATE CREATED",
          dataIndex: "date_created",
          scopedSlots: { customRender: "date" }
        },
        {
          title: "AGE",
          dataIndex: "date_created",
          scopedSlots: { customRender: "age" }
        },
        {
          title: "ACTIONS",
          dataIndex: "",
          scopedSlots: { customRender: "actions" }
        }
      ],
      loading: false
    };
  },
  created() {
    this.init();
  },
  computed: {
      dockets(){
          return this.$store.state.dockets.dockets_outbox
      }
  },
  methods: {
    init() {
      //get records
      this.loading = true;

      this.$store.dispatch("GET_DOCKETS_OUTBOX").then(result => {
        console.log("result.data :", result.data);
        // this.dockets = results.data;
        this.loading = false;
      });
    },
    computeAge(date) {
      var date_created = new Date(date);
      var max = 10;
      var time = new Date().getTime() - date_created.getTime();
      var hours = time / (1000 * 3600);
      var age = time / (1000 * 3600 * 24);
      var display =
        age < 1 ? `${Math.floor(hours)} Hour(s)` : `${Math.floor(age)} Day(s)`;
      return { percent: (age / max) * 100, age, time, display };
    },
    onClose() {
      this.visible = false;
    },
    view(record) {
      console.log(JSON.stringify(record));

      this.$http
        .get(`/dockets/applications/${record.permit}/${record.reference_no}`)
        .then(result => {
          this.visible = true;
          this.application_details = result.data;
          console.log(JSON.stringify(this.application_details));
        });
    },
    evaluate(record) {
        console.log('record :', record);
    }
  }
};
</script>

<style>
.ant-form-item-label label {
  font-weight: bold;
  color: black;
}
.ant-drawer-header {
  background: #242b30 !important;
}
.ant-drawer-close {
  color: #ffffff;
}
</style>