import axios from 'axios';

const state = {
  notas: [],
  currentNota: null,
};

const getters = {
  getAllNotas: (state) => state.notas,
  getCurrentNota: (state) => state.currentNota,
};

const actions = {
  async fetchNotas({ commit, rootState }) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notas', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      commit('SET_NOTAS', response.data);
    } catch (error) {
      console.error('Error al obtener notas:', error);
      throw error;
    }
  },

  async createNota({ commit, rootState }, notaData) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/notas', notaData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      commit('ADD_NOTA', response.data);
    } catch (error) {
      console.error('Error al crear nota:', error);
      throw error;
    }
  },

  async updateNota({ commit, rootState }, { id, notaData }) {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/notas/${id}`, notaData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      commit('UPDATE_NOTA', response.data);
    } catch (error) {
      console.error('Error al actualizar nota:', error);
      throw error;
    }
  },

  async deleteNota({ commit, rootState }, id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/notas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      commit('DELETE_NOTA', id);
    } catch (error) {
      console.error('Error al eliminar nota:', error);
      throw error;
    }
  },

  async fetchNota({ commit, rootState }, id) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/notas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      commit('SET_CURRENT_NOTA', response.data);
    } catch (error) {
      console.error('Error al obtener nota:', error);
      throw error;
    }
  },
};

const mutations = {
  SET_NOTAS(state, notas) {
    state.notas = notas;
  },
  ADD_NOTA(state, nota) {
    state.notas.push(nota);
  },
  UPDATE_NOTA(state, updatedNota) {
    const index = state.notas.findIndex(nota => nota.id === updatedNota.id);
    if (index !== -1) {
      state.notas.splice(index, 1, updatedNota);
    }
  },
  DELETE_NOTA(state, id) {
    state.notas = state.notas.filter(nota => nota.id !== id);
  },
  SET_CURRENT_NOTA(state, nota) {
    state.currentNota = nota;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};