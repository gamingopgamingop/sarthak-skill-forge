// @ts-ignore
// @ts-nocheck

import { useEffect, useRef } from "react";

export default function WebGPUCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    async function init() {
      if (!navigator.gpu) {
        console.error("WebGPU not supported");
        return;
      }

      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) return;

      const device = await adapter.requestDevice();

      // ✅ React-safe canvas access
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("webgpu");
      if (!context) return;

      context.configure({
        device,
        format: navigator.gpu.getPreferredCanvasFormat(),
        alphaMode: "premultiplied", // or "opaque"
      });

      console.log("WebGPU context configured");
    }

    init();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      style={{ border: "1px solid black" }}
    />
  );
}