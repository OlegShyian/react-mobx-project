import React, { useMemo } from 'react'
import styled from 'styled-components';
import { IPaginationProps } from '../../types/types';
import FlexWrapper from '../myComponents/FlexWrapper';


const StyledSpan = styled.span`
    padding: 3px 6px;
    margin: 2px;
    border: 2px solid black;
    cursor: pointer;
    font-size: 18px;
    box-sizing: border-box;
`
const StyledLimit = styled(StyledSpan)`
    min-width: 30px;
    border-radius: 50%;
`

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
        <FlexWrapper justify="space-between" margin="5px 10px">
            <div>
                {pageNumbers.map(currentPage =>
                    <StyledSpan
                        key={currentPage}
                        onClick={() => setCurrentPage(currentPage)}
                    >
                        {currentPage}
                    </StyledSpan>
                )}
            </div>
            <div>
                {tasksOnPage.map((limit: number, ind) =>
                    <StyledLimit
                        key={ind}
                        onClick={() => handleSetLimit(limit)}
                    >{limit}</StyledLimit>
                )}

            </div>
        </FlexWrapper>
    )
}

export default TasksPagination
