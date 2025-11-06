import React from 'react';

//styles
import styled, { keyframes } from 'styled-components';
import {
    BsFillPencilFill,
    BsFillTrash3Fill
} from 'react-icons/bs';

//interfaces
import { ITask } from '../interface/Task';
import { devices } from '../utils/constantes';

const Show = keyframes`
    0%{
        opacity: 0;
    }
    50%{
        opacity:0.5;
    }
    100%{
        opacity: 1;
    }
`;

const ContainerTaskList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    justify-content: space-between;
    padding: 2em 3em;
    width: 100%;
    max-width: 100%;
    border: 1px solid #ccc;
    border-radius: 1em;
    animation: ${Show} 1s linear;
    box-sizing: border-box; 

    &:hover {
        border: 1px solid #a3a1a1;
        box-shadow: 0 0 0.2em black;
        background-color: #cef6ff;
        transition: all 0.4s linear;
    }

    @media only screen and (${devices.mobileG}) {
        width: 100% !important;
    }
    @media only screen and (${devices.portatil}) {
        width: 100%;
        padding: 1.5em 1em;
    }
`;

const ContainerTaskTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 1rem;
`;

const ContainerTaskDifficulty = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: baseline;
`;

const ContainerTaskIconsAction = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`;

const TaskTitleStyle = styled.h2`
    color: #5e5d5d;
    font-size: 1.5rem;
    font-family: monospace;
    letter-spacing: 0.1em;
    text-transform: capitalize;

    @media only screen and (${devices.mobileG}) {
        letter-spacing: normal;
    }
`;

const TaskDifficultyStyle = styled.p`
    color: #5e5d5d;
    font-size: 1.1rem;
    font-family: monospace;
`;

const IconPencilStyle = styled(BsFillPencilFill)`
    font-size: 2.5rem;
    padding: 9px;
    background-color: #047104;
    color: #ffffff;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.4s linear;

    &:hover {
        background-color: #04b404;
        color: #f0f6f7;
        box-shadow: 0 0 0.2rem #9c9b9b;
        transition: all 0.2s linear;
    }
`;
const IconTrashStyle = styled(BsFillTrash3Fill)`
    font-size: 2.5rem;
    padding: 9px;
    background-color: #a22525;
    color: #ffffff;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.4s linear;

    &:hover {
        background-color: #f24c4c;
        color: #f0f6f7;
        box-shadow: 0 0 0.2rem #9c9b9b;
        transition: all 0.2s linear;
    }
`;

type Props = {
    taskList: ITask[];
    handleDelete(id: number): void;
    handleEdit(task: ITask): void;
};

const TaskList = ({
    taskList,
    handleDelete,
    handleEdit
}: Props) => {
    return (
        <>
            {taskList.length > 0 ? (
                taskList.map(task => (
                    <ContainerTaskList
                        key={task.id}
                        className="container-tasklist"
                    >
                        <ContainerTaskTitle className="container-task-title">
                            <small>Tarefa:</small>
                            <TaskTitleStyle className="task-title">
                                {task.title}
                            </TaskTitleStyle>
                        </ContainerTaskTitle>

                        <ContainerTaskDifficulty className="container-task-Difficulty">
                            <small>
                                {' '}
                                Prioridade:
                            </small>
                            <TaskDifficultyStyle className="task-difficulty">
                                {task.difficulty}
                            </TaskDifficultyStyle>
                        </ContainerTaskDifficulty>
                        <ContainerTaskIconsAction className="task-icons-action">
                            <IconPencilStyle
                                onClick={() => {
                                    handleEdit(
                                        task
                                    );
                                }}
                            />
                            <IconTrashStyle
                                onClick={() => {
                                    handleDelete(
                                        task.id
                                    );
                                }}
                            />
                        </ContainerTaskIconsAction>
                    </ContainerTaskList>
                ))
            ) : (
                <p>Não Tem Tarefas!</p>
            )}
        </>
    );
};

export default TaskList;
