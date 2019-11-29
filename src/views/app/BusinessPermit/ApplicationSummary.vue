<template>
  <a-card title="Owner Address">
    <a-form>
      <a-form-item
        label="House/Bldg No."
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
        class="text-left"
      >
        <a-input placeholder="House/Bldg No." v-model="form.owner_address.bldg_no"></a-input>
      </a-form-item>

      <a-form-item
        label="Unit No."
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
        class="text-left"
      >
        <a-input placeholder="Unit No." v-model="form.owner_address.unit_no"></a-input>
      </a-form-item>

      <a-form-item
        label="Building Name"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
        class="text-left"
      >
        <a-input v-model="form.owner_details.bldg_name" placeholder="Building Name"></a-input>
      </a-form-item>

      <a-form-item
        label="Street"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
        class="text-left"
      >
        <a-input placeholder="Street" v-model="form.owner_address.street"></a-input>
      </a-form-item>

      <a-form-item
        label="Subdivision"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
        class="text-left"
      >
        <a-input placeholder="Subdivision" v-model="form.owner_address.subdivision"></a-input>
      </a-form-item>

      <a-form-item
        label="Region"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
        class="text-left"
      >
        <a-input v-model="form.owner_details.region" placeholder="Region"></a-input>
      </a-form-item>

      <a-form-item
        label="Province"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
        class="text-left"
      >
        <a-input placeholder="Province" v-model="form.owner_address.province"></a-input>
      </a-form-item>

      <a-form-item
        label="City"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
        class="text-left"
      >
        <a-input placeholder="City" v-model="form.owner_address.city"></a-input>
      </a-form-item>

      <a-form-item
        label="Barangay"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
        class="text-left"
      >
        <a-input placeholder="Barangay" v-model="form.owner_address.barangay"></a-input>
      </a-form-item>

      <a-form-item
        label="Postal Code"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 10 }"
        class="text-left"
      >
        <a-input placeholder="Postal Code" v-model="form.owner_address.postal_code"></a-input>
      </a-form-item>

      <a-row type="flex" justify="space-between">
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-button type="danger">Close</a-button>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-button-group>
            <a-button @click="$emit('changeStep', step-1)">Previous</a-button>
            <a-button type="primary" @click="$emit('changeStep', step+1)">Next</a-button>
          </a-button-group>
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
  }
};
</script>

<style>
.text-left div,
.text-left span {
  text-align: left;
}
</style>