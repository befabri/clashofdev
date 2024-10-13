import ScrollPercentage from "./ui/ScrollPercentage";
import ToggleSwitch from "./ui/ToggleSwitch";
import Logo from "./ui/Logo";
import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
    scrollPercent: number;
}
export default function Navbar({ scrollPercent }: Props) {
    const [isAtBottom, setIsAtBottom] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctaElement = document.getElementById("cta");

        const checkIfAtBottom = () => {
            const navbarElement = navbarRef.current;
            if (!navbarElement || !ctaElement) return;

            const navbarRect = navbarElement.getBoundingClientRect();
            const ctaRect = ctaElement.getBoundingClientRect();

            if (navbarRect.top < 40 && ctaRect.y <= navbarRect.y + 46) {
                setIsAtBottom(true);
            } else if (ctaRect.y <= navbarRect.y + 50) {
                setIsAtBottom(true);
            } else {
                setIsAtBottom(false);
            }
        };

        if (Math.round(scrollPercent) >= 99) {
            setIsAtBottom(true);
        } else {
            checkIfAtBottom();
        }
    }, [scrollPercent]);

    return (
        <div
            ref={navbarRef}
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
