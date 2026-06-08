<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../api/auth';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');

async function onSubmit() {
  try {
    const { data } = await login(username.value, password.value);
    localStorage.setItem('accessToken', data.accessToken);
    router.push('/');
  } catch {
    error.value = '登录失败';
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h1>登录</h1>
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />
    <button type="submit">登录</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>