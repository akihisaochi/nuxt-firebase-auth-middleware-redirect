<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton
        @click="$router.push('/admin/new-post')"
      >
        Create Posts
      </AppButton>
      <AppButton
        @click="onLogout"
      >
        Logout
      </AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <PostLists is-admin :posts="loadedPosts" />
    </section>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: ['auth'],
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  },
  methods: {
    onLogout() {
      this.$store.commit('clearToken')
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less" scoped>
.admin-page {
  padding: 20px;
}
.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
