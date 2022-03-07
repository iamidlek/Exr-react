import React from "react";
import { createPortal } from "react-dom";

interface Props {
  selector?: string;
}

const Portal: React.FC<Props> = ({ selector, children }) => {
  const rootElement = selector && document.querySelector(selector);

  return <>{rootElement ? createPortal(children, rootElement) : children}</>;
};

export default Portal;
