<template>
    <router-link 
        tag="li" 
        :to="`/detail/${activity.id}`"
        class="activity w-full h-[235px] rounded-xl bg-white flex flex-col justify-between py-5 px-7 cursor-pointer"
    >
        <div class="mr-auto">
            {{activity.title}}
        </div>
        <div class="flex justify-between">
            <span>{{getDate}}</span>
            <button class="flex-none cursor-pointer" @click.stop="deleteActivity">
                <i class="fa fa-trash-can text-[#888888] opacity-70 hover:opacity-90"></i>
            </button>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "Activity",
    props: {
        activity: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        getDate() {
            if(!this.activity?.created_at) return ''
            return new Date(this.activity.created_at).toLocaleDateString('en-IN', {day: 'numeric',month: "long", year: 'numeric'})
        }
    },
    methods: {
        deleteActivity() {
            this.$root.$emit('show-modal-delete', {
            type: 'activity',
            data: this.activity,
            })
        }
    }
};
</script>


<style scoped>

</style>
