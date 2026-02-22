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
      const device = await adapter.requestDevice();

      const canvas = canvasRef.current;
      const context = canvas.getContext("webgpu");

      context.configure({
        device,
        format: navigator.gpu.getPreferredCanvasFormat(),
        alphaMode: "premultiplied",
      });

      console.log("Canvas configured");
    }

    init();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="gpuCanvas"
      width={800}
      height={500}
      style={{ border: "1px solid black" }}
    />
  );
}