<template>
  <div>
    <ul>
      <li :class="{classEditTask : task.id === newTest.id }" v-for="task in tasks" :key="task.id">
        <span @click="reviewTask(task.id)">{{ task.name }}</span>
        <button @click="deleteTask(task.id)">x</button>
      </li>
    </ul>
    <input v-model="newTest.name" />
    <button v-if="newTest.id === 0" @click="addTask()">Add task</button>
    <button v-else @click="editTask()">Edit task</button>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'

const newTest = reactive({ name: '', id: 0 })
const tasks = ref([])

function clearInput () {
  newTest.name = ''
  newTest.id = 0
}

function addTask() {
  tasks.value = [...tasks.value, {...newTest, id: new Date().getTime() }]
  clearInput()
}

function deleteTask(taskId) {
  tasks.value = [...tasks.value].filter(task => task.id !== taskId)
  clearInput()
}

function reviewTask(taskId) {
  for (const task of  tasks.value) {
    if (taskId === task.id ) {
      newTest.name = task.name
      newTest.id = task.id
    }
  }
}

function editTask() {
  const taskId = newTest.id
  const copy = tasks.value
  for (let task of  copy) {
    if (taskId === task.id ) {
      task.id = newTest.id
      task.name = newTest.name
    }
  }

  tasks.value = copy
  clearInput()
}
</script>

<style scoped>
.classEditTask {
  border: 1px solid red;
}
</style>