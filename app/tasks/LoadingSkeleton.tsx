function LoadingSkeleton() {
  let numbers: number[] = []
  for (let i = 0; i < 10; i++) {
    numbers.push(i);

  }
  return (
    <>
    {
      numbers.map((e) => (
        <li key={e} className=" animate-pulse flex gap-4 items-center border border-violet-400 bg-white mx-auto w-fit px-4 py-3 rounded-lg text-sm my-3 shadow-sm">
          <span className="w-4 h-4 bg-gray-300 opacity-75 rounded" ></span>
          <p className=' pl-2 w-[405px] h-2 bg-gray-300 opacity-75 rounded'></p>
          <span className="w-5 h-6 bg-gray-300 opacity-75 rounded" ></span>
          <span className="w-5 h-2 bg-gray-300 opacity-75 rounded" ></span>
        </li>)
      )
    }
    </>

  )
}

export default LoadingSkeleton