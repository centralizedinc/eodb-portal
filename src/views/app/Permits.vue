<template>
  <a-row style="margin: 2vh 0 5vh 0;">
    <a-col :span="24">
      <h3 style="font-weight: bold; color:black">Apply New</h3>
    </a-col>
    <a-col :span="24">
      <a-divider class="permit-divider" />
    </a-col>
    <a-col :span="24">
      <a-row type="flex" align="middle" :gutter="10">
        <transition v-for="(item, index) in permit_types" :key="index" name="bounce">
          <a-col
            :xs="{ span: 24 }"
            :sm="{ span: 12 }"
            :md="{ span: 12 }"
            :lg="{ span: 9 }"
            v-if="item.primary"
          >
            <p class="item-buttons primary-item-buttons" @click="openPath(item)">{{ item.name }}</p>
          </a-col>
          <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 6 }" :lg="{ span: 5 }" v-else>
            <p class="item-buttons" @click="openPath(item)">{{item.name}}</p>
          </a-col>
        </transition>
      </a-row>
    </a-col>
    <a-col :span="24">
      <h3 style="font-weight: bold; color:black">My Permit Application</h3>
    </a-col>
    <a-col :span="24">
      <a-divider class="permit-divider" />
    </a-col>
    <a-col :span="24">
      <a-card :bodyStyle="{ padding: '5px' }" class="permits-tabs">
        <a-tabs v-model="current_view">
          <a-tab-pane tab="Permits & Licenses" :key="0" />
          <!-- <a-tab-pane tab="Drafts" :key="1" /> -->
          <a-tab-pane tab="Payments" :key="1" />
        </a-tabs>
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card :bodyStyle="{ padding: 0 }" class="permits-tables">
        <component :is="view_components[current_view]" />
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
      ]
    };
  },
  computed: {
    permit_types() {
      return this.$store.state.permits.permit_types;
    }
  },
  created() {
    this.$store
      .dispatch("GET_PERMIT_TYPES")
      .then(result => {
        console.log("GET_PERMIT_TYPES result :", result);
      })
      .catch(err => {
        console.log("GET_PERMIT_TYPES err :", err);
      });
  },
  methods: {
    openPath(item) {
      this.$store.commit("SET_FILING_PERMIT", item);
      this.$router.push(item.path);
    }
  }
};
</script>

<style>
.primary-item-buttons {
  background-color: #40a9ff !important;
  color: white !important;
  font-weight: 200;
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
  font-weight: 200;
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
