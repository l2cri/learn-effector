<template>
  <div>
    <h2>With effect</h2>
    <ul>
      <li :class="{classEditTask : task.id === newTask.id }" v-for="task in tasks" :key="task.id">
        <span @click="reviewTask(task.id)">{{ task.name }}</span>
        <button @click="deleteTask(task.id)">x</button>
      </li>
    </ul>
    <input :value="newTask.name" @input="inputEvt" />
    <button v-if="newTask.id === 0" @click="addTask">Add task</button>
    <button v-else @click="editTask">Edit task</button>
  </div>
</template>

<script setup>
import {reactive, ref } from 'vue'
import {createStore, createEvent, sample, forward } from 'effector'

const newTask = reactive({ name: '', id: 0 })
const tasks = ref([])

const addTask = createEvent()
const inputEvt = createEvent()
const newTaskSet = createEvent()
const addTaskEvt = createEvent()
const clearInput = createEvent()
const reviewTask = createEvent()
const editTask = createEvent()
const editTaskEvt = createEvent()
const deleteTask = createEvent()

const $newTask = createStore({ name: '', id: 0 })
    .on(inputEvt, (state, evt) => ({ ...state, name: evt.target.value }))
    .on(newTaskSet, (state, { name, id }) => ({ ...state, name, id }))
    .reset(clearInput)

const $tasks = createStore([])
    .on(addTaskEvt, (tasks, newTask) => {
      return [...tasks, { name: newTask.name, id: new Date().getTime() } ]
    })
    .on(deleteTask, (tasks, taskId) => {
      return [...tasks].filter(task => task.id !== taskId)
    })
    .on(editTaskEvt, (tasks, newTask) => {
      const taskId = newTask.id
      const copy = [ ...tasks]
      for (let task of  copy) {
        if (taskId === task.id ) {
          task.id = newTask.id
          task.name = newTask.name
        }
      }

      return copy
    })

const resultEditTask = sample({
  clock: editTask,
  source: $newTask,
  target: editTaskEvt,
})

const resultAddTask = sample({
  clock: addTask,
  source: $newTask,
  target: addTaskEvt,
})

forward({
  from: resultAddTask,
  to: clearInput
})

forward({
  from: resultEditTask,
  to: clearInput
})

forward({
  from: deleteTask,
  to: clearInput
})


$newTask.watch(data => {
  newTask.name = data.name
  newTask.id = data.id
})

$tasks.watch(data => {
  tasks.value = data
})

sample({
  clock: reviewTask,
  source: $tasks,
  fn: (sourceData, clockData) => {
    for (const task of sourceData) {
      if (clockData === task.id ) {
        return task
      }
    }
  },
  target: newTaskSet
})
</script>

<style scoped>
.classEditTask {
  border: 1px solid red;
}
</style>