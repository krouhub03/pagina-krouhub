"use client";

import React, { useEffect } from "react";
import {
    motion,
    useMotionValue,
    useMotionTemplate
} from "framer-motion";

const SpotlightBackground: React.FC = () => {
    // Global mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Track mouse relative to viewport for fixed background
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Spotlight gradient
    const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.10), transparent 80%)`;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030712]">
            {/* 1. Static Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

            {/* 2. Dynamic Spotlight Effect */}
            <motion.div
                className="absolute inset-0 opacity-100 transition-opacity duration-300"
                style={{ background }}
            />
        </div>
    );
};

export default SpotlightBackground;
