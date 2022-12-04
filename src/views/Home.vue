<template>
  <div class="home relative flex justify-center mx-auto bg-[#E5E5E5] w-full">
    <div class="w-[1000px] pt-10">
      <header class="flex justify-between items-center">
        <div class="text-4xl font-semibold">Activity</div>
        <button @click.stop="createActivity" class="bg-[#16ABF8] px-5 py-2.5 text-white rounded-3xl text-lg">
          <span class="font-semibold mr-1">+</span>
          <span>Tambah</span>
        </button>
      </header>
      <div class="mt-12">
        <div v-if="activities.data?.length<1"  class="w-[50%] flex mx-auto">
          <img 
            src="../assets/empty-activities.png"
            @click.stop="createActivity"
            class="cursor-pointer object-cover"
          >
        </div>
        <Activities v-else :activities="activities"/>
      </div>
    <DeleteModal/>
    <AlertModal/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapGetters, mapActions} from "vuex";
import Activities from "@/components/Activities";
import DeleteModal from "@/components/DeleteModal";
import AlertModal from "@/components/AlertModal";

export default {
  name: "Home",
  data(){
    return {
      loading: true,
    }
  },
  components:{
    Activities,
    DeleteModal,
    AlertModal,
  },
  computed: {
    ...mapGetters({
      activities: 'activities'
      })
  },
  methods: {
    ...mapActions({
      fetchActivities: 'fetchActivities',
      postActivity: 'postActivity'
      }),
    async createActivity(){
      await this.postActivity({
        title: "New Activity",
        email: 'nelsonlinux@ymail.com'
      });
      this.getActivities();
    },
    async getActivities() {
      this.loading = true;
      await this.fetchActivities();
      this.loading = false;

    }
  },
  mounted(){
    this.getActivities();
  }
};
</script>

<style scoped>
    .animate-spin{
      animation: spin 1s linear infinite;
    }
      

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
