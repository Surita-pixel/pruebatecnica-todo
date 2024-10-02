<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6 sm:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 shadow-lg rounded-lg">
      <div>
        <h2 class="text-center text-3xl font-bold text-gray-900">
          Inicia sesión en tu cuenta
        </h2>
      </div>
      <form class="space-y-6" @submit.prevent="manejarInicioSesion">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">Correo electrónico</label>
            <input id="email" name="email" type="email" autocomplete="email" required
              class="rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-t-md focus:outline-none  focus:z-10 sm:text-sm"
              placeholder="Correo electrónico" v-model="email" />
          </div>
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-b-md focus:outline-none  focus:z-10 sm:text-sm"
              placeholder="Contraseña" v-model="password" />
          </div>

        </div>

        <div>
          <button type="submit"
            class="w-full py-3 px-4 border border-transparent text-white font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Iniciar sesión
          </button>
        </div>
      </form>

      <div class="text-center mt-4">
        <router-link to="/register" class="text-indigo-600 hover:text-indigo-500">
          ¿No tienes una cuenta? Regístrate
        </router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const manejarInicioSesion = async () => {
  try {
    await store.dispatch('login', {
      email: email.value,
      password: password.value
    })
    router.push('/')
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
  }
}
</script>
