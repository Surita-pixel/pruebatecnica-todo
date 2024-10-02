import axios from 'axios';

const state = {
  user: null,
};

const getters = {
  isAuthenticated: (state) => {
    if (!state.user ){
      return false
    }else{
      return true
    }
  },
  getUser: (state) => state.user,
};

const actions = {
  async registrar({ commit }, userData) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', userData);
      commit('SET_USER', response.data.user);
      localStorage.setItem('token', response.data.token); // Guarda el token en localStorage
    } catch (error) {
      console.error('Error al registrar:', error);
      throw error;
    }
  },
  async login({ commit }, credentials) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
      const userResponse = await axios.get('http://127.0.0.1:8000/api/me', {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      commit('SET_USER', userResponse.data);
      localStorage.setItem('token', response.data.token); // Almacena el token en localStorage
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  },
  async checkAuth({ commit }) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Realiza una llamada a la API para obtener los datos del usuario
        const userResponse = await axios.get('http://127.0.0.1:8000/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        commit('SET_USER', userResponse.data);
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
        commit('SET_USER', null); // Si hay un error, se asegura de que el usuario sea nulo
        localStorage.removeItem('token'); // Elimina el token si hay un error
      }
    }
  },
  logout({ commit }) {
    commit('SET_USER', null);
    localStorage.removeItem('token'); // Limpia el token del almacenamiento
  },
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
