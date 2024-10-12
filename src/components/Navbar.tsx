import ScrollPercentage from "./ui/ScrollPercentage";
import ToggleSwitch from "./ui/ToggleSwitch";
import Logo from "./ui/Logo";
import { useEffect, useState } from "preact/hooks";

interface Props {
    scrollPercent: number;
}

export default function Navbar({ scrollPercent }: Props) {
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        console.log(windowWidth);
        if (windowWidth <= 880) {
            setIsAtBottom(Math.round(scrollPercent) >= 99);
        } else {
            setIsAtBottom(Math.round(scrollPercent) >= 97);
        }
    }, [scrollPercent]);

    return (
        <div
            class={`mx-auto max-w-screen-2xl w-full flex flex-row items-center h-[39px] sm:h-[39.4px] px-3 sm:px-8 transition-all duration-150 ease-in ${
                isAtBottom ? "opacity-0 transform" : "opacity-100 transform"
            }`}>
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
