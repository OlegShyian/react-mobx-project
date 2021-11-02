import { makeAutoObservable } from "mobx";
import { ITask, IUser } from "../types/types";

class User {
    user: IUser = { name: "", password: "", tasks: [] };
    editedTask = { name: "", status: "", id: 0, checked: false };
    isModal = false;
    isAuth = false;
    taskFormConfBtnName = "Create";
    searchQuery = "";
    isRemoveBtn = false;

    constructor() {
        makeAutoObservable(this);
        this.isAuth = false;
    }

    saveUserTasks(user: IUser) {
        this.user = user;
    }

    saveEditedTask(task: ITask) {
        this.editedTask = task;
    }

    saveIsModal(isModal: boolean) {
        this.isModal = isModal;
    }

    saveIsAuth(isAuth: boolean) {
        console.log(isAuth);
        
        this.isAuth = isAuth;
    }

    saveBtnName(name: string) {
        this.taskFormConfBtnName = name;
    }

    saveSearchQuery(query: string) {
        this.searchQuery = query;
    }

    saveRemoveStatusBtn(isRemoveBtn: boolean) {
        this.isRemoveBtn = isRemoveBtn;
    }

}

export default new User();