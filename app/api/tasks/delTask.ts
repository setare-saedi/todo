"use server";
export interface DeleteTaskResponse {
  success: boolean;
  message?: string;
}
export async function delTask(id: string): Promise<DeleteTaskResponse | null> {
  // 'use server'
  try {
    const res = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) {
      throw new Error(`Failed to DELETE todo with status: ${res.status}`);
    }
    const data = await res.text();
    return data ? JSON.parse(data) : null;
    
  } catch (error) {
    console.error('Error deleting task:', error);
    return null;
  }
}