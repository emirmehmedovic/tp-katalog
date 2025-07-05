'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Mail, Phone, Building, Calendar, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface ContactInquiry {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  subject: string
  message: string
  status: 'new' | 'in_progress' | 'completed' | 'spam'
  created_at: string
  updated_at: string
}

const statusConfig = {
  new: { label: 'Novo', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  in_progress: { label: 'U toku', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  completed: { label: 'Završeno', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  spam: { label: 'Spam', color: 'bg-red-100 text-red-800', icon: AlertCircle }
}

export default function ContactInquiriesTable() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setInquiries(data || [])
    } catch (error) {
      console.error('Greška pri učitavanju upita:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      
      // Ažuriraj lokalno stanje
      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === id ? { ...inquiry, status: status as any } : inquiry
        )
      )
    } catch (error) {
      console.error('Greška pri ažuriranju statusa:', error)
      alert('Greška pri ažuriranju statusa')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('bs-BA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Kontakt upiti</h2>
        <div className="text-sm text-gray-600">
          Ukupno: {inquiries.length} upita
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Korisnik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tema
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcije
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inquiries.map((inquiry) => {
                const statusInfo = statusConfig[inquiry.status]
                const StatusIcon = statusInfo.icon

                return (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {inquiry.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {inquiry.email}
                        </div>
                        {inquiry.phone && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {inquiry.phone}
                          </div>
                        )}
                        {inquiry.company && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            {inquiry.company}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{inquiry.subject}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {inquiry.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(inquiry.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedInquiry(inquiry)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Pregled
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalji upita</DialogTitle>
                          </DialogHeader>
                          {selectedInquiry && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Ime</label>
                                  <p className="text-sm text-gray-900">{selectedInquiry.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Email</label>
                                  <p className="text-sm text-gray-900">{selectedInquiry.email}</p>
                                </div>
                                {selectedInquiry.phone && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Telefon</label>
                                    <p className="text-sm text-gray-900">{selectedInquiry.phone}</p>
                                  </div>
                                )}
                                {selectedInquiry.company && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Kompanija</label>
                                    <p className="text-sm text-gray-900">{selectedInquiry.company}</p>
                                  </div>
                                )}
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Tema</label>
                                <p className="text-sm text-gray-900">{selectedInquiry.subject}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Poruka</label>
                                <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Status</label>
                                <Select
                                  value={selectedInquiry.status}
                                  onValueChange={(value) => updateStatus(selectedInquiry.id, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">Novo</SelectItem>
                                    <SelectItem value="in_progress">U toku</SelectItem>
                                    <SelectItem value="completed">Završeno</SelectItem>
                                    <SelectItem value="spam">Spam</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="text-xs text-gray-500">
                                Kreirano: {formatDate(selectedInquiry.created_at)}
                                {selectedInquiry.updated_at !== selectedInquiry.created_at && (
                                  <span className="block">
                                    Ažurirano: {formatDate(selectedInquiry.updated_at)}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {inquiries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">Nema kontakt upita</div>
        </div>
      )}
    </div>
  )
} 