<template>
  <div class="hello">
    <div>
      <div>Статус: {{ status }}</div>
    </div>
    <div>
       Текущий пост: {{ currentPost }}
    </div>
    <div>
      <div>Комментарии:</div>
      <div v-for="comment in comments" :key="comment.id">
        {{ comment}}
      </div>
    </div>
    <button @click="nextPost">Загрузка</button>
  </div>
</template>

<script setup>
import { $postComments, $status, $currentPost, nextPost } from './state'
import { ref } from 'vue'

const status = ref('')
const comments = ref([])
const currentPost = ref(0)

$postComments.watch(data => {
  comments.value = data
})

$status.watch(data => {
  status.value = data
})

$currentPost.watch(data => {
  currentPost.value = data
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
