<template>
  <div>
    <h2>Without effect</h2>
    <ul>
      <li :class="{classEditTask : task.id === newTask.id }" v-for="task in tasks" :key="task.id">
        <span @click="reviewTask(task.id)">{{ task.name }}</span>
        <button @click="deleteTask(task.id)">x</button>
      </li>
    </ul>
    <input v-model="newTask.name" />
    <button v-if="newTask.id === 0" @click="addTask()">Add task</button>
    <button v-else @click="editTask()">Edit task</button>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'

const newTask = reactive({ name: '', id: 0 })
const tasks = ref([])

function clearInput () {
  newTask.name = ''
  newTask.id = 0
}

function addTask() {
  tasks.value = [...tasks.value, {...newTask, id: new Date().getTime() }]
  clearInput()
}

function deleteTask(taskId) {
  tasks.value = [...tasks.value].filter(task => task.id !== taskId)
  clearInput()
}

function reviewTask(taskId) {
  for (const task of  tasks.value) {
    if (taskId === task.id ) {
      newTask.name = task.name
      newTask.id = task.id
    }
  }
}

function editTask() {
  const taskId = newTask.id
  const copy = tasks.value
  for (let task of  copy) {
    if (taskId === task.id ) {
      task.id = newTask.id
      task.name = newTask.name
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