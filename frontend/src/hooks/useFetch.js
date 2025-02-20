//hook que se encargue de realizar cualquier peticion a la api

import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (fetchFunction,dependencies=[]) => {
    
    const [data, setData] = useState(null);
    
    const [error, setError] = useState(null);
   
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
             
        try{
        const result = await fetchFunction();
        setData(result);
        }catch(error){
            setError(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        
        const abortController = new AbortController();
        setIsLoading(true);
        fetchData();
      return () => {
        abortController.abort();
      }
    }, dependencies)
    
    return {data, error, isLoading};
}