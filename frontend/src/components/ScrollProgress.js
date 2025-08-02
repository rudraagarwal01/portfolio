export default function ScrollProgress({ progress }) {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}