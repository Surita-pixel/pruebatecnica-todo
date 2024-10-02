<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6 sm:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 shadow-lg rounded-lg">
      <div>
        <h2 class="text-center text-3xl font-bold text-gray-900">
          Crea tu cuenta
        </h2>
      </div>
      <form class="space-y-6" @submit.prevent="manejarRegistro">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input id="name" name="name" type="text" autocomplete="name" required
              class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Nombre completo" v-model="nombre" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input id="email" name="email" type="email" autocomplete="email" required
              class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Correo electrónico" v-model="email" />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input id="password" name="password" type="password" autocomplete="new-password" required
              class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Contraseña" v-model="password" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="w-full py-3 px-4 border border-transparent text-white font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const nombre = ref('');
const email = ref('');
const password = ref('');

const manejarRegistro = async () => {
  try {
    await store.dispatch('registrar', {
      name: nombre.value,
      email: email.value,
      password: password.value,
    });
    router.push('/login'); // Redirigir después del registro
  } catch (error) {
    console.error('Error al registrarse:', error);
  }
};
</script>
