<template>
    <div class="project" :class="{complete: project.complete}">
        <div class="action">
            <h3 @click="showDetail"> {{ project.title }} </h3>
            <div class="icons">
                <router-link :to="{ name: 'Edit Project', params: {id: project.id}}">
                    <span class="material-icons">edit</span>
                </router-link>
                <span class="material-icons" @click="deleteValue">delete</span>
                <span class="material-icons tick" @click="toggleProject">done</span>
            </div>
        </div>
        <div v-if="isDisplayDetail" class="detail">
            <p>{{ project.details }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import ProjectModel from "@/model/ProjectModel";
import {mapActions} from "vuex";

@Options({
    props: {
        project: Object,
    },
    methods: {
        ...mapActions("listProject", { deleteProject: "deleteProject",
                                        editProject: "editProject"
                                    })
    }
})

export default class ProjectInformation extends Vue {
    project!: ProjectModel;
    isDisplayDetail: boolean = false;
    deleteProject!: (project: ProjectModel) => Promise<boolean>;
    editProject!: (project: ProjectModel) => Promise<boolean>;

    showDetail (): void {
        this.isDisplayDetail = !this.isDisplayDetail
    }

    async deleteValue(): Promise<void> {
        const result = await this.deleteProject(this.project);
        if(!result) {
            console.log("Fail to delete Project");
        }
    }

    async toggleProject(): Promise<void> {
        this.project.complete = !this.project.complete;
        await this.editValue();
    }

    async editValue(): Promise<void> {
        const result = await this.editProject(this.project);
        if (!result){
            console.log("Fail to toggle Project");
        }
    }
}
</script>

<style>
    .project {
        margin: 20px auto;
        background: white;
        padding: 10px 20px;
        border-radius: 4px;
        box-shadow: 1px 2px 3px rgba(0,0,0,0.5);
        border-left: 4px solid #e90074;
    }

    h3 {
        cursor: pointer;
    }
    .action {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .material-icons {
        font-size: 24px;
        margin-left: 10px;
        color: #bbb;
        cursor: pointer;
    }
    .material-icons:hover {
        color: #777;
    }
    .project.complete {
        border-left: 4px solid #00ce89;
    }
    .project.complete .tick {
        color: #00ce89;
    }
</style>
