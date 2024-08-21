import Image from "next/image"
export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <Image src="/loading.gif" alt="loading" width={100} height={100}/>
    </div>
  )
}
