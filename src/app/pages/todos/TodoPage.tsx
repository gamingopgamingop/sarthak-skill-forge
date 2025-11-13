export async function Todos({ ctx }) {
  const todos = await db.todo.findMany({ where: { userId: ctx.user.id } });
  return (
    <ol>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ol>
  );
}

export async function TodoPage({ ctx }) {
  return (
    <div>
      <h1>Todos</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Todos ctx={ctx} />
      </Suspense>
    </div>
  );
}
