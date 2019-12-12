<template>
  <a-row type="flex" :gutter="8">
    <h3 style="font-weight: 500; color:black">Apply New</h3>
    <a-divider style="margin-top:-1vh "></a-divider>

    <a-col :xl="12" :lg="12" :md="12" :sm="12" :xs="24">
      <!-- <a-card style="box-shadow: 0px 0px 10px 2px #88888847">
        <a-row type="flex" align="middle" justify="center">
          <a-col :span="8">
            <a-avatar
              shape="square"
              :size="40"
              class="card_btn"
              style="background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1))"
              @click="$router.push('/permits/business')"
            >
              <a-icon type="shop" style="font-size:16px"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :span="24" align="middle">
            <a-button
              style="font-size:12px; font-weight: 700; height:100%"
              type="primary"
              block
            >BUSINESS PERMIT</a-button>
          </a-col>
        </a-row>
      </a-card>-->
      <a-button
        style="font-size:12px; font-weight: 700; height:100%"
        type="primary"
        block
        @click="$router.push('/permits/business')"
        >BUSINESS PERMIT</a-button
      >
    </a-col>

    <a-col :xl="4" :lg="4" :md="12" :sm="12" :xs="24">
      <!-- <a-card style="box-shadow: 0px 0px 10px 2px #88888847">
        <a-row type="flex" align="middle" justify="center">
          <a-col :span="8">
            <a-avatar
              shape="square"
              :size="40"
              class="card_btn"
              style="background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1) )"
              @click="redirect('business-permit')"
            >
              <a-icon type="tool" style="font-size:16px"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :span="16" align="middle">
            <span style="font-size:12px ; font-weight: 700">RESIDENCE CERTIFICATE</span>
          </a-col>
        </a-row>
      </a-card>-->
      <a-button style="font-size:12px ; font-weight: 700; height:100%" block>
        RESIDENCE
        <br />CERTIFICATE
      </a-button>
    </a-col>

    <a-col :xl="4" :lg="4" :md="12" :sm="12" :xs="24">
      <!-- <a-card style="box-shadow: 0px 0px 10px 2px #88888847">
        <a-row type="flex" align="middle" justify="center">
          <a-col :span="8">
            <a-avatar
              shape="square"
              :size="40"
              class="card_btn"
              style="background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1) )"
              @click="redirect('business-permit')"
            >
              <a-icon type="snippets" style="font-size:16px; font-weight: 700"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :span="16" align="middle">
            <span style="font-size:12px ; font-weight: 700">BARANGAY CLEARANCE</span>
          </a-col>
        </a-row>
      </a-card>-->
      <a-button style="font-size:12px ; font-weight: 700; height:100%" block>
        BARANGAY
        <br />CLEARANCE
      </a-button>
    </a-col>

    <a-col :xl="4" :lg="4" :md="12" :sm="12" :xs="24">
      <!-- <a-card style="box-shadow: 0px 0px 10px 2px #88888847">
        <a-row type="flex" align="middle" justify="center">
          <a-col :span="8">
            <a-avatar
              shape="square"
              :size="40"
              class="card_btn"
              style="background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1) )"
              @click="redirect('business-permit')"
            >
              <a-icon type="exception" style="font-size:16px"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :span="16" align="middle">
            <span style="font-size:12px; font-weight: 700">POLICE CLEARANCE</span>
          </a-col>
        </a-row>
      </a-card>-->
      <a-button style="font-size:12px; font-weight: 700; height:100%" block>
        POLICE
        <br />CLEARANCE
      </a-button>
    </a-col>

    <h3 style="margin-top:2vh ; font-weight: 500; color:black">
      My Permit Application
    </h3>
    <a-divider style="margin-top:-1vh; "></a-divider>
    <a-col :span="24">
      <a-card :bodyStyle="{ padding: '5px' }" class="permits-tabs">
        <a-tabs v-model="current_view">
        <a-tab-pane tab="Applied" :key="0" />
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
      view_components: ["Applied", "Drafts", "Payments"]
    }
  },
  methods: {
    redirect(nav) {
      this.$emit("redirect", nav);
    }
  }
  // computed:{
  //   btnStyle(){
  //     return this.constant_helper.theme.button;
  //   }
  // }
};
</script>

<style>
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
