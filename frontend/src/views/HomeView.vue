<template>
  <div class="max-w-7xl mx-auto mt-5">
    <h1 class="text-center text-2xl font-bold">Bienvenido, {{ userName }}!</h1>
    <div class="flex justify-between mb-4">
      <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Crear Nueva Nota
      </button>
      <button v-if="isAuthenticated" @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
        Cerrar Sesión
      </button>
    </div>

    <!-- Modal para crear o editar nota -->
    <div v-if="showModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div class="bg-white p-5 rounded-lg shadow-xl w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">{{ editMode ? 'Editar Nota' : 'Crear Nueva Nota' }}</h2>
        <form @submit.prevent="createOrUpdateNote">
          <div class="mb-3">
            <label for="titulo" class="block text-gray-700 font-medium mb-2">Título</label>
            <input v-model="newNote.title" id="titulo" class="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Título" required>
          </div>
          <div class="mb-3">
            <label for="descripcion" class="block text-gray-700 font-medium mb-2">Descripción</label>
            <textarea v-model="newNote.description" id="descripcion"
              class="w-full p-2 border border-gray-300 rounded text-black" placeholder="Descripción"
              rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="etiquetas" class="block text-gray-700 font-medium mb-2">Etiquetas</label>
            <input v-model="newNote.labels" id="etiquetas" class="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Etiquetas (separadas por coma)">
          </div>
          <div class="mb-3">
            <label for="image_path" class="block text-gray-700 font-medium mb-2">Seleccionar Imagen</label>
            <input type="file" @change="handleFileUpload" class="w-full p-2 border border-gray-300 rounded text-black"
              accept="image/*" >
          </div>

          <div class="mb-3">
            <label for="expiration_date" class="block text-gray-700 font-medium mb-2">Fecha de Expiración</label>
            <input v-model="newNote.expiration_date" type="date" id="expiration_date"
              class="w-full p-2 border border-gray-300 rounded text-black" placeholder="Fecha de expiración">
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal"
              class="bg-gray-300 text-black px-4 py-2 rounded mr-2 hover:bg-gray-400">
              Cancelar
            </button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              {{ editMode ? 'Actualizar Nota' : 'Crear Nota' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Lista de notas en un grid de 3 columnas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="nota in notas" :key="nota.id" class="bg-white shadow-md rounded-lg p-4">
        <TarjetaTareas :data="{
          title: nota.title,
          description: nota.description,
          created_at: nota.created_at,
          user: userName,
          labels: nota.labels ? nota.labels.split(',') : [],
          image_path: nota.image_path,
          expiration_date: nota.expiration_date
        }" />
        <div class="flex justify-between mt-3">
          <button @click="editNote(nota)" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Editar
          </button>
          <button @click="deleteNote(nota.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import TarjetaTareas from '../components/TarjetaTareas.vue';

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters.getUser);
const userName = computed(() => (user.value ? user.value.name : 'Usuario'));
const isAuthenticated = computed(() => !!user.value);

const notas = computed(() => store.state.notas.notas);

const newNote = ref({
  title: '',
  description: '',
  labels: '',
  image_path: '',
  expiration_date: ''
});

const showModal = ref(false);
const editMode = ref(false); // Estado para saber si estamos en modo de edición

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  newNote.value = {
    title: '',
    description: '',
    labels: '',
    image_path: '',
    expiration_date: ''
  };
  editMode.value = false; // Resetear el modo de edición
};

const logout = async () => {
  await store.dispatch('logout');
  if (!store.getters.getUser) {
    router.push('/login');
  }
};
const createOrUpdateNote = async () => {
  try {
    const notaData = {
      title: newNote.value.title,
      description: newNote.value.description,
      labels: newNote.value.labels,
      expiration_date: newNote.value.expiration_date
    };

    // Solo asignar image_path si tiene un valor
    if (newNote.value.image_path) {
      notaData.image_path = newNote.value.image_path;
    }

    if (editMode.value) {
      // Lógica para actualizar nota
      await store.dispatch('notas/updateNota', {
        id: newNote.value.id,
        notaData
      });
    } else {
      // Lógica para crear nueva nota
      await store.dispatch('notas/createNota', notaData);
    }
    closeModal();
  } catch (error) {
    console.error('Error al crear o actualizar nota:', error);
  }
};


const editNote = (nota) => {
  newNote.value = { ...nota }; // This should include the id
  editMode.value = true;
  openModal();
};
const deleteNote = async (id) => {
  try {
    await store.dispatch('notas/deleteNota', id);
  } catch (error) {
    console.error('Error al eliminar nota:', error);
  }
};
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 10 * 1024 * 1024) { // Verifica que no exceda 10MB
            alert('El archivo debe ser menor de 10MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            newNote.value.image_path = e.target.result; // Asigna la imagen en Base64 a newNote
            console.log('este es el base64', newNote.value.image_path)
        };
        reader.readAsDataURL(file); // Lee el archivo como URL de datos (Base64)
    }
};

onMounted(async () => {
  if (isAuthenticated.value) {
    try {
      await store.dispatch('notas/fetchNotas');
    } catch (error) {
      console.error('Error al cargar notas:', error);
    }
  }
});
</script>
