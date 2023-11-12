import { useRef, useEffect } from 'react';

const UseCustomRefHook = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        console.log(containerRef);
        console.log(itemsRef);
        console.log();
    }, []);

    return {
        containerRef,
        itemsRef,
    };
};

export { UseCustomRefHook };
// function UseCustomHook = ()
