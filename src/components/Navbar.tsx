import ScrollPercentage from "./ui/ScrollPercentage";
import ToggleSwitch from "./ui/ToggleSwitch";
import Logo from "./ui/Logo";
import { useEffect, useState } from "preact/hooks";

interface Props {
    scrollPercent: number;
}

export default function Navbar({ scrollPercent }: Props) {
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        setIsAtBottom(Math.round(scrollPercent) >= 100);
    }, [scrollPercent]);

    return (
        <div
            class={`mx-auto max-w-screen-2xl w-full flex flex-row items-center h-[39px] sm:h-[39.4px] px-3 sm:px-8 transition-all duration-150 ease-in-out ${
                isAtBottom ? "opacity-0 transform" : "opacity-100 transform "
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
