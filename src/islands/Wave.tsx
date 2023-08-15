import { useEffect, useRef } from "https://esm.sh/preact@10.15.1/hooks";

export default function Wave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveLayers = [
    {
      amplitude: 50 + Math.random() * 20,
      frequency: 0.01,
      speed: 0.1,
      yOffset: 300,
      color: "rgba(36, 135, 218, 0.3)",
    },
    {
      amplitude: 60 + Math.random() * 20,
      frequency: 0.005,
      speed: 0.15,
      yOffset: 250,
      color: "rgba(206, 194, 147, 0.3)",
    },
  ];
  let time = 0;
  let animationFrameId: number | null = null;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      if (!ctx) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.1;

      for (const wave of waveLayers) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - wave.yOffset);

        for (let x = 0; x < canvas.width; x += 10) {
          const y = canvas.height - wave.yOffset +
            Math.sin(x * wave.frequency + time) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.fillStyle = wave.color;
        ctx.fill();
        ctx.closePath();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} id="waveCanvas" className="h-96 w-full"></canvas>
  );
}
