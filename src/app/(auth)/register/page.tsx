'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Car } from 'lucide-react'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
            <Car className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registracija zatvorena
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Registracija novih korisnika je trenutno onemogućena.
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            Za pristup admin panelu kontaktirajte administratora.
          </p>
        </div>

        <div className="text-center">
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Nazad na prijavu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 