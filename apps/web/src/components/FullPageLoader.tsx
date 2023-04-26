const FullPageLoader = () => {
  return (
    <div className='absolute bottom-1/2 right-1/2  translate-x-1/2 translate-y-1/2 transform '>
      <div
        className='inline-block h-10 w-10 animate-spin rounded-full border-[3px] border-current border-t-transparent text-pink-600'
        role='status'
        aria-label='loading'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default FullPageLoader;
