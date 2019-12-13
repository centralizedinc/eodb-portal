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
        style="font-size:12px; font-weight: 700; height:66px"
        type="primary"
        block
        @click="$router.push('/permits/business')"
      >BUSINESS PERMIT</a-button>
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
      <a-button
        style="font-size:12px ; font-weight: 700; height:100%"
        block
        @click="$router.push('/barangay')"
      >
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

    <h3 style="margin-top:2vh ; font-weight: 500; color:black">My Permit Application</h3>
    <a-divider style="margin-top:-1vh; "></a-divider>
    <a-col :span="24" style="margin-top: -10vh">
      <transactions></transactions>
    </a-col>
  </a-row>
</template>

<script>
import Transactions from "@/components/permits/Transactions";
export default {
  components: {
    Transactions
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

<style></style>
