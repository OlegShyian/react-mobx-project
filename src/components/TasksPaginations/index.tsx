import React, { useMemo } from 'react'
import { IPaginationProps } from '../../types/types';
import "./style.css"


const TasksPagination: React.FC<IPaginationProps> = ({
    length,
    tasksLimit,
    setTasksLimit,
    currentPage,
    setCurrentPage }) => {

    const tasksOnPage = [3, 5, 10];
    const pageNumbers = useMemo(() => {
        const totalPages = Math.ceil(length / tasksLimit);
        return new Array(totalPages).fill("").map((el, ind) => ind + 1);
    }, [length, tasksLimit]);

    const handleSetLimit = (limit: number) => {
        if (currentPage > length / limit) {
            setCurrentPage(Math.ceil(length / limit));
        }
        setTasksLimit(limit);
    }


    return (
        <div className="wrapper__pagination">
            <div className="page__conteiner">
                {pageNumbers.map(currentPage =>
                    <span
                        key={currentPage}
                        className="page"
                        onClick={() => setCurrentPage(currentPage)}
                    >
                        {currentPage}
                    </span>
                )}
            </div>
            <div className="tasks__limit">
                {tasksOnPage.map((limit: number, ind) =>
                    <button
                        key={ind}
                        className="pagination__numbers"
                        onClick={() => handleSetLimit(limit)}
                    >{limit}</button>
                )}

            </div>
        </div>
    )
}

export default TasksPagination
