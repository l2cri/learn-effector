<template>
  <div>
    <post-comments />
    <todo-list />
    <todo-list-state-less />
  </div>
</template>

<script>
import PostComments from './components/PostComments/PostComments.vue'
import TodoList from './components/TodoList/TodoList.vue'
import TodoListStateLess from './components/TodoListStateLess/TodoListStateLess.vue'

export default {
  name: 'App',
  components: {
    PostComments,
    TodoList,
    TodoListStateLess,
  }
}
</script>

<style>
</style>
