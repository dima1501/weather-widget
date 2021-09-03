<template lang="pug">
.drag-list
  draggable(
    v-model="fetchedLocations"
    group="locations"
    item-key="id"
    handle=".handle"
    animation='400')
    LocationPreview(v-for="location in fetchedLocations" :locationName="location.name" :locationCountry="location.sys.country" :locationId="location.id" :key="location.id")
</template>

<script>
import {
  mapActions,
} from 'vuex';

import draggable from 'vuedraggable';
import LocationPreview from '@/components/LocationPreview.vue';

export default {
  components: {
    LocationPreview,
    draggable,
  },
  computed: {
    fetchedLocations: {
      get() {
        return this.$store.state.locations.fetchedLocations;
      },
      set(locationsArr) {
        this.updateLocationsOrder(locationsArr);
      },
    },
  },
  methods: {
    ...mapActions({
      updateLocationsOrder: 'locations/updateLocationsOrder',
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
