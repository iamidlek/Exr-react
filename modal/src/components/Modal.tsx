import React from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import "./modal.css";

import Portal from "./Portal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selector?: string;
}

const Modal: React.FC<Props> = ({
  onClose,
  isOpen,
  selector = "#modal-root",
  children,
}) => (
  <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
    {/* root보다 상위에 생성되도록 */}
    <Portal selector={selector}>
      <Overlay>
        <Dim onClick={onClose} />
        <Container>{children}</Container>
      </Overlay>
    </Portal>
  </CSSTransition>
);

const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  max-width: 456px;
  position: relative;
  width: 100%;
`;

export default Modal;
