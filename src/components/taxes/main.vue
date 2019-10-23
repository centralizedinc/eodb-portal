<template>
  <a-row type="flex" :gutter="24" justify="center">
    <a-col :xs="22" :sm="22" :md="18" :lg="18" :xl="18" style="margin-top:2vh">
      <a-card data-aos="fade-up">
        <a-row type="flex" align="middle" justify="center">
          <a-col :xs="6" :sm="6" :md="6" :lg="4" :xl="4">
            <a-avatar 
              shape="square"
              :size="80"
              class="card_btn"
              @click="redirect('real-estate-tax')"
            >
              <a-icon type="home" style="font-size:36px"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :xs="24" :sm="24" :md="16" :lg="18" :xl="18" style="margin-top:2vh">
            <h3>Real Estate Tax</h3>
            <a-divider style="margin-top:-1vh"></a-divider>
            <p>The real property tax (RPT) is an ad valorem tax on real properties such as lands, buildings, and other improvements, and machineries imposed by provinces, cities and municipalities</p>
          </a-col>
        </a-row>
      </a-card>
    </a-col>

    <a-col :xs="22" :sm="22" :md="18" :lg="18" :xl="18" style="margin-top:2vh">
      <a-card data-aos="fade-up">
        <a-row type="flex" align="middle" justify="center">
          <a-col :xs="6" :sm="6" :md="6" :lg="4" :xl="4">
            <a-avatar shape="square" :size="80" class="card_btn">
              <a-icon type="bank" style="font-size:36px"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :xs="24" :sm="24" :md="16" :lg="18" :xl="18" style="margin-top:2vh">
            <h3>Provicial Tax</h3>
            <a-divider style="margin-top:-1vh"></a-divider>
            <p>The real property tax (RPT) is an ad valorem tax on real properties such as lands, buildings, and other improvements, and machineries imposed by provinces, cities and municipalities</p>
          </a-col>
        </a-row>
      </a-card>
    </a-col>

    <a-col :xs="22" :sm="22" :md="18" :lg="18" :xl="18" style="margin-top:2vh">
      <a-card data-aos="fade-up">
        <a-row type="flex" align="middle" justify="center">
          <a-col :xs="6" :sm="6" :md="6" :lg="4" :xl="4">
            <a-avatar shape="square" :size="80" class="card_btn">
              <a-icon type="shop" style="font-size:36px"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :xs="24" :sm="24" :md="16" :lg="18" :xl="18" style="margin-top:2vh">
            <h3>Municipal Tax</h3>
            <a-divider style="margin-top:-1vh"></a-divider>
            <p>The real property tax (RPT) is an ad valorem tax on real properties such as lands, buildings, and other improvements, and machineries imposed by provinces, cities and municipalities</p>
          </a-col>
        </a-row>
      </a-card>
    </a-col>

    <a-col :xs="22" :sm="22" :md="18" :lg="18" :xl="18" style="margin-top:2vh">
      <a-card data-aos="fade-up">
        <a-row type="flex" align="middle" justify="center">
          <a-col :xs="6" :sm="6" :md="6" :lg="4" :xl="4">
            <a-avatar shape="square" :size="80" class="card_btn">
              <a-icon type="team" style="font-size:36px"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :xs="24" :sm="24" :md="16" :lg="18" :xl="18" style="margin-top:2vh">
            <h3>Barangay Tax</h3>
            <a-divider style="margin-top:-1vh"></a-divider>
            <p>The real property tax (RPT) is an ad valorem tax on real properties such as lands, buildings, and other improvements, and machineries imposed by provinces, cities and municipalities</p>
          </a-col>
        </a-row>
      </a-card>
    </a-col>

    <a-col :xs="22" :sm="22" :md="18" :lg="18" :xl="18" style="margin-top:2vh">
      <a-card data-aos="fade-up">
        <a-row type="flex" align="middle" justify="center">
          <a-col :xs="6" :sm="6" :md="6" :lg="4" :xl="4">
            <a-avatar shape="square" :size="80" class="card_btn">
              <a-icon type="user" style="font-size:36px"></a-icon>
            </a-avatar>
          </a-col>
          <a-col :xs="24" :sm="24" :md="16" :lg="18" :xl="18" style="margin-top:2vh">
            <h3>Community Tax</h3>
            <a-divider style="margin-top:-1vh"></a-divider>
            <p>The real property tax (RPT) is an ad valorem tax on real properties such as lands, buildings, and other improvements, and machineries imposed by provinces, cities and municipalities</p>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
  methods: {
    redirect(nav) {
      this.$emit("redirect", nav);
    }
  }
};
</script>

<style>
</style>