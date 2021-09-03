<template lang="pug">
.settings
  .settings__section
    .settings__section-title Settings
    LocationsPreviewList
  .settings__section
    .settings__section-title Add location
    AddLocationForm
</template>

<script>
import LocationsPreviewList from '@/components/LocationsPreviewList.vue';
import AddLocationForm from '@/components/AddLocationForm.vue';

export default {
  components: {
    LocationsPreviewList,
    AddLocationForm,
  },
};
</script>

<style lang="scss" scoped>
.settings {
  &__section {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    &-title {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
}
</style>
