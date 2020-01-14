<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title" type="flex" justify="space-between">
      <a-col :xs="{span: 0}" :sm="{span: 0}" :md="{span: 21}" :xl="{span: 21}">
        <h1 style="font-size:25px; color: #7e7e7e">New Applicant Registration</h1>
      </a-col>
      <a-col :xs="{span: 21}" :sm="{span: 21}" :md="{span: 0}" :xl="{span: 0}">
        <h1 style="font-size:25px; color: #7e7e7e">
          New Applicant
          <br />Registration
        </h1>
      </a-col>
    </a-row>

    <a-form>
      <a-divider style="color: black;font-weight: bold;" orientation="left">Contact / Address</a-divider>
      <a-row :gutter="15" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 13 }">
          <a-row :gutter="5">
            <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <a-form-item label="House/Bldg No">
                <a-input v-model="form.address.bldg_no"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
              <a-form-item label="Unit No">
                <a-input v-model="form.address.unit_no"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="23">
              <a-form-item label="Building Name">
                <a-input v-model="form.address.bldg_name"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="23">
              <a-form-item label="Street">
                <a-input v-model="form.address.street"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="23">
              <a-form-item label="Subdivision">
                <a-input v-model="form.address.subdivision"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Map -->
        <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
          <a-button type="primary">Pin Location</a-button>
          <GmapMap
            id="map"
            ref="map"
            :center="{ lat: 13.960837, lng: 121.591532 }"
            :zoom="16"
            map-type-id="terrain"
            draggable="true"
            style="width: 100%; height: 350px"
            :options="{ mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false }"
          ></GmapMap>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('address.region') ? 'error': ''"
            :help="checkErrors('address.region')"
          >
            <span slot="label">
              Region
              <i style="color: red">*</i>
            </span>
            <a-select
              v-model="form.address.region"
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
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item
            :validate-status="checkErrors('address.province') ? 'error': ''"
            :help="checkErrors('address.province')"
          >
            <span slot="label">
              Province
              <i style="color: red">*</i>
            </span>
            <a-select
              v-model="form.address.province"
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
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item
            :validate-status="checkErrors('address.barangay') ? 'error': ''"
            :help="checkErrors('address.barangay')"
          >
            <span slot="label">
              Barangay
              <i style="color: red">*</i>
            </span>
            <a-select
              v-model="form.address.barangay"
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
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item
            :validate-status="checkErrors('address.city') ? 'error': ''"
            :help="checkErrors('address.city')"
          >
            <span slot="label">
              City / Municipality
              <i style="color: red">*</i>
            </span>
            <a-select
              v-model="form.address.city"
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
        <a-col :xs="{ span: 24 }" :sm="{ span: 4 }">
          <a-form-item
            :validate-status="checkErrors('address.postal_code') ? 'error': ''"
            :help="checkErrors('address.postal_code')"
          >
            <span slot="label">
              Postal Code
              <i style="color: red">*</i>
            </span>
            <a-input disabled v-model="form.address.postal_code"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
        <!-- <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 6 }"> -->
        <a-col :span="24">
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
  computed: {
    regions() {
      console.log("regions_data: " + JSON.stringify(this.regions_data));
      return this.regions_data;
    },
    provinces() {
      const region_code = this.form.address.region;
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
      this.form.address.province = "";
      this.form.address.city = "";
      this.form.address.barangay = "";
    },
    changeProvince() {
      // clear data first
      this.form.address.city = "";
      this.form.address.barangay = "";

      // call cities
      if (this.form.address.province) {
        import(
          `../../../assets/references/cities/${this.form.address.province}.json`
        ).then(data => {
          this.cities = data.default;
        });
      }
    },
    changeCity() {
      // clear data first
      this.form.address.barangay = "";

      // Call Barangays
      if (this.form.address.city) {
        import(
          `../../../assets/references/barangay/${this.form.address.city}.json`
        ).then(data => {
          this.barangays = data.default;
        });
      }
    },
    loadReferences() {
      const { mode, ref_no } = this.$route.query;
      if (this.fixed_address && !mode && !ref_no) {
        this.form.address.region = "04";
        // this.changeRegion();
        this.form.address.province = "0456";
        // this.changeProvince();
        this.form.address.city = "045641";
        // this.changeCity();
        import(
          `../../../assets/references/cities/${this.form.address.province}.json`
        )
          .then(data => {
            this.cities = data.default;
            console.log("this.cities :", this.cities);
            return import(
              `../../../assets/references/barangay/${this.form.address.city}.json`
            );
          })
          .then(data => {
            this.barangays = data.default;
            console.log("this.barangays :", this.barangays);
          });
      } else if (mode && ref_no) {
        if (this.form.address.province)
          import(
            `../../../assets/references/cities/${this.form.address.province}.json`
          )
            .then(data => {
              this.cities = data.default;
              console.log("this.cities :", this.cities);
              if (this.form.address.city)
                return import(
                  `../../../assets/references/barangay/${this.form.address.city}.json`
                );
            })
            .then(data => {
              this.barangays = data ? data.default : [];
              console.log("this.barangays :", this.barangays);
            });
      }
      if (this.fixed_postal && !mode && !ref_no)
        this.form.address.postal_code = "4324";
    }
  }
};
</script>
<style>
</style>