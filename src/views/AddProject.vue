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
