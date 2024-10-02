<template>
  <div class="w-96 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
    <div class="text-2xl font-semibold text-gray-800 mb-2">{{ data.title }}</div>
    <div class="text-gray-600 mb-4">{{ data.description }}</div>
    <div class="text-sm text-gray-400 mb-2">Creado el: {{ formattedDate }}</div>
    <div class="text-sm text-gray-400 mb-4">Usuario: {{ data.user }}</div>
    
    <!-- Mostrar la imagen si existe -->
    <div v-if="data.image_path" class="mb-4">
      <img :src="data.image_path" alt="Imagen de la nota" class="w-full h-auto rounded">
    </div>

    <div class="flex flex-wrap gap-2">
      <span
        v-for="(label, index) in data.labels"
        :key="index"
        class="text-xs text-gray-700 bg-gray-200 py-1 px-3 rounded-full"
      >
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      description: '',
      created_at: '',
      user: '',
      labels: []
    })
  }
})

const formattedDate = computed(() => format(new Date(props.data.created_at), 'dd/MM/yyyy'))
</script>
