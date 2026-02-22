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
      const vertices = new Float32Array([
  // x,    y,    z, w,   r, g, b, a
   0.0,  0.6,   0, 1,   1, 0, 0, 1,
  -0.5, -0.6,   0, 1,   0, 1, 0, 1,
   0.5, -0.6,   0, 1,   0, 0, 1, 1,
]);

const vertexBuffer = device.createBuffer({
  size: vertices.byteLength,
  usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
});

device.queue.writeBuffer(vertexBuffer, 0, vertices);

renderPass.setVertexBuffer(0, vertexBuffer);
renderPass.draw(3); // 3 vertices

buffers: [
  {
    arrayStride: 8 * 4, // 8 floats * 4 bytes
    attributes: [
      { shaderLocation: 0, offset: 0, format: "float32x4" },
      { shaderLocation: 1, offset: 4 * 4, format: "float32x4" },
    ],
  },
]

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