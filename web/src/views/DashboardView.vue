<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getMe } from '../api/auth';
import { listTasks, createTask } from '../api/task';
import { checkin, getStreak, todayCheckins } from '../api/checkin';

const user = ref<{ id: number; username: string } | null>(null);
const tasks = ref<any[]>([]);
const todayIds = ref<Set<number>>(new Set());
const streak = ref(0);
const newTitle = ref('');
const message = ref('');

async function load() {
  const [me, taskRes, todayRes, streakRes] = await Promise.all([
    getMe(),
    listTasks(),
    todayCheckins(),
    getStreak(),
  ]);
  user.value = me.data;
  tasks.value = taskRes.data;
  todayIds.value = new Set(todayRes.data.map((c: any) => c.taskId));
  streak.value = streakRes.data.streak;
}

async function addTask() {
  if (!newTitle.value.trim()) return;
  await createTask(newTitle.value);
  newTitle.value = '';
  await load();
}

async function doCheckin(taskId: number) {
  try {
    await checkin(taskId);
    message.value = '打卡成功';
    await load();
  } catch {
    message.value = '今日已打卡或任务不可用';
  }
}

onMounted(load);
</script>

<template>
  <div>
    <h1>你好，{{ user?.username }}</h1>
    <p>连续打卡：{{ streak }} 天</p>
    <p v-if="message">{{ message }}</p>

    <section>
      <h2>新建任务</h2>
      <input v-model="newTitle" placeholder="任务名称" />
      <button @click="addTask">添加</button>
    </section>

    <section>
      <h2>今日任务</h2>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          {{ task.title }}
          <button
            v-if="!todayIds.has(task.id)"
            @click="doCheckin(task.id)"
          >
            打卡
          </button>
          <span v-else>✓ 已完成</span>
        </li>
      </ul>
    </section>
  </div>
</template>