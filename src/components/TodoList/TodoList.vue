<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task">
        <span>{{ task }}</span> <button @click="deleteTask(task)">x</button>
      </li>
    </ul>
    <input v-model="newTask" />
    <button @click="addTask">Add task</button>
  </div>
</template>

<script setup>
import { createEvent, createStore, sample, forward } from 'effector'
import {computed, ref} from 'vue'

const tasks = ref([])
const inputVal = ref('')




// input
const inputWrite = createEvent()
const clearInput = createEvent()
const $newTask = createStore('')
    .reset(clearInput)



$newTask.watch(data => {
  inputVal.value = data
})

const newTask = computed({
  get() {
    return inputVal.value
  },
  set(newValue) {
    inputWrite(newValue)
  }
})

// analog .on(inputWrite, (_, value) => value)
sample({
  clock: inputWrite,
  target: $newTask
})

// button add

// effect add Task
const addTaskEvt = createEvent()


const $tasks = createStore([])
    //.on(addTaskEvt, (tasks, task) => [...tasks, task ])

sample({
  clock: addTaskEvt,
  source: $tasks, // fo fn() sourceData
  target: $tasks, // where to write result fn()
  fn: (tasks, task) => [...tasks, task ]
})
const addTask = createEvent()



const submitForm = sample({
  clock: addTask,
  source: $newTask,
  target: addTaskEvt,
})

forward({
  from: submitForm,
  to: clearInput
})


// delete task
const deleteTask = createEvent()
sample({
  clock: deleteTask,
  target: $tasks,
  source: $tasks,
  fn: (sourceData, clockData) => {
    console.log({sourceData, clockData})
    const index = sourceData.indexOf(clockData);
    console.log(index)
    if (index > -1) {
      sourceData.splice(index, 1);
    }

    return [...sourceData]
  }
})


$tasks.watch(data => {
  console.log('data', data)
  tasks.value = data
})

</script>