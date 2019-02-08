<template>
  <form @submit.prevent="onSave">
    <AppControlInput
      v-model="editedPost.author"
    >
      Author Name
    </AppControlInput>
    <AppControlInput
      v-model="editedPost.title"
    >
      Title
    </AppControlInput>
    <AppControlInput
      v-model="editedPost.thumbnail"
    >
      thumbnail
    </AppControlInput>
    <AppControlInput
      v-model="editedPost.content"
      control-type="textarea"
    >
      Content
    </AppControlInput>
    <AppControlInput
      v-model="editedPost.previewText"
      control-type="textarea"
    >
      previewText
    </AppControlInput>
    <AppButton
      type="submit"
    >
      Save
    </AppButton>
    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
    >
      Cancel
    </AppButton>
  </form>
</template>
<script>
import AppControlInput from '@/components/UI/AppControlInput.vue'
import AppButton from '@/components/UI/AppButton.vue'
export default {
  components: {
    AppButton,
    AppControlInput
  },
  props: {
    // eslint-disable-next-line
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: '',
            title: '',
            thumbnail: '',
            content: '',
            previewText: ''
          }
    }
  },
  methods: {
    onSave() {
      // Save the post
      this.$emit('submit', this.editedPost)
    },
    onCancel() {
      // navigate back
      this.$router.push('/admin/')
    }
  }
}
</script>
