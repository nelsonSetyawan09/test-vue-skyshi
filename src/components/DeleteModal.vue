<template>
    <b-modal 
        id="modal-delete" 
        centered
        @hidden="resetModal"
        :hide-footer="true"
        :hide-header="true"
    >
        <div class="mt-2 flex flex-col items-center gap-3 p-4" data-cy="modal-delete-activity-todo">
            <div class="text-sm mb-1 text-[#ED4C5C]">
                <i class="fa fa-triangle-exclamation text-6xl"></i>
            </div>
            <div class="flex flex-col items-center">
                <div data-cy="modal-delete-description">Apakah anda yakin menghapus 
                    <span v-if="isActivityOrTodo === 'activity'">activity</span> 
                    <span v-else>List item</span>
                </div>
                <div class="font-semibold" data-cy="modal-delete-title">"{{ data.title }}"?</div>
            </div>
            <div class="flex gap-4 mt-3">
                <button @click.stop="hideModal" class="bg-[#F4F4F4] w-[150px] py-2 text-[#4A4A4A] rounded-3xl text-lg">
                    <span>Batal</span>
                </button>
                <button 
                    @click.stop="deleteData" class="bg-[#ED4C5C] w-[150px] px-4 py-2 text-white rounded-3xl text-lg"
                    data-cy="modal-btn-delete"
                >
                    <b-spinner v-if="loading" small></b-spinner>
                    <span class="ml-2">Hapus</span>
                </button>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return{
            isActivityOrTodo: 'activity',
            data: {},
            loading: false,
        };
    },
    methods: {
        ...mapActions({
            deleteActivity: 'deleteActivity',
            deleteTodo: 'deleteTodo',
            fetchActivities: 'fetchActivities',
            fetchActivity: 'fetchActivity',
        }),
        resetModal() {
            this.isActivityOrTodo = 'activity';
            this.data = {};
            this.loading = false;
        },
        hideModal() {
            this.$root.$emit('bv::hide::modal', 'modal-delete')
        },
        async deleteData() {
            if (this.loading) return;
            this.loading = true;
            if (this.isActivityOrTodo === 'activity') {
                await this.deleteActivity(this.data.id);
                this.$root.$emit('show-modal-alert', 'activity')
                this.fetchActivities();
            } else {
                await this.deleteTodo(this.data.id);
                this.$root.$emit('show-modal-alert', 'todo')
                this.fetchActivity(this.data.activity_group_id)
            };
            this.loading = false;
            this.hideModal();
        }
    },
    mounted(){
        this.$root.$on('show-modal-delete', data => {
            this.isActivityOrTodo = data.type;
            this.data = data.data;
            this.$root.$emit('bv::show::modal', 'modal-delete');
        });
    }
}

</script>