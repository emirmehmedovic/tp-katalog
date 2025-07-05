'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Quote } from 'lucide-react'
import { Product } from '@/lib/types'
import QuoteRequestModal from './QuoteRequestModal'

interface QuoteRequestButtonProps {
  product: Product
}

export default function QuoteRequestButton({ product }: QuoteRequestButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        size="lg"
        className="w-full text-lg py-3"
      >
        <Quote className="h-5 w-5 mr-2" />
        Zatražite ponudu
      </Button>

      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  )
} 