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
          <!-- <a-form-item>
            <a-checkbox @change="onChange">Check this box if the registrant is the applicant</a-checkbox>
          </a-form-item>-->
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :span="24">
          <a-form-item
          :validate-status="checkErrors('personal_details.purpose') ? 'error': ''"
            :help="checkErrors('personal_details.purpose')"
          >
            <span slot="label">
              Purpose of Application 
              <i style="color: red">*</i>
            </span>
            <a-select v-model="form.purpose">
              <a-select-option 
              v-for="(item, index) in purpose_items"
              :key="'P'+index"
              :value="item.description"
              >{{item.description}}</a-select-option>
            </a-select>
            
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
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
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.birthdate') ? 'error': ''"
            :help="checkErrors('personal_details.birthdate')"
          >
            <span slot="label">
              Birthday
              <i style="color: red">*</i>
            </span>
            <a-date-picker
              v-model="form.personal_details.birthdate"
              :disabledDate="v => disableDateInBirthdate(v, true)"
              :defaultPickerValue="defaultBdayPickerValue"
              :showToday="false"
              style="width: 100%;"
            ></a-date-picker>
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
              <a-select-option value="Male">Male</a-select-option>
              <a-select-option value="Female">Female</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item>
            <span slot="label">Civil Status</span>
            <a-select v-model="form.personal_details.civil_status">
              <a-select-option value="Single">Single</a-select-option>
              <a-select-option value="Married">Married</a-select-option>
              <a-select-option value="Widowed">Widowed</a-select-option>
              <a-select-option value="Separated">Separated</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
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
            <a-input v-model="form.personal_details.icr_no"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 7 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.height') ? 'error': ''"
            :help="checkErrors('personal_details.height')"
          >
            <span slot="label">
              Height(cm)
              <i style="color: red">*</i>
            </span>
            <a-input maxlength="3" v-model="form.personal_details.height"/>
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

            <a-input-number maxlength="3" v-model="form.personal_details.weight"/>
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
            <a-select v-model="form.personal_details.blood_type">
              <a-select-option value="A+">A+</a-select-option>
              <a-select-option value="A-">A-</a-select-option>
              <a-select-option value="B+">B+</a-select-option>
              <a-select-option value="B-">B-</a-select-option>
              <a-select-option value="AB+">AB+</a-select-option>
              <a-select-option value="AB-">AB-</a-select-option>
              <a-select-option value="O+">O+</a-select-option>
              <a-select-option value="O-">O-</a-select-option>
              <a-select-option value="Unknown">Unknown</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
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
            <a-select v-model="form.personal_details.complexion">
              <a-select-option value="Light">Light</a-select-option>
              <a-select-option value="Fair">Fair</a-select-option>
              <a-select-option value="Medium">Medium</a-select-option>
              <a-select-option value="Olive">Olive</a-select-option>
              <a-select-option value="Brown">Brown</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
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
              <a-select-option value="tertiary">Bachelor's Degree</a-select-option>
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
      <a-row type="flex" justify="space-around" style="font-weight: bold;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <a-form-item
            :validate-status="checkErrors('personal_details.ctc_no') ? 'error': ''"
            :help="checkErrors('personal_details.ctc_no')"
          >
            <span slot="label">
              Community Tax Certificate Number
              <i style="color: red">*</i>
            </span>
            <a-tooltip>
              <span
                slot="title"
              >Enter without spaces. Found at the upper right corner (CCI2###########)</span>

              <a-input
                v-model="form.personal_details.ctc_no"
                placeholder="CC•••• ••••••••"
                maxlength="15"
              ></a-input>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider style="color: black;font-weight: bold;" orientation="left">Family Background</a-divider>

      <a-row type="flex" justify="space-between" style="font-weight: bold;">
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
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
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
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
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
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
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
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
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
      <a-row type="flex" justify="space-between" style="font-weight: bold;">
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
        <!-- <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 6 }"> -->
        <a-col :span="24">
          <a-button-group>
            <!-- <a-button @click="$emit('prev')">Previous</a-button> -->
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
import moment from "moment";
import purpose from "./police_purpose.json"

export default {
  props: ["form", "step", "errors"],
  data() {
    return {
      purpose,
      purpose_items: []
    };
  },
  mounted(){
     var data = [...this.purpose];
     this.purpose_items = data
     console.log("value of police purpose data : " + JSON.stringify(this.purpose_items))
  },
  computed: {
    defaultBdayPickerValue() {
      return moment(
        new Date(
          new Date().getFullYear() - 18,
          new Date().getMonth(),
          new Date().getDate()
        )
      );
    }
  },
  methods: {
    checkErrors(field) {
      var form_error = this.errors.find(v => v.field === field);
      return form_error ? form_error.error : null;
    },
    onChage() {}
  }
  // created() {
  //   console.log(
  //     "personal details user data: " +
  //       JSON.stringify(this.$store.state.user_session.user)
  //   );
  //   var data = this.$store.state.user_session.user
  //   this.form.personal_details.name = data.name
  //   this.form.contact_details.email = data.email
  // }
};
</script>
<style></style>
