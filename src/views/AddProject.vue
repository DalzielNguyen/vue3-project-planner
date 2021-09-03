<template>
    <ProjectForm @edit-project="handleSubmit"></ProjectForm>
</template>

<script lang="ts">
import { Vue, Options} from "vue-class-component";
import {mapActions} from "vuex";
import ProjectForm from "@/components/ProjectForm.vue";

@Options({
    components: {ProjectForm},
    methods: {
        ...mapActions("listProject", {addProject: "addProject"}),
    }
})

export default class AddProject extends Vue {
    addProject!: (path: {title: string, details: string}) => Promise<boolean>;

    async handleSubmit(title: string, details: string){
        const result: boolean = await this.addProject( {title: title, details: details});
        if (!result) {
            console.log("Add Project is Failed");
        }
    }
}
</script>
