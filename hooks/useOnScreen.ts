import { useState, useEffect, RefObject } from 'react';

const useOnScreen = (ref: RefObject<Element>, rootMargin = '0px'): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    /*Using a named function instead of an anonymous function for the cleanup function works because named 
  functions have a fixed lexical scope that captures the value of variables in the surrounding scope at 
  the time the function is defined. This means that the cleanup function has access to the currentRef 
  variable that was defined inside the useEffect hook, even if ref.current has changed by the time the 
  cleanup function is called.*/

    const cleanup = () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };

    return cleanup;
  }, [ref, rootMargin]);

  return isIntersecting;
};

export default useOnScreen;
