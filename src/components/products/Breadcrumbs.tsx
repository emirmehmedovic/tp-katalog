import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbsProps {
  categoryName?: string
}

export default function Breadcrumbs({ categoryName }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link 
        href="/" 
        className="flex items-center hover:text-orange-600 transition-colors"
      >
        <Home className="h-4 w-4 mr-1" />
        Početna
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link 
        href="/proizvodi" 
        className="hover:text-orange-600 transition-colors"
      >
        Proizvodi
      </Link>
      {categoryName && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="text-orange-600 font-medium">{categoryName}</span>
        </>
      )}
    </nav>
  )
} 