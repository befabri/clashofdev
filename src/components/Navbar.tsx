import { useEffect, useState } from "preact/compat";
import ScrollPercentage from "./ui/ScrollPercentage";
import ToggleSwitch from "./ui/ToggleSwitch";
import Logo from "./ui/Logo";

export default function Navbar() {
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [scrollPercent, setScrollPercent] = useState(0);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / docHeight) * 100;
        const boundedScrollPercent = Math.min(Math.max(scrollPercentage, 0), 100);
        setScrollPercent(boundedScrollPercent);
        setIsAtBottom(Math.round(boundedScrollPercent) >= 100);
    };

    useEffect(() => {
        handleScroll();
        setIsMounted(true);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isMounted || isAtBottom) {
        return (
            <div class="mx-auto max-w-screen-2xl w-full flex flex-row justify-between items-center px-8 h-[32px]"></div>
        );
    }

    return (
        <div class="mx-auto max-w-screen-2xl w-full flex flex-row items-center px-8">
            <div class="flex-1 flex">
                <Logo />
            </div>
            <div class="flex-1 flex justify-center">
                <ScrollPercentage scrollPercent={scrollPercent} />
            </div>
            <div class="flex-1 flex justify-end">
                <ToggleSwitch />
            </div>
        </div>
    );
}
