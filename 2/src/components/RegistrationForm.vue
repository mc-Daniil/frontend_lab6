<script setup lang="ts">
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import BaseInput from './BaseInput.vue'

type RegistrationFormValues = {
  email: string
  password: string
}

const submittedData = ref<RegistrationFormValues | null>(null)

const { handleSubmit, meta, values } = useForm<RegistrationFormValues>({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup
        .string()
        .required('Поле email обязательно')
        .email('Введите корректный email')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Введите корректный email'),
      password: yup
        .string()
        .required('Поле password обязательно')
        .min(8, 'Пароль должен содержать не менее 8 символов')
    })
  ),
  initialValues: {
    email: '',
    password: ''
  }
})

const isSubmitDisabled = computed(() => {
  return !values.email || !values.password || !meta.value.valid
})

const onSubmit = handleSubmit((formValues) => {
  submittedData.value = formValues

  console.log(formValues)
})
</script>

<template>
  <section class="card">
    <h1>Регистрация</h1>

    <form class="form" @submit="onSubmit">
      <BaseInput
        name="email"
        label="Email"
        type="email"
        placeholder="example@mail.com"
      />

      <BaseInput
        name="password"
        label="Password"
        type="password"
        placeholder="Не менее 8 символов"
      />

      <button
        class="button"
        type="submit"
        :disabled="isSubmitDisabled"
      >
        Зарегистрироваться
      </button>
    </form>

    <div v-if="submittedData" class="result">
      <h2>Форма отправлена</h2>

      <pre>{{ submittedData }}</pre>
    </div>
  </section>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 420px;
  padding: 32px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

h1 {
  margin: 0 0 24px;
  font-size: 28px;
  font-weight: 400;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.button {
  margin-top: 8px;
  padding: 12px 18px;
  border: none;
  border-radius: 6px;
  background: #2f80ed;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.button:disabled {
  background: #a8c8f0;
  cursor: not-allowed;
}

.result {
  margin-top: 24px;
  padding: 16px;
  border-radius: 8px;
  background: #f2f6ff;
}

.result h2 {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 400;
}

pre {
  margin: 0;
  white-space: pre-wrap;
}
</style>