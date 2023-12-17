import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import SpinnerMini from "./SpinnerMini.jsx";

const StyledConfirmCreate = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-700);
    padding: 1.2rem 0rem;
    border-bottom: 1px solid var(--color-grey-100);
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;



function ConfirmCreate({ resourceName, onConfirm, disabled, onCloseModal, isCreating }) {
    return (
        <StyledConfirmCreate>
            <Heading as="h3">Adding {resourceName}</Heading>
            <p> Who booking: Nguyen Dang Khoi </p>
            <p> Information 1 </p>
            <p> Information 1 </p>
            <p> Information 1 </p>
            <p> Information 1 </p>
            <p> Information 1 </p>


            <div>
                <Button
                    variations="secondary"
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    Cancel
                </Button>
                <Button
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    { isCreating ? <SpinnerMini /> : "Create" }
                </Button>
            </div>
        </StyledConfirmCreate>
    );
}

export default ConfirmCreate;
