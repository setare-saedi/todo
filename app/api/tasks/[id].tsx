import { TaskType } from '@/components/TaskType';
export async function fetchTaskData(taskId: string): Promise<TaskType> {
    try {
        const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
            cache: "no-cache",
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data: TaskType = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch task data');
    }
}