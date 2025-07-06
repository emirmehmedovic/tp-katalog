'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Inquiry } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { hr } from 'date-fns/locale'
import { 
  Eye, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  User, 
  Building, 
  Mail, 
  Phone,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
  Target,
  Send,
  FileText,
  Package,
  Edit,
  Save,
  X,
  EyeOff
} from 'lucide-react'

interface InquiriesTableProps {
  inquiries: Inquiry[]
}

const statusConfig = {
  new: { label: 'Nov', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  contacted: { label: 'Kontaktiran', color: 'bg-yellow-100 text-yellow-800', icon: Phone },
  qualified: { label: 'Kvalifikovan', color: 'bg-purple-100 text-purple-800', icon: Target },
  proposal_sent: { label: ' poslana', color: 'bg-indigo-100 text-indigo-800', icon: Send },
  negotiation: { label: 'Pregovori', color: 'bg-orange-100 text-orange-800', icon: TrendingUp },
  won: { label: 'Dobijen', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  lost: { label: 'Izgubljen', color: 'bg-red-100 text-red-800', icon: XCircle },
  spam: { label: 'Spam', color: 'bg-gray-100 text-gray-800', icon: XCircle }
}

const priorityConfig = {
  low: { label: 'Nizak', color: 'bg-gray-100 text-gray-800', icon: Star },
  medium: { label: 'Srednji', color: 'bg-blue-100 text-blue-800', icon: Star },
  high: { label: 'Visok', color: 'bg-orange-100 text-orange-800', icon: Star },
  urgent: { label: 'Hitno', color: 'bg-red-100 text-red-800', icon: Star }
}

export default function InquiriesTable({ inquiries }: InquiriesTableProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [localInquiries, setLocalInquiries] = useState<Inquiry[]>(inquiries)
  const [editingInquiry, setEditingInquiry] = useState<Inquiry | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLocalInquiries(inquiries)
  }, [inquiries])

  const handleStatusChange = async (inquiryId: string, newStatus: string) => {
    try {
      console.log('Updating status for inquiry:', inquiryId, 'to:', newStatus)
      
      // Find current inquiry
      const currentInquiry = localInquiries.find(inquiry => inquiry.id === inquiryId)
      if (!currentInquiry) {
        console.error('Inquiry not found:', inquiryId)
        return
      }
      
      // Handle legacy 'closed' status by converting to 'won'
      const statusToUpdate = newStatus === 'closed' ? 'won' : newStatus
      
      // Check if status is actually changing
      const currentStatus = (currentInquiry.status as string) === 'closed' ? 'won' : currentInquiry.status
      if (currentStatus === statusToUpdate) {
        console.log('Status is already the same, skipping update')
        return
      }
      
      console.log('Current status:', currentStatus, 'New status:', statusToUpdate)
      
      const { error } = await supabase
        .from('inquiries')
        .update({ status: statusToUpdate })
        .eq('id', inquiryId)

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Successfully updated status')

      // Update local state
      setLocalInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === inquiryId ? { ...inquiry, status: statusToUpdate as any } : inquiry
        )
      )
    } catch (error: any) {
      console.error('Error updating status:', error)
      console.error('Error details:', {
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        code: error?.code
      })
      alert(`Došlo je do greške prilikom ažuriranja statusa: ${error?.message || 'Nepoznata greška'}`)
    }
  }

  const handlePriorityChange = async (inquiryId: string, newPriority: string) => {
    try {
      console.log('Updating priority for inquiry:', inquiryId, 'to:', newPriority)
      
      const { error } = await supabase
        .from('inquiries')
        .update({ priority: newPriority })
        .eq('id', inquiryId)

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Successfully updated priority')

      setLocalInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === inquiryId ? { ...inquiry, priority: newPriority as any } : inquiry
        )
      )
    } catch (error: any) {
      console.error('Error updating priority:', error)
      console.error('Error details:', {
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        code: error?.code
      })
      alert(`Došlo je do greške prilikom ažuriranja prioriteta: ${error?.message || 'Nepoznata greška'}`)
    }
  }

  const handleUpdateInquiry = async (inquiryId: string, updates: Partial<Inquiry>) => {
    try {
      console.log('Updating inquiry:', inquiryId, 'with updates:', updates)
      
      const { error } = await supabase
        .from('inquiries')
        .update(updates)
        .eq('id', inquiryId)

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Successfully updated inquiry')

      // Update local inquiries
      setLocalInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === inquiryId ? { ...inquiry, ...updates } : inquiry
        )
      )
      
      // Update selected inquiry if it's the same one
      if (selectedInquiry && selectedInquiry.id === inquiryId) {
        setSelectedInquiry({ ...selectedInquiry, ...updates })
      }
      
      setEditingInquiry(null)
    } catch (error) {
      console.error('Error updating inquiry:', error)
      alert('Došlo je do greške prilikom ažuriranja')
    }
  }

  const openInquiryDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      product_id: formData.get('product_id') as string,
      message: formData.get('message') as string
    }

    try {
      const { data: responseData, error } = await supabase
        .from('inquiries')
        .insert([data])
        .select()

      if (error) throw error
      // Refresh the inquiries list by updating local state
      const newInquiry: Inquiry = {
        id: responseData?.[0]?.id || `temp-${Date.now()}`,
        created_at: new Date().toISOString(),
        customer_name: data.name,
        customer_email: data.email,
        customer_company: '',
        product_id: data.product_id,
        message: data.message,
        status: 'new',
        priority: 'medium',
        comments: ''
      }
      setLocalInquiries(prev => [...prev, newInquiry])
    } catch (error) {
      console.error('Greška pri dodavanju upita:', error)
      setError('Greška pri dodavanju upita')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (inquiryId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', inquiryId)

      if (error) throw error
      // Update local state
      setLocalInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === inquiryId ? { ...inquiry, status: newStatus as any } : inquiry
        )
      )
    } catch (error) {
      console.error('Greška pri ažuriranju statusa:', error)
    }
  }

  const handlePriorityUpdate = async (inquiryId: string, newPriority: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ priority: newPriority })
        .eq('id', inquiryId)

      if (error) throw error
      // Update local state
      setLocalInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === inquiryId ? { ...inquiry, priority: newPriority as any } : inquiry
        )
      )
    } catch (error) {
      console.error('Greška pri ažuriranju prioriteta:', error)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Upiti za ponude</h2>
          <div className="text-sm text-gray-600">
            Ukupno: {localInquiries.length} upita
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Proizvod</TableHead>
                  <TableHead>Kupac</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioritet</TableHead>
                  <TableHead>Akcije</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localInquiries.map((inquiry) => {
                  // Handle legacy 'closed' status by mapping to 'won'
                  const currentStatus = (inquiry.status as string) === 'closed' ? 'won' : inquiry.status
                  const statusInfo = statusConfig[currentStatus as keyof typeof statusConfig] || statusConfig.new
                  const priorityInfo = priorityConfig[inquiry.priority as keyof typeof priorityConfig] || priorityConfig.medium
                  const StatusIcon = statusInfo.icon
                  const PriorityIcon = priorityInfo.icon

                  return (
                    <TableRow key={inquiry.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {format(new Date(inquiry.created_at), 'dd.MM.yyyy', { locale: hr })}
                          </div>
                          <div className="text-gray-500">
                            {format(new Date(inquiry.created_at), 'HH:mm', { locale: hr })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium text-sm">{inquiry.product?.name || 'Nepoznat proizvod'}</div>
                          <div className="text-xs text-gray-500">{inquiry.product?.product_code}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{inquiry.customer_name}</div>
                          {inquiry.customer_company && (
                            <div className="text-xs text-gray-500">{inquiry.customer_company}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{inquiry.customer_email}</div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={currentStatus || 'new'}
                          onValueChange={(value) => handleStatusChange(inquiry.id, value)}
                        >
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">Nov</SelectItem>
                            <SelectItem value="contacted">Kontaktiran</SelectItem>
                            <SelectItem value="qualified">Kvalifikovan</SelectItem>
                            <SelectItem value="proposal_sent">Ponuda poslana</SelectItem>
                            <SelectItem value="negotiation">Pregovori</SelectItem>
                            <SelectItem value="won">Dobijen</SelectItem>
                            <SelectItem value="lost">Izgubljen</SelectItem>
                            <SelectItem value="spam">Spam</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={inquiry.priority || 'medium'}
                          onValueChange={(value) => handlePriorityChange(inquiry.id, value)}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Nizak</SelectItem>
                            <SelectItem value="medium">Srednji</SelectItem>
                            <SelectItem value="high">Visok</SelectItem>
                            <SelectItem value="urgent">Hitno</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openInquiryDetails(inquiry)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Detalji
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Inquiry Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Detalji upita za ponudu
            </DialogTitle>
          </DialogHeader>
          
          {selectedInquiry && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Kreirano</div>
                    <div className="text-xs text-gray-600">
                      {format(new Date(selectedInquiry.created_at), 'dd.MM.yyyy HH:mm', { locale: hr })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Status</div>
                    <Badge className={statusConfig[selectedInquiry.status as keyof typeof statusConfig]?.color || statusConfig.new.color}>
                      {statusConfig[selectedInquiry.status as keyof typeof statusConfig]?.label || statusConfig.new.label}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Prioritet</div>
                    <Badge className={priorityConfig[selectedInquiry.priority as keyof typeof priorityConfig]?.color || priorityConfig.medium.color}>
                      {priorityConfig[selectedInquiry.priority as keyof typeof priorityConfig]?.label || priorityConfig.medium.label}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informacije o kupcu
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Ime i prezime</Label>
                      <p className="text-sm text-gray-900">{selectedInquiry.customer_name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Email</Label>
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {selectedInquiry.customer_email}
                      </p>
                    </div>
                    {selectedInquiry.customer_company && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Kompanija</Label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {selectedInquiry.customer_company}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Proizvod
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Naziv proizvoda</Label>
                      <p className="text-sm text-gray-900">{selectedInquiry.product?.name || 'Nepoznat proizvod'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Šifra proizvoda</Label>
                      <p className="text-sm text-gray-900">{selectedInquiry.product?.product_code || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Kategorija</Label>
                      <p className="text-sm text-gray-900">{selectedInquiry.product?.category?.name || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Poruka kupca
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>

              {/* Comments Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Komentari i napomene
                </h3>
                {editingInquiry?.id === selectedInquiry.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editingInquiry.comments || ''}
                      onChange={(e) => setEditingInquiry({...editingInquiry, comments: e.target.value})}
                      placeholder="Dodajte komentar ili napomenu..."
                      className="min-h-[100px]"
                    />
                    <div className="flex gap-2">
                                           <Button 
                       onClick={() => {
                         handleUpdateInquiry(selectedInquiry.id, { comments: editingInquiry.comments })
                       }}
                       className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                     >
                       Sačuvaj
                     </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setEditingInquiry(null)}
                      >
                        Otkaži
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg min-h-[100px]">
                      {selectedInquiry.comments ? (
                        <p className="text-sm whitespace-pre-wrap">{selectedInquiry.comments}</p>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Nema komentara</p>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setEditingInquiry(selectedInquiry)}
                    >
                      Dodaj/uredi komentar
                    </Button>
                  </div>
                )}
              </div>

              {/* Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Finansijski podaci
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Procijenjena vrijednost (KM)</Label>
                      <Input
                        type="number"
                        value={editingInquiry?.id === selectedInquiry.id ? (editingInquiry.estimated_value || '') : (selectedInquiry.estimated_value || '')}
                        onChange={(e) => editingInquiry?.id === selectedInquiry.id && setEditingInquiry({...editingInquiry, estimated_value: parseFloat(e.target.value) || undefined})}
                        placeholder="0.00"
                        disabled={editingInquiry?.id !== selectedInquiry.id}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Praćenje
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Sljedeći follow-up</Label>
                      <Input
                        type="datetime-local"
                        value={editingInquiry?.id === selectedInquiry.id ? (editingInquiry.next_follow_up ? new Date(editingInquiry.next_follow_up).toISOString().slice(0, 16) : '') : (selectedInquiry.next_follow_up ? new Date(selectedInquiry.next_follow_up).toISOString().slice(0, 16) : '')}
                        onChange={(e) => editingInquiry?.id === selectedInquiry.id && setEditingInquiry({...editingInquiry, next_follow_up: e.target.value ? new Date(e.target.value).toISOString() : undefined})}
                        disabled={editingInquiry?.id !== selectedInquiry.id}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Zatvori
                </Button>
                                 {editingInquiry?.id === selectedInquiry.id && (
                   <Button 
                     onClick={() => {
                       const updates: Partial<Inquiry> = {}
                       
                       if (editingInquiry.comments !== selectedInquiry.comments) {
                         updates.comments = editingInquiry.comments
                       }
                       
                       if (editingInquiry.estimated_value !== selectedInquiry.estimated_value) {
                         updates.estimated_value = editingInquiry.estimated_value
                       }
                       
                       if (editingInquiry.next_follow_up !== selectedInquiry.next_follow_up) {
                         updates.next_follow_up = editingInquiry.next_follow_up
                       }
                       
                       if (Object.keys(updates).length > 0) {
                         handleUpdateInquiry(selectedInquiry.id, updates)
                       }
                     }}
                     className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                   >
                     Sačuvaj sve promjene
                   </Button>
                 )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
} 