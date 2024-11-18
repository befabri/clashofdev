import Navbar from "@components/Navbar";
import ProgressBar from "@components/ui/ProgressBar";
import { useEffect, useState } from "preact/hooks";

export default function Header() {
    const [scrollPercent, setScrollPercent] = useState(0);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        const boundedScrollPercent = Math.min(Math.max(scrollPercentage, 0), 100);
        setScrollPercent(boundedScrollPercent);
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header class="fixed top-0 z-50 w-full h-[39px]">
            <ProgressBar scrollPercent={scrollPercent} />
            <div class="flex flex-col items-center pt-[40px] sm:pt-[20px]">
                <Navbar scrollPercent={scrollPercent} />
            </div>
        </header>
    );
}
