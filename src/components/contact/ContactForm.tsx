'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, User, Building, Send, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const subjects = [
  'Opća upita',
  'Ponuda za proizvode',
  'Tehnička podrška',
  'Saradnja',
  'Ostalo'
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Ime je obavezno'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email je obavezan'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Unesite validan email'
    }

    if (!formData.subject) {
      newErrors.subject = 'Odaberite temu'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Poruka je obavezna'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Poruka mora imati najmanje 10 karaktera'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Slanje podataka u Supabase
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            subject: formData.subject,
            message: formData.message
          }
        ])

      if (error) {
        throw error
      }
      
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      })
      setErrors({})
    } catch (error) {
      console.error('Greška pri slanju forme:', error)
      alert('Došlo je do greške pri slanju forme. Molimo pokušajte ponovo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Hvala vam!
        </h3>
        <p className="text-gray-600 mb-6">
          Vaša poruka je uspješno poslana. Odgovorit ćemo vam u najkraćem mogućem roku.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
        >
          Pošaljite novu poruku
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ime */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Ime i prezime *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Vaše ime i prezime"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email adresa *
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="vaš@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Telefon */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Telefon
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="pl-10"
              placeholder="+387 XX XXX XXX"
            />
          </div>
        </div>

        {/* Kompanija */}
        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm font-medium text-gray-700">
            Kompanija
          </Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="pl-10"
              placeholder="Naziv kompanije"
            />
          </div>
        </div>

        {/* Tema */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
            Tema upite *
          </Label>
          <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
            <SelectTrigger className={errors.subject ? 'border-red-500' : ''}>
              <SelectValue placeholder="Odaberite temu upite" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.subject && (
            <p className="text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        {/* Poruka */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="message" className="text-sm font-medium text-gray-700">
            Poruka *
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
            placeholder="Opišite vašu upitu ili poruku..."
          />
          {errors.message && (
            <p className="text-sm text-red-600">{errors.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 text-lg"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Slanje...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Pošaljite poruku
            </>
          )}
        </Button>
      </div>
    </form>
  )
} 