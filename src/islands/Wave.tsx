import {
  useEffect,
  useRef,
  useState,
} from "https://esm.sh/preact@10.15.1/hooks";

export default function Wave() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 波浪配置
  const waveLayers = [
    {
      amplitude: 20 + Math.random() * 10, // 振幅，调整波浪的高度
      frequency: 0.01, // 波浪的频率
      speed: 0.005, // 波浪的速度
      yOffset: 0.3, // 波浪的垂直偏移
      color: "rgba(36, 135, 218, 0.3)", // 波浪的颜色
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
    animate();
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const wave of waveLayers) {
          const amplitude = wave.amplitude * (canvas.width / 1440); // 根据屏幕宽度调整振幅
          let yOffset = wave.yOffset * canvas.height;

          if (isMouseOverCanvas) {
            yOffset += (mousePosition.y - canvas.height / 2) * 0.1; // 鼠标位置影响波浪垂直偏移
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
  };

  const updateMousePosition = (e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      setMousePosition({ x: mouseX, y: mouseY });
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

    animate();

    canvas.addEventListener("mousemove", updateMousePosition); // 监听鼠标移动事件，更新鼠标位置
    canvas.addEventListener("mouseenter", handleMouseEnter); // 监听鼠标进入画布事件，开始动画
    canvas.addEventListener("mouseleave", handleMouseLeave); // 监听鼠标离开画布事件，停止动画

    return () => {
      canvas.removeEventListener("mousemove", updateMousePosition); // 移除鼠标移动事件监听器
      canvas.removeEventListener("mouseenter", handleMouseEnter); // 移除鼠标进入画布事件监听器
      canvas.removeEventListener("mouseleave", handleMouseLeave); // 移除鼠标离开画布事件监听器
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId); // 取消动画帧请求
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="waveCanvas"
      className="h-64 w-full"
    >
    </canvas>
  );
}
