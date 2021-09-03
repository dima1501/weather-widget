<template lang="pug">
.popup(@click="setSettingsPopupState(false)")
  .popup__content(@click.stop)
    .popup__closer(@click="setSettingsPopupState(false)")
    slot(name="content")
</template>

<script>
import {
  mapMutations,
} from 'vuex';

export default {
  methods: {
    ...mapMutations({
      setSettingsPopupState: 'locations/setSettingsPopupState',
    }),
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  background-color: rgba(0,0,0,0.8);
  &__closer {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 14px;
    height: 14px;
    cursor: pointer;
    background-image: url('~@/assets/close-icon.svg');
    background-size: cover;
    background-position: center;
  }
  &__content {
    position: relative;
    background-color: #fff;
    margin: auto;
    padding: 30px 25px 25px;
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
  }
}
</style>
