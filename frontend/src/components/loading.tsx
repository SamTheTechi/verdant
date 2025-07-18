const Loading = ({ height, context }: { height: number; context: string }) => {
  return (
    <section
      className={`h-[${height}vh] w-full animate-pulse font-context flex justify-center items-center text-dark pt-16`}>
      <div className='font-semibold text-5xl'>{context}</div>
    </section>
  );
};

export default Loading;
