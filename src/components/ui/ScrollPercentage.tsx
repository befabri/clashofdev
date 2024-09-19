interface Props {
    scrollPercent: number;
}

export default function ScrollPercentage({ scrollPercent }: Props) {
    return <span class="font-bold text-xs text-cod_black dark:text-cod_white">{Math.round(scrollPercent)}%</span>;
}
