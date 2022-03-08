import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useIntersectionObserver from "./useIntersectionObserver";

interface Airline {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_quaters: string;
  website: string;
  established: string;
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline;
  __v: number;
}

interface Props {
  isLastItem: boolean;
  onFetchMorePassengers: () => void;
}

const Item: React.FC<Props> = ({
  children,
  isLastItem,
  onFetchMorePassengers,
}) => {
  const ref = useRef<HTMLDivElement | null>(null); // 감시할 엘리먼트
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting; // 겹치는 영역이 존재하는 지 여부

  useEffect(() => {
    // 마지막 아이템의 Intersecting이 ture
    isLastItem && isIntersecting && onFetchMorePassengers(); // 목록의 마지막에 도달했을 때, 리스트를 더 불러오도록 요청한다.
  }, [isLastItem, isIntersecting]);

  return (
    <div
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        border: "1px dashed #000",
      }}
    >
      <div style={{ margin: "auto" }}>{children}</div>
    </div>
  );
};

function App() {
  const [passengers, setPassengers] = useState<Array<Passenger>>([]);

  const [page, setPage] = useState<number>(0);
  const [isLast, setIsLast] = useState<boolean>(false);

  const getPassengers = async () => {
    const params = { page, size: 30 };

    try {
      const response = await axios.get(
        "https://api.instantwebtools.net/v1/passenger",
        { params }
      );

      const passengers = response.data.data;
      const isLast = response.data.totalPages === page;

      setPassengers((prev) => [...prev, ...passengers]);
      setIsLast(isLast);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    !isLast && getPassengers();
  }, [page]);

  return (
    <>
      {passengers.map((passenger, idx) => (
        <Item
          key={passenger._id}
          isLastItem={passengers.length - 1 === idx}
          onFetchMorePassengers={() => setPage((prev) => prev + 1)}
        >
          {passenger.name}
        </Item>
      ))}
    </>
  );
}

export default App;
