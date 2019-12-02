<template>
  <a-card
    :headStyle="{ border: 'none', color: '#7f7f7f', 'font-size': '25px' }"
    :bodyStyle="{ 'padding-top': 0 }"
    title="Business Details"
  >
    <a-form class="business-form">
      <!-- Business Data -->
      <a-divider
        style="color: black;font-weight: bold;margin-top: 5vh"
        orientation="left"
      >Business Data</a-divider>
      <a-form-item style="font-weight: bold;">
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

      <a-form-item style="font-weight: bold">
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
          <a-form-item>
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
          <a-form-item>
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
          <a-form-item>
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
          <a-form-item>
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
          <a-form-item>
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

      <a-row style="font-weight: bold" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item>
            <span slot="label">
              Region
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.business_address.region" placeholder="Region*"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item>
            <span slot="label">
              Province
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.business_address.province" placeholder="Province*"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item>
            <span slot="label">
              Barangay
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.business_address.barangay" placeholder="Barangay*"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
          <a-form-item>
            <span slot="label">
              City/Municipality
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.business_address.city" placeholder="City/Municipality*"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item>
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
        <a-checkbox v-model="form.business_details.is_rented">Is the place of business rented?</a-checkbox>
      </a-form-item>

      <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 9 }" :xl="{ span: 6 }">
          <a-button-group>
            <a-button @click="$emit('changeStep', step-1)">Previous</a-button>
            <a-button type="primary" @click="$emit('changeStep', step+1)">Next</a-button>
          </a-button-group>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 15 }">
          <a-button>Save Draft</a-button>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }" :md="{ span: 3 }">
          <a-button type="danger">Close</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
export default {
  props: ["form", "step"],
  data() {
    return {};
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