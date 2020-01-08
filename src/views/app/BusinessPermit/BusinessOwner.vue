<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title">
      <a-col :span="22" style="font-size: 25px;">Business Owner Information</a-col>
      <a-col :span="2" style="text-align: right;">
        <a-tooltip placement="left">
          <span slot="title">
            Secure Business Permit in 6 steps (all fields marked with an asterisk
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
      <!-- <a-row>
        <a-col :xs="{ span: 24 }">
          <a-form-item>
            <a-checkbox @change="onChange">Is the registrant the business owner</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>-->

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
            <a-input v-model="form.owner_details.name.last"></a-input>
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
            <a-input v-model="form.owner_details.name.first"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{  }" :sm="{ span: 6 }">
          <a-form-item label="Middle Name">
            <a-input v-model="form.owner_details.name.middle"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-form-item label="Suffix">
            <a-input v-model="form.owner_details.name.suffix"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold;" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('owner_details.birthdate') ? 'error': ''"
            :help="checkErrors('owner_details.birthdate')"
          >
            <span slot="label">
              Date of Birth
              <i style="color: red">*</i>
            </span>
            <a-date-picker
              style="width: 100%;"
              v-model="form.owner_details.birthdate"
              :disabledDate="v => disableDateInBirthdate(v, true)"
              :defaultPickerValue="defaultBdayPickerValue"
              :showToday="false"
            ></a-date-picker>
          </a-form-item>
        </a-col>

        <a-row style="font-weight: bold;" :gutter="5">
          <a-col
            :xs="{ span: 24 }"
            :sm="{ span: 8 }"
            v-if="checkDocsNeeded(['residence','barangay','police'])"
          >
            <a-form-item
              style="font-weight: bold;"
              :validate-status="checkErrors('required_documents.birthplace') ? 'error': ''"
              :help="checkErrors('required_documents.birthplace')"
            >
              <span slot="label">
                Place of Birth
                <i style="color: red">*</i>
              </span>
              <a-input v-model="form.owner_details.birthplace" />
            </a-form-item>
          </a-col>

          <a-col :xs="{ span: 24 }" :sm="{ span:8  }">
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

        <a-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          v-if="checkDocsNeeded(['residence','barangay','police'])"
        >
          <a-form-item
            style="font-weight: bold;"
            :validate-status="checkErrors('required_documents.civil_status') ? 'error': ''"
            :help="checkErrors('required_documents.civil_status')"
          >
            <span slot="label">
              Civil Status
              <i style="color: red">*</i>
            </span>
            <a-radio-group buttonStyle="solid" v-model="form.owner_details.civil_status">
              <a-radio-button value="single">Single</a-radio-button>
              <a-radio-button value="married">Married</a-radio-button>
              <a-radio-button value="widowed">Widowed</a-radio-button>
              <a-radio-button value="separated">Separated</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold;" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('owner_details.telno') ? 'error': ''"
            :help="checkErrors('owner_details.telno')"
          >
            <span slot="label">
              Tel No
              <i style="color: red">*</i>
            </span>
            <a-input
              v-model="form.owner_details.telno"
              placeholder="Area code + 8-digit number (i.e. 046xxxxxxxx)"
              maxlength="11"
              style="width:100%"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('owner_details.mobile') ? 'error': ''"
            :help="checkErrors('owner_details.mobile')"
          >
            <span slot="label">
              Mobile No
              <i style="color: red">*</i>
            </span>
            <a-input
              v-model="form.owner_details.mobile"
              placeholder="11-digit mobile number (i.e. 09xxxxxxxxx"
              maxlength="11"
              style="width:100%"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <a-form-item
            :validate-status="checkErrors('owner_details.email') ? 'error': ''"
            :help="checkErrors('owner_details.email')"
          >
            <span slot="label">
              Email Address
              <i style="color: red">*</i>
            </span>
            <a-input style="text-transform: none;" v-model="form.owner_details.email" placeholder="Email Address*"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold;" :gutter="5">
        <a-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          v-if="checkDocsNeeded(['residence', 'barangay'])"
        >
          <a-form-item style="font-weight: bold;" label="Occupation/Profession">
            <a-input v-model="form.owner_details.occupation" />
          </a-form-item>
        </a-col>

        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" v-if="checkDocsNeeded(['residence'])">
          <a-form-item style="font-weight: bold;" label="Monthly Salary">
            <a-select v-model="form.owner_details.monthly_salary">
              <a-select-option value="₱250,000 and below">₱250,000 and below</a-select-option>
              <a-select-option value=">₱250,000 to ₱400,000">> ₱250,000 to ₱400,000</a-select-option>
              <a-select-option value=">₱400,000 to ₱800,000 ">> ₱400,000 to ₱800,000</a-select-option>
              <a-select-option value=">₱800,000 to ₱2,000,000">> ₱800,000 to ₱2,000,000</a-select-option>
              <a-select-option value=">₱2,000,000 to ₱8,000,000">> ₱2,000,000 to ₱8,000,000</a-select-option>
              <a-select-option value=">Above ₱8,000,000">Above ₱8,000,000</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold;" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" v-if="checkDocsNeeded(['residence'])">
          <a-form-item style="font-weight: bold;" label="Height(cm)">
            <a-input maxlength="3" style="width:100%" v-model="form.owner_details.height" />
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" v-if="checkDocsNeeded(['residence'])">
          <a-form-item style="font-weight: bold;" label="Weight(kg)">
            <a-input maxlength="3" style="width:100%" v-model="form.owner_details.weight" />
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" v-if="checkDocsNeeded(['residence'])">
          <a-form-item style="font-weight: bold;" label="ICR No(if Alien)">
            <a-input v-model="form.owner_details.icr_no" />
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
                <a-input v-model="form.owner_address.bldg_no"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <a-form-item label="Unit No">
                <a-input v-model="form.owner_address.unit_no"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Building Name">
                <a-input v-model="form.owner_address.bldg_name"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Street">
                <a-input v-model="form.owner_address.street"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Subdivision">
                <a-input v-model="form.owner_address.subdivision"></a-input>
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
            <a-input v-model="form.owner_address.postal_code"></a-input>
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
import moment from 'moment';

export default {
  props: ["form", "step", "errors", "documents"],
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
    defaultBdayPickerValue(){
      return moment(new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()))
    },
    user() {
      return this.$store.state.user_session.user;
    },
    regions() {
      console.log("regions_data: " + JSON.stringify(this.regions_data));
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
    this.form.owner_details.name = this.user.name;
    this.form.owner_details.email = this.user.email;
  },
  mounted() {
    this.checkRequiredDocs();

    this.loadReferences();
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
      console.log("this.user :", this.user);
      if (e.target.checked) {
        this.form.owner_details.name = this.user.name;
        this.form.owner_details.email = this.user.email;
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
    },
    checkDocsNeeded(keywords) {
      var show = false;
      keywords.forEach(key => {
        if (this.required_docs.includes(key)) show = true;
      });
      return show;
    },
    checkRequiredDocs() {
      this.required_docs = [];
      this.documents.forEach(doc => {
        if (
          this.form.attachments.findIndex(v => v.doc_type === doc.keyword) ===
          -1
        )
          this.required_docs.push(doc.keyword);
      });
    },
    loadReferences() {
      const { mode, ref_no } = this.$route.query;
      if (this.fixed_address && !mode && !ref_no) {
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
            console.log("this.cities :", this.cities);
            return import(
              `../../../assets/references/barangay/${this.form.owner_address.city}.json`
            );
          })
          .then(data => {
            this.barangays = data.default;
            console.log("this.barangays :", this.barangays);
          });
      } else if (mode && ref_no) {
        if (this.form.owner_address.province)
          import(
            `../../../assets/references/cities/${this.form.owner_address.province}.json`
          )
            .then(data => {
              this.cities = data.default;
              console.log("this.cities :", this.cities);
              if (this.form.owner_address.city)
                return import(
                  `../../../assets/references/barangay/${this.form.owner_address.city}.json`
                );
            })
            .then(data => {
              this.barangays = data ? data.default : [];
              console.log("this.barangays :", this.barangays);
            });
      }
      if (this.fixed_postal && !mode && !ref_no)
        this.form.owner_address.postal_code = "4324";
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