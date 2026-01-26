// @ts-expect-error
// @ts-ignore
// @ts-nocheck
import { Counter } from "./Counter.js";
import React from "react";
export default function Page({ routeParams }: { routeParams: { id: string } }) {
  return React.createElement("h1", null, "User ", routeParams.id);
}
// src/pages/index/+Page.tsx
export  function HomePage() {
  return (
    <>
      <h1>My Vike app</h1>
      <p>This page is:</p>
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  );
}
