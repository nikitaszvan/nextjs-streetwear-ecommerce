import { useEffect, SetStateAction, Dispatch } from 'react';

export const useWindowWidth = (onCheckSize: Dispatch<SetStateAction<boolean>>) => {

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) onCheckSize(false);
      };
  
      window.addEventListener("resize", handleResize);
  
      handleResize();
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [onCheckSize]);
  };