<template>
  <a-row style="margin: 2vh 0 5vh 0;">
    <a-col :span="24">
      <h3 style="font-weight: bold; color:black">Application Tracker</h3>
    </a-col>
    <a-col :span="24">
      <a-divider class="permit-divider" />
    </a-col>
    <a-col :span="24">
      <a-row style="margin-bottom: 5px">
        <a-col :span="8">
          <a-input-search placeholder="Search by Reference No." v-model="search" />
        </a-col>
        <a-col :span="2" :push="13">
          <a-button type="primary" @click="init(true)" icon="reload">Refresh</a-button>
        </a-col>
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
