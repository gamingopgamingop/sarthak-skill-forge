"use client";

import { addTodo } from "./functions";

export default function AddTodo() {
  return (
    <form action={addTodo}>
      <input type="text" name="title" />
      <button type="submit">Add</button>
    </form>
  );
}
