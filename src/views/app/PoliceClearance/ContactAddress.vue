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
            <a-col :xs="{ span: 24 }" :sm="{ span: 16 }">
              <a-form-item label="House/Bldg No">
                <a-input v-model="form.address_details.bldg_no"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
              <a-form-item label="Unit No">
                <a-input v-model="form.address_details.unit_no"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="23">
              <a-form-item label="Building Name">
                <a-input v-model="form.address_details.bldg_name"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="23">
              <a-form-item label="Street">
                <a-input v-model="form.address_details.street"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="23">
              <a-form-item label="Subdivision">
                <a-input v-model="form.address_details.subdivision"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Map -->
        <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
          <GmapMap
            id="map"
            ref="map"
            :center="form.address_details.coordinates"
            :zoom="16"
            map-type-id="terrain"
            draggable="true"
            style="width: 100%; height: 300px"
            :options="{ mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false }"
            @click="mapClick"
          >
            <GmapMarker
              :position="form.address_details.coordinates"
              :animation="marker_animation"
              @animation_changed="resetAnimation"
            />
          </GmapMap>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('address_details.region') ? 'error': ''"
            :help="checkErrors('address_details.region')"
          >
            <span slot="label">
              Region
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.address_details.region"></a-input> -->
            <a-select
              v-model="form.address_details.region"
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
            :validate-status="checkErrors('address_details.province') ? 'error': ''"
            :help="checkErrors('address_details.province')"
          >
            <span slot="label">
              Province
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.address_details.province"></a-input> -->
            <a-select
              v-model="form.address_details.province"
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
            :validate-status="checkErrors('address_details.barangay') ? 'error': ''"
            :help="checkErrors('address_details.barangay')"
          >
            <span slot="label">
              Barangay
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.address_details.barangay"></a-input> -->
            <a-select
              v-model="form.address_details.barangay"
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
            :validate-status="checkErrors('address_details.city') ? 'error': ''"
            :help="checkErrors('address_details.city')"
          >
            <span slot="label">
              City / Municipality
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.address_details.city"></a-input> -->
            <a-select
              v-model="form.address_details.city"
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
            :validate-status="checkErrors('address_details.postal_code') ? 'error': ''"
            :help="checkErrors('address_details.postal_code')"
          >
            <span slot="label">
              Postal Code
              <i style="color: red">*</i>
            </span>
            <a-input disabled v-model="form.address_details.postal_code"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item
            :validate-status="checkErrors('contact_details.tel_no') ? 'error': ''"
            :help="checkErrors('contact_details.tel_no')"
          >
            <span slot="label">
              Telephone No.
              <i style="color: red">*</i>
            </span>
            <!-- <a-input maxlength="11" v-model="form.contact_details.tel_no"></a-input> -->
            <input type="number" min="0" class="ant-input" max-length="11" onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.keyCode !== 109 && event.keyCode !== 106 && event.keyCode !== 56 && event.keyCode !== 111 && event.keyCode !== 191 && event.keyCode !== 190"></input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item
            :validate-status="checkErrors('contact_details.mobile') ? 'error': ''"
            :help="checkErrors('contact_details.mobile')"
          >
            <span slot="label">
              Mobile No.
              <i style="color: red">*</i>
            </span>
            <!-- <a-input-number 
            maxlength="11" 
            v-model="form.contact_details.mobile"
            :formatter="value => `${value}`.replace(/^([0-9]$)/g, ',')"
            ></a-input-number>
             -->
             <input type="number" class="ant-input" onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.keyCode !== 109 && event.keyCode !== 106 && event.keyCode !== 56 && event.keyCode !== 111 && event.keyCode !== 191 && event.keyCode !== 190"/>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('contact_details.email') ? 'error': ''"
            :help="checkErrors('contact_details.email')"
          >
            <span slot="label">
              Email Address
              <i style="color: red">*</i>
            </span>
            <a-input style="text-transform: none;" v-model="form.contact_details.email"></a-input>
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
      marker_animation: 0,
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
      const region_code = this.form.address_details.region;
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
  created() {
    this.$getLocation().then(coordinates => {
      this.form.address_details.coordinates = coordinates;
    });  
  },
  methods: {
    mapClick(e) {
      console.log("e :", e);
      this.form.address_details.coordinates.lat = e.latLng.lat();
      this.form.address_details.coordinates.lng = e.latLng.lng();
      this.marker_animation = 4;
    },
    resetAnimation(e) {
      setTimeout(function(params) {
        this.marker_animation = 0;
      }, 1000);
    },
    checkErrors(field) {
      var form_error = this.errors.find(v => v.field === field);
      return form_error ? form_error.error : null;
    },
    changeRegion() {
      // clear data
      this.form.address_details.province = "";
      this.form.address_details.city = "";
      this.form.address_details.barangay = "";
    },
    changeProvince() {
      // clear data first
      this.form.address_details.city = "";
      this.form.address_details.barangay = "";

      // call cities
      if (this.form.address_details.province) {
        import(
          `../../../assets/references/cities/${this.form.address_details.province}.json`
        ).then(data => {
          this.cities = data.default;
        });
      }
    },
    changeCity() {
      // clear data first
      this.form.address_details.barangay = "";

      // Call Barangays
      if (this.form.address_details.city) {
        import(
          `../../../assets/references/barangay/${this.form.address_details.city}.json`
        ).then(data => {
          this.barangays = data.default;
        });
      }
    },
    loadReferences() {
      const { mode, ref_no } = this.$route.query;
      if (this.fixed_address && !mode && !ref_no) {
        this.form.address_details.region = "04";
        // this.changeRegion();
        this.form.address_details.province = "0456";
        // this.changeProvince();
        this.form.address_details.city = "045641";
        // this.changeCity();
        import(
          `../../../assets/references/cities/${this.form.address_details.province}.json`
        )
          .then(data => {
            this.cities = data.default;
            console.log("this.cities :", this.cities);
            return import(
              `../../../assets/references/barangay/${this.form.address_details.city}.json`
            );
          })
          .then(data => {
            this.barangays = data.default;
            console.log("this.barangays :", this.barangays);
          });
      } else if (mode && ref_no) {
        if (this.form.address_details.province)
          import(
            `../../../assets/references/cities/${this.form.address_details.province}.json`
          )
            .then(data => {
              this.cities = data.default;
              console.log("this.cities :", this.cities);
              if (this.form.address_details.city)
                return import(
                  `../../../assets/references/barangay/${this.form.address_details.city}.json`
                );
            })
            .then(data => {
              this.barangays = data ? data.default : [];
              console.log("this.barangays :", this.barangays);
            });
      }
      if (this.fixed_postal && !mode && !ref_no)
        this.form.address_details.postal_code = "4324";
    }
  }
};
</script>
<style>
</style>