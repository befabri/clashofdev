import { useRef, useState, useEffect } from "preact/hooks";

export default function Lightning() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const colorChangeRef = useRef<SVGPathElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [lastCall, setLastCall] = useState<number>(0);
    const pressTimer = useRef<number | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            setCtx(canvasRef.current.getContext("2d"));
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
    }, []);

    function startPressTimer() {
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
        }
        pressTimer.current = window.setTimeout(() => {
            drawRandomLightning();
        }, 1200);
    }

    function cancelPressTimer() {
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }
    }

    function handleMouseDown() {
        startPressTimer();
    }

    function handleMouseUp() {
        cancelPressTimer();
    }

    function handleMouseLeave() {
        cancelPressTimer();
    }

    function handleTouchStart() {
        startPressTimer();
    }

    function handleTouchEnd() {
        cancelPressTimer();
    }

    function handleTouchCancel() {
        cancelPressTimer();
    }

    function drawBolt(xStart: number, yStart: number) {
        if (!ctx) return;

        let lineLength = 100;
        let lastX = xStart;
        let lastY = yStart;

        let currentAngle = Math.random() * Math.PI * 2;

        let xEndPrimary = xStart;
        let yEndPrimary = yStart;

        function drawSegment(i: number) {
            if (!ctx) return;
            if (i >= 3) {
                drawSecondaryBolt(xEndPrimary, yEndPrimary, lineLength);
                return;
            }

            const deviation = (Math.random() - 0.5) * (Math.PI / 3);
            currentAngle += deviation;

            const xEnd = lastX + lineLength * Math.cos(currentAngle);
            const yEnd = lastY + lineLength * Math.sin(currentAngle);

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(xEnd, yEnd);
            ctx.strokeStyle = "rgba(235, 216, 50, 0.7)";
            ctx.lineWidth = 15;
            ctx.stroke();

            lastX = xEnd;
            lastY = yEnd;
            xEndPrimary = xEnd;
            yEndPrimary = yEnd;
            lineLength += 20;

            setTimeout(() => drawSegment(i + 1), 100);
        }

        drawSegment(0);

        const clearDelay = 1500 + Math.random() * 300;
        setTimeout(() => {
            if (ctx && canvasRef.current) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }, clearDelay);
    }

    function drawSecondaryBolt(xStart: number, yStart: number, lineLength: number) {
        if (!ctx) return;

        function drawSecondarySegment(i: number) {
            if (!ctx) return;
            if (i >= 1) return;

            ctx.beginPath();
            ctx.moveTo(xStart, yStart);

            const maxDeviation = Math.PI / 3;
            const deviation = (Math.random() - 0.5) * 2 * maxDeviation;

            const angle = Math.random() * Math.PI * 2 + deviation;
            const xEnd = xStart + lineLength * Math.cos(angle);
            const yEnd = yStart + lineLength * Math.sin(angle);

            ctx.lineTo(xEnd, yEnd);
            ctx.strokeStyle = "rgba(235, 216, 50, 0.4)";
            ctx.lineWidth = 10;
            ctx.stroke();
        }

        drawSecondarySegment(0);
    }

    function drawRandomLightning() {
        if (!ctx || !canvasRef.current) return;

        const now = Date.now();
        if (now - lastCall < 1500) return;
        setLastCall(now);

        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;

        const rectWidth = 50;
        const rectHeight = 50;

        const rectX = canvasWidth / 2 - rectWidth / 2;
        const rectY = canvasHeight / 2 - rectHeight / 2;

        const totalBolts = 3 + Math.floor(Math.random() * 10);
        for (let i = 0; i < totalBolts; i++) {
            const xStart = rectX + Math.random() * rectWidth;
            const yStart = rectY + Math.random() * rectHeight;
            const delay = Math.random() * 600;
            setTimeout(() => drawBolt(xStart, yStart), delay);
        }
    }

    return (
        <>
            <svg
                class="w-[44px] h-[47px] z-30 cursor-pointer select-none group"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
                viewBox="0 0 44 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M21.2071 0.230266L0.473995 6.80435C0.349357 6.84387 0.267211 6.97261 0.271656 7.11618C0.918411 28.0055 5.10061 37.3815 24.7034 46.2452C24.7854 46.2823 24.8813 46.2791 24.9573 46.2365C42.0635 36.6608 44.9228 27.0296 43.4839 5.96458C43.4737 5.81557 43.3721 5.68425 43.2375 5.65088L21.3562 0.225944C21.3064 0.213576 21.255 0.215063 21.2071 0.230266Z"
                    fill="#F588B9"
                />
                <path
                    ref={colorChangeRef}
                    d="M30.443 9.22731L19.7173 10.5398L16.2928 24.7889L21.7295 24.1236L19.5836 35.8453L30.0803 18.9527L23.266 19.7865L30.443 9.22731Z"
                    class="group-hover:animate-lightning"
                    fill="#ECFFCE"
                />
            </svg>
            <canvas
                ref={canvasRef}
                class="absolute w-[75px] h-[75px] top-[-15px] left-[-15px] md:w-[200px] md:h-[200px] md:top-[-75px] md:left-[-75px] -z-10"></canvas>
        </>
    );
}
