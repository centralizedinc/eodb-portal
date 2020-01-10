<template>
  <div>
    <a-row type="flex" justify="end">
      <a-col :span="4">
        <a-button type="primary" block icon="plus" @click="visible=true">NEW TYPE</a-button>
      </a-col>
      <a-col :span="24">
        <a-table
          style="margin-top: 2vh"
          :dataSource="permits"
          :columns="cols"
          :bordered="true"
          :loading="loading"
        >
          <span slot="date" slot-scope="text">{{formatDate(text, 'time')}}</span>
          <span slot="actions" slot-scope="text,record" style="font-align:center">
            <a-button-group>
              <a-button type="primary" icon="edit" @click="edit(record)"></a-button>
            </a-button-group>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-drawer placement="right" @close="onClose" :visible="visible" :width="650" theme="dark">
      <div slot="title">
        <span style="color:#FFFFFF">New Permit Type</span>
      </div>
      <a-form>
        <a-form-item label="Permit Name">
          <a-input placeholder="Enter Name" v-model="permit.name"></a-input>
        </a-form-item>
        <a-form-item label="Description">
          <a-textarea placeholder="Description" v-model="permit.description" :rows="2"></a-textarea>
        </a-form-item>
        <a-form-item label="Path">
          <a-input placeholder="Path" v-model="permit.path" />
        </a-form-item>
        <a-form-item label="Keyword">
          <a-input placeholder="Enter Keyword" v-model="permit.keyword"></a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox :v-model="permit.primary">Check if this is a primary</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-card>
            <a-tabs>
              <a-tab-pane key="1" tab="REQUIREMENTS">
                <a-row type="flex" justify="end">
                  <a-col :span="24">
                    <a-form>
                      <a-form-item>
                        <a-radio-group v-model="creation_mode" buttonStyle="solid">
                          <a-radio-button :value="0">New</a-radio-button>
                          <a-radio-button :value="1">Select from Permits</a-radio-button>
                        </a-radio-group>
                      </a-form-item>
                      <template v-if="creation_mode===1">
                        <a-form-item>
                          <a-select
                            placeholder="Select Permit"
                            v-model="selection_requirement._id"
                            @change="setPermitRequirement"
                            notFoundContent="No Result"
                            style="width: 100%;"
                          >
                            <a-select-option :key="''" :value="''" disabled>Select Permit</a-select-option>
                            <a-select-option
                              v-for="item in permits"
                              :key="item._id"
                              :value="item._id"
                            >{{item.name}}</a-select-option>
                          </a-select>
                        </a-form-item>
                        <a-form-item>
                          <a-select
                            v-model="selection_requirement.application_type"
                            placeholder="Select Application Type"
                            style="width: 100%;"
                          >
                            <a-select-option key="0" :value="0">New</a-select-option>
                            <a-select-option key="1" :value="1">Renewal</a-select-option>
                          </a-select>
                        </a-form-item>
                        <a-form-item>
                          <a-input
                            v-model="selection_requirement.keyword"
                            placeholder="Keyword"
                            :disabled="true"
                          />
                        </a-form-item>
                        <a-form-item>
                          <a-checkbox
                            :v-model="selection_requirement.required"
                          >Check if this must be attach and cannot be instantly apply.</a-checkbox>
                        </a-form-item>
                        <a-form-item>
                          <a-button
                            type="primary"
                            block
                            icon="plus"
                            ghost
                            @click="addRequirement"
                            :disabled="!selection_requirement._id || selection_requirement.application_type === null || !selection_requirement.keyword"
                          >Add</a-button>
                        </a-form-item>
                      </template>
                      <template v-else>
                        <a-form-item>
                          <a-input v-model="requirement.name" placeholder="Requirement Name" />
                        </a-form-item>
                        <a-form-item>
                          <a-select
                            v-model="requirement.application_type"
                            placeholder="Select Application Type"
                            style="width: 100%;"
                          >
                            <a-select-option key="0" :value="0">New</a-select-option>
                            <a-select-option key="1" :value="1">Renewal</a-select-option>
                          </a-select>
                        </a-form-item>
                        <a-form-item>
                          <a-input v-model="requirement.keyword" placeholder="Keyword" />
                        </a-form-item>
                        <a-form-item>
                          <a-checkbox
                            :v-model="requirement.required"
                          >Check if this must be attach and cannot be instantly apply.</a-checkbox>
                        </a-form-item>
                        <a-form-item>
                          <a-button
                            type="primary"
                            block
                            icon="plus"
                            ghost
                            @click="addRequirement"
                            :disabled="!requirement.name || requirement.application_type === null || !requirement.keyword"
                          >Add</a-button>
                        </a-form-item>
                      </template>
                    </a-form>
                  </a-col>
                </a-row>
                <a-table
                  style="margin-top:2vh"
                  :columns="cols_req"
                  :bordered="true"
                  :dataSource="permit.requirements"
                >
                  <span slot="application_type" slot-scope="text">
                    <span>{{["NEW", "RENEWAL"][text]}}</span>
                  </span>
                  <span slot="action" slot-scope="text, record">
                    <a-button type="danger" icon="delete" @click="removeRequirement(record)"></a-button>
                  </span>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="3" tab="APPROVERS">
                <a-row type="flex" justify="end">
                  <a-col :span="24">
                    <a-row type="flex" justify="end" :gutter="16">
                      <a-col :span="18">
                        <a-select placeholder="Select Department" v-model="approver">
                          <a-select-option
                            v-for="office in offices"
                            :key="office._id"
                            :value="office._id"
                          >{{`${office.name} - ${office.description}`}}</a-select-option>
                        </a-select>
                      </a-col>
                      <a-col :span="6">
                        <a-button
                          type="primary"
                          block
                          icon="plus"
                          ghost
                          @click="addApprover"
                          :disabled="!approver"
                        >Add</a-button>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
                <a-table
                  style="margin-top:2vh"
                  :columns="cols_app"
                  :bordered="true"
                  :dataSource="permit.approvers"
                >
                  <span slot="department" slot-scope="text">{{getDepartment(text)}}</span>
                  <span slot="action" slot-scope="text">
                    <a-button type="danger" icon="delete" @click="removeApprover(text)"></a-button>
                  </span>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="2" tab="CHECKLIST">
                <a-row type="flex" justify="end">
                  <a-col :span="24">
                    <a-row type="flex" justify="end" :gutter="16">
                      <a-col :span="24">
                        <a-select placeholder="Select Department" v-model="checklist.department">
                          <a-select-option
                            v-for="office in permit.approvers"
                            :key="office.department"
                            :value="office.department"
                          >{{getDepartment(office.department)}}</a-select-option>
                        </a-select>
                      </a-col>
                      <a-col :span="12" style="margin-top:2vh">
                        <a-input v-model="checklist.name" placeholder="Name"></a-input>
                      </a-col>
                      <a-col :span="12" style="margin-top:2vh">
                        <a-input v-model="checklist.description" placeholder="Remarks"></a-input>
                      </a-col>
                      <a-col :span="6" style="margin-top:2vh">
                        <a-button type="primary" block icon="plus" ghost @click="addChecklist">Add</a-button>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
                <a-table
                  style="margin-top:2vh"
                  :columns="cols_check"
                  :bordered="true"
                  :dataSource="permit.checklists"
                >
                  <span slot="department" slot-scope="text">{{getDepartment(text)}}</span>
                </a-table>
              </a-tab-pane>
            </a-tabs>
          </a-card>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="save" :loading="loading" block @click="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit_mode: false,
      loading: false,
      visible: false,
      office: {
        admin: false
      },
      offices: [],
      permits: [],
      permit: {
        approvers: [],
        checklists: [],
        requirements: [],
        path: "",
        api_route: "",
        primary: false
      },
      approver: null,
      checklist: {},
      requirement: {},
      cols_check: [
        {
          title: "Department",
          dataIndex: "department",
          scopedSlots: { customRender: "department" }
        },
        {
          title: "Name",
          dataIndex: "name"
        },
        {
          title: "Description",
          dataIndex: "description"
        }
      ],
      cols_app: [
        {
          title: "Department",
          dataIndex: "department",
          scopedSlots: { customRender: "department" }
        },
        {
          title: "Remove",
          dataIndex: "department",
          scopedSlots: { customRender: "action" }
        }
      ],
      cols_req: [
        {
          title: "Requirement",
          dataIndex: "name"
        },
        {
          title: "Application Type",
          dataIndex: "application_type",
          scopedSlots: { customRender: "application_type" }
        },
        {
          title: "Remove",
          dataIndex: "_id",
          scopedSlots: { customRender: "action" }
        }
      ],
      cols: [
        {
          title: "Name",
          dataIndex: "name"
        },
        {
          title: "Description",
          dataIndex: "description"
        },
        {
          title: "Date Created",
          dataIndex: "date_created",
          scopedSlots: { customRender: "date" }
        },
        {
          title: "Date Modfied",
          dataIndex: "date_modified",
          scopedSlots: { customRender: "date" }
        },
        {
          title: "Actions",
          dataIndex: "_id",
          scopedSlots: { customRender: "actions" }
        }
      ],
      selection_requirement: {},
      disable_keyword: false,
      creation_mode: 0
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.$http.get("/departments").then(results => {
        this.offices = results.data;
      });
      this.$http.get("/permits").then(results => {
        this.loading = false;
        this.permits = results.data;
      });
    },
    addApprover() {
      this.permit.approvers.push({ department: this.approver });
      this.approver = "";
      this.$notification.success({ message: "Appover Added!" });
    },
    removeApprover(item) {
      this.permit.approvers.splice(
        this.permit.approvers.indexOf({ department: item }),
        1
      );

      this.$notification.error({ message: "Appover Removed!" });
    },
    addRequirement() {
        //New
      if (this.creation_mode === 0) {
        this.permit.requirements.push(this.deepCopy(this.requirement));
        this.requirement = {};
        this.$notification.success({ message: "Requirement Added!" });
      } else if (this.creation_mode === 1) {
        this.permit.requirements.push(this.deepCopy(this.selection_requirement));
        this.selection_requirement = {};
        this.$notification.success({ message: "Requirement Added!" });
      }
    },
    setPermitRequirement(value){
      const permit = this.permits.find(v => v._id.toString() === value);
      if(permit) {
        this.selection_requirement = permit;
        console.log('this.selection_requirement :', this.selection_requirement);
      }
    },
    removeRequirement(item) {
      console.log('item :', item);
      console.log('this.permit :', this.permit);
      this.permit.requirements.splice(this.permit.requirements.indexOf(item), 1);

      this.$notification.error({ message: "Requirement Removed!" });
    },
    addChecklist() {
      this.permit.checklists.push(this.deepCopy(this.checklist));
      this.checklist = {};

      this.$notification.success({ message: "Requirement Added!" });
    },
    getDepartment(id) {
      return this.offices.find(x => x._id === id).description;
    },
    onClose() {
      this.permit = {
        approvers: [],
        checklists: [],
        requirements: []
      };
      this.checklist = {};
      this.approver = {};
      this.requirement = {};
      this.selection_requirement = {};
      this.creation_mode = 0;
      this.visible = false;
      this.edit_mode = false;
    },
    edit(record) {
      this.edit_mode = true;
      this.permit = this.deepCopy(record);
      this.visible = true;
    },
    submit() {
      this.loading = true;
      if (this.edit_mode) {
        this.$http
          .post(`/permits/${this.permit._id}`, this.permit)
          .then(result => {
            console.log(JSON.stringify(result));
            this.loading = false;
            this.visible = false;
            this.$notification.success({
              message: "Success",
              description: "Permit Type Updated!"
            });
            this.permit = {
              approvers: [],
              checklists: [],
              requirements: []
            };
            this.checklist = {};
            this.approver = {};
            this.requirement = {};
            this.selection_requirement = {};
            this.creation_mode = 0;
            this.init();
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$http
          .post("/permits", this.permit)
          .then(result => {
            console.log(JSON.stringify(result));
            this.loading = false;
            this.visible = false;
            this.$notification.success({
              message: "Success",
              description: "New Permit Type Created!"
            });
            this.permit = {
              approvers: [],
              checklists: [],
              requirements: []
            };
            this.checklist = {};
            this.approver = {};
            this.requirement = {};
            this.selection_requirement = {};
            this.creation_mode = 0;
            this.init();
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style>
.ant-form-item-label label {
  font-weight: bold;
  color: black;
}
.ant-drawer-header {
  background: #242b30 !important;
}
.ant-drawer-close {
  color: #ffffff;
}
</style>