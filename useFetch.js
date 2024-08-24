import { useEffect, useState } from "react"

export const useFetch = (url) => {


    const localCache = {};


    const [state, setState] = useState({
        data : null,
        isLoading: true,
        hasError: false,
        errorMessage: null,
    });

    useEffect(() => {

        getFetch();
      
    }, [url]);

    const setLoadingState= ()=>{
        setState(
            {data: null,
            isLoading: true,
            hasError: false,
            error: null,
        });
    }

    const getFetch=async()=>{

        if(localCache[url]){
            console.log('usando cache');

            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            });
            return;
        }

        setLoadingState();
        const resp = await fetch(url);

        await new Promise(resolve=> setTimeout(resolve, 1000));

        if (!resp.ok){
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                },
            }, );
        }

        const data = await resp.json();

        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        })
            //manejo cache

            localCache[url]= data; //almacenar en cache
    }

  return {
    data: state.data, 
    isLoading: state.isLoading, 
    hasError: state.hasError,
}}
