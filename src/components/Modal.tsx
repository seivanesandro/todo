import React from 'react';
//styles
import styled, {
    keyframes
} from 'styled-components';
import { devices } from '../utils/constantes';

const Show = keyframes`
    0% {
        opacity: 0;
        transform: translate(-50%, -60%);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
`;

const ShowFade = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 0.3;
    }
`;

const ContainerModal = styled.div`
    display: contents;
`;

const FadeStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    animation: ${ShowFade} 0.5s forwards;
    z-index: 1000;
`;

const ModalStyle = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 600px;
    padding: 2rem;
    z-index: 1001;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 2rem;
    animation: ${Show} 0.5s ease-out forwards;
    box-shadow: 0 0 0.3rem #343434;

    @media only screen and (${devices.mobileG}) {
        width: 90vw;
        max-width: 320px;
        height: auto;
        min-height: 400px;
        max-height: 90vh;
        padding: 2rem;
        overflow-y: auto;
    }
    
    @media only screen and (${devices.tablet}) {
        width: 90vw;
        max-width: 500px;
        height: auto;
        min-height: 400px;
        max-height: 90vh;
        padding: 2rem;
        overflow-y: auto;
    }
`;

const ModalFormContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface Props {
    //declarar o children
    children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
    const closeModal = (
        e: React.MouseEvent
    ): void => {
        const modal =
            document.querySelector('#modal');
        modal?.classList.add('hide');
    };

    return (
        <ContainerModal
            id="modal"
            className="hide container-modal"
        >
            <FadeStyle
                className="fade-modal"
                onClick={closeModal}
            ></FadeStyle>
            <ModalStyle className="modal">
                <h2 className="text-modal">
                    Editar Tarefa
                </h2>
                <ModalFormContainer>
                    {children}
                </ModalFormContainer>
            </ModalStyle>
        </ContainerModal>
    );
};

export default Modal;
