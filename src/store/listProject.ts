import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import ProjectModel from "@/model/ProjectModel";
import ListProjectModel from "@/model/ListProjectModel";
import JsonService from "@/service/JsonService";
import ProjectForm from "@/components/ProjectForm.vue";

const initialState: ListProjectModel = {
    projects: []
}

const getters: GetterTree<ListProjectModel, ProjectModel> = {}

const mutations: MutationTree<ListProjectModel> = {
    setProjects(state: any, projects: ProjectModel[]) {
        state.projects = projects;
    }
}

const actions: ActionTree<ListProjectModel, ProjectModel> = {
    async fetchData({commit}): Promise<boolean> {
        try {
            const result: ProjectModel[] = await JsonService.fetchData();
            commit('setProjects', result);
        } catch (error) {
            console.log(error);
        }
        return true;
    },

    async deleteProject({commit, dispatch}, project: ProjectModel): Promise<boolean> {
        try {
            const result: boolean = await JsonService.deleteProject(project);
            if(result) {
                dispatch('fetchData');
            }
            return result;
        } catch (error) {
            console.log(error);
        }
        return false;
    },

    async editProject({commit, dispatch}, project: ProjectModel): Promise<boolean> {
        try {
            const result: boolean = await JsonService.editProject(project);
            if (result) {
                dispatch('fetchData');
            }
            return result;
        } catch (error) {
            console.log(error);
        }
        return false;
    },

    async addProject({commit}, path: {title: string, details: string}): Promise<boolean> {
        try {
            const result: boolean = await JsonService.addProject(path.title, path.details);
            return result;
        } catch (error) {
            console.log(error);
        }
        return false;
    },

    async getProject({commit}, id: string): Promise<ProjectModel> {
        try {
            const project: ProjectModel = await JsonService.getProject(id);
            return project;
        } catch (error) {
            console.log(error);
        }
        return {} as ProjectModel
    }
}

const listProject: Module <ListProjectModel, ProjectModel> = {
    namespaced: true,
    state: initialState,
    getters,
    mutations,
    actions
}

export default listProject;
