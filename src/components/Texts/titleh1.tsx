

interface Titleh1Props {
  title: string;
  className?: string;
}

export const Titleh1 = ({ title, className }: Titleh1Props) => {
  return (
    <h1
      className={`text-2xl md:text-3xl font-semibold md:text-center text-gray-800 capitalize lg:text-4xl dark:text-white ${className}`}
    >
      {title}
    </h1>
  );
};
