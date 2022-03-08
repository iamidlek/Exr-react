import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { throttle } from "throttle-debounce";
import styled from "styled-components";

function App() {
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const pageRef = useRef<number>(0);

  const [items, setItems] = useState<Array<Passenger>>([]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false);

  const handleScroll = throttle(1000, () => {
    if (scrollRef.current) {
      const { scrollHeight, offsetHeight, scrollTop } = scrollRef.current;
      // scrollHeight: 요소(list)의 전체 높이(스크롤에 의해 안보이는 영역포함). 패딩과 테두리 포함. 마진 제외.
      // offsetHeight: 요소의 높이(스크롤 영역 내에 보여지는 높이). 패딩, 스크롤 바, 테두리(Border) 포함. 마진 제외.
      // scrollTop: 선택된 요소 집합의 첫 번째 요소의 수직 스크롤 바의 위치.
      const offset = 50;

      // 예시
      // 전체 요소 높이(500) - 스크롤 창 높이(100) - 스크롤한 위치(450) < 50
      setIsScrollBottom(scrollHeight - offsetHeight - scrollTop < offset);
    }
  });

  const fetch = async (init?: boolean) => {
    const params = { size: 30, page: pageRef.current };

    try {
      const res = await axios.get<Response>(
        "https://api.instantwebtools.net/v1/passenger",
        { params }
      );

      setItems(init ? res.data.data : items.concat(res.data.data));
      setIsLast(res.data.totalPages === pageRef.current);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isScrollBottom) {
      // 다음 페이지 요청
      pageRef.current = pageRef.current + 1;

      !isLast && fetch();
    }
  }, [isScrollBottom, isLast]);

  useEffect(() => {
    fetch(true);
  }, []);

  return (
    <div>
      <List ref={scrollRef} onScroll={handleScroll}>
        {items.map((item) => (
          <ListItem key={item._id}>{item.name}</ListItem>
        ))}
      </List>
    </div>
  );
}

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

interface Response {
  totalPassengers: number;
  totalPages: number;
  data: Array<Passenger>;
}

const List = styled.ul`
  overflow-x: hidden;
  overflow-y: scroll;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 512px;
  li + li {
    margin-top: 12px;
  }
`;

const ListItem = styled.li`
  font-size: 36px;
`;

export default App;
