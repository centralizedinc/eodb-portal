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
        <transition v-for="(item, index) in items" :key="index" name="bounce">
          <a-col
            :xs="{ span: 24 }"
            :sm="{ span: 12 }"
            :md="{ span: 12 }"
            :lg="{ span: 9 }"
            v-if="item.primary"
          >
            <!-- <a-button type="primary" @click="$router.push(item.path)">{{item.title}}</a-button> -->
            <p
              class="item-buttons primary-item-buttons"
              @click="$router.push(item.path)"
            >{{item.title}}</p>
          </a-col>
          <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 6 }" :lg="{ span: 5 }" v-else>
            <!-- <a-button @click="$router.push(item.path)">{{item.title}}</a-button> -->
            <p class="item-buttons" @click="$router.push(item.path)">{{item.title}}</p>
          </a-col>
        </transition>
        <!-- <a-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
            <a-button
              style="font-size:12px; font-weight: 700; height:66px"
              type="primary"
              block
              @click="$router.push('/permits/business')"
            >BUSINESS PERMIT</a-button>
          </a-col>

          <a-col :xl="4" :lg="4" :md="12" :sm="12" :xs="24">
            <a-button style="font-size:12px ; font-weight: 700; height:100%" block>
              RESIDENCE
              <br />CERTIFICATE
            </a-button>
          </a-col>

          <a-col :xl="4" :lg="4" :md="12" :sm="12" :xs="24">
            <a-button style="font-size:12px ; font-weight: 700; height:100%" block>
              BARANGAY
              <br />CLEARANCE
            </a-button>
          </a-col>

          <a-col :xl="4" :lg="4" :md="12" :sm="12" :xs="24">
            <a-button style="font-size:12px; font-weight: 700; height:100%" block>
              POLICE
              <br />CLEARANCE
            </a-button>
        </a-col>-->
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
          <a-tab-pane tab="Drafts" :key="1" />
          <a-tab-pane tab="Payments" :key="2" />
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
import Applied from "@/components/permits/Applied";
import Drafts from "@/components/permits/Drafts";
import Payments from "@/components/permits/Payments";

export default {
  components: {
    Applied,
    Drafts,
    Payments
  },
  data() {
    return {
      current_view: 0,
      view_components: ["Applied", "Drafts", "Payments"],
      items: [
        {
          title: "Business Permit",
          path: "/permits/business",
          primary: true
        },
        {
          title: "Community Tax Certificate",
          path: "/app/permits"
        },
        {
          title: "Barangay Clearance",
          path: "/app/permits"
        },
        {
          title: "Police Clearance",
          path: "/app/permits"
        }
      ]
    };
  },
  methods: {}
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
