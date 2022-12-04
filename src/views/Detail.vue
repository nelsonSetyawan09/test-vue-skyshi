<template>
    <div class="detail flex justify-center mx-auto bg-[#E5E5E5] h-screen w-full" data-cy="detail">
        <div class="w-[1000px] pt-10" data-cy="detail-container">
            <div v-if="loading" class="mt-20" data-cy="detail-empty">... loading</div>
            <div v-else>
                <header class="flex justify-between items-center" data-cy="detail-header">
                    <div  class="flex gap-4 items-center">
                        <router-link to="/" data-cy="detail-link-home">
                            <i class="fa fa-chevron-left text-xl text-[#111111] font-semibold"></i>
                        </router-link>
                        <input 
                            type="text" 
                            ref="input-activity-title"
                            class="bg-[#E5E5E5] text-3xl focus:outline-0 border-b border-transparent focus:border-slate-900 text-[#111111] font-semibold" 
                            :value="activity.title"
                            @input="handleActivityTitle($event)"
                            data-cy="detail-todo-title"
                        >
                        <i 
                            class="fa fa-pencil text-xl text-[#A5A5A5] cursor-pointer" 
                            @click="$refs['input-activity-title'].focus()"
                            data-cy="details-todo-edit"
                        ></i>
                    </div>
                    <button 
                        @click.stop="showModal" 
                        class="bg-[#16ABF8] px-5 py-2.5 text-white rounded-3xl text-lg"
                        data-cy="detaill-btn-create-item"
                    >
                        <span class="font-semibold mr-1">+</span>
                        <span>Tambah</span>
                    </button>
                </header>

                <div class="flex justify-center mt-[60px]">
                    <img 
                        v-if="activity.todo_items?.length<1" 
                        src="../assets/empty-item.png"
                        @click="showModal"
                        class="cursor-pointer"
                        data-cy="detail-empty"
                    >
                    <Todos v-else :todos="activity.todo_items" />
                </div>
            </div>
        </div>
        <TodoModal />
        <DeleteModal/>
        <AlertModal/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Todos from "@/components/Todos";
import TodoModal from "@/components/TodoModal";
import DeleteModal from "@/components/DeleteModal";
import AlertModal from "@/components/AlertModal";

export default {
    name: "Detail",
	components: {
		Todos,
        TodoModal,
        DeleteModal,
        AlertModal,
	},
    data() {
        return {
            loading: true,
            timeout: null,
        };
    },
    computed: {
        ...mapGetters({
            activity: 'activity'
        }),
    },
    methods: {
        ...mapActions({
            fetchActivity: 'fetchActivity',
            updateActivity: 'updateActivity',
        }),
        async getActivityDetails() {
            this.loading = true;
            await this.fetchActivity(this.$route.params.id);
            this.loading = false;
        },
        handleActivityTitle(e) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.updateActivity({
                    id: this.$route.params.id,
                    data: {
                        title: e.target.value,
                    },
                });
            }, 500);
        },
        showModal() {
            this.$root.$emit('show-modal-todo', {
                type: 'create',
                data:{
                    activity_group_id: null,
                    id: null,
                    is_active: null,
                    priority: "",
                    title: "",
                },
            });
        },
    },
    mounted() {
        this.getActivityDetails();
    },
};
</script>
