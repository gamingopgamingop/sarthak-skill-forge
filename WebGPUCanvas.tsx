// @ts-ignore
// @ts-nocheck

import { useEffect, useRef } from "react";

export default function WebGPUCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    async function init() {
      if (!navigator.gpu) {
        console.error("WebGPU not supported.");
        return;
      }

      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        console.error("Couldn't request WebGPU adapter.");
        return;
      }

      const device = await adapter.requestDevice();

      const canvas = canvasRef.current;
      const context = canvas.getContext("webgpu");

      const format = navigator.gpu.getPreferredCanvasFormat();

      context.configure({
        device,
        format,
        alphaMode: "opaque",
      });

            // 🔥 Your WGSL Shader
      const shaders = `
      struct VertexOut {
        @builtin(position) position : vec4f,
        @location(0) color : vec4f
      }

      @vertex
      fn vertex_main(@location(0) position: vec4f,
                     @location(1) color: vec4f) -> VertexOut
      {
        var output : VertexOut;
        output.position = position;
        output.color = color;
        return output;
      }

      @fragment
      fn fragment_main(fragData: VertexOut) -> @location(0) vec4f
      {
        return fragData.color;
      }
      `;

      const shaderModule = device.createShaderModule({
        code: shaders,
      });

      // 🔺 Triangle vertices (position + color)
      const vertexData = new Float32Array([
        // x, y, z, w,     r, g, b, a
         0.0,  0.6, 0, 1,   1, 0, 0, 1,
        -0.6, -0.6, 0, 1,   0, 1, 0, 1,
         0.6, -0.6, 0, 1,   0, 0, 1, 1,
      ]);

      const vertexBuffer = device.createBuffer({
        size: vertexData.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      });

      device.queue.writeBuffer(vertexBuffer, 0, vertexData);

      const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
          module: shaderModule,
          entryPoint: "vertex_main",
          buffers: [
            {
              arrayStride: 8 * 4,
              attributes: [
                { shaderLocation: 0, offset: 0, format: "float32x4" },
                { shaderLocation: 1, offset: 4 * 4, format: "float32x4" },
              ],
            },
          ],
        },
        fragment: {
          module: shaderModule,
          entryPoint: "fragment_main",
          targets: [{ format }],
        },
        primitive: {
          topology: "triangle-list",
        },
      });

    function render() {

      // Clear screen example
      const encoder = device.createCommandEncoder();
      const textureView = context.getCurrentTexture().createView();

      const renderPass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: textureView,
            clearValue: { r: 0.2, g: 0.4, b: 0.8, a: 1.0 },
            loadOp: "clear",
            storeOp: "store",
          },
        ],
      });
        renderPass.setPipeline(pipeline);
        renderPass.setVertexBuffer(0, vertexBuffer);
        renderPass.draw(3);
        renderPass.end();
    }

        device.queue.submit([encoder.finish()]);


      renderPass.end();
      device.queue.submit([encoder.finish()]);

      console.log("WebGPU initialized");
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