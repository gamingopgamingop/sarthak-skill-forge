// @ts-ignore
// @ts-nocheck
import { useState } from 'react'

export interface Todo {
  id: string
  description: string
  createdAt: string
  dueDate?: string
  completedAt?: string
}

export const useTodoEndpoints = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createTodo = async (description: string, dueDate?: string): Promise<Todo | null> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, dueDate }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Failed to create todo: ${response.statusText}`)
      }

      const todo: Todo = await response.json()
      return todo
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
      console.error('Error creating todo:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateTodo = async (id: string, updates: Partial<Todo>): Promise<Todo | null> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/todo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Failed to update todo: ${response.statusText}`)
      }

      const todo: Todo = await response.json()
      return todo
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
      console.error('Error updating todo:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteTodo = async (id: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/todo/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Failed to delete todo: ${response.statusText}`)
      }

      return true
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
      console.error('Error deleting todo:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    createTodo,
    updateTodo,
    deleteTodo,
    loading,
    error
  }
}
