export interface Category {
  id: string
  name: string
  slug: string
  created_at?: string
}

export interface Product {
  id: string
  name: string
  description: string
  product_code: string
  image_url: string
  category_id: string
  slug: string
  created_at?: string
  category?: Category
}

export interface Inquiry {
  id: string
  created_at: string
  updated_at?: string
  product_id: string
  user_id?: string
  customer_name: string
  customer_email: string
  customer_company?: string
  message: string
  status?: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost' | 'spam'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  assigned_to?: string
  comments?: string
  next_follow_up?: string
  estimated_value?: number
  source?: string
  product?: Product
}

export interface User {
  id: string
  email: string
  role?: string
}

export interface QuoteRequestForm {
  customer_name: string
  customer_email: string
  customer_company?: string
  message: string
} 