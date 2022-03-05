import { useEffect, useState } from "react";
import styled from "styled-components";
import Item from "./components/Item";
import Placeholder from "./components/Placeholder";

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <Base>
      {loading
        ? Array.from({ length: 5 }).map((_, idx) => <Placeholder key={idx} />)
        : Array.from({ length: 5 }).map((_, idx) => <Item key={idx} />)}
    </Base>
  );
}

const Base = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 12px;
  row-gap: 24px;
`;

export default App;
