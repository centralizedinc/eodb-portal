<template>
  <a-card  style="box-shadow: 0px 0px 10px 2px #88888847">
    <a-row style="margin-bottom: 2vh" type="flex" :gutter="8">
      <a-col :xs="18" :sm="20" :md="22" :lg="22" :xl="22" :xxl="22">
        <a-input-search placeholder="Search" @search="onSearch" />
      </a-col>
      <a-col :xs="6" :sm="4" :md="2" :lg="2" :xl="2" :xxl="2">
        <a-button :style="constant_helper.theme.button" block>
          <a-icon type="plus"></a-icon>
        </a-button>
      </a-col>
    </a-row>
    <a-divider></a-divider>
    <a-table :columns="cols" :dataSource="transactions" :loading="loading" v-if="$breakpoint.mdAndUp">
      <!-- <template slot="permit" slot-scope="text">
        <a href="javascript:;">{{text}}</a>
        <a slot="action" slot-scope="text" href="javascript:;" @click="view_data">View</a>
      </template>-->
      <!-- <template slot="application.app_type" slot-scope="text, record">
        <p v-if="text == 1">New</p>
        <p v-else>Renewal</p>
      </template>-->
      <template slot="action" slot-scope="text, record">
        <div>
          <a @click="() => view_data(record)">View</a>
        </div>
      </template>
    </a-table>
    <div v-else >
    <a-card v-for="item in transactions" :key="item" style="margin-top: 1vh">
      <a-card-meta :title="item.tax_type" :description="item.amount">
    </a-card-meta>
      <template slot="actions">
        <div>
          <a @click="() => view_data(item)">View</a>
        </div>
      </template>
    </a-card>
    </div>
  </a-card>
</template>

<script>
import { stringify } from "querystring";
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      transactions: [],
      cols: [
        {
          title: "Tax Type",
          dataIndex: "tax_type"
        },
        {
          title: "TCT/OCT",
          dataIndex: "title_no"
        },
        {
          title: "Amount Due",
          dataIndex: "amount"
        },
        {
          title: "Status",
          dataIndex: "status"
        },
        {
          title: "Payment Date",
          dataIndex: "date"
        },
        {
          title: "Action",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      draw_show: false
    };
  },
  created() {
    this.loading = true;
    var _self = this;
    setTimeout(function() {
      _self.transactions = _self.$store.state.taxes.records;
      _self.loading = false;
    }, 1000);
  },
  methods: {}
};
</script>
<style>
</style>