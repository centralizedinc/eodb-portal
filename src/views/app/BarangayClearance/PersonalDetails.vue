<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title">
      <a-col :span="22" style="font-size: 25px;">Personal Details</a-col>
      <a-col :span="2" style="text-align: right;">
        <!-- <a-tooltip placement="left">
            <span slot="title">
              Secure Business Permit in 6 steps (all fields marked with an asterisk
              <i
                style="color: red;"
              >*</i> is required.)
            </span>
            <a-icon type="info-circle" />
        </a-tooltip>-->
      </a-col>
    </a-row>
    <!-- form start -->
    <a-form>
      <a-divider style="color: black;font-weight: bold;" orientation="left">Applicant Details</a-divider>
      <!-- <a-row>
          <a-col :xs="{ span: 24 }">
            <a-form-item>
              <a-checkbox @change="onChange">Check this box if the registrant is the applicant</a-checkbox>
            </a-form-item>
          </a-col>
      </a-row>-->
      <!-- <a-form-item></a-form-item> -->
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="
              checkErrors('personal_details.name.last') ? 'error' : ''
            "
            :help="checkErrors('personal_details.name.last')"
          >
            <span slot="label">
              Last Name
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.personal_details.name.last"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="
              checkErrors('personal_details.name.first') ? 'error' : ''
            "
            :help="checkErrors('personal_details.name.first')"
          >
            <span slot="label">
              First Name
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.personal_details.name.first"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item
            :validate-status="
              checkErrors('personal_details.name.middle') ? 'error' : ''
            "
            :help="checkErrors('personal_details.name.middle')"
          >
            <span slot="label">Middle Name</span>
            <a-input v-model="form.personal_details.name.middle"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-form-item>
            <span slot="label">Suffix</span>
            <a-input v-model="form.personal_details.name.sufix"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.birthday') ? 'error': ''"
            :help="checkErrors('personal_details.birthday')"
          >
            <span slot="label">
              Date of Birth
              <i style="color: red">*</i>
            </span>
            <a-date-picker v-model="form.personal_details.birthday" :disabledDate="disableDateInBirthdate" style="width: 100%;"></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.birthplace') ? 'error': ''"
            :help="checkErrors('personal_details.birthplace')"
          >
            <span slot="label">
              Place of Birth
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.personal_details.birthplace" placeholder="Enter Birth Place"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 9 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.gender') ? 'error': ''"
            :help="checkErrors('personal_details.gender')"
          >
            <span slot="label">
              Gender
              <i style="color: red">*</i>
            </span>
            <a-radio-group v-model="form.personal_details.gender" buttonStyle="solid">
              <a-radio-button value="M">Male</a-radio-button>
              <a-radio-button value="F">Female</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 15 }">
          <a-form-item style="font-weight: bold;" label="Civil Status">
            <a-radio-group v-model="form.personal_details.civil_status" buttonStyle="solid">
              <a-radio-button value="single">Single</a-radio-button>
              <a-radio-button value="married">Married</a-radio-button>
              <a-radio-button value="widowed">Widowed</a-radio-button>
              <a-radio-button value="separated">Separated</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row style="font-weight: bold;" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.ctc_no') ? 'error': ''"
            :help="checkErrors('personal_details.ctc_no')"
          >
            <span slot="label">
              Community Tax Certificate Number
              <i style="color: red">*</i>
            </span>
            <a-input
              v-model="form.personal_details.ctc_no"
              placeholder="Found at the upper right corner. (i.e., CCI2### ########)"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- Residential Address -->
      <template v-if="form.purpose.includes('pc')">
        <a-divider
          style="color: black;font-weight: bold;margin-top: 5vh"
          orientation="left"
        >Residential Address</a-divider>
        <a-row :gutter="15" style="font-weight: bold;">
          <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
            <a-row :gutter="5">
              <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
                <a-form-item
                  :validate-status="checkErrors('residential_address.bldg_no') ? 'error': ''"
                  :help="checkErrors('residential_address.bldg_no')"
                  label="House/Bldg No"
                >
                  <a-input v-model="form.residential_address.bldg_no"></a-input>
                </a-form-item>
              </a-col>
              <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
                <a-form-item
                  :validate-status="checkErrors('residential_address.unit_no') ? 'error': ''"
                  :help="checkErrors('residential_address.unit_no')"
                  label="Unit No"
                >
                  <a-input v-model="form.residential_address.unit_no"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  :validate-status="checkErrors('residential_address.bldg_name') ? 'error': ''"
                  :help="checkErrors('residential_address.bldg_name')"
                  label="Building Name"
                >
                  <a-input v-model="form.residential_address.bldg_name"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  :validate-status="checkErrors('residential_address.street') ? 'error': ''"
                  :help="checkErrors('residential_address.street')"
                  label="Street"
                >
                  <a-input v-model="form.residential_address.street"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  :validate-status="checkErrors('residential_address.subd') ? 'error': ''"
                  :help="checkErrors('residential_address.subd')"
                  label="Subdivision"
                >
                  <a-input v-model="form.residential_address.subd"></a-input>
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
              checkErrors('residential_address.region') ? 'error' : ''
            "
              :help="checkErrors('residential_address.region')"
            >
              <span slot="label">
                Region
                <i style="color: red">*</i>
              </span>
              <!-- <a-input v-model="form.residential_address.region"></a-input> -->
              <a-select
                v-model="form.residential_address.region"
                showSearch
                @change="changeRegion"
                disabled
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
              checkErrors('residential_address.province') ? 'error' : ''
            "
              :help="checkErrors('residential_address.province')"
            >
              <span slot="label">
                Province
                <i style="color: red">*</i>
              </span>
              <!-- <a-input v-model="form.residential_address.province"></a-input> -->
              <a-select
                v-model="form.residential_address.province"
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
              :validate-status="checkErrors('residential_address.city') ? 'error' : ''"
              :help="checkErrors('residential_address.city')"
            >
              <span slot="label">
                City/Municipality
                <i style="color: red">*</i>
              </span>
              <!-- <a-input v-model="form.residential_address.city"></a-input> -->
              <a-select
                v-model="form.residential_address.city"
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
              checkErrors('residential_address.barangay') ? 'error' : ''
            "
              :help="checkErrors('residential_address.barangay')"
            >
              <span slot="label">
                Barangay
                <i style="color: red">*</i>
              </span>
              <!-- <a-input v-model="form.residential_address.barangay"></a-input> -->
              <a-select
                v-model="form.residential_address.barangay"
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
              checkErrors('residential_address.postal_code') ? 'error' : ''
            "
              :help="checkErrors('residential_address.postal_code')"
            >
              <span slot="label">
                Postal Code
                <i style="color: red">*</i>
              </span>
              <a-input disabled v-model="form.residential_address.postal_code"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </template>

      <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
        <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 6 }">
          <a-button-group>
            <a-button @click="$emit('prev')">Previous</a-button>
            <a-button type="primary" @click="$emit('next')">Next</a-button>
          </a-button-group>
        </a-col>
        <!-- <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
          <a-button>Save Draft</a-button>
        </a-col> -->
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
      barangays: [],
      required_docs: []
    };
  },
  computed: {
    regions() {
      console.log("regions_data: " + JSON.stringify(this.regions_data));
      return this.regions_data;
    },
    provinces() {
      const region_code = this.form.residential_address.region;
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
      this.form.residential_address.province = "";
      this.form.residential_address.city = "";
      this.form.residential_address.barangay = "";
    },
    changeProvince() {
      // clear data first
      this.form.residential_address.city = "";
      this.form.residential_address.barangay = "";

      // call cities
      if (this.form.residential_address.province) {
        import(
          `../../../assets/references/cities/${this.form.residential_address.province}.json`
        ).then(data => {
          this.cities = data.default;
        });
      }
    },
    changeCity() {
      // clear data first
      this.form.residential_address.barangay = "";

      // Call Barangays
      if (this.form.residential_address.city) {
        import(
          `../../../assets/references/barangay/${this.form.residential_address.city}.json`
        ).then(data => {
          this.barangays = data.default;
        });
      }
    },
    loadReferences() {
      const { mode, ref_no } = this.$route.query;
      if (this.fixed_address && !mode && !ref_no) {
        this.form.residential_address.region = "04";
        // this.changeRegion();
        this.form.residential_address.province = "0456";
        // this.changeProvince();
        this.form.residential_address.city = "045641";
        // this.changeCity();
        import(
          `../../../assets/references/cities/${this.form.residential_address.province}.json`
        )
          .then(data => {
            this.cities = data.default;
            console.log("this.cities :", this.cities);
            return import(
              `../../../assets/references/barangay/${this.form.residential_address.city}.json`
            );
          })
          .then(data => {
            this.barangays = data.default;
            console.log("this.barangays :", this.barangays);
          });
      } else if (mode && ref_no) {
        if (this.form.residential_address.province)
          import(
            `../../../assets/references/cities/${this.form.residential_address.province}.json`
          )
            .then(data => {
              this.cities = data.default;
              console.log("this.cities :", this.cities);
              if (this.form.residential_address.city)
                return import(
                  `../../../assets/references/barangay/${this.form.residential_address.city}.json`
                );
            })
            .then(data => {
              this.barangays = data ? data.default : [];
              console.log("this.barangays :", this.barangays);
            });
      }
      if (this.fixed_postal && !mode && !ref_no)
        this.form.residential_address.postal_code = "4324";
    }
  }
};
</script>

<style></style>
