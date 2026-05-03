export default function ScrollProgress({ progress }) {
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
