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
    const vertexBuffer = device.createBuffer({
        size: vertices.byteLength, // must match byte size
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        mappedAtCreation: true
        });
        device.queue.writeBuffer(vertexBuffer, 0, vertices);

        device.queue.writeBuffer(
            vertexBuffer,
            0,
            vertices.buffer,
            vertices.byteOffset,
            vertices.byteLength
            );
device.queue.writeBuffer(vertexBuffer, 0, vertices);

const pipeline = device.createRenderPipeline({
  layout: "auto",
  vertex: {
    module: shaderModule,
    entryPoint: "vertex_main",
    buffers: vertexBuffers,
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

const vertexBuffers = [
  {
    arrayStride: 32,
    stepMode: "vertex",
    attributes: [
      {
        shaderLocation: 0,
        offset: 0,
        format: "float32x4",
      },
      {
        shaderLocation: 1,
        offset: 16,
        format: "float32x4",
      },
    ],
  },
];

renderPass.setVertexBuffer(0, vertexBuffer);
renderPass.draw(3);

const format = navigator.gpu.getPreferredCanvasFormat();

const pipelineDescriptor = {
  layout: "auto",

  vertex: {
    module: shaderModule,
    entryPoint: "vertex_main",
    buffers: vertexBuffers,
  },

  fragment: {
    module: shaderModule,
    entryPoint: "fragment_main",
    targets: [{ format }],
  },

  primitive: {
    topology: "triangle-list",
      cullMode: "back",

  },
};

targets: [
  {
    format,
    blend: {
      color: {
        srcFactor: "src-alpha",
        dstFactor: "one-minus-src-alpha",
        operation: "add",
      },
      alpha: {
        srcFactor: "one",
        dstFactor: "zero",
        operation: "add",
      },
      depthStencil: {
  format: "depth24plus",
  depthWriteEnabled: true,
  depthCompare: "less",
},
    },
  },
]
function render() {
  const commandEncoder = device.createCommandEncoder();

  const textureView = context
    .getCurrentTexture()
    .createView();

  const clearColor = { r: 0.0, g: 0.5, b: 1.0, a: 1.0 };

  const renderPassDescriptor = {
    colorAttachments: [
      {
        view: textureView,
        clearValue: clearColor,
        loadOp: "clear",
        storeOp: "store",
      },
    ],
  };

  const passEncoder =
    commandEncoder.beginRenderPass(renderPassDescriptor);

  passEncoder.setPipeline(pipeline);
  passEncoder.setVertexBuffer(0, vertexBuffer);
  passEncoder.draw(3);

  passEncoder.end();

  device.queue.submit([commandEncoder.finish()]);
}

const renderPipeline = device.createRenderPipeline(pipelineDescriptor);
const commandEncoder = device.createCommandEncoder();
passEncoder.setPipeline(renderPipeline);
passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.draw(3);
const renderPass = commandEncoder.beginRenderPass({
  colorAttachments: [
    {
      view: context.getCurrentTexture().createView(),
      loadOp: "clear",
      storeOp: "store",
    },
  ],
});

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

useEffect(() => {
  render();
    requestAnimationFrame(frame);

}, []);
  requestAnimationFrame(frame);
  passEncoder.end();

device.queue.submit([commandEncoder.finish()]);


  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      style={{ border: "1px solid black" }}
    />
  );
}