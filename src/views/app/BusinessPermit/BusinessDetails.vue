<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title">
      <a-col :span="22" style="font-size: 25px;">Business Details</a-col>
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

      <a-form-item
        v-if="form.application_type===0"
        style="font-weight: bold"
        :validate-status="checkErrors('business_details.capital_investment') ? 'error': ''"
        :help="checkErrors('business_details.capital_investment')"
      >
        <span slot="label">
          Capital Investment
          <i style="color: red">*</i>
        </span>
        <a-input-number
          v-model="form.business_details.capital_investment"
          @change="$emit('updateCapital', form.business_details.capital_investment)"
          style="width: 100%;"
          placeholder="Capital Investment"
        ></a-input-number>
      </a-form-item>

      <a-form-item
        v-else-if="form.application_type===1"
        style="font-weight: bold"
        :validate-status="checkErrors('business_details.gross_sales') ? 'error': ''"
        :help="checkErrors('business_details.gross_sales')"
      >
        <span slot="label">
          Annual Gross Sales
          <i style="color: red">*</i>
        </span>
        <a-input-number
          v-model="form.business_details.gross_sales"
          @change="$emit('updateGross', form.business_details.gross_sales)"
          style="width: 100%;"
          placeholder="Annual Gross Sales"
        ></a-input-number>
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
            <a-input-number
              style="width: 100%"
              placeholder="No. of Employees in Establishment*"
              v-model="form.business_details.employees_establishment"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item label="No. of Employees Residing in LGU">
            <a-input-number
              style="width: 100%"
              placeholder="No. of Employees in Residing in LGU"
              v-model="form.business_details.employees_residing"
            ></a-input-number>
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
            <a-select
              v-model="form.business_address.region"
              showSearch
              :disabled="fixed_address"
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
            <a-select
              v-model="form.business_address.province"
              :disabled="fixed_address || !form.business_address.region"
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
            :validate-status="checkErrors('business_address.city') ? 'error': ''"
            :help="checkErrors('business_address.city')"
          >
            <span slot="label">
              City/Municipality
              <i style="color: red">*</i>
            </span>
            <a-select
              v-model="form.business_address.city"
              :disabled="fixed_address || !form.business_address.province"
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
              :disabled="!form.business_address.city"
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
            <a-input
              :disabled="fixed_postal"
              v-model="form.business_address.postal_code"
              placeholder="Postal Code*"
            ></a-input>
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
        >Check if the place of business is rented</a-checkbox>
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
              <a-select
                v-model="form.business_address.rental_address.region"
                showSearch
                :disabled="fixed_address"
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
              <a-select
                v-model="form.business_address.rental_address.province"
                :disabled="fixed_address || !form.business_address.rental_address.region"
                showSearch
                @change="changeRentalProvince"
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
              <a-select
                v-model="form.business_address.rental_address.city"
                :disabled="fixed_address || !form.business_address.rental_address.province"
                @change="changeRentalCity"
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
              <a-select
                v-model="form.business_address.rental_address.barangay"
                :disabled="!form.business_address.rental_address.city"
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
                :disabled="fixed_postal"
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
        // <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
        //   <a-button>Save Draft</a-button>
        // </a-col>
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
      show_rented_info: false,
      regions_data,
      provinces_data,
      cities: [],
      barangays: [],
      rental_cities: [],
      rental_barangays: []
    };
  },
  created() {
    if (this.fixed_address) {
      this.form.business_address.region = "04";
      // this.changeRegion();
      this.form.business_address.province = "0456";
      // this.changeProvince();
      this.form.business_address.city = "045641";
      // this.changeCity();

      this.form.business_address.rental_address.region = "04";
      // this.changeRentalRegion();
      this.form.business_address.rental_address.province = "0456";
      // this.changeRentalProvince();
      this.form.business_address.rental_address.city = "045641";
      // this.changeRentalCity();

      import(
        `../../../assets/references/cities/${this.form.business_address.province}.json`
      )
        .then(data => {
          this.cities = data.default;
          return import(
            `../../../assets/references/barangay/${this.form.business_address.city}.json`
          );
        })
        .then(data => {
          this.barangays = data.default;
          return import(
            `../../../assets/references/cities/${this.form.business_address.rental_address.province}.json`
          );
        })
        .then(data => {
          this.rental_cities = data.default;
          console.log("this.rental_cities :", this.rental_cities);
          return import(
            `../../../assets/references/barangay/${this.form.business_address.rental_address.city}.json`
          );
        })
        .then(data => {
          this.rental_barangays = data.default;
          console.log("this.rental_barangays :", this.rental_barangays);
        });
    }
    if (this.fixed_postal) {
      this.form.business_address.postal_code = "4324";
      this.form.business_address.rental_address.postal_code = "4324";
    }
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
      return this.regions_data;
    },
    provinces() {
      const region_code = this.form.business_address.region;
      if (!region_code) return [];

      const provincesOnRegion = this.provinces_data.filter(
        v => v.regCode === region_code
      );
      return provincesOnRegion;
    },
    rental_provinces() {
      const region_code = this.form.business_address.rental_address.region;
      if (!region_code) return [];

      const provincesOnRegion = this.provinces_data.filter(
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
    changeRentalRegion() {
      // clear data
      this.form.business_address.rental_address.province = "";
      this.form.business_address.rental_address.city = "";
      this.form.business_address.rental_address.barangay = "";
    },
    changeRentalProvince() {
      // clear data first
      this.form.business_address.rental_address.city = "";
      this.form.business_address.rental_address.barangay = "";

      // call cities
      if (this.form.business_address.rental_address.province) {
        import(
          `../../../assets/references/cities/${this.form.business_address.rental_address.province}.json`
        ).then(data => {
          this.rental_cities = data.default;
        });
      }
    },
    changeRentalCity() {
      // clear data first
      this.form.business_address.rental_address.barangay = "";

      // Call Barangays
      if (this.form.business_address.rental_address.city) {
        import(
          `../../../assets/references/barangay/${this.form.business_address.rental_address.city}.json`
        ).then(data => {
          this.rental_barangays = data.default;
        });
      }
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