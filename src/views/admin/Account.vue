<template>
  <a-row type="flex" :gutter="16" justify="center" align="middle">
    <a-col :span="18">
      <a-card>
        <div
          style="border: none; height: 25vh; width: 100%; background:center;background-repeat: no-repeat;background-size: cover; background-image: url('https://picsum.photos/300');"
        >
          <a-card style="border: none; height: 25vh; width: 100%; background:#000000a6">
            <a-row type="flex" justify="start" align="middle">
              <a-col :span="4">
                <a-upload
                  class="avatar-uploader"
                  listType="picture-card"
                  :showUploadList="false"
                  :beforeUpload="beforeAvatarUpload"
                  @change="showAvatar=true"
                >
                  <img v-if="avatar" :src="avatar" alt="Avatar" />
                  <a-avatar
                    v-else
                    shape="square"
                    :size="86"
                    src="http://lorempixel.com/200/200/people/"
                  >--></a-avatar>
                </a-upload>
              </a-col>
              <a-col :span="14">
                <span style="font-size:24px; color: #FFFFFF; font-weight: bold">{{getFullName()}}</span>
                <br />
                <!-- <p style="font-size:10px; color: #FFFFFF">{{$store.state.admin_session.admin.role}}</p>   -->
                <span style="font-size:12px; color: #FFFFFF">{{role.name}}</span>
                <br />
                <span style="font-size:12px; color: #01ACAC;">{{department.name}}</span>
                <br />
              </a-col>
            </a-row>
          </a-card>
        </div>
        <a-divider></a-divider>
        <a-form style="margin-top:2vh">
          <a-form-item label="First Name" extra="Aministrator's first name">
            <a-input v-model="admin.name.first"></a-input>
          </a-form-item>
          <a-form-item label="Middle Name" extra="Aministrator's middle name">
            <a-input v-model="admin.name.middle"></a-input>
          </a-form-item>
          <a-form-item label="Last Name" extra="Aministrator's last name">
            <a-input v-model="admin.name.last"></a-input>
          </a-form-item>
          <a-form-item
            label="Email"
            extra="This serves as your username and primary contact information."
          >
            <a-input v-model="admin.email"></a-input>
          </a-form-item>
          <a-form-item label="Department" extra="Administrator's Department">
            <!-- <a-input :disabled="true" v-model="admin.department"></a-input> -->
            <a-select v-model="admin.department" placeholder="Select Department" :disabled="true">
              <a-select-option
                v-for="office in offices"
                :key="office._id"
                :value="office._id"
              >{{office.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Role" extra="Administrator's Role">
            <!-- <a-input :disabled="true" v-model="admin.role"></a-input> -->
            <a-select :disabled="true" v-model="admin.role" placeholder="Select Role">
              <a-select-option v-for="role in roles" :key="role._id" :value="role._id">{{role.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-divider></a-divider>
          <a-form-item>
            <a-button type="primary" size="large" icon="save" @click="save">Update Profile</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>

    <!-- <a-col :span="12">
            <div style="border: none; height: 20vh; width: 100%; background:center;background-repeat: no-repeat;background-size: cover; background-image: url('https://picsum.photos/300');"> 
                <a-card style="border: none; height: 20vh; width: 100%; background:#000000a6">
                
                <a-row type="flex" justify="start" align="middle">
                    <a-col :span="10">
                    <a-avatar style="border: 1px solid #FFFFFF" shape="square" :size="64" src="http://lorempixel.com/200/200/people/">
                    </a-avatar>              
                    </a-col>
                    <a-col :span="14">
                    <span style="color: #FFFFFF; font-weight: bold">Balita, Ariel A.</span>    
                    <p style="font-size:10px; color: #FFFFFF">Department Head</p>          
                    </a-col>
                </a-row>                    
                </a-card>
            </div>
        </a-col>
        <a-col :span="12">
            <a-form>
              <a-form-item >
                <span slot="label" style="color:#FFFFFF">First Name</span>
                  <a-input></a-input>
              </a-form-item>
              <a-form-item >
                <span slot="label" style="color:#FFFFFF">First Name</span>
                  <a-input></a-input>
              </a-form-item>
              <a-form-item >
                <span slot="label" style="color:#FFFFFF">First Name</span>
                  <a-input></a-input>
              </a-form-item>
              <a-form-item >
                <span slot="label" style="color:#FFFFFF">First Name</span>
                  <a-input></a-input>
              </a-form-item>
              <a-form-item >
                <span slot="label" style="color:#FFFFFF">First Name</span>
                  <a-input></a-input>
              </a-form-item>

            </a-form>
    </a-col>-->
  </a-row>
</template>

<script>
export default {
  data() {
    return {
      admin: {},
      offices: [],
      roles: [],
      loading_avatar: false,
      uploaded_avatar: {},
      showAvatar: false
    };
  },
  created() {
    this.init();
  },
  computed: {
    department() {
      return this.$store.state.admin_session.department;
    },
    role() {
      return this.$store.state.admin_session.role;
    }
  },
  methods: {
    init() {
      this.admin = this.deepCopy(this.$store.state.admin_session.admin);
      //get offices
      this.$http.get("/departments").then(results => {
        this.offices = results.data;
      });
      //get roles
      this.$http.get("/roles").then(results => {
        this.roles = results.data;
      });
    },
    getFullName() {
      var admin = this.$store.state.admin_session.admin;
      if (admin.name) {
        return `${admin.name.last}, ${admin.name.first} ${
          admin.name.middle ? admin.name.middle.substring(0, 1) + "." : ""
        }`;
      } else {
        return admin.email;
      }
    },
    beforeAvatarUpload(file) {
      const isJPGorPNG =
        file.type === "image/jpeg" || file.type === "image/png";
      if (isJPGorPNG) {
        this.loading_avatar = true;
        this.uploaded_avatar = file;
        this.getBase64(file, imageUrl => {
          this.admin.avatar = imageUrl;
          console.log("AVATAR::: ", this.admin.avatar);
          this.loading_avatar = false;
        });
      } else this.$message.error("Invalid file type");
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   this.$message.error("Image must smaller than 2MB!");
      // }
      return isJPGorPNG;
    },
    save() {
      var _self = this;
      this.$confirm({
        title:
          "You are about to save the changes on your profile. Do you wish to continue?",
        content:
          "Click OK will save the changes and log you out of the system.",
        onOk() {
          _self.$http
            .post(`/admins/${_self.admin._id}`, _self.admin)
            .then(result => {
              _self.$notification.success({
                message: "Success!",
                description: "Your account has been updated"
              });
              _self.$store.commit("ADMIN_LOGOUT");
              _self.$router.push("/admin");
            })
            .catch(error => {
              _self.$notification.error({
                message: "Error!",
                description:
                  "There was a problem updating the account. Please try again."
              });
            });
        },
        onCancel() {}
      });
    },
    computed: {
      avatar() {
        return this.admin.avatar;
      }
    }
  }
};
</script>

<style >
/* .ant-drawer-header{
    background: #242B30
}
.ant-form-item-label label {
    color: #FFFFFF;
    font-weight: bold
} */
</style>