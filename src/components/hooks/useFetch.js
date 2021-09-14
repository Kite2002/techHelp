import { useState } from "react";
import { useEffect } from "react";

const useFetch = (endPoint) => {
  const [data, setData] = useState(null);

  const [isPending, setIsPending] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const abort = new AbortController();

    fetch(endPoint ,{signal : abort.signal})
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Couldnot do Stuff....");
        }
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if(err.name === 'AbortError'){
          console.log('fetch aborted')
        }else{
        setError(err.message);
        setIsPending(false);
        }
      });

      return () => abort.abort();
  }, [endPoint]);
  return { data, isPending, error };
};

export default useFetch;
