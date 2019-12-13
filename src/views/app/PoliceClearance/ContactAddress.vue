<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title">
      <a-col :span="22" style="font-size: 25px;">New Applicant Registration</a-col>
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

    <a-form>
      <a-divider style="color: black;font-weight: bold;" orientation="left">Contact / Address</a-divider>
      <a-row :gutter="15" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 13 }">
          <a-row :gutter="5">
            <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
              <a-form-item label="House/Bldg No">
                <a-input></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
              <a-form-item label="Unit No">
                <a-input></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="23">
              <a-form-item label="Building Name">
                <a-input></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="23">
              <a-form-item label="Street">
                <a-input></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="23">
              <a-form-item label="Subdivision">
                <a-input></a-input>
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
          <a-form-item>
            <span slot="label">
              Region
              <i style="color: red">*</i>
            </span>
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">
              Province
              <i style="color: red">*</i>
            </span>
            <a-input></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item>
            <span slot="label">
              Barangay
              <i style="color: red">*</i>
            </span>
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">
              City / Municipality
              <i style="color: red">*</i>
            </span>
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 4 }">
          <a-form-item>
            <span slot="label">
              Postal Code
              <i style="color: red">*</i>
            </span>
            <a-input></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item>
            <span slot="label">
              Telephone No.
              <i style="color: red">*</i>
            </span>
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
          <a-form-item>
            <span slot="label">
              Mobile No.
              <i style="color: red">*</i>
            </span>
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">
              Email Address
              <i style="color: red">*</i>
            </span>
            <a-input></a-input>
          </a-form-item>
        </a-col>
      </a-row>
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
export default {};
</script>
<style>
</style>