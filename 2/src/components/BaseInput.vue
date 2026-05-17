<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'

type Props = {
  name: string
  label: string
  type?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: ''
})

const { value, errorMessage, handleChange, handleBlur, meta } = useField<string>(() => props.name)

const isFilled = computed(() => {
  return String(value.value || '').trim().length > 0
})

const inputClasses = computed(() => {
  return {
    invalid: isFilled.value && !meta.valid,
    valid: isFilled.value && meta.valid
  }
})
</script>

<template>
  <div class="field">
    <label :for="name">
      {{ label }}
    </label>

    <input
      :id="name"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :class="inputClasses"
      @input="handleChange"
      @blur="handleBlur"
    />

    <span v-if="errorMessage" class="error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 14px;
  color: #333;
}

input {
  padding: 10px 12px;
  border: 2px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
}

input:focus {
  outline: none;
}

.invalid {
  border: 2px solid #ff0000;
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.18);
}

.valid {
  border: 2px solid #00c853;
  box-shadow: 0 0 0 3px rgba(0, 200, 83, 0.18);
}

.error {
  font-size: 13px;
  color: #ff0000;
}
</style>