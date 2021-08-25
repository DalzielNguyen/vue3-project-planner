import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import ProjectModel from "@/model/ProjectModel";
import ListProjectModel from "@/model/ListProjectModel";
import JsonService from "@/service/JsonService";

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
