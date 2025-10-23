import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Convex collection schema definitions.
// TODO: implement collection schemas and indexes per Convex docs:
// - Run `convex dev` to validate schema changes
// - Add any additional fields your app needs

// Projects collection: store a minimal, searchable representation of GitHub repos
export type Project = {
  _id?: string; // will be filled by Convex
  githubId: number | string;
  name: string;
  description?: string | null;
  url: string;
  language?: string | null;
  topics?: string[] | null;
  stars?: number;
  updatedAt?: string; // ISO timestamp
  pinned?: boolean;
  createdAt?: string;
};

export type Task = {
  _id?: string;
  title: string;
  description?: string | null;
  status?: 'todo' | 'in_progress' | 'completed' | 'archived';
  dueDate?: string | null; // ISO timestamp
  assignedTo?: string | null; // user id
  createdBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
};

// Users collection: store minimal user data if you plan to persist users
export type User = {
  _id?: string;
  username: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  createdAt?: string;
};

// Settings / App meta (optional)
export type AppSetting = {
  _id?: string;
  key: string;
  value: unknown;
};