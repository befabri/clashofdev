import { useEffect, useState } from "preact/compat";

export default function ScrollPercentage() {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / docHeight) * 100;
        setScrollPercent(Math.min(Math.max(scrollPercentage, 0), 100));
    };

    useEffect(() => {
        handleScroll();
        setIsMounted(true);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isMounted) {
        return <span class="h-4 hidden"></span>;
    }

    return <span class="font-bold text-xs text-cod_black dark:text-cod_white">{Math.round(scrollPercent)}%</span>;
}
