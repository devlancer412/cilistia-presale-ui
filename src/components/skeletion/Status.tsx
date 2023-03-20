export const StatusSkeleton = () => {
  return (
    <div className='mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
      <div className='flex flex-col p-8 bg-white/5 gap-2'>
        <div
          data-skeleton
          className='w-full h-8 bg-gray-700 opacity-50 relative overflow-hidden rounded-md'
        ></div>
        <div
          data-skeleton
          className='w-full h-5 bg-gray-700 opacity-50 relative overflow-hidden rounded-md'
        ></div>
      </div>
      <div className='flex flex-col p-8 bg-white/5 gap-2'>
        <div
          data-skeleton
          className='w-full h-8 bg-gray-700 opacity-50 relative overflow-hidden rounded-md'
        ></div>
        <div
          data-skeleton
          className='w-full h-5 bg-gray-700 opacity-50 relative overflow-hidden rounded-md'
        ></div>
      </div>
      <div className='flex flex-col p-8 bg-white/5 gap-2'>
        <div
          data-skeleton
          className='w-full h-8 bg-gray-700 opacity-50 relative overflow-hidden rounded-md'
        ></div>
        <div
          data-skeleton
          className='w-full h-5 bg-gray-700 opacity-50 relative overflow-hidden rounded-md'
        ></div>
      </div>
      <div className='flex flex-col p-8 bg-white/5 gap-2'>
        <div
          data-skeleton
          className='w-full h-8 bg-gray-700 opacity-50 relative overflow-hidden rounded-md'
        ></div>
        <div
          data-skeleton
          className='w-full h-5 bg-gray-700 opacity-50 relative overflow-hidden rounded-md'
        ></div>
      </div>
    </div>
  );
};
