import { useEffect, useState } from "react";

  /*
  @param key - the name of the item in local storage(e.g "habit")
  @param initialValue - the default value if nothing is in localstorage yet  
  */

  export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
      try {
        // look for item in browser's memory
        const item = window.localStorage.getItem(key);

        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error("Error reading from localstorage:", error);
      }
    }, [key]);

    const setValue = (value: T | ((val: T)=> T))=>{
      try{
        const valueToStore = value instanceof Function? value(storedValue) : value;

        // update react state
        setStoredValue(valueToStore)

        if (typeof window !== 'undefined'){
          window.localStorage.setItem(key,JSON.stringify(valueToStore));
        }
      }catch(error){
        console.error('Error saving to localStorage:', error);;
        
      }
    }

    return [storedValue,setValue] as const
  }

  

