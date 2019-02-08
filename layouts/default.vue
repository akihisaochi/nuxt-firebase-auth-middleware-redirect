<template>
  <div class="app">
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <TheSidenav
      :show="displaySidenav"
      @close="displaySidenav = false"
    />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '~/components/Navigation/TheHeader.vue'
import TheSidenav from '@/components/Navigation/TheSidenav'
export default {
  components: {
    TheHeader,
    TheSidenav
  },
  data() {
    return {
      displaySidenav: false
    }
  }
}
</script>
