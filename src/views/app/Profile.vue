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
        <div style="display: flex; justify-content: center; margin-bottom: 2vh">
          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            @change="allow_details_update=true"
            :beforeUpload="beforeAvatarUpload"
            :disabled="loading_submit_details"
          >
            <img v-if="user.avatar" :src="user.avatar" alt="Avatar" />
            <div v-else style="font-size: 35px">
              <a-icon :type="loading_avatar ? 'loading' : 'plus'" />
            </div>
          </a-upload>
        </div>
        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <span slot="label">
            Last Name
            <i style="color: red">*</i>
          </span>
          <a-input
            @change="allow_details_update=true"
            :disabled="loading_submit_details"
            v-model="user.name.last"
          />
        </a-form-item>
        <a-form-item :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <span slot="label">
            First Name
            <i style="color: red">*</i>
          </span>
          <a-input
            @change="allow_details_update=true"
            :disabled="loading_submit_details"
            v-model="user.name.first"
          />
        </a-form-item>
        <a-form-item label="Middle Name" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            @change="allow_details_update=true"
            :disabled="loading_submit_details"
            v-model="user.name.middle"
          />
        </a-form-item>
        <a-form-item label="Suffix" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            @change="allow_details_update=true"
            :disabled="loading_submit_details"
            v-model="user.name.suffix"
          />
        </a-form-item>
        <a-button
          type="primary"
          style="width:100%; margin-top: 3vh;"
          :disabled="!allow_details_update"
          :loading="loading_submit_details"
          @click="submitPersonalDetails"
        >Save Changes</a-button>
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
        <a-button
          type="primary"
          style="width:100%; margin-top: 3vh;"
          @click="save_changes(1)"
        >Save Changes</a-button>
      </a-form>
    </a-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: {
          first: "",
          middle: "",
          last: "",
          suffix: ""
        },
        avatar: null
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
      noTitleKey: "personal_details",
      loading_avatar: false,
      uploaded_avatar: null,
      allow_details_update: false,
      loading_submit_details: false
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
        // this.$http
        //   .post(`accounts/${this.user.email}`, this.user)
        //   .then(result => {
        //     console.log(
        //       "change profile details result data: " + JSON.stringify(result)
        //     );
        //   });
      }
    },
    beforeAvatarUpload(file) {
      const isJPGorPNG =
        file.type === "image/jpeg" || file.type === "image/png";
      if (isJPGorPNG) {
        this.loading_avatar = true;
        this.uploaded_avatar = file;
        this.getBase64(file, imageUrl => {
          this.user.avatar = imageUrl;
          this.loading_avatar = false;
        });
      } else this.$message.error("You can only upload JPG file!");
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   this.$message.error("Image must smaller than 2MB!");
      // }
      return isJPGorPNG;
    },
    submitPersonalDetails() {
      this.loading_submit_details = true;
      var file = null;
      if (this.uploaded_avatar) {
        file = new FormData();
        file.append("avatar", this.uploaded_avatar, this.uploaded_avatar.name);
      }
      this.$store
        .dispatch("UPDATE_PROFILE", { file, details: this.user })
        .then(result => {
          console.log("UPDATE_PROFILE :", result);
          this.$message.success("Successfully update your profile.");
          this.allow_details_update = false;
          this.loading_submit_details = false;
          window.location.reload();
        })
        .catch(err => {
          this.loading_submit_details = false;
          if (err && err.message) this.$message.error(err.message);
        });
    }
  },
  mounted() {
    var user = this.deepCopy(this.$store.state.user_session.user);
    this.user.name = user.name;
    this.user.avatar = user.avatar;
  }
  // created() {
  //   console.log(
  //     "profile user data: " +
  //       JSON.stringify(this.$store.state.user_session.user)
  //   );
  //   //    this.user = this.$store.state.user_session.user
  //   // var id = this.$store.state.user_session.user.token;
  //   var id = this.$store.state.user_session.user.email;
  //   this.$store
  //     .dispatch("FIND_ACCOUNT", id)
  //     // this.$http.get('accounts?id=',{id:id})
  //     .then(result => {
  //       console.log("profile result data: " + JSON.stringify(result.data));
  //       this.user.name = result.data.name;
  //       this.user.email = result.data.email;
  //     });
  // }
};
</script>
<style>
.profile-card .ant-form .ant-form-item .ant-form-item-label {
  font-weight: bold;
}

.profile-card .ant-form .ant-form-item {
  margin: 0 !important;
}

.avatar-uploader {
  width: 128px;
  height: 128px;
}

.avatar-uploader img {
  width: 110px;
  height: 110px;
}
</style>