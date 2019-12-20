<template>
  <a-card style="box-shadow: 0px 0px 10px 2px #88888847; margin-top: 10vh">
    <!-- <a-row style="margin-bottom: 2vh" type="flex" :gutter="8"> -->
    <!-- <a-col :xs="18" :sm="20" :md="22" :lg="22" :xl="22" :xxl="22">
        <a-input-search placeholder="Search" @search="onSearch" />
      </a-col>
      <a-col :xs="6" :sm="4" :md="2" :lg="2" :xl="2" :xxl="2">
        <a-button style="background: linear-gradient(to right, #56caef, rgba(60, 108, 180, 1) )" block>
          <a-icon type="plus"></a-icon>
        </a-button>
    </a-col>-->
    <!-- </a-row>
    <a-divider></a-divider>-->

    

    <a-table :columns="cols" :dataSource="transac" :loading="loading" v-if="$breakpoint.mdAndUp">
      <template slot="permit" slot-scope="text">{{getPermitType(text)}}</template>
      <template slot="date_created" slot-scope="text">{{formatDate(text, null, true)}}</template>
      <template slot="status" slot-scope="text">
        <span
          :style="`color: ${text === 0? 'blue' : text === 1? 'green' : text === 2 ? 'red' : ''}`"
        >{{getDocketStatus(text)}}</span>
      </template>
      <template slot="action" slot-scope="text, record">
        <div v-if="record.status === 1">
          <a @click="() => view_data(record)">Renew</a>
        </div>
      </template>
    </a-table>
    <div v-else>
      <a-card v-for="item in transac" :key="item" style="margin-top: 1vh">
        <a-card-meta
          :title="item.application.permit_type"
          :description="item.progress.current_task"
        ></a-card-meta>
        <template slot="actions">
          <div>
            <a @click="() => view_data(item)">Renew</a>
          </div>
        </template>
      </a-card>
    </div>
    <a-drawer width="75%" placement="right" :closable="false" @close="onClose" :visible="draw_show">
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item key="permit">Permit</a-menu-item>
        <a-menu-item key="insurance">Insurance</a-menu-item>
        <a-menu-item key="payment">Payment</a-menu-item>
        <a-menu-item key="documents">Attachments</a-menu-item>
        <a-menu-item key="approval" v-if="admin">Approval</a-menu-item>
      </a-menu>
      <a-card style="textAlign:'center'" v-show="current =='permit'">
        <a-row>
          <div align="center">
            <p>
              Republic of the Philippines
              <br />
              {{constant_helper.name_display}}
              <br />
              {{constant_helper.client_details.transaction_label}}
              <br />
              {{form.application.permit_type}} and Licensing Office
              <br />Telephone no. +63 42 710-8892
              <br />
              <br />Application:
              <u v-if="form.application.app_type == 1">New</u>
              <u v-else>Renewal</u>
            </p>
          </div>
        </a-row>
        <a-row>
          <a-col :span="12">
            <p class="inset">Date of Application in PBR: {{form.application.pbr_date}}</p>
          </a-col>
          <a-col :span="12">
            <p class="inset">Date of Application in LGU: {{form.application.lgu_date}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" style="margin-top:-15px">
            <p class="inset">Reference No./B.I.N.: {{form.application.reference_no}}</p>
          </a-col>
          <a-col :span="12" style="margin-top:-15px">
            <p class="inset">DTI/SEC/CDA Registration No.: {{form.application.registration_no}}</p>
          </a-col>
        </a-row>
        <a-row>
          <!-- business -->
          <a-col :span="14" style="margin-top:-15px">
            <p class="inset">
              Kind of Ownership:
              <a-radio-group buttonStyle="solid" v-model="form.business.ownership" disabled="true">
                <a-radio-button :value="1">Sole Proprietorship</a-radio-button>
                <a-radio-button :value="2">Partnership</a-radio-button>
                <a-radio-button :value="3">Corporation</a-radio-button>
              </a-radio-group>
            </p>
          </a-col>
          <a-col :span="5" style="margin-top:-15px">
            <p class="inset">TIN: {{form.business.tin}}</p>
          </a-col>
          <a-col :span="5" style="margin-top:-15px">
            <p class="inset">SSS No.: {{form.business.sss}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" style="margin-top:-15px">
            <p class="inset">Business Name: {{form.business.business_name}}</p>
          </a-col>
          <a-col :span="12" style="margin-top:-15px">
            <p class="inset">Name of Applicant/Owner/Manager: {{form.business.amo.name}}</p>
          </a-col>
        </a-row>
        <a-row type="flex">
          <a-col :span="12" style="margin-top:-15px">
            <p class="inset">Business Address: {{form.business.business_address}}</p>
          </a-col>
          <a-col :span="12" style="margin-top:-15px">
            <p class="inset">Applicant's/Owner's/Manager's Address: {{form.business.amo.address}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" style="margin-top:-15px">
            <p class="inset">Business Contact No.: {{form.business.contact}}</p>
          </a-col>
          <a-col :span="12" style="margin-top:-15px">
            <p class="inset">Applicant's/Owner's/Manager's Contact: {{form.business.amo.contact}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" style="margin-top:-15px">
            <p class="inset">Business E-mail: {{form.business.email}}</p>
          </a-col>
          <a-col :span="12" style="margin-top:-15px">
            <p class="inset">Applicant's/Owner's/Manager's E-mail: {{form.business.amo.email}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6" style="margin-top:-15px">
            <p class="inset">Business Area (in sq m): {{form.business.business_area}}</p>
          </a-col>
          <a-col :span="6" style="margin-top:-15px">
            <p class="inset">No. of Owners: {{form.businessowner_no}}</p>
          </a-col>
          <a-col :span="12" style="margin-top:-15px">
            <p class="inset">
              No. of Employees:
              <u>{{form.business.employees_no.professional}}</u> Professional
              <u>{{form.business.employees_no.non_professional}}</u> Non-Professional
            </p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" style="margin-top:-15px">
            <p class="inset">
              <a-radio-group
                buttonStyle="solid"
                v-model="form.business.business_type"
                disabled="true"
              >
                <a-radio-button :value="1">Rented</a-radio-button>
                <a-radio-button :value="2">Owned</a-radio-button>
              </a-radio-group>If place of business is RENTED, please identify the following
            </p>
          </a-col>
        </a-row>
        <a-row>
          <!-- if rented -->
          <a-col :span="12" style="margin-top: -15px">
            <p class="inset">Lessor's Name: {{form.business.rented.lessor}}</p>
          </a-col>
          <a-col :span="12" style="margin-top: -15px">
            <p class="inset">Monthly Rental: {{form.business.rented.monthly_rental}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" style="margin-top: -15px">
            <p class="inset">Lessor's Address: {{form.business.rented.lessor_address}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" style="margin-top: -15px">
            <p class="inset">Telephone No.: {{form.business.rented.lessor_contact}}</p>
          </a-col>
          <a-col :span="12" style="margin-top: -15px">
            <p class="inset">E-mail Address: {{form.business.rented.lessor_email}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" style="margin-top: -15px">
            <p class="inset">
              Property Index Number (P.I.N.) Real Property Information: Land
              <u>{{form.business.property_pin.land}}</u> Building
              <u>{{form.business.property_pin.building}}</u> Machinery
              <u>{{form.business.property_pin.machinery}}</u>
            </p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" style="margin-top: -15px">
            <p class="inset">Business Activity(ies)</p>
          </a-col>
          <a-col :span="8" style="margin-top: -15px">
            <p class="inset">Line of Business</p>
          </a-col>
          <a-col :span="8" style="margin-top: -15px">
            <p class="inset">Capitalization</p>
          </a-col>
          <a-col :span="8" style="margin-top: -15px">
            <p class="inset">Gross Sales/Receipts</p>
          </a-col>
        </a-row>
        <a-row v-for="i in form.business.business_activities.length" :key="i=0">
          <a-col :span="8" style="margin-top: -15px">
            <p class="inset">{{form.business.business_activities[i].line_business}}</p>
          </a-col>
          <a-col :span="8" style="margin-top: -15px">
            <p class="inset">{{form.business.business_activities[i].capital}}</p>
          </a-col>
          <a-col :span="8" style="margin-top: -15px">
            <p class="inset">{{form.business.business_activities[i].receipts}}</p>
          </a-col>
        </a-row>
        <a-row>
          <!-- payment -->
          <a-col :span="24" style="margin-top: -15px">
            <p class="inset">
              Mode of Payment:
              <a-radio-group
                buttonStyle="solid"
                v-model="form.business.payment.mode"
                disabled="true"
              >
                <a-radio-button :value="1">Annual/Full</a-radio-button>
                <a-radio-button :value="2">Quarterly</a-radio-button>
              </a-radio-group>
              <span style="margin-left: 1vw;">
                No. of Quarters
                <u>{{form.business.payment.qrtly}}</u>
              </span>
            </p>
          </a-col>
        </a-row>
        <a-row>
          <div align="right">
            <a-button>
              <a-icon type="download" />Download
            </a-button>
          </div>
        </a-row>
      </a-card>
      <a-card style="textAlign:'center'" v-show="current =='insurance'">
        <div align="center">
          <a-card hoverable style="width: 300px">
            <img
              v-if="form.business_insurance.provider == 'Malayan'"
              alt="example"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToEd_HUEVcw8aW1xYzakaludSmpdQyREP_JAxx5KFsRXqxQj8D"
              slot="cover"
            />
            <img
              v-if="form.business_insurance.provider == 'AIG'"
              alt="example"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/AIG_logo.svg/1200px-AIG_logo.svg.png"
              slot="cover"
            />
            <img
              v-if="form.business_insurance.provider == 'AXA Philippines'"
              alt="example"
              src="https://pbs.twimg.com/profile_images/1039861366918508544/AYFe5Ooj_400x400.jpg"
              slot="cover"
            />
            <img
              v-if="form.business_insurance.provider == 'MAPRE Philippines'"
              alt="example"
              src="https://www.mapfre.com.ph/insurance-ph/images/1200x630-logo-mapfre_tcm844-83355.jpg"
              slot="cover"
            />
            <div align="center">
              <h3>{{form.business_insurance.provider}}</h3>
            </div>

            <a-card-grid style="width:50%;textAlign:'center'">Fee:</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">₱{{form.business_insurance.app_fee}}</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">LRF:</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">₱{{form.business_insurance.lrf}}</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">Interest:</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">₱{{form.business_insurance.interest}}</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">Surcharge:</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">₱{{form.business_insurance.surcharge}}</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">Total:</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">₱{{form.business_insurance.total}}</a-card-grid>
          </a-card>
        </div>
      </a-card>
      <a-card style="textAlign:'center'" v-show="current =='payment'">
        <div align="center">
          <a-card title="Payment Details" style="width:50%">
            <a-card-grid style="width:50%;textAlign:'center'">Permit Type:</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">{{form.payment_info.desc}}</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">Fee:</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">{{form.payment_info.amount}}</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">Payment Method:</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">{{form.payment_info.method}}</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">Name:</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">{{form.billing_info.name}}</a-card-grid>
            <a-card-grid
              style="width:50%;textAlign:'center'"
              v-if="form.billing_info.credit_card != null"
            >Credit Card Number:</a-card-grid>
            <a-card-grid
              style="width:50%;textAlign:'center'"
              v-if="form.billing_info.credit_card
            !=null"
            >{{form.billing_info.credit_card}}</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">Email:</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">{{form.billing_info.email}}</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">Contact:</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">{{form.billing_info.contact}}</a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">
              <p>Status:</p>
            </a-card-grid>
            <a-card-grid style="width:50%;textAlign:'center'">
              <p
                v-if="form.progress.current_task != 'FOR APPROVAL'"
                text-color="success"
              >FOR APPROVAL</p>
              <p v-else text-color="error">FOR PAYMENT</p>
            </a-card-grid>
          </a-card>
        </div>
      </a-card>
      <a-card v-show="current =='document'"></a-card>
      <a-card v-show="current =='approval'">
        <a-row type="flex" :gutter="16" justify="center">
          <a-col :span="24">
            <a-textarea rows="10" placeholder="Write remarks here..." v-model="remarks"></a-textarea>
            <a-divider></a-divider>
          </a-col>

          <a-col :span="12">
            <a-button type="primary" ghost block icon="check" @click="approve">Approve</a-button>
          </a-col>
          <a-col :span="12">
            <a-button type="danger" ghost block icon="close">Decline</a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-drawer>
  </a-card>
</template>

<script>
export default {
  props: ["admin"],
  data() {
    return {
      remarks: "",
      searching: null,
      loading: false,
      store_handler: [],
      current: ["permit"],
      form: {
        application: {
          permit_type: "",
          app_type: null,
          reference_no: null,
          pbr_date: null,
          lgu_date: null,
          registration_no: null
        },
        business: {
          ownership: null,
          tin: null,
          sss: null,
          business_name: "",
          contact: null,
          email: "",
          business_address: "",
          // AMO - Applicat/Manager/Owner
          amo: {
            name: "",
            address: "",
            contact: null,
            email: ""
          },
          business_area: "",
          owner_no: null,
          employees_no: {
            professional: null,
            non_professional: null
          },
          business_type: null,
          rented: {
            lessor: "",
            monthly_rental: null,
            lessor_address: "",
            lessor_conatct: null,
            lessor_email: ""
          },
          property_pin: {
            land: null,
            building: null,
            machinery: null
          },
          business_activities: [],
          payment: {
            mode: null,
            qrtly: null
          }
        },
        documents: [],
        business_insurance: {
          provider: "",
          app_fee: 0,
          lrf: 0,
          interest: 0,
          surcharge: 0,
          total: 0
        },
        payment_info: {
          desc: "Business Clearance",
          amount: 1500,
          method: "Over the Counter"
        },
        billing_info: {
          credit_number: null,
          name: "",
          email: "",
          contact: null
        },
        progress: {
          status: "",
          current_task: "",
          previous_task: ""
        }
      },
      columns: [
        {
          title: "Line of Business",
          dataIndex: "line_business",
          width: "30%",
          scopedSlots: { customRender: "line_business" }
        },
        {
          title: "Capitalization",
          dataIndex: "capital",
          scopedSlots: { customRender: "capital" }
        },
        {
          title: "Gross Sales/Receipts",
          dataIndex: "receipts",
          scopedSlots: { customRender: "receipts" }
        }
      ],
      cols: [
        {
          title: "Reference No",
          dataIndex: "reference_no"
        },
        {
          title: "License/Permit Applied",
          dataIndex: "permit",
          scopedSlots: { customRender: "permit" }
        },
        {
          title: "Date Submitted",
          dataIndex: "date_created",
          scopedSlots: { customRender: "date_created" }
        },
        {
          title: "Status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      draw_show: false
    };
  },
  created() {
    // this.loading = true;
    // axios.get("permit/apply").then(results => {
    //   this.loading = false;
    //   this.transac = results.data;
    // });

    // this.transac = JSON.parse(JSON.stringify(this.$store.state.permit.permit));
    var user = this.$store.state.user_session.user;
    console.log(
      "this.$store.state.user_session.user: " +
        JSON.stringify(this.$store.state.user_session.user)
    );
    // this.store_handler = this.$store.state.permit.permit;
    this.$store
      .dispatch("GET_DOCKETS")
      .then(result => {
        console.log(
          "get dispatch get permit result data: " + JSON.stringify(result.data)
        );
      })
      .catch(err => {
        console.log("error get permit: " + err);
      });
    // this.store_handler = this.$store.state.permit.permits
    // console.log("this.store_handler ")
    // console.log("transac data: " + JSON.stringify(this.transac));
  },
  computed: {
    transac() {
      console.log(
        "got transac data: " + JSON.stringify(this.$store.state.dockets.dockets)
      );
      // JSON.parse(JSON.stringify(this.$store.state.permit.permits));
      // return this.$store.state.permit.permits;
      return this.$store.state.dockets.dockets;
    }
  },
  methods: {
    onSearch(value) {
      console.log("on search data value: " + JSON.stringify(value));
      console.log("on search data transac: " + JSON.stringify(this.transac));
      // this.transac.splice(0, this.transac.length);
      // if (this.searching === null && this.searching === "") {
      //   this.transac.pop(this.transac);
      // } else {
      // this.store_handler.forEach(element => {
      //   console.log("element data: " + JSON.stringify(element));
      //   console.log("value data: " + JSON.stringify(value));
      //   if (element.reference_no === value) {
      //     console.log("element meron: " + JSON.stringify(element));
      //     this.transac.push(element);
      //   }
      // });
      // }
    },
    view_data(data) {
      this.form = data;
      console.log("viewed item: " + JSON.stringify(data));
      this.draw_show = true;
    },
    onClose() {
      this.draw_show = false;
    },
    approve() {
      this.$notification.success({
        message: "Success",
        description: `Application ${this.form.reference_no} is approved.`
      });
      this.$store.commit("APPROVE_PERMIT", this.form.reference_no);
      this.draw_show = false;
      this.remarks = "";
    }
  }
};
</script>
<style>
p.dotted {
  border-style: dotted;
}
p.dashed {
  border-style: dashed;
}
p.solid {
  border-style: solid;
}
p.double {
  border-style: double;
}
p.groove {
  border-style: groove;
}
p.ridge {
  border-style: ridge;
}
p.inset {
  border-style: inset;
}
p.outset {
  border-style: outset;
}
p.none {
  border-style: none;
}
p.hidden {
  border-style: hidden;
}
p.mix {
  border-style: dotted dashed solid double;
}
</style>