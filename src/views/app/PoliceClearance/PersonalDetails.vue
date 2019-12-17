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
      <a-divider style="color: black;font-weight: bold;" orientation="left">Personal Details</a-divider>
      <a-row>
        <a-col :xs="{ span: 24 }">
          <a-form-item>
            <a-checkbox @change="onChange">Check this box if the registrant is the applicant</a-checkbox>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.name.last') ? 'error': ''"
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
            :validate-status="checkErrors('personal_details.name.first') ? 'error': ''"
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
          <a-form-item>
            <span slot="label">Middle Name</span>
            <a-input v-model="form.personal_details.name.middle"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-form-item>
            <span slot="label">Suffix</span>
            <a-input v-model="form.personal_details.name.suffix"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.birthday') ? 'error': ''"
            :help="checkErrors('personal_details.birthday')"
          >
            <span slot="label">
              Birthday
              <i style="color: red">*</i>
            </span>
            <a-date-picker v-model="form.personal_details.birthday" style="width: 100%;"></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.gender') ? 'error': ''"
            :help="checkErrors('personal_details.gender')"
          >
            <span slot="label">
              Gender
              <i style="color: red">*</i>
            </span>
            <a-select v-model="form.personal_details.gender">
              <a-select-option value="male">Male</a-select-option>
              <a-select-option value="female">Female</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">Civil Status</span>
            <a-select v-model="form.personal_details.civil_status">
              <a-select-option value="single">Single</a-select-option>
              <a-select-option value="married">Married</a-select-option>
              <a-select-option value="widowed">Widowed</a-select-option>
              <a-select-option value="separated">Separated</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.birthplace') ? 'error': ''"
            :help="checkErrors('personal_details.birthplace')"
          >
            <span slot="label">
              Birthplace
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.personal_details.birthplace" placeholder="Enter Municipality"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">If other country</span>
            <a-input v-model="form.personal_details.other_country"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">ICR No. (if alien)</span>
            <a-input v-model="form.personal_details.icr"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.height') ? 'error': ''"
            :help="checkErrors('personal_details.height')"
          >
            <span slot="label">
              Height(cm)
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.personal_details.height"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.weight') ? 'error': ''"
            :help="checkErrors('personal_details.weight')"
          >
            <span slot="label">
              Weight(kg)
              <i style="color: red">*</i>
            </span>

            <a-input v-model="form.personal_details.weight"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.blood_type') ? 'error': ''"
            :help="checkErrors('personal_details.blood_type')"
          >
            <span slot="label">
              Blood Type
              <i style="color: red">*</i>
            </span>

            <a-input v-model="form.personal_details.blood_type"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">Identification Marks</span>
            <a-input v-model="form.personal_details.identification_marks"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.complexion') ? 'error': ''"
            :help="checkErrors('personal_details.complexion')"
          >
            <span slot="label">
              Complexion
              <i style="color: red">*</i>
            </span>

            <a-input v-model="form.personal_details.complexion"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.educational_attainment') ? 'error': ''"
            :help="checkErrors('personal_details.educational_attainment')"
          >
            <span slot="label">
              Educational Attainment
              <i style="color: red">*</i>
            </span>

            <a-select v-model="form.personal_details.educational_attainment">
              <a-select-option value="primary">Primary</a-select-option>
              <a-select-option value="secondary">Secondary</a-select-option>
              <a-select-option value="vocational">Vocational</a-select-option>
              <a-select-option value="tertiary">Tertiary</a-select-option>
              <a-select-option value="master">Master's Degree</a-select-option>
              <a-select-option value="doctorate">Doctorate Degree</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.occupation') ? 'error': ''"
            :help="checkErrors('personal_details.occupation')"
          >
            <span slot="label">
              Occupation
              <i style="color: red">*</i>
            </span>

            <a-input v-model="form.personal_details.occupation"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider style="color: black;font-weight: bold;" orientation="left">Family Background</a-divider>

      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">Father Last Name</span>
            <a-input v-model="form.family_background.father_info.name.last"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">First Name</span>
            <a-input v-model="form.family_background.father_info.name.first"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item>
            <span slot="label">Middle Name</span>
            <a-input v-model="form.family_background.father_info.name.middle"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-form-item>
            <span slot="label">Suffix</span>
            <a-input v-model="form.family_background.father_info.name.suffix"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">Father Birth Place</span>
            <a-input
              v-model="form.family_background.father_info.birthplace"
              placeholder="Enter Municipality"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">If other country</span>
            <a-input v-model="form.family_background.father_info.other_country"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">Mother Last Name</span>
            <a-input v-model="form.family_background.mother_info.name.last"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">First Name</span>
            <a-input v-model="form.family_background.mother_info.name.first"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item>
            <span slot="label">Middle Name</span>
            <a-input v-model="form.family_background.mother_info.name.middle"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-form-item>
            <span slot="label">Suffix</span>
            <a-input v-model="form.family_background.mother_info.name.suffix"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">Mother Birth Place</span>
            <a-input
              v-model="form.family_background.mother_info.birthplace"
              placeholder="Enter Municipality"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">If other country</span>
            <a-input v-model="form.family_background.mother_info.other_country"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">Spouse Last Name</span>
            <a-input v-model="form.family_background.spouse_info.name.last"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">First Name</span>
            <a-input v-model="form.family_background.spouse_info.name.first"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 6 }">
          <a-form-item>
            <span slot="label">Middle Name</span>
            <a-input v-model="form.family_background.spouse_info.name.middle"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 3 }">
          <a-form-item>
            <span slot="label">Suffix</span>
            <a-input v-model="form.family_background.spouse_info.name.suffix"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">Spouse Birth Place</span>
            <a-input
              v-model="form.family_background.spouse_info.birthplace"
              placeholder="Enter Municipality"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item>
            <span slot="label">If other country</span>
            <a-input v-model="form.family_background.spouse_info.other_country"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
        <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 6 }">
          <a-button-group>
            <!-- <a-button @click="$emit('prev')">Previous</a-button> -->
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
    return {};
  },
  methods: {
    checkErrors(field) {
      var form_error = this.errors.find(v => v.field === field);
      return form_error ? form_error.error : null;
    }
  }
};
</script>
<style></style>
