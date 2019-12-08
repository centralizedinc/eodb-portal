<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title">
      <a-col :span="22" style="font-size: 25px;">Business Owner Information</a-col>
      <a-col :span="2" style="text-align: right;">
        <a-tooltip placement="left">
          <span slot="title">
            Secure Business Permit in 4 steps (all fields marked with an asterisk
            <i
              style="color: red;"
            >*</i> is required.)
          </span>
          <a-icon type="info-circle" />
        </a-tooltip>
      </a-col>
    </a-row>
    <a-form class="owner-form">
      <!-- Personal Details -->
      <a-divider style="color: black;font-weight: bold;" orientation="left">Personal Details</a-divider>
      <a-row>
        <a-col :xs="{ span: 24 }">
          <a-form-item>
            <a-checkbox @change="onChange">Is the registrant the business owner</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('owner_details.name.last') ? 'error': ''"
            :help="checkErrors('owner_details.name.last')"
          >
            <span slot="label">
              Last Name
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_details.name.last" placeholder="Last Name"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7}">
          <a-form-item
            :validate-status="checkErrors('owner_details.name.first') ? 'error': ''"
            :help="checkErrors('owner_details.name.first')"
          >
            <span slot="label">
              First Name
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_details.name.first" placeholder="First Name"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item label="Middle Name">
            <a-input v-model="form.owner_details.name.middle" placeholder="Middle Name"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-form-item label="Suffix">
            <a-input v-model="form.owner_details.name.suffix" placeholder="Suffix"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold;" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('owner_details.birthdate') ? 'error': ''"
            :help="checkErrors('owner_details.birthdate')"
          >
            <span slot="label">
              Date of Birth
              <i style="color: red">*</i>
            </span>
            <a-date-picker style="width: 100%;" v-model="form.owner_details.birthdate"></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('owner_details.gender') ? 'error': ''"
            :help="checkErrors('owner_details.gender')"
          >
            <span slot="label">
              Gender
              <i style="color: red">*</i>
            </span>
            <a-radio-group buttonStyle="solid" v-model="form.owner_details.gender">
              <a-radio-button value="M">Male</a-radio-button>
              <a-radio-button value="F">Female</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold;" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item
            :validate-status="checkErrors('owner_details.telno') ? 'error': ''"
            :help="checkErrors('owner_details.telno')"
          >
            <span slot="label">
              Tel No
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_details.telno" placeholder="Tel No*"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item
            :validate-status="checkErrors('owner_details.mobile') ? 'error': ''"
            :help="checkErrors('owner_details.mobile')"
          >
            <span slot="label">
              Mobile No
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_details.mobile" placeholder="Mobile No*"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item
            :validate-status="checkErrors('owner_details.email') ? 'error': ''"
            :help="checkErrors('owner_details.email')"
          >
            <span slot="label">
              Email Address
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_details.email" placeholder="Email Address*"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- Owner Address -->
      <a-divider
        style="color: black;font-weight: bold;margin-top: 5vh"
        orientation="left"
      >Owner Address</a-divider>
      <a-row :gutter="15" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
          <a-row :gutter="5">
            <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <a-form-item label="House/Bldg No">
                <a-input v-model="form.owner_address.bldg_no" placeholder="House/Bldg No"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <a-form-item label="Unit No">
                <a-input v-model="form.owner_address.unit_no" placeholder="Unit No"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Building Name">
                <a-input v-model="form.owner_address.bldg_name" placeholder="Building Name"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Street">
                <a-input v-model="form.owner_address.street" placeholder="Street"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Subdivision">
                <a-input v-model="form.owner_address.subdivision" placeholder="Subdivision"></a-input>
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
            :options="{ mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false }"
          ></GmapMap>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold; margin-top: 1vh;" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('owner_address.region') ? 'error': ''"
            :help="checkErrors('owner_address.region')"
          >
            <span slot="label">
              Region
              <i style="color: red">*</i>
            </span>
            <a-select
              v-model="form.owner_address.region"
              showSearch
              @change="changeRegion"
              :filterOption="(input, option) => filterReference(input, option, regions, 'regCode', 'regDesc')"
            >
              <a-select-option :value="''" :key="''" disabled>Select Region</a-select-option>
              <a-select-option
                v-for="item in regions"
                :key="item.regCode"
                :value="item.regCode"
              >{{item.regDesc}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('owner_address.province') ? 'error': ''"
            :help="checkErrors('owner_address.province')"
          >
            <span slot="label">
              Province
              <i style="color: red">*</i>
            </span>
            <a-select
              v-model="form.owner_address.province"
              :disabled="!form.owner_address.region"
              showSearch
              @change="changeProvince"
              :filterOption="(input, option) => filterReference(input, option, provinces, 'provCode', 'provDesc')"
            >
              <a-select-option :value="''" disabled>Select Province</a-select-option>
              <a-select-option
                v-for="item in provinces"
                :key="item.provCode"
                :value="item.provCode"
              >{{item.provDesc}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
          <a-form-item
            :validate-status="checkErrors('owner_address.city') ? 'error': ''"
            :help="checkErrors('owner_address.city')"
          >
            <span slot="label">
              City/Municipality
              <i style="color: red">*</i>
            </span>
            <a-select
              v-model="form.owner_address.city"
              :disabled="!form.owner_address.province"
              @change="changeCity"
              showSearch
              :filterOption="(input, option) => filterReference(input, option, cities, 'citymunCode', 'citymunDesc')"
            >
              <a-select-option :value="''" disabled>Select City/Municipality</a-select-option>
              <a-select-option
                v-for="item in cities"
                :key="item.citymunCode"
                :value="item.citymunCode"
              >{{item.citymunDesc}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item
            :validate-status="checkErrors('owner_address.barangay') ? 'error': ''"
            :help="checkErrors('owner_address.barangay')"
          >
            <span slot="label">
              Barangay
              <i style="color: red">*</i>
            </span>
            <a-select
              v-model="form.owner_address.barangay"
              :disabled="!form.owner_address.city"
              showSearch
              :filterOption="(input, option) => filterReference(input, option, barangays, 'brgyCode', 'brgyDesc')"
            >
              <a-select-option :value="''" disabled>Select Barangay</a-select-option>
              <a-select-option
                v-for="item in barangays"
                :key="item.brgyCode"
                :value="item.brgyCode"
              >{{item.brgyDesc}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item
            :validate-status="checkErrors('owner_address.postal_code') ? 'error': ''"
            :help="checkErrors('owner_address.postal_code')"
          >
            <span slot="label">
              Postal Code
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_address.postal_code" placeholder="Postal Code*"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
        <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 6 }">
          <a-button-group>
            <a-button @click="$emit('prev')" :disabled="true">Previous</a-button>
            <a-button type="primary" @click="$emit('next')">Next</a-button>
          </a-button-group>
        </a-col>
        <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
          <a-button>Save Draft</a-button>
        </a-col>
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
  computed: {
    user() {
      return this.$store.state.user_session.user;
    },
    regions() {
      return this.regions_data;
    },
    provinces() {
      const region_code = this.form.owner_address.region;
      if (!region_code) return [];

      const provincesOnRegion = this.provinces_data.filter(
        v => v.regCode === region_code
      );
      return provincesOnRegion;
    }
  },
  created() {
    if (this.fixed_address) {
      this.form.owner_address.region = "04";
      // this.changeRegion();
      this.form.owner_address.province = "0456";
      // this.changeProvince();
      this.form.owner_address.city = "045641";
      // this.changeCity();
      import(
        `../../../assets/references/cities/${this.form.owner_address.province}.json`
      )
        .then(data => {
          this.cities = data.default;
          return import(
            `../../../assets/references/barangay/${this.form.owner_address.city}.json`
          );
        })
        .then(data => {
          this.barangays = data.default;
        });
    }
    if (this.fixed_postal) this.form.owner_address.postal_code = "4324";
  },
  methods: {
    changeRegion() {
      // clear data
      this.form.owner_address.province = "";
      this.form.owner_address.city = "";
      this.form.owner_address.barangay = "";
    },
    changeProvince() {
      // clear data first
      this.form.owner_address.city = "";
      this.form.owner_address.barangay = "";

      // call cities
      if (this.form.owner_address.province) {
        import(
          `../../../assets/references/cities/${this.form.owner_address.province}.json`
        ).then(data => {
          this.cities = data.default;
        });
      }
    },
    changeCity() {
      // clear data first
      this.form.owner_address.barangay = "";

      // Call Barangays
      if (this.form.owner_address.city) {
        import(
          `../../../assets/references/barangay/${this.form.owner_address.city}.json`
        ).then(data => {
          this.barangays = data.default;
        });
      }
    },
    onChange(e) {
      if (e.target.checked) {
        this.form.owner_details.name = this.user.name;
      }
    },
    checkErrors(field) {
      var form_error = this.errors.find(v => v.field === field);
      return form_error ? form_error.error : null;
    },
    filterReference(inputValue, option, array, code, description) {
      if (!option.key) return false;
      const data = array.find(v => v[code] === option.key);
      return (
        data[code].toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
        data[description].toLowerCase().indexOf(inputValue.toLowerCase()) > -1
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

.owner-form .ant-form-item {
  margin: 0;
}
</style>