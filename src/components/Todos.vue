<template>
    <div class="todos w-full space-y-2.5" data-cy="todos">
        <Todo v-for="todo in todos" :key="todo.id" :todo="todo"/>
    </div>
</template>

<script>
import Todo from "@/components/Todo";
export default {
    name: "Todos",
    components: {
        Todo,
    },
    props: {
        todos: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

