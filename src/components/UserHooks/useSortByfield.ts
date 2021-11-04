import { useState } from "react";

export const useSortByField = (field: string, arr: any[]) => {

    const [sortDirName, setSortDirName] = useState(1);
    const [sortDirStatus, setSortDirStatus] = useState(1);

    const getDir = (field: string) => {
        if (field === "name") {
            setSortDirName(sortDirName * -1);
            return sortDirName;
        }
        if (field === "status") {
            setSortDirStatus(sortDirStatus * -1);
            return sortDirStatus;
        }
    }

    const sortTasks = (field: string) => {
        const dir = getDir(field) || 1;
        return (a: any, b: any) => {
            if (a[field] > b[field]) return 1 * dir;
            if (a[field] < b[field]) return -1 * dir;
            return 0;
        }
    }

    return arr.sort(sortTasks(field));
}

