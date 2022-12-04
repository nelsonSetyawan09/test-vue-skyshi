<template>
    <div class="activities grid md:grid-cols-2 lg:grid-cols-4 gap-4" data-cy="activities">
        <Activity v-for="activity in activities.data" :key="activity.id" :activity="activity"/>
    </div>
</template>

<script>
import Activity from "@/components/Activity";
export default {
    name: "Activities",
    components:{
        Activity,
    },
    props: {
        activities: {
            type: Object,
            default: () => {},
        },
    },
};
</script>
