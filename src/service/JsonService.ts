import axiosInstance from "@/service/axiosInstance";
import ListProjectModel from "@/model/ListProjectModel";
import ProjectModel from "@/model/ProjectModel";

class JsonService {
    async fetchData(): Promise<ProjectModel[]> {
        try {
            const response = await axiosInstance.get('/projects');
           return [...response.data];
        } catch (error) {
            console.log(error);
        }
        return [];
    }
}

export default new JsonService();
