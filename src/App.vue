<template lang="pug">
.main
  .main__inner
    .main__settings-btn(@click="setSettingsPopupState(true)")
    .main__empty(v-if="!isLoading && !fetchedLocations.length")
      .main__empty-text Locations list empty
      .main__empty-btn(@click="setSettingsPopupState(true)") add new one
    .main__cards
      .main__cards-item(
        v-for="location in fetchedLocations"
        :key="location.id")
        LocationCard(v-bind:location="location")

  PopupTemplate(v-if="isSettingsOpened")
    template(v-slot:content)
      SettingsArea
</template>

<script>
import {
  mapState,
  mapActions,
  mapMutations,
} from 'vuex';

import store from '@/store';

import LocationCard from '@/components/LocationCard.vue';
import SettingsArea from '@/components/SettingsArea.vue';
import PopupTemplate from '@/components/ui/PopupTemplate.vue';

export default {
  store,
  name: 'App',
  components: {
    LocationCard,
    SettingsArea,
    PopupTemplate,
  },
  computed: {
    ...mapState({
      fetchedLocations: (state) => state.locations.fetchedLocations,
      isSettingsOpened: (state) => state.locations.isSettingsOpened,
      isLoading: (state) => state.locations.isLoading,
    }),
  },
  methods: {
    ...mapMutations({
      setSettingsPopupState: 'locations/setSettingsPopupState',
    }),
    ...mapActions({
      getWeatherDataByIds: 'locations/getWeatherDataByIds',
      getCurrentLocationsWeather: 'locations/getCurrentLocationsWeather',
    }),
  },
  mounted() {
    const localStorageLocations = JSON.parse(localStorage.getItem('locations'));

    if (localStorageLocations && localStorageLocations.length) {
      this.getWeatherDataByIds();
    } else {
      this.getCurrentLocationsWeather();
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  font-family: sans-serif;
  &__empty {
    padding: 100px 20px;
    text-align: center;
    &-text {
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: bold;
    }
    &-btn {
      cursor: pointer;
      display: inline-block;
      border-radius: 10px;
      text-transform: uppercase;
      font-size: 14px;
      padding: 15px;
      background-color: rgb(46, 84, 211);
      color: #fff;
    }
  }
  &__inner {
    position: relative;
    margin: 0 auto;
    max-width: 800px;
    padding-top: 35px;
  }
  &__settings-btn {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    background-image: url('~@/assets/settings-icon.svg');
    background-size: cover;
    background-position: center;
  }
  &__cards {
    @media screen and (min-width: 500px) {
      display: flex;
      flex-wrap: wrap;
    }
    &-item {
      margin-bottom: 10px;
      @media screen and (min-width: 500px) {
        margin-right: 10px;
        width: calc(50% - 10px);
      }
      @media screen and (min-width: 700px) {
        width: calc(33.333% - 10px);
      }
    }
  }
}
</style>
