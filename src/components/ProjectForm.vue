<template>
    <form @submit="handleSubmit">
        <label>Title:</label>
        <input v-model="title" type="text" required/>
        <label >Detail:</label>
        <textarea v-model="details" required></textarea>
        <button>Add Project</button>
    </form>
</template>

<script lang="ts">
import {Vue, Options} from "vue-class-component";
import ProjectModel from "@/model/ProjectModel";

@Options({
    props: {
        project: Object
    }
})
export default class ProjectForm extends Vue {
    title: string = '';
    details: string = '';
    project?: ProjectModel;

    created(){
        if(this.project) {
            this.title = this.project.title;
            this.details = this.project.details;
        }
    }

    handleSubmit(){
        this.$emit('edit-project', this.title, this.details);
        }
    }

</script>

<style scoped>

</style>
