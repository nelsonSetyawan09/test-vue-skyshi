import axios from 'axios';
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activities: {},
    activity: {},
    todos: [],
  },
  getters: {
    activities: state => state.activities,
    activity: state => state.activity,
    todos: state => state.todos,
  },
  mutations: {
    setActivities: (state, activities) => state.activities = activities,
    setActivity: (state, activity) => state.activity = activity,
    setTodos: (state, todos) => state.todos = todos,
  },
  actions: {
    async fetchActivities({commit}) {
      const response = await axios.get('https://todo.api.devcode.gethired.id/activity-groups?email=nelsonlinux@ymail.com');
      const data = response.data;
      commit('setActivities', data);
    },
    async postActivity(ctx, obj) {
      await axios.post('https://todo.api.devcode.gethired.id/activity-groups',obj);
    },
    async fetchActivity({commit}, id) {
      const response = await axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`);
      const data = response.data;
      commit('setActivity', data);
    },
    async updateActivity(ctx, obj) {
      await axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${obj.id}`,obj.data);
    },
    async postTodo(ctx, obj) {
      await axios.post('https://todo.api.devcode.gethired.id/todo-items',obj);
    },
    async updateTodo(ctx, obj) {
      await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${obj.id}`,obj.data);
    },
    async deleteActivity(ctx, id) {
      await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`);
    },
    async deleteTodo(ctx, id){
      await axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${id}`);
    }
  },
  modules: {},
});
