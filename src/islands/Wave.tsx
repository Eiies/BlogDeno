import {
  useEffect,
  useRef,
  useState,
} from "https://esm.sh/preact@10.15.1/hooks";

export default function Wave() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveLayers = [
    {
      amplitude: 20 + Math.random() * 10, // 调整振幅值范围
      frequency: 0.01,
      speed: 0.005, // 调整速度值
      yOffset: 0.3, // 用相对值替代像素值
      color: "rgba(36, 135, 218, 0.3)",
    },
    {
      amplitude: 30 + Math.random() * 10,
      frequency: 0.005,
      speed: 0.008,
      yOffset: 0.25,
      color: "rgba(206, 194, 147, 0.3)",
    },
  ];

  let animationFrameId: number | null = null;
  let startTime = 0;
  let isMouseOverCanvas = false;

  const handleMouseEnter = () => {
    isMouseOverCanvas = true;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animate(); // 启动波浪跟随鼠标的效果
  };

  const handleMouseLeave = () => {
    isMouseOverCanvas = false;
  };

  const animate = () => {
    if (!startTime) {
      startTime = performance.now();
    }

    const elapsedTime = performance.now() - startTime;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (const wave of waveLayers) {
            const amplitude = wave.amplitude * (canvas.width / 1440);
            let yOffset = wave.yOffset * canvas.height;

            if (isMouseOverCanvas) {
              yOffset += (mousePosition.y - canvas.height / 2) * 0.1;
            }

            ctx.beginPath();
            ctx.moveTo(0, canvas.height - yOffset);

            for (let x = 0; x < canvas.width; x += 10) {
              const y = canvas.height - yOffset +
                Math.sin(x * wave.frequency + elapsedTime * wave.speed) *
                  amplitude;
              ctx.lineTo(x, y);
            }

            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.fillStyle = wave.color;
            ctx.fill();
            ctx.closePath();
          }

          animationFrameId = requestAnimationFrame(animate);
        }
      }
    }
  };

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
    // 启动初始动画
    animate();

    const updateMousePosition = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      setMousePosition({ x: mouseX, y: mouseY });
    };

    canvas.addEventListener("mousemove", updateMousePosition);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // 清除事件监听器和动画
    return () => {
      canvas.removeEventListener("mousemove", updateMousePosition);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="waveCanvas"
      className="h-96 w-full"
    >
    </canvas>
  );
}
