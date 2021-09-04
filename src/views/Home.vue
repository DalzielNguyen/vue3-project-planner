<template>
  <div class="home">
      <div v-if="projects.length">
          <FilterNav @filter="current = $event" :current="current"/>
          <div v-for="project in filteredProject" :key="project.id">
              <ProjectInformation :project="project"></ProjectInformation>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {mapActions, mapState} from "vuex";
import ProjectModel from "@/model/ProjectModel";
import ProjectInformation from "@/components/ProjectInformation.vue";
import FilterNav from "@/components/FilterNav.vue";
@Options({
    components: {
        FilterNav,
        ProjectInformation
    },
    computed: {
        ...mapState("listProject", {projects:"projects"}),
    },
    methods: {
        ...mapActions("listProject", {fetchData: "fetchData"}),
    }
})

export default class Home extends Vue {
    projects!: ProjectModel[];
    current: string = 'all';
    fetchData!: () => Promise<boolean>;

    async created() {
        const result = await this.fetchData();
        if (!result) {
            console.log("err");
        }
    }

    get filteredProject() {
        switch (this.current){
            case "completed":
                return this.projects.filter((project: ProjectModel) => project.complete);
            case "ongoing":
                return this.projects.filter((project: ProjectModel) => !project.complete);
            default:
                return this.projects

        }
    }
}
</script>
