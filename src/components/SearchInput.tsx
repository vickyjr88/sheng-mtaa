interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = 'Search…' }: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-full border border-line bg-white px-5 py-3 text-base text-ink placeholder:text-tan focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
    />
  )
}
