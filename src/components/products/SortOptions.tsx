'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const sortOptions = [
  { value: 'name_asc', label: 'Naziv A-Z' },
  { value: 'name_desc', label: 'Naziv Z-A' },
  { value: 'created_desc', label: 'Najnoviji' },
  { value: 'created_asc', label: 'Najstariji' },
]

export default function SortOptions() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || 'name_asc'

  const handleSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sortValue)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="hidden md:block bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Sortiraj po</h3>
      <div className="space-y-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSort(option.value)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              currentSort === option.value
                ? 'bg-orange-100 text-orange-700 border border-orange-200'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
} 