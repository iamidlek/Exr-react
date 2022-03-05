import styled from "styled-components";
import Skeleton from "./Skeleton";

const Placeholder = () => {
  return (
    <Container>
      <ImageWrapper>
        <Skeleton width={320} height={220} />
      </ImageWrapper>
      <Info>
        <Skeleton width={150} height={29} rounded />
        <div style={{ height: "8px" }} />
        <Skeleton width={200} height={19} rounded />
      </Info>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  border-radius: 4px;
`;

const ImageWrapper = styled.div`
  width: 100%;
`;

const Info = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

export default Placeholder;
