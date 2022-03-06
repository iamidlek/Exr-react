import { useEffect, useState } from "react";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import styled, { css } from "styled-components";
import Pagenav from "./components/Pagenav";

const banners = [
  "https://via.placeholder.com/300/92c952",
  "https://via.placeholder.com/300/771796",
  "https://via.placeholder.com/300/24f355",
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleNext = () =>
    setActiveIndex((activeIndex) => (activeIndex + 1) % banners.length);
  const handlePrev = () =>
    setActiveIndex(
      (activeIndex) => (activeIndex - 1 + banners.length) % banners.length
    );
  const handleGoTo = (index: number) => setActiveIndex(index);

  // auto를 멈추는 효과
  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!isFocused) {
      intervalId = setInterval(handleNext, 2000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocused]);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Container>
        {banners.length && (
          <ArrowButton pos="left" onClick={handlePrev}>
            <RiArrowDropLeftLine />
          </ArrowButton>
        )}
        <CarouselList>
          {banners.map((url, index) => (
            <CarouselListItem activeIndex={activeIndex} key={index}>
              <img src={url} alt="item" />
            </CarouselListItem>
          ))}
        </CarouselList>
        {banners.length && (
          <ArrowButton pos="right" onClick={handleNext}>
            <RiArrowDropRightLine />
          </ArrowButton>
        )}
      </Container>
      {banners.length && (
        <Pagenav
          length={banners.length}
          handleGoTo={handleGoTo}
          activeIndex={activeIndex}
        />
      )}
    </div>
  );
};

const Container = styled.div`
  position: relative;
`;

const ArrowButton = styled.button<{ pos: "left" | "right" }>`
  position: absolute;
  top: 50%;
  z-index: 1;
  padding: 8px 12px;
  font-size: 48px;
  font-weight: bold;
  background-color: transparent;
  color: #fff;
  border: none;
  margin: 0;
  cursor: pointer;
  ${({ pos }) =>
    pos === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `};
`;

const CarouselList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
`;

const CarouselListItem = styled.li<{ activeIndex: number }>`
  width: 100%;
  flex: 1 0 100%;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
  transition: 200ms ease;
  > img {
    width: 100%;
    height: 94vh;
    /* height: fit-content; */
  }
`;

export default Carousel;
