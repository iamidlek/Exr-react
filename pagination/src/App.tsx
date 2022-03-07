import { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import axios from "axios";

function App() {
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [items, setItems] = useState<Array<Passenger>>([]);

  const handlePageChange = (currentPage: number): void => {
    setPage(currentPage);
  };

  useEffect(() => {
    (async () => {
      const params = { page, size: 10 };
      const {
        data: { totalPages, data },
      } = await axios.get<Response>(
        "https://api.instantwebtools.net/v1/passenger",
        { params }
      );
      setTotalPages(totalPages);
      setItems(data);
    })();
  }, [page]);

  return (
    <>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <Pagination
        count={totalPages}
        page={page}
        onPageChange={handlePageChange}
      />
    </>
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

export default App;
