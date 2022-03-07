import { useState } from "react";
import styled from "styled-components";
import Modal from "./components/Modal";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Container className="app">
      <Button onClick={handleOpen}>OPEN</Button>
      {/* 모달을 생성 */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalBody>
          <h2>Text in a modal</h2>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </ModalBody>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Button = styled.button`
  width: 280px;
  height: 60px;
  border-radius: 12px;
  color: #fff;
  background-color: #3d6afe;
  margin: 0;
  border: none;
  font-size: 24px;
  &:active {
    opacity: 0.8;
  }
`;

const ModalBody = styled.div`
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  max-height: calc(100vh - 16px);
  overflow: hidden auto;
  position: relative;
  padding-block: 12px;
  padding-inline: 24px;
`;

export default App;
