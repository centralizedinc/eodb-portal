<template>
  <a-row type="flex" :gutter="8">
    <h3 style="font-weight: 500; color:black">Apply New</h3>
    <a-divider style="margin-top:-1vh "></a-divider>

    <a-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <a-card style="box-shadow: 0px 0px 10px 2px #88888847">
        <a-row type="flex" align="middle" justify="center">
          <a-col :span="8">
            <a-avatar
              shape="square"
              :size="40"
              class="card_btn"
              style="background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1))"
              @click="$router.push('/permits/business')"
            >
              <!-- redirect('business-permit') -->
              <a-icon type="shop" style="font-size:16px"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :span="16">
            <span style="font-size:12px; font-weight: 700"
              >Business Permit</span
            >
          </a-col>
        </a-row>
      </a-card>
    </a-col>

    <a-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <a-card style="box-shadow: 0px 0px 10px 2px #88888847">
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
          <a-col :span="16">
            <span style="font-size:12px ; font-weight: 700"
              >Building Permit</span
            >
          </a-col>
        </a-row>
      </a-card>
    </a-col>

    <a-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <a-card style="box-shadow: 0px 0px 10px 2px #88888847">
        <a-row type="flex" align="middle" justify="center">
          <a-col :span="8">
            <a-avatar
              shape="square"
              :size="40"
              class="card_btn"
              style="background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1) )"
              @click="redirect('business-permit')"
            >
              <a-icon
                type="snippets"
                style="font-size:16px; font-weight: 700"
              ></a-icon>
            </a-avatar>
          </a-col>
          <a-col :span="16">
            <span style="font-size:12px ; font-weight: 700"
              >Occupancy Permit</span
            >
          </a-col>
        </a-row>
      </a-card>
    </a-col>

    <a-col :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <a-card style="box-shadow: 0px 0px 10px 2px #88888847">
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
          <a-col :span="16">
            <span style="font-size:12px; font-weight: 700"
              >Sanitary Permit</span
            >
          </a-col>
        </a-row>
      </a-card>
    </a-col>

    <h3 style="margin-top:2vh ; font-weight: 500; color:black">My Permits</h3>
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
