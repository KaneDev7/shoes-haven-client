"use client"
import instanceAxios from '@/lib/axios';
import { Product } from '@/types/product.type';
import  { useEffect, useState } from 'react'


const useFetch = (url : string) => {
    const [data, setData] = useState<Product[] | Product>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      let isMounted = true; 
  
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await instanceAxios.get(url);
          if (isMounted) {
            setData(response.data.data);
            setError(null);
          }
        } catch (err) {
          if (isMounted) {
            setError(err);
            setData(null);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
  
      fetchData();  
      return () => {
        isMounted = false;
      };
    }, [url]);
  
    return { data, loading, error };
  };
  
  export default useFetch;
