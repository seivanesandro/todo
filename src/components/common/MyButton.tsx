import styled from 'styled-components';

const Button = styled.input`
    padding: 10px 4.5rem;
    margin-top: 1rem;
    background-color: #89cff0;
    color: #444444;
    border: none;
    border-radius: 16rem;
    cursor: pointer;
    outline-offset: none;
    font-size: 1rem;
    font-weight: 600;
    font-variant-caps: small-caps;
    transition: all 0.2s linear;

    &:focus {
        transition: all 0.4s linear;
        outline: #026593 solid 3px;
    }

    &:hover {
        box-shadow:
            0 0 0.3rem #026593,
            0 0 0.2rem #fafafa,
            0 0 0.1rem #026593;
        border-radius: 6rem;
        box-decoration-break: none;
        transition: all 0.2s linear;
        background-color: #b5e6fd;
        font-weight: 500;
        color: #666666;
    }
`;

interface Props {
    nameBtn: string;
    typeBtn: string;
}

const MyButton = ({
    nameBtn,
    typeBtn
}: Props) => {
    return (
        <>
            <Button
                type={typeBtn}
                value={nameBtn}
                maxLength={5}
            />
        </>
    );
};

MyButton.defaultProps = {
    nameBtn: 'give a name',
    typeBtn: 'submit'
};

export default MyButton;
