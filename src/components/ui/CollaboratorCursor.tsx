import clsx from "clsx";

interface Props {
    style: "pink" | "green" | "blue" | "mustard" | "orange" | "purple";
    title: string;
    side: "right" | "left";
    isTextColored?: boolean;
}

const roundedSide = {
    left: "rounded-r-full rounded-bl-full rounded-tl-xl",
    right: "rounded-b-full rounded-tl-full rounded-tr-md",
};

const cursorStyles = {
    pink: "text-pink_mid dark:text-pink_light",
    green: "text-green_mid dark:text-green_light",
    blue: "text-blue_dark dark:text-blue_light",
    mustard: "text-mustard_mid dark:text-mustard_light",
    orange: "text-orange_mid dark:text-orange_light",
    purple: "text-purple_mid dark:text-purple_light",
};

const textStyles = {
    pink: "text-pink_light dark:text-pink_dark",
    green: "text-green_light dark:text-green_dark",
    blue: "text-blue_light dark:text-blue_dark",
    mustard: "text-mustard_light dark:text-mustard_dark",
    orange: "text-orange_light dark:text-orange_dark",
    purple: "text-purple_light dark:text-purple_dark",
    white: "text-cod_white dark:text-cod_black",
};

const styles = {
    pink: "bg-pink_mid border-pink_dark dark:border-pink_mid/60 dark:bg-pink_light",
    green: "bg-green_mid border-green_dark dark:border-green_mid/60 dark:bg-green_light",
    blue: "bg-blue_dark border-blue_dark dark:border-blue_mid/60 dark:bg-blue_light",
    mustard: "bg-mustard_mid border-mustard_dark dark:border-mustard_mid/60 dark:bg-mustard_light",
    orange: "bg-orange_mid border-orange_dark dark:border-orange_mid/60 dark:bg-orange_light",
    purple: "bg-purple_mid border-purple_dark dark:border-purple_mid/60 dark:bg-purple_light",
};

export default function CollaboratorCursor({ title, side, style, isTextColored = false }: Props) {
    return (
        <div
            name="collaborator_cursor"
            className={clsx("flex flex-col gap-[0.9px] z-30", side === "right" ? "items-end" : "")}>
            <div
                name="cursor"
                className={clsx(
                    "w-[14px] h-[12.63px]",
                    side === "left" ? " flex justify-end items-end" : "flex justify-start items-end"
                )}>
                <svg
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={clsx(
                        "w-[9.7px] h-[9.43px]",
                        cursorStyles[style],
                        side === "left" ? "" : "scale-x-[-1]"
                    )}>
                    <defs>
                        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow
                                dx="0.1"
                                dy="0.8"
                                stdDeviation="0.5"
                                flood-color="black"
                                flood-opacity="0.2"></feDropShadow>
                        </filter>
                    </defs>
                    <path
                        d="M2.82601 11.4738L1.08747 1.45503L11.001 6.26082L5.94248 7.63193L2.82601 11.4738Z"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="0.631858"
                        filter="url(#dropShadow)"></path>
                </svg>
            </div>
            <div
                name="title"
                className={clsx(
                    "inline-flex px-[12px] py-[6px] border-2 items-center",
                    side === "left" ? "ml-3.5" : "mr-3.5",
                    roundedSide[side],
                    styles[style],
                    isTextColored ? textStyles[style] : textStyles["white"]
                )}>
                <span class="font-semibold text-xs p-0 m-0 select-none">{title}</span>
            </div>
        </div>
    );
}
