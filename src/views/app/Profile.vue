<template>
  <div :style="constant_helper.theme.default">
    <a-card
      title="Profile"
      style="margin-top:10%"
      :tabList="tabListNoTitle"
      :activeTabKey="noTitleKey"
      @tabChange="key => onTabChange(key, 'noTitleKey')"
      class="profile-card"
    >
      <a-form v-if="noTitleKey === 'personal_details'">
        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <span slot="label">
            Last Name
            <i style="color: red">*</i>
          </span>
          <a-input v-model="user.name.last" />
        </a-form-item>
        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <span slot="label">
            First Name
            <i style="color: red">*</i>
          </span>
          <a-input v-model="user.name.first" />
        </a-form-item>
        <a-form-item label="Middle Name" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="user.name.middle" />
        </a-form-item>
        <a-form-item label="Suffix" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="user.name.suffix" />
        </a-form-item>
        <a-button type="primary" style="width:100%; margin-top: 3vh;" @click="save_changes(0)">Save Changes</a-button>
      </a-form>
      <a-form v-if="noTitleKey === 'change_password' && user.method !== ''">
        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <span slot="label">
            Current Password
            <i style="color: red">*</i>
          </span>
          <a-input type="password" v-model="user.password" />
        </a-form-item>
        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <span slot="label">
            New Password
            <i style="color: red">*</i>
          </span>
          <a-input type="password" v-model="password.new" />
        </a-form-item>
        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <span slot="label">
            Verify Password
            <i style="color: red">*</i>
          </span>
          <a-input type="password" v-model="password.verify" />
        </a-form-item>
        <a-button type="primary" style="width:100%; margin-top: 3vh;" @click="save_changes(1)">Save Changes</a-button>
      </a-form>
    </a-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //     tabList: [
      //   {
      //     key: 'tab1',
      //     // tab: 'tab1',
      //     scopedSlots: { tab: 'customRender' },
      //   },
      //   {
      //     key: 'tab2',
      //     tab: 'tab2',
      //   },
      // ],
      // contentList: {
      //   tab1: 'content1',
      //   tab2: 'content2',
      // },
      user: {
        email: "",
        password: "",
        name: {
          first: "",
          middle: "",
          last: "",
          suffix: ""
        }
      },
      password: {
        new: null,
        verify: null
      },
      tabListNoTitle: [
        {
          key: "personal_details",
          tab: "Personal Details"
        },
        {
          key: "change_password",
          tab: "Change Password"
        }
      ],
      key: "tab1",
      noTitleKey: "personal_details"
    };
  },
  methods: {
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
      console.log("this is no title key: " + JSON.stringify(this.noTitleKey));
    },
    save_changes(tab) {
      if (tab == 0) {
        this.$http
          .post(`accounts/${this.user.session_token}`, this.user)
          .then(result => {
            console.log(
              "change profile details result data: " + JSON.stringify(result)
            );
          });
      }
    }
  },
  created() {
    console.log(
      "profile user data: " +
        JSON.stringify(this.$store.state.user_session.user)
    );
    //    this.user = this.$store.state.user_session.user
    var id = this.$store.state.user_session.user.token;
    this.$store
      .dispatch("FIND_ACCOUNT", id)
      // this.$http.get('accounts?id=',{id:id})
      .then(result => {
        console.log("profile result data: " + JSON.stringify(result));
        result.data.forEach(element => {
          if (element.session_token == id) {
            this.user = element;
            this.tabListNoTitle[1].tab = "";
          }
        });
      });
  }
};
</script>
<style>
.profile-card .ant-form .ant-form-item .ant-form-item-label {
  font-weight: bold;
}

.profile-card .ant-form .ant-form-item {
  margin: 0 !important;
}
</style>