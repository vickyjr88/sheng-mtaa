export function ErrorMessage({ message = 'Something went wrong.' }: { message?: string }) {
  return <p className="py-4 text-center text-sm text-tan">{message}</p>
}
