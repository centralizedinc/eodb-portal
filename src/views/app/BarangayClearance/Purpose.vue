<template>
  <a-card :headStyle="{ border: 'none', color: '#7f7f7f' }" :bodyStyle="{ 'padding-top': 0 }">
    <!-- Title -->
    <a-row slot="title">
      <a-col :span="22" style="font-size: 25px;">Purpose</a-col>
    </a-row>
    <!-- form start -->
    <a-form>
      <a-row>
        <a-col :span="24">
          <a-form-item label="What is the purpose of getting this certificate?">
            <a-checkbox-group v-model="form.purpose" @change="onChange">
              <a-row>
                <a-col :span="24" v-for="(item, index) in plainOptions" :key="index">
                  <a-checkbox :value="item.value">{{item.label}}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" style="margin-top: 5vh;">
        <a-col :sm="{ span: 18 }" :md="{ span: 12 }" :xl="{ span: 6 }">
          <a-button-group>
            <!-- <a-button @click="$emit('prev')">Previous</a-button> -->
            <a-button
              type="primary"
              @click="$emit('next')"
              :disabled="!this.form.purpose || !this.form.purpose.length"
            >Next</a-button>
          </a-button-group>
        </a-col>
        <!-- <a-col :sm="{ span: 6 }" :md="{ span: 12 }" :xl="{ span: 18 }" style="text-align: right;">
          <a-button>Save Draft</a-button>
        </a-col> -->
      </a-row>
    </a-form>
  </a-card>
</template>
<script>
export default {
  props: ["form", "step", "errors"],
  data() {
    return {
      indeterminate: true,
      checkedList: null,
      show_next: false,
      checkAll: false,
      check_pc: false,
      check_bp: false,
      plainOptions: [
        { label: "Police Clearance", value: "pc" },
        { label: "Business Permit", value: "bp" }
      ]
    };
  },
  methods: {
    checkErrors(field) {
      var form_error = this.errors.find(v => v.field === field);
      return form_error ? form_error.error : null;
    },
    onChange(data) {
      // this.show_next = false;
      // if (this.checkedList.length == 1) {
      //   console.log("checklist greater than 0");
      //   if (this.checkedList[0] == "b") {
      //     this.checkedList = ["pc", "bp", "b"];
      //   }
      // } else if (this.checkedList.length >= 1) {
      //   console.log("this.checklist: " + JSON.stringify(this.checkedList));
      //   this.checkedList.forEach(element => {
      //     if (element == "b") {
      //       console.log("elment b: " + element);
      //       this.checkedList = ["pc", "bp", "b"];
      //     } else {
      //       this.checkedList = [];
      //     }
      //   });
      // } else if (this.checkedList) {
      //   this.show_next = true;
      // }
      // if(this.form.purpose && this.form.purpose.length) this.show_next = true;
      // this.form.purpose = this.checkedList;
      this.$emit("selectPurpose");
      console.log("onChange data: " + JSON.stringify(this.form.purpose));
    }
  }
};
</script>
<style></style>
