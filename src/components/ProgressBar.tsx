interface Props {
    scrollPercent: number;
}

export default function ProgressBar({ scrollPercent }: Props) {
    return <div class="bg-cod_black h-1 absolute" style={{ width: `${scrollPercent}%` }}></div>;
}
