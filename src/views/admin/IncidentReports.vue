<template>
  <a-row type="flex" justify="center" :gutter="16">
    <a-col :span="16">
        <a-table :dataSource="reports" :columns="cols"  :customRow="customRow">
           
            <span slot="category" slot-scope="text, record">
                <img :src="getCategory(text)"/>
            </span>
            <span slot="date" slot-scope="text, record">
                {{formatDate(text)}}
            </span>
            <span slot="action" slot-scope="text, record">
                <a-button-group>
                    <a-button type="primary">Confirm</a-button>
                    <a-button  type="danger">Remove</a-button>
                </a-button-group>
            </span>
            
        </a-table>
    </a-col>
    <a-col :span="8">
        <a-card>
            <GmapMap
            id="map"
            ref="map"
            :center="{lat:coordinates.lat, lng:coordinates.lng}"
            :zoom="16"
            map-type-id="terrain"
            draggable="true"
            style="width: 100%; height: 100vh;"
            :options="{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true,
                disableDefaultUi: false
                }"
            >
                <!-- <GmapMarker
                    v-for="(coordinate, index) in crime_coordinates"
                    :key="`crime${index}`"
                    :draggable="false"
                    :icon="getCategory(selected.report_type)"
                    :position="coordinate.coordinates"
                    :animation="animation"
                    /> -->
                    <GmapMarker
                    :draggable="false"
                    @dragend="setCoordinate"
                    :position="coordinates"
                    :icon="getCategory(selected.report_type)"
                    />
            </GmapMap>
        </a-card>
    </a-col>
  </a-row>
</template>

<script>
import fire_icon from "@/assets/fire_icon_20.png";
import civil_disturbance_icon from "@/assets/civil_disturbance_icon_20.png";
import flood_icon from "@/assets/flood_icon_20.png";
import crime_icon from "@/assets/crime_icon_20.png";

export default {
    data(){
        return {
            selected:{},
            fire_icon,
            civil_disturbance_icon,
            flood_icon,
            crime_icon,
            coordinates: { lat: 15.667300, lng: 120.734993 },
            cols:[{
                title:'Category',
                dataIndex:'report_type',
                scopedSlots: { customRender: 'category' },
                },
                {
                title:'Reporter',
                dataIndex:'user'
                },
                {
                title:'Date',
                dataIndex:'date',
                scopedSlots:{customRender:'date'}
                },
                {
                title:'Status',
                dataIndex:'status'
                },
                {
                title:'Action',
                key:'action',
                scopedSlots: { customRender: 'action' },
                },
                ]
        }
    },
    computed:{
        reports(){
            console.log('reports ::: ', JSON.stringify(this.$store.state.reports.reports))
            return this.$store.state.reports.reports;
        }
    },
    methods:{
        customRow(record, index) {
            return {
                on: {
                click: () => {
                    this.selected = record
                    this.coordinates={ lat: record.coordinates.lat, lng: record.coordinates.lng }
                    console.log('coordinates ::: ', JSON.stringify(this.coordinates))
                    }
                }
            };
        },
        getCategory(type){
            if(type===1){
                return fire_icon;
            }else if(type ===2){
                return flood_icon;
            }else if(type ===3){
                return civil_disturbance_icon;
            }else if(type ===4){
                return crime_icon;
            }
        }
    }

}
</script>

<style>

</style>