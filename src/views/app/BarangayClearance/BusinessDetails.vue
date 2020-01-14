<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title">
      <a-col :span="22" style="font-size: 25px;">Business Details</a-col>
    </a-row>
    <a-form class="business-form">
      <!-- Business Data -->
      <!-- <a-form-item
        style="font-weight: bold">
        <span slot="label">
          Business Owner
        </span>
      </a-form-item>-->

      <!-- <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('business_details.business_owner_name.last') ? 'error': ''"
            :help="checkErrors('business_details.business_owner_name.last')"
          >
            <span slot="label">
             Owner Last Name
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.business_details.business_owner_name.last"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7}">
          <a-form-item
            :validate-status="checkErrors('business_details.business_owner_name.first') ? 'error': ''"
            :help="checkErrors('business_details.business_owner_name.first')"
          >
            <span slot="label">
              First Name
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.business_details.business_owner_name.first"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{  }" :sm="{ span: 6 }">
          <a-form-item label="Middle Name">
            <a-input v-model="form.business_details.business_owner_name.middle"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-form-item label="Suffix">
            <a-input v-model="form.business_details.business_owner_name.suffix"></a-input>
          </a-form-item>
        </a-col>
      </a-row>-->
      <!-- --------------------------------------------------------- -->
      <a-form-item
        style="font-weight: bold"
        :validate-status="
          checkErrors('business_details.business_name') ? 'error' : ''
        "
        :help="checkErrors('business_details.business_name')"
      >
        <span slot="label">
          Business Name
          <i style="color: red">*</i>
        </span>
        <a-input v-model="form.business_details.business_name"></a-input>
      </a-form-item>

      <a-form-item
        style="font-weight: bold"
        :validate-status="checkErrors('business_details.business_owner') ? 'error': ''"
        :help="checkErrors('business_details.business_owner')"
      >
        <span slot="label">
          Business Owner Name
          <i style="color: red">*</i>
        </span>
        <a-input v-model="form.business_details.business_owner"></a-input>
      </a-form-item>

      <a-form-item
        style="font-weight: bold;"
        :validate-status="checkErrors('business_details.business_type') ? 'error': ''"
        :help="checkErrors('business_details.business_type')"
      >
        <span slot="label">
          Business Type
          <i style="color: red">*</i>
        </span>
        <a-radio-group buttonStyle="solid" v-model="form.business_details.business_type">
          <a-radio-button value="SP">Single Proprietorship</a-radio-button>
          <a-radio-button value="P">Partnership</a-radio-button>
          <a-radio-button value="CE">Cooperative</a-radio-button>
          <a-radio-button value="CN">Corporation</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="Trade Name/Franchise" style="font-weight: bold">
        <a-input v-model="form.business_details.franchise"></a-input>
      </a-form-item>

      <!-- Business Address -->
      <a-divider
        style="color: black;font-weight: bold;margin-top: 5vh"
        orientation="left"
      >Business Address</a-divider>
      <a-form-item v-if="form.purpose.includes('pc')">
        <a-checkbox @change="resetRentedData">Check if the address is the same as residential</a-checkbox>
      </a-form-item>
      <a-row :gutter="15" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
          <a-row :gutter="5">
            <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <a-form-item label="House/Bldg No">
                <a-input v-model="form.business_address.bldg_no"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <a-form-item label="Unit No">
                <a-input v-model="form.business_address.unit_no"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Building Name">
                <a-input v-model="form.business_address.bldg_name"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Street">
                <a-input v-model="form.business_address.street"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Subdivision">
                <a-input v-model="form.business_address.subdivision"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>

        <!-- Map -->
        <a-col :xs="{ span: 24 }" :sm="{ span: 14 }">
          <GmapMap
            id="map"
            ref="map"
            :center="{ lat: 13.960837, lng: 121.591532 }"
            :zoom="16"
            map-type-id="terrain"
            draggable="true"
            style="width: 100%; height: 300px"
            :options="{
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false
            }"
          ></GmapMap>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold; margin-top: 1vh;" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="
              checkErrors('business_address.region') ? 'error' : ''
            "
            :help="checkErrors('business_address.region')"
          >
            <span slot="label">
              Region
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.business_address.region"></a-input> -->
            <a-select
              v-model="form.business_address.region"
              showSearch
              disabled
              @change="changeRegion"
              :filterOption="
                (input, option) =>
                  filterReference(input, option, regions, 'regCode', 'regDesc')
              "
            >
              <a-select-option :value="''" :key="''" disabled>Select Region</a-select-option>
              <a-select-option
                v-for="item in regions"
                :key="item.regCode"
                :value="item.regCode"
              >{{ item.regDesc }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="
              checkErrors('business_address.province') ? 'error' : ''
            "
            :help="checkErrors('business_address.province')"
          >
            <span slot="label">
              Province
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.business_address.province"></a-input> -->
            <a-select
              v-model="form.business_address.province"
              disabled
              showSearch
              @change="changeProvince"
              :filterOption="
                (input, option) =>
                  filterReference(
                    input,
                    option,
                    provinces,
                    'provCode',
                    'provDesc'
                  )
              "
            >
              <a-select-option :value="''" disabled>Select Province</a-select-option>
              <a-select-option
                v-for="item in provinces"
                :key="item.provCode"
                :value="item.provCode"
              >{{ item.provDesc }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
          <a-form-item
            :validate-status="
              checkErrors('business_address.city') ? 'error' : ''
            "
            :help="checkErrors('business_address.city')"
          >
            <span slot="label">
              City/Municipality
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.business_address.city"></a-input> -->
            <a-select
              v-model="form.business_address.city"
              disabled
              @change="changeCity"
              showSearch
              :filterOption="
                (input, option) =>
                  filterReference(
                    input,
                    option,
                    cities,
                    'citymunCode',
                    'citymunDesc'
                  )
              "
            >
              <a-select-option :value="''" disabled>Select City/Municipality</a-select-option>
              <a-select-option
                v-for="item in cities"
                :key="item.citymunCode"
                :value="item.citymunCode"
              >{{ item.citymunDesc }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item
            :validate-status="
              checkErrors('business_address.barangay') ? 'error' : ''
            "
            :help="checkErrors('business_address.barangay')"
          >
            <span slot="label">
              Barangay
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.business_address.barangay" placeholder="Barangay*"></a-input> -->
            <!-- <a-input v-model="form.business_address.barangay"></a-input> -->
            <a-select
              v-model="form.business_address.barangay"
              :disabled="!form.business_address.city"
              showSearch
              :filterOption="
                (input, option) =>
                  filterReference(
                    input,
                    option,
                    barangays,
                    'brgyCode',
                    'brgyDesc'
                  )
              "
            >
              <a-select-option :value="''" disabled>Select Barangay</a-select-option>
              <a-select-option
                v-for="item in barangays"
                :key="item.brgyCode"
                :value="item.brgyCode"
              >{{ item.brgyDesc }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item
            :validate-status="
              checkErrors('business_address.postal_code') ? 'error' : ''
            "
            :help="checkErrors('business_address.postal_code')"
          >
            <span slot="label">
              Postal Code
              <i style="color: red">*</i>
            </span>
            <a-input
              disabled
              v-model="form.business_address.postal_code"
              placeholder="Postal Code*"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
        <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 18 }">
          <a-button-group>
            <a-button @click="$emit('prev')">Previous</a-button>
            <a-button type="primary" @click="$emit('next')">Next</a-button>
          </a-button-group>
        </a-col>
        <!-- <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
          <a-button>Save Draft</a-button>
        </a-col>-->
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
import regions_data from "../../../assets/references/regions.json";
import provinces_data from "../../../assets/references/provinces.json";

export default {
  props: ["form", "step", "errors"],
  data() {
    return {
      regions_data,
      provinces_data,
      cities: [],
      barangays: []
    };
  },
  created() {
    console.log("this.fixed_address :", this.fixed_address);
    if (this.fixed_address) {
      this.form.business_address.region = "04";
      // this.changeRegion();
      this.form.business_address.province = "0456";
      // this.changeProvince();
      this.form.business_address.city = "045641";
      // this.changeCity();

      import(
        `../../../assets/references/cities/${this.form.business_address.province}.json`
      )
        .then(data => {
          this.cities = data.default;
          console.log("###### this.cities :", this.cities);
          return import(
            `../../../assets/references/barangay/${this.form.business_address.city}.json`
          );
        })
        .then(data => {
          this.barangays = data.default;
          console.log("##### barangays data :", data);
        })
        .catch(errors => {
          console.log("### errors :", errors);
        });
    }
    if (this.fixed_postal) {
      this.form.business_address.postal_code = "4324";
    }
  },
  computed: {
    regions() {
      console.log("regions_data: " + JSON.stringify(this.regions_data));
      return this.regions_data;
    },
    provinces() {
      const region_code = this.form.business_address.region;
      if (!region_code) return [];

      const provincesOnRegion = this.provinces_data.filter(
        v => v.regCode === region_code
      );
      return provincesOnRegion;
    }
  },
  mounted() {
    this.loadReferences();
  },
  methods: {
    checkErrors(field) {
      var form_error = this.errors.find(v => v.field === field);
      return form_error ? form_error.error : null;
    },
    changeRegion() {
      // clear data
      this.form.business_address.province = "";
      this.form.business_address.city = "";
      this.form.business_address.barangay = "";
    },
    changeProvince() {
      // clear data first
      this.form.business_address.city = "";
      this.form.business_address.barangay = "";

      // call cities
      if (this.form.business_address.province) {
        import(
          `../../../assets/references/cities/${this.form.business_address.province}.json`
        ).then(data => {
          this.cities = data.default;
        });
      }
    },
    changeCity() {
      // clear data first
      this.form.business_address.barangay = "";

      // Call Barangays
      if (this.form.business_address.city) {
        import(
          `../../../assets/references/barangay/${this.form.business_address.city}.json`
        ).then(data => {
          this.barangays = data.default;
        });
      }
    },
    loadReferences() {
      const { mode, ref_no } = this.$route.query;
      if (this.fixed_address && !mode && !ref_no) {
        this.form.business_address.region = "04";
        // this.changeRegion();
        this.form.business_address.province = "0456";
        // this.changeProvince();
        this.form.business_address.city = "045641";
        // this.changeCity();
        import(
          `../../../assets/references/cities/${this.form.business_address.province}.json`
        )
          .then(data => {
            this.cities = data.default;
            console.log("this.cities :", this.cities);
            return import(
              `../../../assets/references/barangay/${this.form.business_address.city}.json`
            );
          })
          .then(data => {
            this.barangays = data.default;
            console.log("this.barangays :", this.barangays);
          });
      } else if (mode && ref_no) {
        if (this.form.business_address.province)
          import(
            `../../../assets/references/cities/${this.form.business_address.province}.json`
          )
            .then(data => {
              this.cities = data.default;
              console.log("this.cities :", this.cities);
              if (this.form.business_address.city)
                return import(
                  `../../../assets/references/barangay/${this.form.business_address.city}.json`
                );
            })
            .then(data => {
              this.barangays = data ? data.default : [];
              console.log("this.barangays :", this.barangays);
            });
      }
      if (this.fixed_postal && !mode && !ref_no)
        this.form.business_address.postal_code = "4324";
    },
    filterReference(inputValue, option, array, code, description) {
      if (!option.key) return false;
      const data = array.find(v => v[code] === option.key);
      return (
        data[code].toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
        data[description].toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },
    resetRentedData() {
      this.form.business_address = JSON.parse(
        JSON.stringify(this.form.residential_address)
      );
    }
  }
};
</script>

<style>
.text-left .ant-form-item-label {
  text-align: left;
  font-weight: bold;
}

.business-form .ant-form-item {
  margin: 0;
}
</style>
