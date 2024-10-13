import { useState, useRef, useLayoutEffect, useEffect } from "preact/hooks";
import CollaboratorCursor from "./CollaboratorCursor";

interface Vector2 {
    x: number;
    y: number;
}

interface Cursor {
    x: number;
    y: number;
    velocity: Vector2;
    side: "right" | "left";
    title: string;
    color: "pink" | "green" | "blue" | "mustard" | "orange" | "purple";
}

const cursors = [
    {
        velocity: { x: 0, y: 0 },
        side: "left" as const,
        title: "@maislina_",
        color: "orange" as const,
    },
    {
        velocity: { x: 0, y: 0 },
        side: "right" as const,
        title: "@sometimecrea",
        color: "pink" as const,
    },
    {
        velocity: { x: 0, y: 0 },
        side: "left" as const,
        title: "@LLCoolChris",
        color: "blue" as const,
    },
];

function getInitialPositions(): Cursor[] {
    const isSm = typeof window !== "undefined" && window.innerWidth >= 640;
    const positions = [
        isSm ? { x: 249, y: 190 } : { x: 228, y: 189 },
        isSm ? { x: -19, y: 280 } : { x: -38, y: 279 },
        isSm ? { x: 221, y: 307 } : { x: 202, y: 306 },
    ];

    return cursors.map((cursor, index) => ({
        ...cursor,
        ...positions[index],
    }));
}

export default function CursorArea() {
    const [cursors, setCursors] = useState<Cursor[]>(getInitialPositions());
    const [isDragging, setIsDragging] = useState<number | null>(null);
    const startPos = useRef({ x: 0, y: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const dragStartTime = useRef<number>(0);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const childRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerSizes = useRef<{ width: number; height: number }[]>([]);
    const cursorSizes = useRef<{ width: number; height: number }[]>([]);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 640px)");
        const handleMediaChange = () => {
            setCursors(getInitialPositions());
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleMediaChange);
            return () => mediaQuery.removeEventListener("change", handleMediaChange);
        }
    }, []);

    const onStart = (e: MouseEvent | TouchEvent, index: number) => {
        e.preventDefault();
        if (!parentRef.current) return;
        const parent = parentRef.current.getBoundingClientRect();

        let clientX, clientY;
        if ("touches" in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        setIsDragging(index);
        startPos.current = { x: clientX - parent.left, y: clientY - parent.top };
        lastPos.current = { x: clientX - parent.left, y: clientY - parent.top };
        dragStartTime.current = performance.now();
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
        if (isDragging === null || !parentRef.current) return;

        const parent = parentRef.current.getBoundingClientRect();

        let clientX, clientY;
        if ("touches" in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const dx = clientX - parent.left - lastPos.current.x;
        const dy = clientY - parent.top - lastPos.current.y;

        if (dx === 0 && dy === 0) return;

        setCursors((prevCursors) => {
            const newPositions = prevCursors.map((cursor, index) => {
                if (index !== isDragging) return cursor;

                const newX = cursor.x + dx;
                const newY = cursor.y + dy;

                const cursorSize = cursorSizes.current[index]?.width || 0;
                const totalWidth = containerSizes.current[index]?.width || 0;

                let clampedX = newX;
                let clampedY = newY;

                if (cursor.side === "right") {
                    clampedX = Math.max(-totalWidth + cursorSize, Math.min(newX, parent.width - totalWidth));
                } else {
                    clampedX = Math.max(0, Math.min(newX, parent.width - cursorSize));
                }

                clampedY = Math.max(0, Math.min(newY, parent.height - cursorSize));

                return { ...cursor, x: clampedX, y: clampedY };
            });
            return newPositions;
        });

        lastPos.current = { x: clientX - parent.left, y: clientY - parent.top };
    };

    const onEnd = (e: MouseEvent | TouchEvent) => {
        if (isDragging === null || !parentRef.current) return;

        const parent = parentRef.current.getBoundingClientRect();

        let clientX, clientY;
        if ("changedTouches" in e) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const dx = clientX - parent.left - startPos.current.x;
        const dy = clientY - parent.top - startPos.current.y;

        const dragEndTime = performance.now();
        const duration = (dragEndTime - dragStartTime.current) / 1000;

        setCursors((prevCursors) => {
            const newPositions = prevCursors.map((cursor, index) => {
                if (index !== isDragging) return cursor;

                const time = duration > 0 ? duration : 0.01;
                const velocityScale = 0.05;

                return {
                    ...cursor,
                    velocity: {
                        x: (dx / time) * velocityScale,
                        y: (dy / time) * velocityScale,
                    },
                };
            });
            return newPositions;
        });

        if (animationRef.current === null) {
            animationRef.current = requestAnimationFrame(moveWithVelocity);
        }

        setIsDragging(null);
    };

    const moveWithVelocity = () => {
        setCursors((prevCursors) => {
            const parent = parentRef.current;
            if (!parent) {
                animationRef.current = null;
                return prevCursors;
            }

            const parentRect = parent.getBoundingClientRect();
            const parentWidth = parentRect.width;
            const parentHeight = parentRect.height;

            let anyVelocity = false;

            const newPositions = prevCursors.map((cursor, index) => {
                if (cursor.velocity.x === 0 && cursor.velocity.y === 0) return cursor;

                anyVelocity = true;

                let newX = cursor.x + cursor.velocity.x;
                let newY = cursor.y + cursor.velocity.y;

                const cursorSize = cursorSizes.current[index]?.width || 0;
                const totalWidth = containerSizes.current[index]?.width || 0;

                if (cursor.side === "right") {
                    const minX = -totalWidth + cursorSize;
                    const maxX = parentWidth - totalWidth;

                    if (newX < minX) {
                        newX = minX;
                        cursor.velocity.x *= -0.3;
                    } else if (newX > maxX) {
                        newX = maxX;
                        cursor.velocity.x *= -0.3;
                    }
                } else {
                    const minX = 0;
                    const maxX = parentWidth - cursorSize;

                    if (newX < minX) {
                        newX = minX;
                        cursor.velocity.x *= -0.3;
                    } else if (newX > maxX) {
                        newX = maxX;
                        cursor.velocity.x *= -0.3;
                    }
                }

                if (newY < 0) {
                    newY = 0;
                    cursor.velocity.y *= -0.3;
                } else if (newY > parentHeight - cursorSize) {
                    newY = parentHeight - cursorSize;
                    cursor.velocity.y *= -0.3;
                }

                let newVelocityX = cursor.velocity.x * 0.85;
                let newVelocityY = cursor.velocity.y * 0.85;

                if (Math.abs(newVelocityX) < 0.1) newVelocityX = 0;
                if (Math.abs(newVelocityY) < 0.1) newVelocityY = 0;

                return {
                    ...cursor,
                    x: newX,
                    y: newY,
                    velocity: {
                        x: newVelocityX,
                        y: newVelocityY,
                    },
                };
            });

            if (anyVelocity) {
                animationRef.current = requestAnimationFrame(moveWithVelocity);
            } else {
                animationRef.current = null;
            }

            return newPositions;
        });
    };

    useLayoutEffect(() => {
        cursors.forEach((_, index) => {
            const child = childRefs.current[index];
            if (child) {
                const containerElement = child.querySelector('[name="collaborator_cursor"]');
                const cursorElement = child.querySelector('[name="cursor"]');

                if (containerElement) {
                    const { offsetWidth, offsetHeight } = containerElement as HTMLElement;
                    containerSizes.current[index] = { width: offsetWidth, height: offsetHeight };
                }

                if (cursorElement) {
                    const { offsetWidth, offsetHeight } = cursorElement as HTMLElement;
                    cursorSizes.current[index] = { width: offsetWidth, height: offsetHeight };
                }
            }
        });
    }, [cursors]);

    return (
        <div
            ref={parentRef}
            class="absolute inset-0 z-30"
            onMouseMove={onMove}
            onMouseUp={onEnd}
            onMouseLeave={onEnd}
            onTouchMove={onMove}
            onTouchEnd={onEnd}
            onTouchCancel={onEnd}>
            {cursors.map((cursor, index) => (
                <div
                    key={index}
                    ref={(el) => (childRefs.current[index] = el)}
                    class="z-30"
                    style={{
                        position: "absolute",
                        left: `${cursor.x}px`,
                        top: `${cursor.y}px`,
                        cursor: isDragging === index ? "grabbing" : "grab",
                    }}
                    onMouseDown={(e) => onStart(e, index)}
                    onTouchStart={(e) => onStart(e, index)}>
                    <CollaboratorCursor title={cursor.title} side={cursor.side} style={cursor.color} />
                </div>
            ))}
        </div>
    );
}
