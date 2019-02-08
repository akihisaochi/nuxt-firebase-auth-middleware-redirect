<template>
  <div class="post-page">
    <PostLists :posts="loadedPosts" />
  </div>
</template>
<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>

<style lang="less" scoped>
.post-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
