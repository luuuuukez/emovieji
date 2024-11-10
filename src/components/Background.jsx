import React, { useState, useEffect } from 'react';
import '../index.css';

function Background() {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const xOffset = ((e.clientX - innerWidth / 2) / innerWidth) * 25;
            const yOffset = ((e.clientY - innerHeight / 2) / innerHeight) * 25;
            setOffset({ x: xOffset, y: yOffset });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="background"
            style={{
                transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            }}
        ></div>
    );
}

export default Background;