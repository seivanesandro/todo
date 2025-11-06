import React, { useEffect, useState } from 'react';

//style
import styled, {
    keyframes
} from 'styled-components';

//interface
import { ITask } from './interface/Task';

//components
import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

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

const AppContainerAnimation = styled.div`
    animation: ${Show} 4s linear;
`;

const App = () => {
    const [taskList, setTaskList] = useState<ITask[]>(() => {
        const stored = localStorage.getItem('taskList');
    return stored ? JSON.parse(stored) : [];
});

    const [taskToUpedate, setTaskToUpedate] =
        useState<ITask | null>(null);

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }, [taskList]);

    //remover tarefas
    const deleteTask = (id: number) => {
        setTaskList(
            taskList.filter(task => {
                return task.id !== id;
            })
        );
    };

    const hideOrShowModal = (
        display: boolean
    ) => {
        const modal =
            document.querySelector('#modal');

        if (display) {
            modal?.classList.remove('hide');
        } else {
            modal?.classList.add('hide');
        }
    };

    const editTask = (task: ITask): void => {
        hideOrShowModal(true);
        setTaskToUpedate(task);
    };

    //utilizando tipagem com dados separados
    const updateTask = (
        id: number,
        title: string,
        difficulty: number
    ) => {
        const updatedTask: ITask = {
            id,
            title,
            difficulty
        };

        const updateItems = taskList.map(task => {
            return task.id === updatedTask.id
                ? updatedTask
                : task;
        });

        setTaskList(updateItems)
        hideOrShowModal(false)
    };

    return (
        <div className="App">
            <Modal
                children={
                    <TaskForm
                        btnText="Editar"
                        firstInputPlaceholder="Titulo"
                        secondInputPlaceholder="Dificuldade"
                        taskList={taskList}
                        setTaskList={setTaskList}
                        task={taskToUpedate}
                        handleUpdate={updateTask}
                    />
                }
            />
            <Header nameHeader="Tarefas" />
            <AppContainerAnimation className="App-main-container">
                <div className="form">
                    <h2>adicionar Tarefas</h2>
                    <TaskForm
                        btnText="adicionar"
                        firstInputPlaceholder="Titulo da Tarefa"
                        secondInputPlaceholder="Nivel de Dificuldade"
                        taskList={taskList}
                        setTaskList={setTaskList}
                    />
                </div>
                <div className="list">
                    <TaskList
                        taskList={taskList}
                        handleDelete={deleteTask}
                        handleEdit={editTask}
                    />
                </div>
            </AppContainerAnimation>
            <Footer nameAuthorFooter="sandro seivane@2024" />
        </div>
    );
};

export default App;
