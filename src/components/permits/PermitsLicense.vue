<template>
  <a-row type="flex" justify="start">
    <a-col :xs="{span: 24}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}" :xl="{span:24}">
      <a-table
        :scroll="{ x: 800, y: 300 }"
        :columns="cols"
        :dataSource="permits"
        :loading="loading || loading_permits"
      >
        <template slot="permit_no" slot-scope="text, record">{{getPermitNo(record)}}</template>
        <template slot="permit_type" slot-scope="text">{{getPermitType(text)}}</template>
        <template slot="date_created" slot-scope="text">{{formatDate(text, 'time', true)}}</template>
        <a-row slot="action" slot-scope="text, record">
          <!-- (record.permit_type === 'barangay' && record.barangay_type === 'business') -->
          <a-col
            :span="12"
            v-if="record.permit_type === 'business'"
            style="text-align: center;"
          >
            <a-popconfirm
              title="Click PROCEED to redirect in Renewal Form."
              okText="Proceed"
              cancelText="Cancel"
              @confirm="renewApplication(record)"
            >
              <a-tooltip title="Renew">
                <a-icon type="reload" style="cursor: pointer; color: #1890ff; font-weight: bold;" />
              </a-tooltip>
            </a-popconfirm>
          </a-col>
          <a-col
            :span="record.permit_type === 'business' ? 12 : 24"
            style="text-align: center;"
          >
            <a-tooltip title="Print">
              <a-icon
                type="printer"
                @click="print(record)"
                style="cursor: pointer; color: #1890ff; font-weight: bold;"
              />
            </a-tooltip>
          </a-col>
        </a-row>
      </a-table>
    </a-col>
  </a-row>
</template>

<script>
export default {
  props: ["admin", "loading_permits", "search"],
  data() {
    return {
      loading: false,
      cols: [
        {
          title: "Permit Number",
          dataIndex: "permit_no",
          scopedSlots: { customRender: "permit_no" },
          fixed: "left",
          width: 150
        },
        {
          title: "License/Permit Applied",
          dataIndex: "permit_type",
          scopedSlots: { customRender: "permit_type" }
        },
        {
          title: "Date Approved",
          dataIndex: "date_created",
          scopedSlots: { customRender: "date_created" }
        },
        {
          title: "Actions",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  computed: {
    permits() {
      var permits = JSON.parse(
        JSON.stringify(this.$store.state.permits.permits_records)
      );
      if (this.search) {
        permits = permits.filter(permit => {
          if (permit.permit_type === "business")
            return permit.business_no.indexOf(this.search) > -1;
          else if (permit.permit_type === "cedula")
            return permit.cedula_no.indexOf(this.search) > -1;
          else if (permit.permit_type === "barangay")
            return permit.barangay_no.indexOf(this.search) > -1;
          else if (permit.permit_type === "police")
            return permit.police_no.indexOf(this.search) > -1;
          return false;
        });
      }
      return permits.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
    },
    user() {
      return this.$store.state.user_session.user;
    },
    permit_types() {
      return this.$store.state.permits.permit_types;
    }
  },
  methods: {
    renewApplication(record) {
      console.log("record :", record);
      const permit = this.permit_types.find(v => v._id === record.permit_code);
      console.log("permit :", permit);
      this.$store.commit("SET_FILING_PERMIT", permit);
      this.$router.push(
        `${permit.path}?mode=renewal&ref_no=${record.reference_no}`
      );
      // if (record.permit_type === "business") {
      //   this.$router.push(
      //     `/permits/business?mode=renewal&ref_no=${record.reference_no}`
      //   );
      // } else if (
      //   record.permit_type === "barangay" &&
      //   record.barangay_type === "business"
      // ) {
      //   this.$router.push(
      //     `/permits/business?mode=renewal&ref_no=${record.reference_no}`
      //   );
      // }
    },
    print(record) {
      window.open(record.epermit_attachment.url);
      w.print();
    },
    getPermitNo(permit) {
      if (permit.permit_type === "business") return permit.business_no;
      else if (permit.permit_type === "cedula") return permit.cedula_no;
      else if (permit.permit_type === "barangay") return permit.barangay_no;
      else if (permit.permit_type === "police") return permit.police_no;
      return "";
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