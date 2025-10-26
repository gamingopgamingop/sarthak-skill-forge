import React from "react";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
// Devtools are optional; available in development
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useVirtualizer } from "@tanstack/react-virtual";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useForm } from "@tanstack/react-form";
import { Store } from '@tanstack/store';
import { useRanger } from "@tanstack/react-ranger";
import { useMemo, useRef } from "react";

const Root = () => (
  <div className="min-h-screen pt-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">TanStack Router Demo</h1>
        <p className="text-muted-foreground">This area is powered by TanStack Router.</p>
      </div>
      <Outlet />
    </div>
  </div>
);

const Home = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">/tsr</h2>
    <p className="text-muted-foreground">Welcome to the TanStack Router section.</p>
  </div>
);

const About = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">About (TanStack)</h2>
    <p className="text-muted-foreground">This page is rendered by TanStack Router.</p>
  </div>
);

// Table Demo
type Person = { id: number; firstName: string; lastName: string; age: number };
const columnHelper = createColumnHelper<Person>();
const TableDemo = () => {
  const data = useMemo<Person[]>(() => Array.from({ length: 25 }).map((_, i) => ({ id: i+1, firstName: `Name${i+1}`, lastName: `Surname${i+1}`, age: 20 + (i % 10) })), []);
  const columns = useMemo(() => [
    columnHelper.accessor("firstName", { header: () => "First Name" }),
    columnHelper.accessor("lastName", { header: () => "Last Name" }),
    columnHelper.accessor("age", { header: () => "Age" }),
  ], []);
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Table (TanStack Table)</h2>
      <table className="w-full text-left border">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(h => (
                <th key={h.id} className="p-2 border-b">{flexRender(h.column.columnDef.header, h.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="odd:bg-muted/10">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-2 border-b">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Form Demo
const FormDemo = () => {
  const form = useForm({
    defaultValues: { name: "", email: "" },
    onSubmit: async ({ value }) => {
      alert(`Submitted: ${JSON.stringify(value)}`);
    },
  });
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Form (TanStack Form)</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-3 max-w-md"
      >
        <form.Field name="name" children={(field) => (
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="w-full border rounded px-2 py-1 bg-background" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
          </div>
        )} />
        <form.Field name="email" children={(field) => (
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full border rounded px-2 py-1 bg-background" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
          </div>
        )} />
        <button type="submit" className="px-3 py-1 rounded bg-primary text-primary-foreground">Submit</button>
      </form>
    </div>
  );
};

// Virtual Demo
const VirtualDemo = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({ count: 1000, getScrollElement: () => parentRef.current, estimateSize: () => 36 });
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Virtual List (TanStack Virtual)</h2>
      <div ref={parentRef} className="h-64 overflow-auto border rounded" style={{ contain: 'strict' }}>
        <div style={{ height: rowVirtualizer.getTotalSize(), width: '100%', position: 'relative' }}>
          {rowVirtualizer.getVirtualItems().map(vi => (
            <div key={vi.key} className="px-3 border-b absolute left-0 right-0" style={{ transform: `translateY(${vi.start}px)`, height: vi.size }}>
              Row {vi.index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Store Demo
const counterStore = createStore({ count: 0 });
const StoreDemo = () => {
  const count = counterStore.useState((s) => s.count);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Store (TanStack Store)</h2>
      <div className="flex items-center gap-3">
        <button className="px-3 py-1 rounded bg-secondary text-secondary-foreground" onClick={() => counterStore.setState((s) => ({ count: s.count - 1 }))}>-</button>
        <span className="min-w-10 text-center">{count}</span>
        <button className="px-3 py-1 rounded bg-secondary text-secondary-foreground" onClick={() => counterStore.setState((s) => ({ count: s.count + 1 }))}>+</button>
      </div>
    </div>
  );
};

// Ranger Demo (range slider)
const RangerDemo = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = React.useState<number[]>([30]);
  const { getTrackProps, handles, segments } = useRanger({
    getRangerElement: () => trackRef.current as HTMLDivElement,
    values: value,
    onChange: setValue,
    min: 0,
    max: 100,
    stepSize: 1,
  });
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ranger (TanStack Ranger)</h2>
      <div ref={trackRef} {...getTrackProps({
        className: "relative h-2 w-full max-w-md bg-secondary rounded",
        style: { touchAction: 'none' },
      })}>
        {segments.map(({ getSegmentProps }, i) => (
          <div key={i} {...getSegmentProps({ className: "absolute h-2 bg-primary/40" })} />
        ))}
        {handles.map(({ value, active, getHandleProps }, i) => (
          <button key={i} {...getHandleProps({
            className: `absolute -top-1 h-4 w-4 rounded-full border border-primary bg-background ${active ? 'ring-2 ring-primary' : ''}`,
          })} aria-label="slider-handle" />
        ))}
      </div>
      <div className="mt-3 text-sm text-muted-foreground">Value: {value[0]}</div>
    </div>
  );
};

const rootRoute = createRootRoute({
  component: Root,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "about",
  component: About,
});

const tableRoute = createRoute({ getParentRoute: () => rootRoute, path: "table", component: TableDemo });
const formRoute = createRoute({ getParentRoute: () => rootRoute, path: "form", component: FormDemo });
const virtualRoute = createRoute({ getParentRoute: () => rootRoute, path: "virtual", component: VirtualDemo });
const storeRoute = createRoute({ getParentRoute: () => rootRoute, path: "store", component: StoreDemo });

const rangerRoute = createRoute({ getParentRoute: () => rootRoute, path: "ranger", component: RangerDemo });

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, tableRoute, formRoute, virtualRoute, storeRoute, rangerRoute]);

export const router = createRouter({
  routeTree,
  // Mounted under React Router path /tsr/*
  basepath: "/tsr",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function TsrApp() {
  return (
    <>
      <RouterProvider router={router} />
      {import.meta.env.DEV ? (
        <TanStackRouterDevtools position="bottom-right" />
      ) : null}
    </>
  );
}


