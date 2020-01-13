<template>
  <a-row style="margin: 2vh 0 5vh 0;">
    <a-col
      :xs="{span: 21}"
      :sm="{span:21}"
      :md="{span:21}"
      :lg="{span:19}"
      :xl="{span:19}"
      :xxl="{span: 21}"
    >
      <a-row style="margin-bottom: 5px" justify="space-between" type="flex">
        <h3 style="font-weight: bold; color:black">Application Tracker</h3>
        <a-col
          :xs="{span: 0}"
          :sm="{span:0}"
          :md="{span:2, push: 1}"
          :lg="{span:2, push: 1}"
          :xl="{span:1, push: 2}"
          :xxl="{span: 1, push: 2  }"
        >
          <a-button
            style="margin-left: 18px"
            type="secondary"
            @click="init(true)"
            icon="reload"
          >Refresh</a-button>
        </a-col>
        <!-- small -->
        <a-col
          :xs="{span: 2}"
          :sm="{span:2}"
          :md="{span:0}"
          :lg="{span:0}"
          :xl="{span:0}"
          :xxl="{span: 0}"
        >
          <a-tooltip title="Refresh">
            <a-button
              size="small"
              style="margin-left: 18px"
              type="secondary"
              @click="init(true)"
              icon="reload"
            ></a-button>
          </a-tooltip>
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="24">
      <a-divider class="permit-divider" />
    </a-col>
    <a-col :span="24">
      <a-row style="margin-bottom: 5px">
        <a-col :xs="{span: 24}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}" :xl="{span:24}">
          <a-input-search placeholder="Search by Reference No." v-model="search" />
        </a-col>
        <!-- <a-col :span="2" :push="13">
          <a-button type="primary" @click="init(true)" icon="reload">Refresh</a-button>
        </a-col>-->
      </a-row>
      <a-card :bodyStyle="{ padding: 0 }" class="permits-tables">
        <applied :loading="loading" :search="search" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import Applied from "@/components/permits/Applied";

export default {
  components: {
    Applied
  },
  data() {
    return {
      loading: false,
      search: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init(refresh) {
      this.loading = true;
      this.$store
        .dispatch("GET_DOCKETS", refresh)
        .then(result => {
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
.primary-item-buttons {
  background-color: #40a9ff !important;
  color: white !important;
}

.item-buttons {
  border: 1px solid;
  padding: 5px;
  font-weight: bold;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.item-buttons:hover {
  background-color: whitesmoke;
  font-size: 15px;
}

.permit-divider {
  margin: 0;
  margin-bottom: 1vh;
  background-color: rgba(0, 0, 0, 0.2);
}

.permits-tabs {
  margin-bottom: 1vh;
}

.permits-tabs .ant-tab-bars {
  margin: 0 !important;
}

.permits-tables .ant-pagination {
  padding-right: 1vw;
}
</style>
