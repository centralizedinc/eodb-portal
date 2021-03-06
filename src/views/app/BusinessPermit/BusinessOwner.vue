<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title" type="flex" justify="space-between">
      <a-col :xs="{span: 0}" :md="{span: 21}" :xl="{span: 21}">
        <h1 style="font-size:25px; color: #7e7e7e">Business Owner Information</h1>
      </a-col>
      <a-col :xs="{span: 21}" :md="{span: 0}" :xl="{span: 0}">
        <h1 style="font-size:25px; color: #7e7e7e">Business Owner Info</h1>
      </a-col>
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

      <a-row type="flex" justify="space-between" style="font-weight: bold;">
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
        <a-col :xs="{ span:24 }" :sm="{ span: 6 }">
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
        <a-col :xs="{ span: 24 }" :sm="{ span: 10 }">
          <a-form-item
            :validate-status="checkErrors('owner_details.birthdate') ? 'error': ''"
            :help="checkErrors('owner_details.birthdate')"
          >
            <span slot="label">
              Date of Birth
              <i style="color: red">*</i>
            </span>
            <a-tooltip>
              <span slot="title">YYYY-MM-DD</span>

              <a-date-picker
                style="width: 100%;"
                v-model="form.owner_details.birthdate"
                :disabledDate="v => disableDateInBirthdate(v, true)"
                :defaultPickerValue="defaultBdayPickerValue"
                :showToday="false"
              ></a-date-picker>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :xs="{ span: 24 }" :sm="{ span:13  }">
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

        <a-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          v-if="checkDocsNeeded(['cedula','barangay','police'])"
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
            <a-input placeholder="Enter Municipality" v-model="form.owner_details.birthplace" />
          </a-form-item>
        </a-col>

        <a-col
          :xs="{ span: 24 }"
          :sm="{ span: 16 }"
          v-if="checkDocsNeeded(['cedula','barangay','police'])"
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
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" v-if="checkDocsNeeded(['police'])">
          <a-form-item
            :validate-status="checkErrors('police_required.blood_type') ? 'error': ''"
            :help="checkErrors('police_required.blood_type')"
          >
            <span slot="label">
              Blood Type
              <i style="color: red">*</i>
            </span>
            <a-select v-model="form.owner_details.blood_type">
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
            <a-tooltip>
              <span slot="title">Enter area code + 8-digit number without spaces</span>
              <a-input
                v-model="form.owner_details.telno"
                placeholder="042 •••• ••••"
                maxlength="11"
                style="width:100%"
              ></a-input>
            </a-tooltip>
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
            <a-tooltip>
              <span slot="title">Enter 11-digit mobile number without spaces</span>
              <a-input
                v-model="form.owner_details.mobile"
                placeholder="09•• •••••••"
                maxlength="11"
                style="width:100%"
              ></a-input>
            </a-tooltip>
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
            <a-input
              style="text-transform: none;"
              v-model="form.owner_details.email"
              placeholder="Email Address*"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold;" :gutter="5">
        <a-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          v-if="checkDocsNeeded(['police', 'cedula', 'barangay'])"
        >
          <a-form-item
            :validate-status="checkErrors('police_required.occupation') ? 'error': ''"
            :help="checkErrors('police_required.occupation')"
            style="font-weight: bold;"
            label="Occupation/Profession"
          >
            <a-input v-model="form.owner_details.occupation" />
          </a-form-item>
        </a-col>

        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" v-if="checkDocsNeeded(['cedula'])">
          <a-form-item style="font-weight: bold;" label="Monthly Salary">
            <a-select v-model="form.owner_details.monthly_salary">
              <a-select-option value="Below ₱20,000">Below ₱20,000</a-select-option>
              <a-select-option value=">₱21,000 to ₱50,000">> ₱21,000 to ₱50,000</a-select-option>
              <a-select-option value=">₱51,000 to ₱200,000 ">> ₱51,000 to ₱100,000</a-select-option>
              <a-select-option value=">Above ₱100,000">Above ₱100,000</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row style="font-weight: bold;" :gutter="5">
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" v-if="checkDocsNeeded(['police'])">
          <a-form-item
            style="font-weight: bold;"
            :validate-status="checkErrors('police_required.purpose') ? 'error': ''"
            :help="checkErrors('police_required.purpose')"
          >
            <span slot="label">
              Police Application Purpose
              <i style="color: red">*</i>
            </span>
            <a-select defaultValue="Business Requirement" v-model="form.police_purpose">
              <a-select-option
                v-for="(item, index) in purpose_items"
                :key="'P'+index"
                :value="item.description"
              >{{item.description}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" v-if="checkDocsNeeded(['police'])">
          <a-form-item
            style="font-weight: bold;"
            :validate-status="checkErrors('police_required.height') ? 'error': ''"
            :help="checkErrors('police_required.height')"
          >
            <span slot="label">
              Height(cm)
              <i style="color: red">*</i>
            </span>
            <a-input-number maxlength="3" style="width:100%" v-model="form.owner_details.height" />
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" v-if="checkDocsNeeded(['police'])">
          <a-form-item
            style="font-weight: bold;"
            :validate-status="checkErrors('police_required.weight') ? 'error': ''"
            :help="checkErrors('police_required.weight')"
          >
            <span slot="label">
              Weight(kg)
              <i style="color: red">*</i>
            </span>
            <a-input-number maxlength="3" style="width:100%" v-model="form.owner_details.weight" />
          </a-form-item>
        </a-col>

        <a-col :xs="{ span: 24 }" :sm="{ span: 8 }" v-if="checkDocsNeeded(['police'])">
          <a-form-item
            :validate-status="checkErrors('police_required.complexion') ? 'error': ''"
            :help="checkErrors('personal_details.complexion')"
          >
            <span slot="label">
              Complexion
              <i style="color: red">*</i>
            </span>
            <a-select v-model="form.owner_details.complexion">
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
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" v-if="checkDocsNeeded(['police'])">
          <a-form-item
            :validate-status="checkErrors('police_required.educational_attainment') ? 'error': ''"
            :help="checkErrors('police_required.educational_attainment')"
          >
            <span slot="label">
              Educational Attainment
              <i style="color: red">*</i>
            </span>

            <a-select v-model="form.owner_details.educational_attainment">
              <a-select-option value="primary">Primary</a-select-option>
              <a-select-option value="secondary">Secondary</a-select-option>
              <a-select-option value="vocational">Vocational</a-select-option>
              <a-select-option value="tertiary">Bachelor's Degree</a-select-option>
              <a-select-option value="master">Master's Degree</a-select-option>
              <a-select-option value="doctorate">Doctorate Degree</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }" v-if="checkDocsNeeded(['cedula'])">
          <a-form-item style="font-weight: bold;" label="ICR No(if Alien)">
            <a-input v-model="form.owner_details.icr_no" />
          </a-form-item>
        </a-col>

        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" v-if="checkDocsNeeded(['police', 'barangay'])">
          <a-form-item
            :validate-status="checkErrors('brgy_police_required.ctc_no') ? 'error': ''"
            :help="checkErrors('brgy_police_required.ctc_no')"
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
                v-model="form.owner_details.ctc_no"
                placeholder="CC•••• ••••••••"
                maxlength="15"
              ></a-input>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- Cedula Details -->
      <a-row
        type="flex"
        justify="space-between"
        style="font-weight: bold;"
        v-if="checkDocsNeeded(['cedula'])"
      >
        <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
          <a-form-item
            :validate-status="
              checkErrors('issued_to') ? 'error' : ''
            "
            :help="checkErrors('issued_to')"
          >
            <span slot="label">
              Cedula Issued To
              <i style="color: red">*</i>
            </span>
            <a-select v-model="form.issued_to">
              <a-select-option value="Individual">Individual</a-select-option>
              <a-select-option value="Corporation">Corporation</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :xs="{ span: 24 }" :sm="{ span: 11 }">
          <a-form-item
            :validate-status="
              checkErrors('cedula.citizenship') ? 'error' : ''
            "
            :help="checkErrors('cedula.citizenship')"
          >
            <span slot="label">
              Citizenship
              <i style="color: red">*</i>
            </span>
            <a-input v-model="form.owner_details.citizenship"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <a-form-item
            :validate-status="
              checkErrors('owner_details.tax.taxable.basic') ? 'error' : ''
            "
            :help="checkErrors('owner_details.tax.taxable.basic')"
          >
            <span slot="label">
              Basic Community Tax
              <i style="color: red">*</i>
            </span>
            <a-select v-model="form.owner_details.tax.taxable.basic" @change="computation">
              <a-select-option value="voluntary">Voluntary</a-select-option>
              <a-select-option value="exempted">Exempted</a-select-option>
            </a-select>
            <!-- <a-input v-model="form.tax.basic"></a-input> -->
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <a-form-item>
            <span slot="label">Income from Real Property</span>

            <a-input-number
              v-model="form.owner_details.tax.taxable.property_income"
              @change="computation"
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱\s?|(,*)/g, '')"
              style="width: 100%;"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <a-form-item>
            <span slot="label">Gross Receipts or Earnings</span>
            <a-tooltip placement="bottom">
              <span
                slot="title"
              >Gross Receipts or Earnings derived business durung the preceding year</span>
              <!-- Use to format number into currency -->
              <a-input-number
                v-model="form.owner_details.tax.taxable.business_income"
                @change="computation"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\₱\s?|(,*)/g, '')"
                style="width: 100%;"
              />
            </a-tooltip>
          </a-form-item>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 24 }">
          <a-form-item>
            <span slot="label">Salaries/Gross Receipts/Earnings</span>
            <a-tooltip placement="bottom">
              <span slot="title">
                Salaries or Gross Receipts or Earnings derived exercise of
                profession or pursuit of any occupation
              </span>
              <a-input-number
                v-model="form.owner_details.tax.taxable.profession_income"
                @change="computation"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\₱\s?|(,*)/g, '')"
                style="width: 100%;"
              />
            </a-tooltip>
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
            <a-col :xs="{ span: 24 }" :sm="{ span: 16 }">
              <a-form-item label="House/Bldg No">
                <a-input v-model="form.owner_address.bldg_no"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 8 }">
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
            :center="form.owner_address.coordinates"
            :zoom="16"
            map-type-id="terrain"
            draggable="true"
            style="width: 100%; height: 300px"
            :options="{ mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false }"
            @click="mapClick"
          >
            <GmapMarker :position="form.owner_address.coordinates" :animation="marker_animation" />
          </GmapMap>
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
import moment from "moment";
import purpose from "../PoliceClearance/police_purpose.json";

export default {
  props: ["form", "step", "errors", "documents", "computation_formulas"],
  data() {
    return {
      marker_animation: 0,
      regions_data,
      provinces_data,
      cities: [],
      barangays: [],
      required_docs: [],
      purpose,
      purpose_items: []
    };
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
    this.$getLocation().then(coordinates => {
      this.form.owner_address.coordinates = coordinates;
    });
    this.form.owner_details.name = this.user.name;
    this.form.owner_details.email = this.user.email;
  },
  mounted() {
    var data = [...this.purpose];
    this.purpose_items = data;
    this.checkRequiredDocs();

    this.loadReferences();
  },
  methods: {
    mapClick(e) {
      console.log("e :", e);
      this.form.owner_address.coordinates.lat = e.latLng.lat();
      this.form.owner_address.coordinates.lng = e.latLng.lng();
      this.marker_animation = 4;
    },
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
    },
    computation() {
      var taxable_basic = this.form.owner_details.tax.taxable.basic,
        community_basic = 0,
        community_business_income = 0,
        taxable_business_income = this.form.owner_details.tax.taxable
          .business_income,
        community_profession_income = 0,
        taxable_profession_income = this.form.owner_details.tax.taxable
          .profession_income,
        community_property_income = 0,
        taxable_property_income = this.form.owner_details.tax.taxable
          .property_income,
        total = 0,
        interest = 0,
        total_amount_paid = 0,
        month = new Date().getMonth();
      console.log(
        "this.$store.state.permits.filing_permit :",
        this.$store.state.permits.filing_permit
      );
      try {
        const data = this.deepCopy(
          this.$store.state.permits.filing_permit.requirements
        ).find(v => v.keyword === "cedula");
        var computation_formula = this.computation_formulas.find(
          v => v.permit_type === data._id
        );
        console.log("computation_formula :", computation_formula);
        if (computation_formula) eval(computation_formula.computation);
      } catch (error) {
        console.log("computation_formula ctc :", error);
      }
      this.form.owner_details.tax.community.basic = community_basic;
      this.form.owner_details.tax.community.business_income = community_business_income;
      this.form.owner_details.tax.community.profession_income = community_profession_income;
      this.form.owner_details.tax.community.property_income = community_property_income;
      this.form.owner_details.tax.total = total;
      this.form.owner_details.tax.interest = interest;
      this.form.owner_details.tax.total_amount_paid = total_amount_paid;
      this.$emit("updateCedulaPayment", total_amount_paid);
      console.log(
        "computation of tax: " + JSON.stringify(this.form.owner_details.tax)
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

.owner-form .ant-form-item {
  margin: 0;
}
</style>