<template>
  <a-card title="Incident Map">
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
          <!-- Current Location -->
          <GmapMarker
            :draggable="true"
            @dragend="setCoordinate"
            :position="coordinates"
            :animation="animation"
          />

          <!-- Fire -->
          <GmapMarker
            v-for="(coordinate, index) in fire_coordinates"
            :key="`fire${index}`"
            :title="`Fire incident: Reported as of ${formatDate(coordinate.date_created)}`"
            :draggable="false"
            :icon="fire_icon"
            :position="coordinate.coordinates"
            :animation="animation"
          />

          <!-- Civil Disturbance -->
          <GmapMarker
            v-for="(coordinate, index) in civil_disturbance_coordinates"
            :key="`civil${index}`"
            :title="`Civil Disturbance: Reported as of ${formatDate(coordinate.date_created)}`"
            :draggable="false"
            :icon="civil_disturbance_icon"
            :position="coordinate.coordinates"
            :animation="animation"
          />

          <!-- Flood -->
          <GmapMarker
            v-for="(coordinate, index) in flood_coordinates"
            :key="`flood${index}`"
            :title="`Flood Incident: Reported as of ${formatDate(coordinate.date_created)}`"
            :draggable="false"
            :icon="flood_icon"
            :position="coordinate.coordinates"
            :animation="animation"
          />

          <!-- Crime -->
          <GmapMarker
            v-for="(coordinate, index) in crime_coordinates"
            :key="`crime${index}`"
            :title="`Crime Incident: Reported as of ${formatDate(coordinate.date_created)}`"
            :draggable="false"
            :icon="crime_icon"
            :position="coordinate.coordinates"
            :animation="animation"
          />
        </GmapMap>
      </a-card>
</template>

<script>
export default {
    data() {
        return {
            coordinates: { lat: 13.9413957, lng: 121.6234471 }
        }
    },
}
</script>

<style>

</style>