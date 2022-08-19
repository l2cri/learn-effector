<template>
  <div>
    <post-comments />
    <todo-list />
  </div>
</template>

<script>
import PostComments from './components/PostComments/PostComments.vue'
import TodoList from './components/TodoList/TodoList.vue'

export default {
  name: 'App',
  components: {
    PostComments,
    TodoList,
  }
}
</script>

<style>
</style>
