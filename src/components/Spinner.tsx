export function Spinner() {
  return (
    <div className="flex justify-center py-6" role="status" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-500" />
    </div>
  )
}
