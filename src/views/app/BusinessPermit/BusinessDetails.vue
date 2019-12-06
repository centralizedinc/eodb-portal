<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title">
      <a-col :span="22" style="font-size: 25px;">Business Details</a-col>
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
    <a-form class="business-form">
      <!-- Business Data -->
      <a-divider
        style="color: black;font-weight: bold;margin-top: 5vh"
        orientation="left"
      >Business Data</a-divider>
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

      <a-form-item
        style="font-weight: bold"
        :validate-status="checkErrors('business_details.business_name') ? 'error': ''"
        :help="checkErrors('business_details.business_name')"
      >
        <span slot="label">
          Business Name
          <i style="color: red">*</i>
        </span>
        <a-input v-model="form.business_details.business_name" placeholder="Business Name*"></a-input>
      </a-form-item>

      <a-form-item label="Trade Name/Franchise" style="font-weight: bold">
        <a-input v-model="form.business_details.franchise" placeholder="Trade Name/Franchise"></a-input>
      </a-form-item>

      <a-row style="font-weight: bold" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('business_details.registration_no') ? 'error': ''"
            :help="checkErrors('business_details.registration_no')"
          >
            <span slot="label">
              {{reg_code}} Registration No
              <i style="color: red">*</i>
            </span>
            <a-input
              :placeholder="`${reg_code} Registration No*`"
              v-model="form.business_details.registration_no"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('business_details.registration_date') ? 'error': ''"
            :help="checkErrors('business_details.registration_date')"
          >
            <span slot="label">
              {{reg_code}} Date of registration
              <i style="color: red">*</i>
            </span>
            <a-date-picker style="width: 100%;" v-model="form.business_details.registration_date"></a-date-picker>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('business_details.tin') ? 'error': ''"
            :help="checkErrors('business_details.tin')"
          >
            <span slot="label">
              Tax Identification No
              <i style="color: red">*</i>
            </span>
            <a-input placeholder="Tax Identification No*" v-model="form.business_details.tin"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item label="CTC No.">
            <a-input placeholder="CTC No." v-model="form.business_details.ctc_no"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item label="Property Index Number(PIN)">
            <a-input placeholder="Property Index Number(PIN)" v-model="form.business_details.pin"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('business_details.business_area') ? 'error': ''"
            :help="checkErrors('business_details.business_area')"
          >
            <span slot="label">
              Business Area (in sq m)
              <i style="color: red">*</i>
            </span>
            <a-input
              placeholder="Business Area (in sq m)*"
              v-model="form.business_details.business_area"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="checkErrors('business_details.employees_establishment') ? 'error': ''"
            :help="checkErrors('business_details.employees_establishment')"
          >
            <span slot="label">
              No. of Employees in Establishment (in sq m)
              <i style="color: red">*</i>
            </span>
            <a-input
              placeholder="No. of Employees in Establishment*"
              v-model="form.business_details.employees_establishment"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item label="No. of Employees Residing in LGU">
            <a-input
              placeholder="No. of Employees in Residing in LGU"
              v-model="form.business_details.employees_residing"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- Business Address -->
      <a-divider
        style="color: black;font-weight: bold;margin-top: 5vh"
        orientation="left"
      >Business Address</a-divider>
      <a-row :gutter="15" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
          <a-row :gutter="5">
            <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <a-form-item label="House/Bldg No">
                <a-input v-model="form.business_address.bldg_no" placeholder="House/Bldg No"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <a-form-item label="Unit No">
                <a-input v-model="form.business_address.unit_no" placeholder="Unit No"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Building Name">
                <a-input v-model="form.business_address.bldg_name" placeholder="Building Name"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Street">
                <a-input v-model="form.business_address.street" placeholder="Street"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Subdivision">
                <a-input v-model="form.business_address.subdivision" placeholder="Subdivision"></a-input>
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
            :validate-status="checkErrors('business_address.region') ? 'error': ''"
            :help="checkErrors('business_address.region')"
          >
            <span slot="label">
              Region
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.business_address.region" placeholder="Region*"></a-input> -->
            <a-select
              v-model="form.business_address.region"
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
            :validate-status="checkErrors('business_address.province') ? 'error': ''"
            :help="checkErrors('business_address.province')"
          >
            <span slot="label">
              Province
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.business_address.province" placeholder="Province*"></a-input> -->
            <a-select
              v-model="form.business_address.province"
              :disabled="!form.business_address.region"
              showSearch
              @change="loadCities"
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
            :validate-status="checkErrors('business_address.city') ? 'error': ''"
            :help="checkErrors('business_address.city')"
          >
            <span slot="label">
              City/Municipality
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.business_address.city" placeholder="City/Municipality*"></a-input> -->
            <a-select
              v-model="form.business_address.city"
              :disabled="loading_cities || !form.business_address.province"
              :loading="loading_cities"
              @change="loadBarangays"
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
            :validate-status="checkErrors('business_address.barangay') ? 'error': ''"
            :help="checkErrors('business_address.barangay')"
          >
            <span slot="label">
              Barangay
              <i style="color: red">*</i>
            </span>
            <!-- <a-input v-model="form.business_address.barangay" placeholder="Barangay*"></a-input> -->
            <a-select
              v-model="form.business_address.barangay"
              :disabled="loading_barangay || !form.business_address.city"
              :loading="loading_barangay"
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
            :validate-status="checkErrors('business_address.postal_code') ? 'error': ''"
            :help="checkErrors('business_address.postal_code')"
          >
            <span slot="label">
              Postal Code
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.business_address.postal_code" placeholder="Postal Code*"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- Others -->
      <a-divider></a-divider>
      <a-form-item>
        <a-checkbox
          v-model="form.business_details.enjoying_tax_incentive"
        >Are you enjoying tax incentive from any Government Entity?</a-checkbox>
      </a-form-item>

      <a-form-item
        v-if="form.business_details.enjoying_tax_incentive"
        label="Specify the Entity"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
        class="text-left"
      >
        <a-input
          v-model="form.business_details.specify_entity"
          placeholder="Please specify the Entity"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-checkbox
          v-model="form.business_details.is_rented"
          @change="resetRentedData"
        >Is the place of business rented?</a-checkbox>
      </a-form-item>

      <template v-if="form.business_details.is_rented">
        <a-row style="font-weight: bold" :gutter="5">
          <a-col :xs="{ span: 24 }">
            <a-form-item
              :validate-status="checkErrors('business_address.rental') ? 'error': ''"
              :help="checkErrors('business_address.rental')"
            >
              <span slot="label">
                Monthly Rental
                <i style="color: red">*</i>
              </span>
              <a-input v-model="form.business_address.rental" placeholder="Monthly Rental*"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="{ span: 24 }">
            <a-form-item
              :validate-status="checkErrors('business_address.lessor_name') ? 'error': ''"
              :help="checkErrors('business_address.lessor_name')"
            >
              <span slot="label">
                Lessor Name
                <i style="color: red">*</i>
              </span>
              <a-input v-model="form.business_address.lessor_name" placeholder="Lessor Name*"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="{ span: 24 }">
            <a-form-item
              :validate-status="checkErrors('business_address.contact_no') ? 'error': ''"
              :help="checkErrors('business_address.contact_no')"
            >
              <span slot="label">
                Contact Number
                <i style="color: red">*</i>
              </span>
              <a-input v-model="form.business_address.contact_no" placeholder="Contact Number*"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="{ span: 24 }">
            <a-form-item
              :validate-status="checkErrors('business_address.email') ? 'error': ''"
              :help="checkErrors('business_address.email')"
            >
              <span slot="label">
                Email Address
                <i style="color: red">*</i>
              </span>
              <a-input v-model="form.business_address.email" placeholder="Email Address*"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider></a-divider>
        <a-row :gutter="15" style="font-weight: bold;">
          <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
            <a-row :gutter="5">
              <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
                <a-form-item label="House/Bldg No">
                  <a-input
                    v-model="form.business_address.rental_address.bldg_no"
                    placeholder="House/Bldg No"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
                <a-form-item label="Unit No">
                  <a-input
                    v-model="form.business_address.rental_address.unit_no"
                    placeholder="Unit No"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="Building Name">
                  <a-input
                    v-model="form.business_address.rental_address.bldg_name"
                    placeholder="Building Name"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="Street">
                  <a-input
                    v-model="form.business_address.rental_address.street"
                    placeholder="Street"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="Subdivision">
                  <a-input
                    v-model="form.business_address.rental_address.subdivision"
                    placeholder="Subdivision"
                  ></a-input>
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
              :validate-status="checkErrors('business_address.rental_address.region') ? 'error': ''"
              :help="checkErrors('business_address.rental_address.region')"
            >
              <span slot="label">
                Region
                <i style="color: red">*</i>
              </span>
              <!-- <a-input v-model="form.business_address.rental_address.region" placeholder="Region*"></a-input> -->
              <a-select
                v-model="form.business_address.rental_address.region"
                showSearch
                @change="changeRentalRegion"
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
              :validate-status="checkErrors('business_address.rental_address.province') ? 'error': ''"
              :help="checkErrors('business_address.rental_address.province')"
            >
              <span slot="label">
                Province
                <i style="color: red">*</i>
              </span>
              <!-- <a-input
                v-model="form.business_address.rental_address.province"
                placeholder="Province*"
              ></a-input>-->
              <a-select
                v-model="form.business_address.rental_address.province"
                :disabled="!form.business_address.rental_address.region"
                showSearch
                @change="loadCities('rental')"
                :filterOption="(input, option) => filterReference(input, option, rental_provinces, 'provCode', 'provDesc')"
              >
                <a-select-option :value="''" disabled>Select Province</a-select-option>
                <a-select-option
                  v-for="item in rental_provinces"
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
              :validate-status="checkErrors('business_address.rental_address.city') ? 'error': ''"
              :help="checkErrors('business_address.rental_address.city')"
            >
              <span slot="label">
                City/Municipality
                <i style="color: red">*</i>
              </span>
              <!-- <a-input
                v-model="form.business_address.rental_address.city"
                placeholder="City/Municipality*"
              ></a-input>-->
              <a-select
                v-model="form.business_address.rental_address.city"
                :disabled="loading_rental_cities || !form.business_address.rental_address.province"
                :loading="loading_rental_cities"
                @change="loadBarangays('rental')"
                showSearch
                :filterOption="(input, option) => filterReference(input, option, rental_cities, 'citymunCode', 'citymunDesc')"
              >
                <a-select-option :value="''" disabled>Select City/Municipality</a-select-option>
                <a-select-option
                  v-for="item in rental_cities"
                  :key="item.citymunCode"
                  :value="item.citymunCode"
                >{{item.citymunDesc}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
            <a-form-item
              :validate-status="checkErrors('business_address.rental_address.barangay') ? 'error': ''"
              :help="checkErrors('business_address.rental_address.barangay')"
            >
              <span slot="label">
                Barangay
                <i style="color: red">*</i>
              </span>
              <!-- <a-input
                v-model="form.business_address.rental_address.barangay"
                placeholder="Barangay*"
              ></a-input> -->
              <a-select
                v-model="form.business_address.rental_address.barangay"
                :disabled="loading_rental_barangay || !form.business_address.rental_address.city"
                :loading="loading_rental_barangay"
                showSearch
                :filterOption="(input, option) => filterReference(input, option, rental_barangays, 'brgyCode', 'brgyDesc')"
              >
                <a-select-option :value="''" disabled>Select Barangay</a-select-option>
                <a-select-option
                  v-for="item in rental_barangays"
                  :key="item.brgyCode"
                  :value="item.brgyCode"
                >{{item.brgyDesc}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
            <a-form-item
              :validate-status="checkErrors('business_address.rental_address.postal_code') ? 'error': ''"
              :help="checkErrors('business_address.rental_address.postal_code')"
            >
              <span slot="label">
                Postal Code
                <i style="color: red">*</i>
              </span>
              <a-input
                v-model="form.business_address.rental_address.postal_code"
                placeholder="Postal Code*"
              ></a-input>
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
        <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
          <a-button>Save Draft</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
export default {
  props: ["form", "step", "errors"],
  data() {
    return {
      show_rented_info: false,
      cities: [],
      barangays: [],
      loading_cities: false,
      loading_barangay: false,
      rental_cities: [],
      rental_barangays: [],
      loading_rental_cities: false,
      loading_rental_barangay: false
    };
  },
  computed: {
    reg_code() {
      if (this.form.business_details.business_type === "SP") return "DTI";
      else if (
        this.form.business_details.business_type === "P" ||
        this.form.business_details.business_type === "CN"
      )
        return "SEC";
      else if (this.form.business_details.business_type === "CE") return "CDA";
      return "";
    },
    regions() {
      return this.$store.state.references.regions;
    },
    rental_provinces() {
      const region_code = this.form.business_address.rental_address.region;
      const provinces = this.$store.state.references.provinces;
      const provincesOnRegion = provinces.filter(
        v => v.regCode === region_code
      );
      return provincesOnRegion;
    },
    provinces() {
      const region_code = this.form.business_address.region;
      const provinces = this.$store.state.references.provinces;
      const provincesOnRegion = provinces.filter(
        v => v.regCode === region_code
      );
      return provincesOnRegion;
    }
  },
  methods: {
    resetRentedData() {
      if (!this.form.business_details.is_rented) {
        this.form.business_address.rental = "";
        this.form.business_address.lessor_name = "";
        this.form.business_address.contact_no = "";
        this.form.business_address.email = "";
        this.form.business_address.rental_address = {
          bldg_no: "",
          unit_no: "",
          bldg_name: "",
          street: "",
          subdivision: "",
          region: "",
          province: "",
          city: "",
          barangay: "",
          postal_code: ""
        };
      }
    },
    checkErrors(field) {
      var form_error = this.errors.find(v => v.field === field);
      return form_error ? form_error.error : null;
    },
    changeRegion() {
      // clear data
      this.form.business_address.province = "";
      this.form.business_address.city = "";
      this.form.business_address.barangay = "";

      this.cities = [];
      this.barangays = [];
    },
    changeRentalRegion() {
      // clear data
      this.form.business_address.rental_address.province = "";
      this.form.business_address.rental_address.city = "";
      this.form.business_address.rental_address.barangay = "";

      this.rental_cities = [];
      this.rental_barangays = [];
    },
    loadCities(key) {
      if (key === "rental") {
        console.log(
          `loading rental_cities of ${this.form.business_address.rental_address.province}...`
        );
        this.loading_rental_cities = true;

        // clear data first
        this.form.business_address.rental_address.city = "";
        this.form.business_address.rental_address.barangay = "";
        this.rental_cities = [];
        this.rental_barangays = [];
      } else {
        console.log(
          `loading cities of ${this.form.business_address.province}...`
        );
        this.loading_cities = true;

        // clear data first
        this.form.business_address.city = "";
        this.form.business_address.barangay = "";
        this.cities = [];
        this.barangays = [];
      }

      // load cities by province
      this.$store
        .dispatch(
          "GET_CITIES",
          key === "rental"
            ? this.form.business_address.rental_address.province
            : this.form.business_address.province
        )
        .then(cities => {
          if (key === "rental") {
            this.rental_cities = cities;
            this.loading_rental_cities = false;
          } else {
            this.cities = cities;
            this.loading_cities = false;
          }
        })
        .catch(err => {
          console.log("GET_CITIES err :", err);
          if (key === "rental") {
            this.rental_cities = [];
            this.loading_rental_cities = false;
          } else {
            this.cities = [];
            this.loading_cities = false;
          }
        });
    },
    loadBarangays(key) {
      if (key === "rental") {
        console.log(
          `loading rental_barangays of ${this.form.business_address.rental_address.city}...`
        );
        this.loading_rental_barangay = true;

        // clear data first
        this.form.business_address.rental_address.barangay = "";
        this.rental_barangays = [];
      } else {
        console.log(
          `loading barangays of ${this.form.business_address.city}...`
        );
        this.loading_barangay = true;

        // clear data first
        this.form.business_address.barangay = "";
        this.barangays = [];
      }

      // load barangay by city
      this.$store
        .dispatch(
          "GET_BARANGAY",
          key === "rental"
            ? this.form.business_address.rental_address.city
            : this.form.business_address.city
        )
        .then(barangays => {
          if (key === "rental") {
            this.rental_barangays = barangays;
            this.loading_rental_barangay = false;
          } else {
            this.barangays = barangays;
            this.loading_barangay = false;
          }
        })
        .catch(err => {
          console.log("GET_BARANGAY err :", err);
          if (key === "rental") {
            this.rental_barangays = [];
            this.loading_rental_barangay = false;
          } else {
            this.barangays = [];
            this.loading_barangay = false;
          }
        });
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

.business-form .ant-form-item {
  margin: 0;
}
</style>