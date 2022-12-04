<template>
  <div class="todo w-full flex gap-4 items-center p-6 bg-white rounded-xl">
    <div class="flex-none cursor-pointer">
      <b-form-checkbox
        id="checkbox-1"
        v-model="todo.is_active"
        name="checkbox-1"
        :value="0"
        :unchecked-value="1"
        @change="handleEditTodoActive"
      />
    </div>
    <div class="flex-1 flex items-center gap-4">
        <i class="fa fa-circle" :class="getColor(todo?.priority)"></i>
        <span :class="!todo.is_active ? 'line-through': ''">{{todo.title}}</span>
        <i class="fa fa-pencil text-[#A5A5A5] cursor-pointer opacity-90 hover:opacity-100" @click="editTodo"></i>
    </div>
    <div class="flex-none cursor-pointer" @click.stop="deleteTodo">
      <i class="fa fa-trash-can text-[#888888] opacity-70 hover:opacity-90"></i>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "Todo",
  props: {
   todo: {
    type: Object,
    default: () => {},
   },
  },
  data() {
      return {
        status: 'not_accepted'
      }
  },
  methods: {
      ...mapActions({
        updateTodo: 'updateTodo'
      }),
      getColor(priority) {
          if(priority === 'very-high'){
              return 'text-[#ED4C5C]'
          }else if(priority === 'high'){
              return 'text-[#F8A541]'
          }else if(priority === 'normal'){
              return 'text-[#00A790]'
          }else if(priority === 'low'){
              return 'text-[#428BC1]'
          }else{
              return 'text-[#8942C1]'
          }
      },
      editTodo() {
          this.$root.$emit('show-modal-todo', {
              type: 'edit',
              data: {...this.todo},
          })
      },
      deleteTodo() {
          this.$root.$emit('show-modal-delete', {
              type: 'todo',
              data: this.todo,
          })
      },
      handleEditTodoActive(){
        this.updateTodo({
            id: this.todo.id,
            data: {
                is_active: this.todo.is_active,
            }
        })
      }
  }
};
</script>

