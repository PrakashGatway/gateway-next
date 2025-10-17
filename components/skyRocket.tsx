import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
}

interface Rocket {
    x: number;
    y: number;
    targetY: number;
    color: string;
    exploded: boolean;
    size: number;
}

const SkyRocketCelebration = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const diwaliColors = [
            "hsla(45, 100%, 60%, 1)",
            "hsla(30, 100%, 60%, 1)",
            "hsla(15, 100%, 60%, 1)",
            "hsla(280, 80%, 70%, 1)",
            "hsla(50, 100%, 70%, 1)",
            "hsla(340, 80%, 70%, 1)",
            "hsla(200, 80%, 70%, 1)",
            "hsla(120, 60%, 60%, 1)",
        ];

        const rockets: Rocket[] = [];
        const particles: Particle[] = [];

        const MAX_ROCKETS = 5;
        const MAX_PARTICLES = 500; // Prevent memory bloat

        const createRocket = () => {
            if (rockets.length >= MAX_ROCKETS) return; // Simple throttle

            const size = 0.8 + Math.random() * 0.4;
            rockets.push({
                x: Math.random() * canvas.width,
                y: canvas.height,
                targetY: Math.random() * canvas.height * 0.3 + 60,
                color: diwaliColors[Math.floor(Math.random() * diwaliColors.length)],
                exploded: false,
                size,
            });
        };

        const createSparkle = (x: number, y: number, color: string) => {
            const sparkleCount = 30 + Math.random() * 60;
            for (let i = 0; i < sparkleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const velocity = 0.5 + Math.random() * 1.5;
                const size = 0.5 + Math.random() * 1;

                particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    life: 0.8 + Math.random() * 0.4,
                    color,
                    size,
                });
            }
        };

        const animate = () => {
            ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = rockets.length - 1; i >= 0; i--) {
                const rocket = rockets[i];

                if (!rocket.exploded) {
                    rocket.y -= 4;

                    // Trail
                    ctx.beginPath();
                    ctx.strokeStyle = rocket.color;
                    ctx.lineWidth = rocket.size;
                    ctx.moveTo(rocket.x, rocket.y);
                    ctx.lineTo(rocket.x, rocket.y + 2 * rocket.size);
                    ctx.stroke();

                    // Head with glow
                    ctx.shadowColor = rocket.color;
                    ctx.shadowBlur = 8;
                    ctx.beginPath();
                    ctx.arc(rocket.x, rocket.y, 1.5 * rocket.size, 0, Math.PI * 2);
                    ctx.fillStyle = rocket.color;
                    ctx.fill();
                    ctx.shadowBlur = 0;

                    if (Math.random() > 0.85) {
                        particles.push({
                            x: rocket.x + (Math.random() - 0.5) * 3,
                            y: rocket.y + Math.random() * 10,
                            vx: (Math.random() - 0.5) * 0.5,
                            vy: Math.random() * 0.5,
                            life: 0.3,
                            color: rocket.color,
                            size: 0.5 + Math.random() * 1,
                        });
                    }

                    if (rocket.y <= rocket.targetY) {
                        rocket.exploded = true;
                        createSparkle(rocket.x, rocket.y, rocket.color);
                        rockets.splice(i, 1); // ✅ Remove immediately after explosion
                    }
                }
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.02;
                p.life -= 0.015;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.globalAlpha = p.life;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 3;
                ctx.fillStyle = p.color;
                ctx.beginPath();

                if (Math.random() > 0.3) {
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                } else {
                    ctx.rect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                }
                ctx.fill();
            }

            if (particles.length > MAX_PARTICLES) {
                particles.splice(0, particles.length - MAX_PARTICLES);
            }

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            requestAnimationFrame(animate);
        };

        const rocketInterval = setInterval(() => {
            createRocket();
            if (Math.random() > 0.6) {
                const count = 1 + Math.floor(Math.random() * 2);
                for (let i = 1; i <= count; i++) {
                    setTimeout(createRocket, i * 100);
                }
            }
        }, 800);

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            clearInterval(rocketInterval);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{
                mixBlendMode: "multiply",
                background: "transparent",
            }}
        />
    );
};

export default SkyRocketCelebration;