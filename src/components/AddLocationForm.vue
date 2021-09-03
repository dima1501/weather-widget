<template lang="pug">
.add-location
  form(@submit.prevent="addLocation(newLocation)").add-location__form
    input(
      v-model.trim="newLocation"
      type="text"
      placeholder="New York"
      required
      v-autofocus).add-location__input
    button(type="submit" :disabled="!newLocation").add-location__btn
</template>

<script>
import {
  mapActions,
  mapMutations,
} from 'vuex';

export default {
  directives: {
    autofocus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  computed: {
    newLocation: {
      get() {
        return this.$store.state.locations.newLocation;
      },
      set(value) {
        this.updateNewLocation(value);
      },
    },
  },
  methods: {
    ...mapActions({
      addLocation: 'locations/addLocation',
    }),
    ...mapMutations({
      updateNewLocation: 'locations/updateNewLocation',
    }),
  },
};
</script>

<style lang="scss" scoped>
.add-location {
  &__form {
    display: flex;
    align-items: center;
  }
  &__input {
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    border: 2px solid rgb(238, 233, 233);
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  &__btn {
    margin-left: 15px;
    border: none;
    background-color: transparent;
    width: 20px;
    height: 20px;
    background-position: center;
    background-size: cover;
    background-image: url('~@/assets/enter-icon.svg');
    &:disabled {
      opacity: 0.4;
    }
  }
}
</style>
