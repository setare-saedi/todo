'use client'
import { useState } from "react";
import Link from "next/link";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { BsCheck2Square } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { TfiMoreAlt } from "react-icons/tfi";
import { TaskType } from "../TaskType";
import { delTask } from "@/app/api/tasks/delTask";
import { checkTask } from "@/app/api/tasks/checkTask";


interface PropsType {
    task: TaskType
    deleteTask:(e:string)=>void
}

const TaskItem: React.FC<PropsType> = ({ task,deleteTask }) => {

    const [data, setData] = useState(task)
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const checkHandler = (e: TaskType) => {
        checkTask(e)
        setData({ ...data, isCompleted: !data.isCompleted })
    }

    const delHandler = async (e: string) => {
        setError(null); // Reset error state
        setSuccess(false); // Reset success state 

        try {
            const result = await delTask(e)

            if (result) {
                setSuccess(true);
                deleteTask('sucsess')

            }
        } catch (err) {
            setError('An error occurred while deleting the task.');
            console.error('Error:', err);
            deleteTask('error')
        }
    }

    return (
        <li className=" flex gap-3 items-center border border-violet-400 bg-white mx-auto w-fit pr-2 px-4 py-3 rounded-lg text-sm my-3 shadow-sm">
            <button onClick={() => checkHandler(data)}>{
                data.isCompleted ? <BsCheck2Square className=" text-xl text-green-800 w-8" /> :
                    <MdOutlineCheckBoxOutlineBlank className=" text-xl w-8 text-green-800" />
            }</button>
            <p className={`${data.isCompleted && ' opacity-60'} pl-2 w-[400px]`} >{data.task}</p>
            <button className=" px-2" onClick={() => delHandler(data.id)}><FaRegTrashCan className=" text-red-800 text-xl" /></button>
            <Link href={`/tasks/${data.id}`}><TfiMoreAlt /></Link>
        </li>
    )
}
export default TaskItem
