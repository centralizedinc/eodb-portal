<template>
  <a-card
    :headStyle="{ border: 'none', color: '#7f7f7f', 'font-size': '25px' }"
    :bodyStyle="{ 'padding-top': 0 }"
    title="Business Owner Information"
  >
    <a-form class="owner-form">
      <!-- Personal Details -->
      <a-divider style="color: #7f7f7f;font-weight: bold;" orientation="left">Personal Details</a-divider>
      <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" class="text-left">
            <span slot="label">
              Application Type
              <i style="color: red">*</i>
            </span>
            <a-radio-group buttonStyle="solid" v-model="form.application_type">
              <a-radio-button :value="0">New</a-radio-button>
              <a-radio-button :value="1">Renew</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" style="text-align: right;">
          <a-form-item>
            <a-checkbox @change="onChange">Is the registrant the business owner</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">
              Last Name
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_details.name.last" placeholder="First Name"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7}">
          <a-form-item>
            <span slot="label">
              First Name
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_details.name.first" placeholder="Middle Name"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item label="Middle Name">
            <a-input v-model="form.owner_details.name.middle" placeholder="Last Name"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-form-item label="Suffix">
            <a-input v-model="form.owner_details.name.suffix" placeholder="Suffix"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item>
            <span slot="label">
              Date of Birth
              <i style="color: red">*</i>
            </span>
            <a-date-picker v-model="form.owner_details.birthdate"></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item>
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
          <a-form-item>
            <span slot="label">
              Tel No
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_details.telno" placeholder="Tel No*"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item>
            <span slot="label">
              Mobile No
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_details.mobile" placeholder="Mobile No*"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item>
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
        style="color: #7f7f7f;font-weight: bold;margin-top: 5vh"
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

      <a-row style="font-weight: bold" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item>
            <span slot="label">
              Region
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_address.region" placeholder="Region*"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item>
            <span slot="label">
              Province
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_address.province" placeholder="Province*"></a-input>
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
            <a-input v-model="form.owner_address.barangay" placeholder="Barangay*"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
          <a-form-item>
            <span slot="label">
              City/Municipality
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_address.city" placeholder="City/Municipality*"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item>
            <span slot="label">
              Postal Code
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_address.postal_code" placeholder="Postal Code*"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-button-group>
            <a-button @click="$emit('changeStep', step-1)" :disabled="true">Previous</a-button>
            <a-button type="primary" @click="$emit('changeStep', step+1)">Next</a-button>
          </a-button-group>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 15 }">
          <a-button>Save Draft</a-button>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
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
    user() {
      return this.$store.state.user_session.user;
    }
  },
  methods: {
    onChange(e) {
      if (e.target.checked) {
        this.form.owner_details.name = this.user.name;
      }
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