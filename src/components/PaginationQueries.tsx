import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Button } from "reactstrap";

interface Fruits {
  id: string;
  name: string;
}

const PaginationQueries = () => {
  const [page, setPage] = useState(1);

  const fetchFruitsQuery = async (page: number): Promise<Fruits[]> => {
    const getFruits = await axios
      .get(`http://localhost:4000/fruits?_limit=4&_page=${page}`)
      .then((res) => res.data)
      .catch((err) => err.data);
    return getFruits;
  };

  const { data, isLoading, error, isError, refetch } = useQuery<Fruits[]>(
    ["fruits" ,page], // Include page in queryKey to trigger refetch on page change
    () => fetchFruitsQuery(page), // Pass the page value to the query function
    {
      keepPreviousData: true, // Keep the previous data during the fetch for smooth UI
    }
  );

  return (
    <div className="container">
      {isLoading ? (
        <h2>Data being Loaded</h2>
      ) : (
        data?.map((fruit: Fruits) => {
          return (
            <div key={fruit.id} className="fruit-item">
              
              <div className="fruit-item">👽{fruit.name}</div>
            </div>
          );
        })
      )}
      <Button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
        Previous
      </Button>
      <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
    </div>
  );
};

export default PaginationQueries;
