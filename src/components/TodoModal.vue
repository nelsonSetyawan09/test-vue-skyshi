<template>
    <b-modal 
        id="modal-todo" 
        centered
        :title="isCreateOrEdit === 'create' ? 'Tambah List Item' : 'Edit List Item'"
        size="lg"
        @hidden="resetModal"
    >
        <div class="d-block mt-9">
            <div class="text-sm mb-1 text-[#111111]">NAMA LIST ITEM</div>
            <b-form-input v-model="todo.title" placeholder="Tambahkan nama list item"></b-form-input>

            <div class="mt-6">
                <div class="text-sm mb-1 text-[#111111]">PRIORITY</div>
                <b-dropdown id="dropdown-1"  variant="light" no-caret  class="m-md-2 w-[160px] flex justify-between">
                    <template #button-content>
                        <div class="flex justify-between items-center">
                            <i class="fa fa-circle" :class="getColor(selectedPriority.code)"></i>
                            <span>{{selectedPriority.value}}</span>
                            <i class="fa fa-chevron-down "></i>
                        </div>
                    </template>
                    <b-dropdown-item 
                    v-for="priority in listPriority" 
                    :key="priority.code"
                    @click="selectedPriority=priority"
                >
                    <div class="flex items-center gap-2">
                        <i class="fa fa-circle" :class="getColor(priority.code)"></i>
                        <span>{{priority.value}}</span>
                        <i v-show="priority===selectedPriority.value" class="fa fa-check ml-auto" ></i>
                    </div>
                </b-dropdown-item>
                </b-dropdown>
                </div>
        </div>
        
        <template #modal-footer>
            <button 
                @click.stop="hideModal" 
                class="bg-[#16ABF8] w-[150px] py-2 text-white rounded-3xl flex justify-center items-center gap-2"
                :class="todo.title.length<1 ? 'cursor-not-allowed opacity-60': ''"
                :disabled="todo.title.length<1"
            >
                <b-spinner v-if="loading" small></b-spinner>
                <span>Simpan</span>
            </button>
        </template>
    </b-modal>
</template>

<script>
import {mapActions} from "vuex";
export default {
    data() {
        return{
            isCreateOrEdit: 'create',
            todo: {
                activity_group_id: null,
                id: null,
                is_active: null,
                priority: "",
                title: "",
            },
            selectedPriority:{value: 'Very High', code:'very-high' },
            listPriority:[
                {value: 'Very High', code:'very-high' },
                {value: 'High', code:'high' },
                {value: 'Medium', code:'normal' },
                {value: 'Low', code:'low' },
                {value: 'Very Low', code:'very-low' },
            ],
            loading: false,
        }
    },
    methods: {
        ...mapActions({
            postTodo: 'postTodo',
            fetchActivity: 'fetchActivity',
            updateTodo: 'updateTodo'
        }),
        async hideModal() {
            if (this.loading) return;
            this.loading = true;
            if(this.isCreateOrEdit === 'create') {
                await this.postTodo({
                    "activity_group_id": this.$route.params.id,
                    "title": this.todo.title,
                    "priority" : this.selectedPriority.code,
                });
            } else{
                await this.updateTodo({
                    id: this.todo.id,
                    data: {
                        title: this.todo.title,
                        priority:  this.selectedPriority.code,
                    }
                })
            }
            this.loading = false;
            this.fetchActivity(this.$route.params.id);
            this.$root.$emit('bv::hide::modal', 'modal-todo')
        },
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
        resetModal(){
            this.isCreateOrEdit= 'create';
            this.todo= {
                activity_group_id: null,
                id: null,
                is_active: null,
                priority: "",
                title: "",
            },
            this.selectedPriority ={value: 'Very High', code:'very-high' };
            this.loading = false;
        }

    },
    mounted(){
        this.$root.$on('show-modal-todo', todo =>{
            this.isCreateOrEdit = todo.type;
            this.todo = todo.data;
            if (todo.type === 'edit') {
                this.selectedPriority = this.listPriority.filter(priority => priority.code === todo.data.priority)[0]
                console.log()
            }
            this.$root.$emit('bv::show::modal', 'modal-todo');
        })
    }
}

</script>