'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Category } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Filter, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory?: string
}

export default function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isExpanded, setIsExpanded] = useState(false)

  const createCategoryUrl = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (categorySlug) {
      params.set('category', categorySlug)
    } else {
      params.delete('category')
    }
    return `${pathname}?${params.toString()}`
  }

  // Show first 3 categories on mobile, all on desktop
  const visibleCategories = categories.slice(0, 3)
  const hiddenCategories = categories.slice(3)
  const hasHiddenCategories = hiddenCategories.length > 0

  return (
    <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <Filter className="h-5 w-5 text-white" />
          <h3 className="text-lg font-semibold text-white">
            Kategorije
          </h3>
        </div>
      </div>
      
      {/* Categories List */}
      <div className="p-4 space-y-1">
        <Link
          href={createCategoryUrl(null)}
          className={cn(
            "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
            !selectedCategory
              ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200 shadow-sm"
              : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
          )}
        >
          <span>Sve kategorije</span>
          {!selectedCategory && (
            <ChevronRight className="h-4 w-4 text-orange-600" />
          )}
        </Link>
        
        {/* Always visible categories (first 3) */}
        {visibleCategories.map((category) => (
          <Link
            key={category.id}
            href={createCategoryUrl(category.slug)}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
              selectedCategory === category.slug
                ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200 shadow-sm"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
            )}
          >
            <span>{category.name}</span>
            {selectedCategory === category.slug && (
              <ChevronRight className="h-4 w-4 text-orange-600" />
            )}
          </Link>
        ))}

        {/* Hidden categories on mobile - shown when expanded */}
        <div className="md:hidden">
          {hasHiddenCategories && (
            <>
              {/* Expand/Collapse button - more compact */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium text-orange-600 bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-all duration-200 group"
              >
                <span className="font-medium">
                  {isExpanded ? 'Sakrij' : `+${hiddenCategories.length} kategorija`}
                </span>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 ml-2 text-orange-600" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2 text-orange-600" />
                )}
              </button>

              {/* Hidden categories */}
              {isExpanded && (
                <div className="space-y-1 mt-2">
                  {hiddenCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={createCategoryUrl(category.slug)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                        selectedCategory === category.slug
                          ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200 shadow-sm"
                          : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                      )}
                    >
                      <span>{category.name}</span>
                      {selectedCategory === category.slug && (
                        <ChevronRight className="h-4 w-4 text-orange-600" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* All categories on desktop */}
        <div className="hidden md:block">
          {hiddenCategories.map((category) => (
            <Link
              key={category.id}
              href={createCategoryUrl(category.slug)}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                selectedCategory === category.slug
                  ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200 shadow-sm"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
              )}
            >
              <span>{category.name}</span>
              {selectedCategory === category.slug && (
                <ChevronRight className="h-4 w-4 text-orange-600" />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          {categories.length} kategorija dostupno
        </p>
      </div>
    </div>
  )
} 