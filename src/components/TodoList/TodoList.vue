<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span @click="reviewTask(task.id)">{{ task.name }}</span>
        <button @click="deleteTask(task.id)">x</button>
      </li>
    </ul>
    <input :ref="elInput" @input="inputEvt" :value="inputVal" />
    <button v-if="editTaskId === 0" @click="addTask()">Add task</button>
    <button v-else @click="editTask()">Edit task</button>
  </div>
</template>

<script setup>
import {createEvent, createStore, sample, forward} from 'effector'
import {ref} from 'vue'

const tasks = ref([])
const inputVal = ref('')
const elInput = ref(null)
const editTaskId = ref(0)

// effect add Task
const addTaskEvt = createEvent()
const deleteTask = createEvent()
const reviewTask = createEvent()
const editTask = createEvent()

// input
const inputEvt = createEvent()
const inputSet = createEvent()
const clearInput = createEvent()

const $newTask = createStore('')
    .on(inputEvt, (_, evt) => evt.target.value)
    .on(inputSet, (_, value) => value)
    .reset(clearInput)

$newTask.watch(data => {
  inputVal.value = data
})

// add task
const addTask = createEvent()
const $tasks = createStore([])
    .on(addTaskEvt, (tasks, task) => {
      return [...tasks, { name: task, id: new Date().getTime() } ]
    })
    .on(deleteTask, (tasks, taskId) => {
      return [...tasks].filter(task => task.id !== taskId)
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

// find and set task to input
sample({
  clock: reviewTask,
  source: $tasks,
  fn: (sourceData, clockData) => {
    for (const task of sourceData) {
      if (clockData === task.id ) {
        return task.name
      }
    }
  },
  target: inputSet
})

$tasks.watch(data => {
  console.log('data', data)
  tasks.value = data
})

</script>