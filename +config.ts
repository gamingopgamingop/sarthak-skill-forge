// +config.ts
export const vike = {
  ssr: {
    target: "webworker",
    noExternal: process.env.NODE_ENV === "production",
  },
};
