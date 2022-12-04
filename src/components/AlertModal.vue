<template>
    <b-modal 
        id="modal-alert" 
        centered
        @hidden="resetModal"
        :hide-footer="true"
        :hide-header="true"
    >
        <div class="flex items-end gap-3 font-semibold">
            <i class="fa fa-triangle-exclamation text-lg text-[#00A790]"></i>
            <div>
                <span v-if="isActivityOrTodo === 'activity'">Activity</span> 
                <span v-else>List Item</span>
                berhasil dihapus
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
    data() {
        return{
            isActivityOrTodo: 'activity',
        }
    },
    methods: {

        resetModal(){
            this.isActivityOrTodo= 'activity';
        },
        hideModal() {
            this.$root.$emit('bv::hide::modal', 'modal-alert')
        },
    },
    mounted(){
        this.$root.$on('show-modal-alert', data =>{
            this.isActivityOrTodo = data;
            this.$root.$emit('bv::show::modal', 'modal-alert');
        })
    }
}

</script>