import React, {
    useState,
    ChangeEvent,
    FormEvent,
    useEffect
} from 'react';
//styles
import styled from 'styled-components';
import { devices } from '../utils/constantes';

//components
import MyButton from './common/MyButton';
import MyInput from './common/MyInput';

//interface
import { ITask } from '../interface/Task';

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7rem;

    @media only screen and (${devices.tablet}) {
        align-items: center !important;
        text-align: center !important;
        gap: 2.5rem;
    }
`;

interface Props {
    btnText: string;
    firstInputPlaceholder: string;
    secondInputPlaceholder: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<
        React.SetStateAction<ITask[]>
    >;
    task?: ITask | null;
    handleUpdate?(id: number,
        title: string,
        difficulty: number): void;
}

const TaskForm = ({
    btnText,
    firstInputPlaceholder,
    secondInputPlaceholder,
    taskList,
    setTaskList,
    task,
    handleUpdate
}: Props) => {
    const [id, setId] = useState<number>(0);
    const [title, setTitle] =
        useState<string>('');
    const [difficulty, setDifficulty] =
        useState<number>(0);

    //useEffect() to update task one time
    useEffect(() => {
        if (task) {
            setId(task.id);
            setTitle(task.title);
            setDifficulty(task.difficulty);
        }
    }, [task]);

    //formEvent
    const addTaskHandler = (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (handleUpdate) {
            handleUpdate(id, title, difficulty)
        } else {
            const id = Math.floor(
                Math.random() * 1000
            );
            const newTask: ITask = {
                id,
                title,
                difficulty
            };

            setTaskList!([...taskList, newTask]);

            setTitle('');
            setDifficulty(0);
        }

        // console.log(taskList);
    };

    //HandleChange Event
    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        } else {
            setDifficulty(
                parseInt(e.target.value)
            );
        }

        /* 
        console.log(title);
        console.log(difficulty); */
    };

    return (
        <>
            <FormStyle
                onSubmit={addTaskHandler}
                className="form-container"
            >
                <label>Adicione sua Tarefa</label>
                <MyInput
                    typeInput="text"
                    nameInput="title"
                    placeholderInput={
                        firstInputPlaceholder
                    }
                    valueInput={title}
                    onChange={handleChange}
                />

                <label style={{marginTop: '0.5rem'}}>Prioridade da Tarefa</label>
                <MyInput
                    typeInput="text"
                    nameInput="difficulty"
                    placeholderInput={
                        secondInputPlaceholder
                    }
                    valueInput={difficulty}
                    onChange={handleChange}
                />

                <MyButton
                    typeBtn="submit"
                    nameBtn={btnText}
                />
            </FormStyle>
        </>
    );
};

TaskForm.defaultProps = {
    btnText: 'add task',
    firstInputPlaceholder: 'Titulo da tarefa',
    secondInputPlaceholder:
        'Dificuldade da tarefa'
};

export default TaskForm;
