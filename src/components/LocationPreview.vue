<template lang="pug">
.location-preview
  .location-preview__burger.handle
  .location-preview__name {{ locationName }}, {{ locationCountry }}
  .location-preview__remove(@click="removeLocation(locationId)")
</template>

<script>
import {
  mapActions,
} from 'vuex';

export default {
  props: {
    locationName: String,
    locationCountry: String,
    locationId: Number,
  },
  methods: {
    ...mapActions({
      removeLocation: 'locations/removeLocation',
    }),
  },
};
</script>

<style lang="scss" scoped>
.location-preview {
  padding: 10px 15px;
  border: 2px solid rgb(238, 233, 233);
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 10px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
  &.sortable-ghost {
    opacity: 0.8;
    animation: shake 0.82s infinite cubic-bezier(.36,.19,.19,.97) both;
  }
  &__burger {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-right: 15px;
    background-image: url('~@/assets/burger-icon.svg');
    background-size: cover;
    background-position: center;
  }
  &__name {
    font-weight: bold;
    font-size: 14px;
  }
  &__remove {
    cursor: pointer;
    margin-left: auto;
    width: 20px;
    height: 20px;
    background-image: url('~@/assets/delete-icon.svg');
    background-size: cover;
    background-position: center;
  }
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-2px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
