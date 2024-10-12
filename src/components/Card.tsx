export const Card = () => {
  return (
    
    <div
    className='w-[250px] rounded-xl bg-white shadow'
    aria-label='card-overlay-v3'
  >
    <CardHeader />
    <div className='flex flex-1 flex-col p-5'>
      <div className='mb-5 border-b border-gray-200 pb-5'>
        <h3 className='mb-1 text-lg font-bold'>The grand resort</h3>
        <span className='text-sm'>Karineside</span>
      </div>
      <div className='ml-auto flex w-full items-center justify-between'>
        <div className='text-sm text-slate-400'>Tue, Jul 20</div>
        <div className='flex items-center gap-x-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-yellow-500'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <span className='text-sm font-bold'>4.9</span>
        </div>
      </div>
    </div>
  </div>
  )
}

export const CardHeader = () => {
  return (
    <div className='h-[250px] w-full flex-shrink-0 rounded-xl'>
      <img
        src='https://bit.ly/3zzCTUT'
        alt=''
        className='h-full w-full rounded-xl object-cover'
      />
    </div>
  )
}
