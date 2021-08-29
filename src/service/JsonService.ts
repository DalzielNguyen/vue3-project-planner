import axiosInstance from "@/service/axiosInstance";
import ListProjectModel from "@/model/ListProjectModel";
import ProjectModel from "@/model/ProjectModel";
import {DEFAULT_SUCCESS_CODE} from "@/constant/constants";
class JsonService {
    async fetchData(): Promise<ProjectModel[]> {
        try {
            const response = await axiosInstance.get('projects');
           return [...response.data];
        } catch (error) {
            console.log(error);
        }
        return [];
    }

    async deleteProject(project: ProjectModel): Promise<boolean> {
        try {
            const response = await axiosInstance.delete(`projects/${project.id}`);
            if(response.status < DEFAULT_SUCCESS_CODE) return true;
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    async editProject(project: ProjectModel): Promise<boolean> {
        try {
            const response = await axiosInstance.patch(`projects/${project.id}`, project);
            if (response.status < DEFAULT_SUCCESS_CODE) return true;
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    async addProject(title: string, details: string): Promise<boolean> {
        try {
            const response = await axiosInstance.post('projects', {
                title,
                details,
                complete: false
            });
            if (response.status < DEFAULT_SUCCESS_CODE) return true;
        } catch (error) {
            console.log(error);
        }
        return false;
    }
}

export default new JsonService();
