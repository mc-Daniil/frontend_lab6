<script setup lang="ts">
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import BaseInput from './BaseInput.vue'
import BaseCheckbox from './BaseCheckbox.vue'
import LicenseModal from './LicenseModal.vue'

type RegistrationFormValues = {
  email: string
  password: string
  agreement: boolean
}

const submittedData = ref<RegistrationFormValues | null>(null)
const isLicenseOpen = ref(false)

const licenseText = 'Приминая условия лицензии, вы соглашаетесь на рабский труд на 100 лет'

const { handleSubmit, meta, values } = useForm<RegistrationFormValues>({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup
        .string()
        .required('Поле email обязательно')
        .email('Введите корректный email'),

      password: yup
        .string()
        .required('Поле password обязательно')
        .min(8, 'Пароль должен содержать не менее 8 символов')
        .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
        .matches(/\p{Ll}/u, 'Пароль должен содержать хотя бы одну строчную букву')
        .matches(/\p{Lu}/u, 'Пароль должен содержать хотя бы одну заглавную букву')
        .matches(
          /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
          'Пароль должен содержать хотя бы один спецсимвол'
        ),

      agreement: yup
        .boolean()
        .oneOf([true], 'Необходимо принять лицензионное соглашение')
        .required('Необходимо принять лицензионное соглашение')
    })
  ),
  initialValues: {
    email: '',
    password: '',
    agreement: false
  }
})

const passwordCriteria = computed(() => {
  const password = values.password || ''

  return [
    {
      text: 'Длина не менее 8',
      done: password.length >= 8
    },
    {
      text: 'Цифры',
      done: /\d/.test(password)
    },
    {
      text: 'Буквы нижнего регистра',
      done: /\p{Ll}/u.test(password)
    },
    {
      text: 'Буквы верхнего регистра',
      done: /\p{Lu}/u.test(password)
    },
    {
      text: 'Спецсимволы',
      done: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    }
  ]
})

const showPasswordCriteria = computed(() => {
  return values.password.length > 0
})

const isSubmitDisabled = computed(() => {
  return !values.email || !values.password || !values.agreement || !meta.value.valid
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

      <div class="password-row">
        <div class="password-input">
          <BaseInput
            name="password"
            label="Password"
            type="password"
            placeholder="Не менее 8 символов"
          />
        </div>

        <ul
            v-if="showPasswordCriteria"
            class="criteria-list"
        >
            <li
                v-for="criterion in passwordCriteria"
                :key="criterion.text"
                :class="{
                done: criterion.done,
                failed: !criterion.done
                }"
            >
                {{ criterion.text }}
            </li>
        </ul>
      </div>

      <BaseCheckbox name="agreement">
        I agree with
        <button
          class="license-link"
          type="button"
          @click="isLicenseOpen = true"
        >
          license agreement
        </button>
      </BaseCheckbox>

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

    <LicenseModal
      v-if="isLicenseOpen"
      :text="licenseText"
      @close="isLicenseOpen = false"
    />
  </section>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 700px;
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

.password-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.password-input {
  flex: 1;
}

.criteria-list {
  min-width: 230px;
  margin: 24px 0 0;
  padding-left: 20px;
  font-size: 14px;
}

.criteria-list li {
  margin-bottom: 8px;
  font-weight: 600;
}

.done {
  color: #00c853;
}

.failed {
  color: #ff0000;
}

.license-link {
  padding: 0;
  border: none;
  background: transparent;
  color: #2f80ed;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
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

@media (max-width: 640px) {
  .password-row {
    flex-direction: column;
    gap: 12px;
  }

  .criteria-list {
    margin-top: 0;
  }
}
</style>