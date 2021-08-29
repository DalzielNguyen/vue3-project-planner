<template>
  <div class="home">
      <div v-if="projects.length">
          <div v-for="project in projects" :key="project.id">
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
@Options({
    components: {
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
    fetchData!: () => Promise<boolean>;

    async created() {
        const result = await this.fetchData();
        if (!result) {
            console.log("err");
        }
    }
}
</script>
