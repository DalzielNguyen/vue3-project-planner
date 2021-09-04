<template>
    <form @submit.prevent="handleSubmit">
        <label>Title:</label>
        <input v-model="title" type="text" required/>
        <label >Detail:</label>
        <textarea v-model="details" required></textarea>
        <button>{{ buttonTitle }}</button>
    </form>
</template>

<script lang="ts">
import {Vue, Options} from "vue-class-component";
import ProjectModel from "@/model/ProjectModel";
import {mapActions} from "vuex";

@Options({
    props: {
        id: String
    },
    methods: {
        ...mapActions('listProject',{getProject: "getProject",
                                    editProject: "editProject"})
    }
})
export default class ProjectForm extends Vue {
    title: string = '';
    details: string = '';
    buttonTitle: string = 'Add Project';
    id?: string;
    project?: ProjectModel;
    getProject!: (id: string) => Promise<ProjectModel>;
    editProject!: (project: ProjectModel) => Promise<boolean>;

    async created() {
        if (this.id) {
            this.project = await this.getProject(this.id);
            this.title = this.project.title;
            this.details = this.project.details;
            this.buttonTitle = "Save Change";
        }
    }

    async handleSubmit() {
        if (this.buttonTitle === "Add Project") {
            this.$emit('edit-project', this.title, this.details);
        } else {
            if (this.project) {
                this.project.title = this.title;
                this.project.details = this.details;
                const result = await this.editProject(this.project);
                if (!result) {
                    console.log("Fail to toggle Project");
                }
                await this.$router.push({name: 'Home'});
            }
        }

    }
}

</script>

<style>
form {
    background: white;
    padding: 20px;
    border-radius: 10px;
}

label {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0;
}

input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
}

textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
}

form button {
    display: block;
    margin: 20px auto 0;
    background: #00ce89;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
}

</style>
