'use server';
import { TaskType } from "@/components/TaskType"
export async function addTask(newTask: TaskType) {
    try {
        const response = await fetch('http://localhost:8080/tasks', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            // مدیریت خطا در صورت وجود مشکل در پاسخ
            const errorData = await response.json();
            throw new Error(`Failed to add task: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }

        // بازگرداندن داده‌های پاسخ در صورت نیاز
        return await response.json();
    } catch (error) {
        console.error('Error adding task:', error);
        throw new Error('Failed to fetch task data');
    }
}