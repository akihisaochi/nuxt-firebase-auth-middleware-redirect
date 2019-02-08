<template>
  <ul class="post-list">
    <li>
      <PostPreview
        v-for="post in posts"
        :id="String(post.id)"
        :key="post.id"
        :title="post.title"
        :preview-text="post.previewText"
        :thumbnail="post.thumbnail"
        :is-admin="isAdmin"
      />
    </li>
  </ul>
</template>
<script>
import PostPreview from '@/components/Posts/PostPreview.vue'
export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
.post-list {
  width: 100%;
  padding: 20px;
}
</style>
