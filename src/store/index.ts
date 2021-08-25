import {createStore, mapActions} from 'vuex'
import listProject from "@/store/listProject";

export default createStore({
    modules: {
        listProject,
    }
});
