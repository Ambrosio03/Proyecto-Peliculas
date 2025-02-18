//hook que se encargue de realizar cualquier peticion a la api

import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (fetchFunction,dependencies=[]) => {
    //estado para guardar la data
    const [data, setData] = useState(null);
    //estado para guardar el error
    const [error, setError] = useState(null);
    //estado para controlar la carga
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
              //funncion que hace la peticion a la api 
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
        //creo un objeto para aboratr la funcion
        const abortController = new AbortController();
        setIsLoading(true);
        fetchData();
      return () => {
        abortController.abort();
      }
    }, dependencies)
    
    return {data, error, isLoading};
}