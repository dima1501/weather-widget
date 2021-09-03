<template lang='pug'>
.location-card
    .location-card__name {{location.name}}, {{location.sys.country}}
    .location-card__preview
        img(:src="`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${location.weather[0].icon}.png`").location-card__preview-pic
        .location-card__preview-degrees {{formattedTemp}}°C
    .location-card__description Feels like {{formattedFeelsLike}}°C. {{location.weather[0].main}}, {{location.weather[0].description}}
    .location-card__options
        .location-card__options-item {{location.wind.speed}}m/s {{windDirection}}
        .location-card__options-item {{location.main.pressure}}hPa
        .location-card__options-item Humidity: {{location.main.humidity}}%
        .location-card__options-item Dew point 0°C
        .location-card__options-item Visibility {{formattedVisibility}}
</template>

<script>
export default {
  props: {
    location: Object,
  },
  computed: {
    formattedTemp() {
      return this.location.main.temp.toFixed();
    },
    formattedFeelsLike() {
      return this.location.main.feels_like.toFixed();
    },
    windDirection() {
      const compassPoints = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW'];
      const rawPosition = Math.floor((this.location.wind.deg / 22.5) + 0.5);
      const arrayPosition = (rawPosition % 16);
      return compassPoints[arrayPosition];
    },
    formattedVisibility() {
      const metersToKilometers = this.location.visibility / 1000;
      return metersToKilometers.toFixed(1);
    },
  },
};
</script>

<style lang='scss' scoped>
.location-card {
  padding: 15px;
  border: 2px solid rgb(238, 233, 233);
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 10px;
  &__name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &__preview {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    &-pic {
      flex-shrink: 1;
      width: 50%;
      height: auto;
    }
    &-degrees {
      font-size: 30px;
      flex-shrink: 0;
      width: 50%;
    }
  }
  &__description {
    margin-bottom: 10px;
    font-size: 18px;
  }
  &__options {
    display: flex;
    flex-wrap: wrap;
    &-item {
      width: 50%;
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>
