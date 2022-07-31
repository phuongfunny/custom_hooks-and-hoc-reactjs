import { MutableRefObject, useCallback, useRef, useState } from 'react';

type Callback = () => void;

interface HookReturn {
  nodeRef: (node: HTMLDivElement) => void;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  isIntersecting: boolean;
  observedElement: HTMLDivElement | null;
}

interface Props {
  options?: Omit<IntersectionObserverInit, 'root'>;
  callback?: Callback;
}

// Recommend pass a callback to call API instead using isIntersecting to check and then call
const useIntersectionObserver = ({
  options = { rootMargin: '0px' },
  callback,
}: Props): HookReturn => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<IntersectionObserverInit>(options);
  const callbackRef = useRef<Callback | undefined>(callback);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedElementRef = useRef<HTMLDivElement | null>(null);

  const nodeRef = useCallback((node: HTMLDivElement) => {
    observedElementRef.current = node;

    // Disconnect prev element so new last element will be hooked up correctly
    if (observerRef.current != null) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && callbackRef.current != null) callbackRef.current();
      },
      { root: containerRef.current, ...optionsRef.current },
    );

    // Observe last element
    if (node) observerRef.current.observe(node);
  }, []);

  return {
    nodeRef,
    containerRef,
    isIntersecting,
    observedElement: observedElementRef.current,
  };
};

export default useIntersectionObserver;
