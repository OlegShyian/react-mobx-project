export interface ITask {
    name: string;
    status: string;
    id: number;
    checked: boolean;
}

export interface IStore {
    user: IUser;
    currentTask: ITask;
    btnName: string;
    searchQuery: string;
    isModal: boolean;
    isRemoveBtn: boolean;
    isAuth: boolean,
}

export interface IUser {
    tasks: ITask[];
    name: string;
    password: string;
}


export interface BtnName {
    type: string,
    payload: string | null
}

export interface Modal {
    type: string,
    payload: boolean
}

export interface ITaskReducer {
    type: string,
    payload: ITask
}

export interface ITasksReducer {
    type: string,
    payload: IUser
}

export interface IPaginationProps {
    length: number;
    tasksLimit: number
    setTasksLimit: (arg: number) => void;
    currentPage: number;
    setCurrentPage: (arg: number) => void;
}

