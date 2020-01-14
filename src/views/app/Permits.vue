<template>
  <a-row style="margin: 10px 0 10px 0;" type="flex" justify="space-between">
    <a-col :xs="{span: 24}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}" :xl="{span:24}">
      <h3 style="font-weight: bold; color:black">Apply New</h3>
    </a-col>

    <a-col :xs="{span: 24}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}" :xl="{span:24}">
      <a-divider class="permit-divider" />
    </a-col>

    <a-col :xs="{span: 24}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}" :xl="{span:24}">
      <a-row type="flex" justify="space-between" align="middle" :gutter="10">
        <transition v-for="(item, index) in permit_types" :key="index" name="bounce">
          <a-col
            :xs="{ span: 24 }"
            :sm="{ span: 12 }"
            :md="{ span: 9 }"
            :lg="{ span: 9 }"
            v-if="item.primary"
          >
            <p class="item-buttons primary-item-buttons" @click="openPath(item)">{{ item.name }}</p>
          </a-col>
          <!--  -->
          <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 5 }" :lg="{ span: 5 }" v-else>
            <p class="item-buttons" @click="openPath(item)">{{item.name}}</p>
          </a-col>
        </transition>
      </a-row>
    </a-col>

    <a-col
      :xs="{span: 21}"
      :sm="{span:21}"
      :md="{span:21}"
      :lg="{span:19}"
      :xl="{span:19}"
      :xxl="{span: 21}"
    >
      <a-row style="margin-bottom: 5px" justify="space-between" type="flex">
        <h3 style="font-weight: bold; color:black">My Permit and Licenses</h3>
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
            @click="refreshData"
            type="secondary"
            icon="reload"
          >Refresh</a-button>
        </a-col>
        <!-- mobile small -->
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
              style="margin-left: 20px"
              @click="refreshData"
              type="secondary"
              icon="reload"
            ></a-button>
          </a-tooltip>
        </a-col>
      </a-row>
    </a-col>

    <a-col :xs="{span: 24}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}" :xl="{span:24}">
      <a-divider class="permit-divider" />
    </a-col>

    <a-col :xs="{span: 24}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}" :xl="{span:24}">
      <a-card :bodyStyle="{ padding: '5px' }" class="permits-tabs">
        <a-tabs v-model="current_view">
          <a-tab-pane tab="Applied" :key="0" />
          <!-- <a-tab-pane tab="Drafts" :key="1" /> -->
          <a-tab-pane tab="Payments" :key="1" />
        </a-tabs>
      </a-card>
    </a-col>

    <!-- table -->
    <a-col :xs="{span: 24}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}" :xl="{span:24}">
      <a-row style="margin-bottom: 5px" justify="space-between" type="flex">
        <a-col :xs="{span: 24}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}" :xl="{span:24}">
          <a-input-search placeholder="Search by Reference No." v-model="search" />
        </a-col>
        <!-- <a-col :xs="{span: 1}" :sm="{span:3}" :md="{span:3}" :lg="{span:2}" :xl="{span:2}">
          <a-button
            style="margin-left: 20px"
            @click="refreshData"
            type="primary"
            icon="reload"
          >Refresh</a-button>
        </a-col>-->
      </a-row>
      <a-card :bodyStyle="{ padding: 0 }" class="permits-tables">
        <component
          :is="view_components[current_view]"
          :loadingPermits="loading_permits"
          :loadingPayments="loading_payments"
          :search="search"
        />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import PermitsLicense from "@/components/permits/PermitsLicense";
import Drafts from "@/components/permits/Drafts";
import Payments from "@/components/permits/Payments";
export default {
  components: {
    PermitsLicense,
    Drafts,
    Payments
  },
  data() {
    return {
      current_view: 0,
      view_components: ["PermitsLicense", "Payments"],
      items: [
        {
          title: "Business Permit",
          path: "/permits/business",
          primary: true
        },
        {
          title: "Community Tax Certificate",
          path: "/permits/ctc"
        },
        {
          title: "Barangay Clearance",
          path: "/permits/barangay"
        },
        {
          title: "Police Clearance",
          path: "/permits/police"
        }
      ],
      loading_permits: false,
      loading_payments: false,
      search: ""
    };
  },
  computed: {
    permit_types() {
      var sort_by_primary = this.$store.state.permits.permit_types.sort(function(x, y) { return y.primary - x.primary });
      return sort_by_primary;
    }
  },
  watch: {
    current_view(val) {
      this.search = "";
      if (val === 0) this.loadPermits();
      else if (val === 1) this.loadPayments();
    }
  },
  created() {
    this.$store
      .dispatch("GET_PERMIT_TYPES")
      .then(result => {
        console.log("GET_PERMIT_TYPES result :", result);
        this.loadPermits();
      })
      .catch(err => {
        console.log("GET_PERMIT_TYPES err :", err);
      });
  },
  methods: {
    openPath(item) {
      this.$store.commit("SET_FILING_PERMIT", item);
      this.$router.push(item.path);
    },
    loadPermits(refresh) {
      this.loading_permits = true;
      this.$store
        .dispatch("GET_PERMITS", refresh)
        .then(result => {
          console.log("GET_PERMITS result :", result);
          this.loading_permits = false;
        })
        .catch(err => {
          this.loading_permits = false;
        });
    },
    loadPayments(refresh) {
      this.loading_payments = true;
      this.$store
        .dispatch("GET_PAYMENTS", refresh)
        .then(result => {
          this.loading_payments = false;
        })
        .catch(err => {
          this.loading_payments = false;
        });
    },
    refreshData() {
      if (this.current_view === 0) this.loadPermits(true);
      else if (this.current_view === 1) this.loadPayments(true);
    }
  }
};
</script>

<style>
.primary-item-buttons {
  background-color: #40a9ff !important;
  color: black !important;
  font-weight: 900 !important;
}
.item-buttons {
  border: 0px;
  padding: 5px;
  font-weight: 400 !important;
  border-radius: 6px;
  background-color: skyblue;
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
