<template>
   <a-modal v-model="visible_report" title="Report Incident">
      <a-row type="flex" align="center" :gutter="16">
        <a-col :span="6">
          <a-card
            :style="constant_helper.theme.button"
            @click="report_type='1'"
            class="emergency_btn"
          >
            <a-row type="flex" justify="center">
              <a-col :span="12">
                <a-icon
                  :type="report_type==='1'?'check':'fire'"
                  style="color:#ffffff;font-size:24px"
                ></a-icon>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card
            :style="constant_helper.theme.button"
            @click="report_type='2'"
            class="emergency_btn"
          >
            <a-row type="flex" justify="center">
              <a-col :span="12">
                <a-icon
                  :type="report_type==='2'?'check':'sound'"
                  @click="report(1)"
                  style="color:#ffffff;font-size:24px"
                ></a-icon>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card
            :style="constant_helper.theme.button"
            @click="report_type='3'"
            class="emergency_btn"
          >
            <a-row type="flex" justify="center">
              <a-col :span="12">
                <a-icon
                  :type="report_type==='3'?'check':'alert'"
                  style="color:#ffffff;font-size:24px"
                ></a-icon>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card
            :style="constant_helper.theme.button"
            @click="report_type='4'"
            class="emergency_btn"
          >
            <a-row type="flex" justify="center">
              <a-col :span="12">
                <a-icon
                  :type="report_type==='4'?'check':'safety'"
                  style="color:#ffffff;font-size:24px"
                ></a-icon>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
      <GmapMap
        id="map"
        ref="map"
        :center="{lat:coordinates.lat, lng:coordinates.lng}"
        :zoom="16"
        map-type-id="terrain"
        draggable="true"
        style="width: 100%; height: 300px; margin-top:5vh"
      >
        <GmapMarker :draggable="true" :position="coordinates" :animation="animation" />
      </GmapMap>
      <a-textarea style="margin-top: 2vh" :rows="3" placeholder="Add Comments here..."></a-textarea>
      <template slot="footer">
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="submitReport"
        >Confirm and Submit</a-button>
      </template>
    </a-modal>
</template>

<script>
export default {
    props:['visible_report'],
    data(){
        return {
            report_type:'',
            loading:false,
            coordinates: { lat: 15.667300, lng: 120.734993 },
        }
    },
    methods:{
        submitReport() {
            this.visible_report=false;
            this.$notification.success({
                message: "Thank you for your concern",
                description: "Your Report has been sent. Stay safe!"
            });
            this.$emit('close')
        },
        report() {            
            var _self = this;
            this.$getLocation().then(coordinates => {
                this.coordinates = coordinates;
                this.$gmapApiPromiseLazy().then(() => {
                _self.animation = google.maps.Animation.DROP;
                });
            });
        }
    }
}
</script>

<style>

</style>