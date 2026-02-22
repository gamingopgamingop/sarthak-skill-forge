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

passEncoder.setVertexBuffer(0, vertexBuffer);
passEncoder.draw(3);

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
const NUM_ELEMENTS = 1000;
const BUFFER_SIZE = NUM_ELEMENTS * 4; // 4 bytes per float

const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const storageBuffer = device.createBuffer({
  size: BUFFER_SIZE,
  usage:
    GPUBufferUsage.STORAGE |
    GPUBufferUsage.COPY_SRC,
});

const readBuffer = device.createBuffer({
  size: BUFFER_SIZE,
  usage:
    GPUBufferUsage.COPY_DST |
    GPUBufferUsage.MAP_READ,
});

const shaderModule = device.createShaderModule({
  code: shader,
});

const computePipeline =
  device.createComputePipeline({
    layout: "auto",
    compute: {
      module: shaderModule,
      entryPoint: "main",
    },
  });

  const bindGroup = device.createBindGroup({
  layout: computePipeline.getBindGroupLayout(0),
  entries: [
    {
      binding: 0,
      resource: { buffer: storageBuffer },
    },
  ],
});

const encoder = device.createCommandEncoder();
const pass = encoder.beginComputePass();

pass.setPipeline(computePipeline);
pass.setBindGroup(0, bindGroup);

// ceil(1000 / 64)
pass.dispatchWorkgroups(Math.ceil(NUM_ELEMENTS / 64));

pass.end();

// Copy GPU → CPU buffer
encoder.copyBufferToBuffer(
  storageBuffer,
  0,
  readBuffer,
  0,
  BUFFER_SIZE
);

device.queue.submit([encoder.finish()]);

await readBuffer.mapAsync(GPUMapMode.READ);
const arrayBuffer = readBuffer.getMappedRange();
const result = new Float32Array(arrayBuffer);

console.log(result);

readBuffer.unmap();

const output = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});

const stagingBuffer = device.createBuffer({
  size: BUFFER_SIZE,
  usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
});

encoder.copyBufferToBuffer(
  output,
  0,
  stagingBuffer,
  0,
  BUFFER_SIZE
);

device.queue.submit([encoder.finish()]);

await stagingBuffer.mapAsync(GPUMapMode.READ);

const arrayBuffer = stagingBuffer.getMappedRange();
const result = new Float32Array(arrayBuffer);

console.log(result);

stagingBuffer.unmap();

const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: "storage",
      },
    },
  ],
});
const pipelineLayout = device.createPipelineLayout({
  bindGroupLayouts: [bindGroupLayout],
});
const computePipeline = device.createComputePipeline({
  layout: pipelineLayout,
  compute: {
    module: shaderModule,
    entryPoint: "main",
  },
});
const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: {
        buffer: output,
      },
    },
  ],
});

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