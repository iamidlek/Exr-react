import React from "react";
import styled from "styled-components";

interface Iprops {
  length: number;
  activeIndex: number;
  handleGoTo: (index: number) => void;
}

const Pagenav: React.FC<Iprops> = ({ length, activeIndex, handleGoTo }) => {
  return (
    <Nav>
      {Array.from({ length }).map((_, index) => (
        <NavItem key={index}>
          <NavButton
            isActive={activeIndex === index}
            onClick={() => handleGoTo(index)}
          />
        </NavItem>
      ))}
    </Nav>
  );
};

const Nav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  li + li {
    margin-left: 4px;
  }
`;

const NavItem = styled.li`
  display: inline-block;
`;

const NavButton = styled.button<{ isActive?: boolean }>`
  width: 4px;
  height: 4px;
  background-color: #000;
  opacity: ${({ isActive }) => (isActive ? 0.3 : 0.1)};
`;

export default Pagenav;
