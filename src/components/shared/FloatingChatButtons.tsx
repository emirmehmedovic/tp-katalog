'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, X, Phone } from 'lucide-react'

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.846 6.067l-1.225 4.485 4.574-1.207z"/>
  </svg>
)

const ViberIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.406 21.834c-1.43.34-3.246.495-4.5.495-6.052 0-10.312-3.875-10.312-9.513s4.26-9.513 10.313-9.513c5.96 0 10.312 4.125 10.312 9.513 0 1.988-.75 3.844-1.875 5.375l1.875 4.5-4.125-1.35zm-4.5-19.15c-4.958 0-8.925 3.535-8.925 8.125s3.967 8.125 8.925 8.125c1.238 0 2.93-.153 4.25-1.125l2.25.75-1-2.5c1.062-1.44 1.625-3.125 1.625-4.875 0-4.59-3.967-8.125-8.125-8.125zm5.313 10.344c-.75 0-1.5-.375-2.25-1.125s-1.125-1.5-1.125-2.25c0-1.813 1.438-3.25 3.25-3.25s3.25 1.438 3.25 3.25c0 .75-.375 1.5-1.125 2.25s-1.5 1.125-2.25 1.125zm-10.406-3.03c-.047.01-.094.02-.14.03-.563.188-1.125.375-1.125.875s.563.875 1.125.875c.563 0 1.125-.375 1.125-.875s-.562-.688-1.125-.875zm2.062 0c-.562 0-1.125.375-1.125.875s.563.875 1.125.875 1.125-.375 1.125-.875c0-.5-.563-.875-1.125-.875z"/>
    </svg>
)

export default function FloatingChatButtons() {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = '+38761577576'
  const cleanPhoneNumber = phoneNumber.replace(/\+/g, '')

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="relative">
        {isOpen && (
          <div className="flex flex-col items-center space-y-3 mb-3">
            <Link href={`https://wa.me/${cleanPhoneNumber}`} passHref legacyBehavior>
              <a target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-all transform hover:scale-110">
                <WhatsAppIcon />
              </a>
            </Link>
            <Link href={`viber://chat?number=%2B${cleanPhoneNumber}`} passHref legacyBehavior>
              <a target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-purple-700 transition-all transform hover:scale-110">
                <ViberIcon />
              </a>
            </Link>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-blue-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
        </button>
      </div>
    </div>
  )
}
