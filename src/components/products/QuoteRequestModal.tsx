'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Product, QuoteRequestForm } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { 
  User, 
  Mail, 
  Building2, 
  MessageSquare, 
  CheckCircle, 
  X, 
  Send,
  Loader2,
  Package
} from 'lucide-react'

interface QuoteRequestModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export default function QuoteRequestModal({ isOpen, onClose, product }: QuoteRequestModalProps) {
  const [formData, setFormData] = useState<QuoteRequestForm>({
    customer_name: '',
    customer_email: '',
    customer_company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      const { error } = await supabase
        .from('inquiries')
        .insert({
          product_id: product.id,
          user_id: user?.id || null,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_company: formData.customer_company || null,
          message: formData.message,
          status: 'new'
        })

      if (error) throw error

      setIsSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          customer_name: '',
          customer_email: '',
          customer_company: '',
          message: ''
        })
        setIsSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('Došlo je do greške prilikom slanja upita. Molimo pokušajte ponovo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof QuoteRequestForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_company: '',
        message: ''
      })
      setIsSuccess(false)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-background p-6">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Zatražite ponudu
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {product.name}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={isSubmitting}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upit uspešno poslat!
              </h3>
              <p className="text-gray-600">
                Kontaktiraćemo vas u najkraćem roku sa ponudom.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-500">Kod: {product.product_code}</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="customer_name" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>Ime i prezime *</span>
                </Label>
                <Input
                  id="customer_name"
                  value={formData.customer_name}
                  onChange={(e) => handleInputChange('customer_name', e.target.value)}
                  placeholder="Unesite vaše ime i prezime"
                  className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer_email" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>Email adresa *</span>
                </Label>
                <Input
                  id="customer_email"
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => handleInputChange('customer_email', e.target.value)}
                  placeholder="vas.email@example.com"
                  className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer_company" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  <span>Naziv firme</span>
                </Label>
                <Input
                  id="customer_company"
                  value={formData.customer_company}
                  onChange={(e) => handleInputChange('customer_company', e.target.value)}
                  placeholder="Naziv vaše firme (opciono)"
                  className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span>Poruka *</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Opišite vaše potrebe, količinu, rokove isporuke, specifične zahteve..."
                  rows={4}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  required
                />
                <p className="text-xs text-gray-500">
                  Što detaljnije opišete vaše potrebe, to bolju ponudu možemo da vam damo.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 h-11"
              >
                Otkaži
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-11 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Slanje...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Pošalji upit
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
} 