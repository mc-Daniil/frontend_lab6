<script setup lang="ts">
import { useField } from 'vee-validate'

type Props = {
  name: string
}

const props = defineProps<Props>()

const { checked, errorMessage, handleChange, handleBlur } = useField<boolean>(
  () => props.name,
  undefined,
  {
    type: 'checkbox',
    checkedValue: true,
    uncheckedValue: false
  }
)
</script>

<template>
  <div class="checkbox-field">
    <label class="checkbox-label">
      <input
        :name="name"
        type="checkbox"
        :checked="checked"
        @change="handleChange"
        @blur="handleBlur"
      />

      <span>
        <slot />
      </span>
    </label>

    <span v-if="errorMessage" class="error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped>
.checkbox-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: #333;
}

input {
  margin-top: 2px;
}

.error {
  font-size: 13px;
  color: #ff0000;
}
</style>