import { useEffect, useState } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category) => {

     const [images, setImagenes] = useState([])
     const [isLoading, setIsLoading] = useState(true)

     
     const getImages = async()=>{
         const newImages = await getGifs(category);
         setImagenes(newImages)
         setIsLoading(false);
     }
     useEffect(()=>{
        getImages();
     }, [])

  return {
    images,
    isLoading
  }
}
