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
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Product, Category } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, Package, Image as ImageIcon, RefreshCw } from 'lucide-react'
import Image from 'next/image'

interface ProductsTableProps {
  products: Product[]
  categories: Category[]
}

// Dinamičko učitavanje slika iz API-ja

export default function ProductsTable({ products, categories }: ProductsTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [availableImages, setAvailableImages] = useState<string[]>([])
  const [imagesLoading, setImagesLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    product_code: '',
    image_url: '',
    category_id: '',
    slug: ''
  })

  // Učitaj slike iz API-ja
  const fetchImages = async () => {
    try {
      setImagesLoading(true)
      const response = await fetch('/api/images')
      const data = await response.json()
      if (data.images) {
        setAvailableImages(data.images)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setImagesLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  // Filter products based on search term
  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower) ||
      product.product_code.toLowerCase().includes(searchLower) ||
      product.slug.toLowerCase().includes(searchLower) ||
      product.category?.name.toLowerCase().includes(searchLower)
    )
  })

  const handleAddProduct = async () => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([formData])

      if (error) throw error

      setIsAddModalOpen(false)
      setFormData({
        name: '',
        description: '',
        product_code: '',
        image_url: '',
        category_id: '',
        slug: ''
      })
      window.location.reload()
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Došlo je do greške prilikom dodavanja proizvoda')
    }
  }

  const handleEditProduct = async () => {
    if (!selectedProduct) return

    try {
      const { error } = await supabase
        .from('products')
        .update(formData)
        .eq('id', selectedProduct.id)

      if (error) throw error

      setIsEditModalOpen(false)
      setSelectedProduct(null)
      setFormData({
        name: '',
        description: '',
        product_code: '',
        image_url: '',
        category_id: '',
        slug: ''
      })
      window.location.reload()
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Došlo je do greške prilikom ažuriranja proizvoda')
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) throw error

      window.location.reload()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Došlo je do greške prilikom brisanja proizvoda')
    }
  }

  const openEditModal = (product: Product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      product_code: product.product_code,
      image_url: product.image_url,
      category_id: product.category_id,
      slug: product.slug
    })
    setIsEditModalOpen(true)
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Proizvodi</h2>
          {/* Search Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Pretraži proizvode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-2">
              Pronađeno {filteredProducts.length} od {products.length} proizvoda
            </p>
          )}
          <div className="flex items-center space-x-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchImages}
              disabled={imagesLoading}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${imagesLoading ? 'animate-spin' : ''}`} />
              <span>Osveži slike</span>
            </Button>
            {availableImages.length > 0 && (
              <span className="text-xs text-gray-500">
                {availableImages.length} slika dostupno
              </span>
            )}
          </div>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Dodaj proizvod</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Dodaj novi proizvod</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Naziv proizvoda</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (!formData.slug) {
                        setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }))
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="product_code">Šifra proizvoda</Label>
                  <Input
                    id="product_code"
                    value={formData.product_code}
                    onChange={(e) => setFormData({ ...formData, product_code: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Kategorija</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Izaberi kategoriju" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="image">Slika</Label>
                <Select value={formData.image_url} onValueChange={(value) => setFormData({ ...formData, image_url: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={imagesLoading ? "Učitavanje slika..." : "Izaberi sliku"} />
                  </SelectTrigger>
                  <SelectContent>
                    {imagesLoading ? (
                      <SelectItem value="" disabled>
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                          <span>Učitavanje slika...</span>
                        </div>
                      </SelectItem>
                    ) : availableImages.length > 0 ? (
                      availableImages.map((image) => (
                        <SelectItem key={image} value={`/images/products/${image}`}>
                          <div className="flex items-center space-x-2">
                            <ImageIcon className="h-4 w-4" />
                            <span>{image}</span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        <span>Nema dostupnih slika</span>
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Otkaži
                </Button>
                <Button onClick={handleAddProduct}>
                  Dodaj proizvod
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Slika</TableHead>
              <TableHead className="w-48">Naziv</TableHead>
              <TableHead className="w-32">Šifra</TableHead>
              <TableHead className="w-32">Kategorija</TableHead>
              <TableHead className="w-32">Slug</TableHead>
              <TableHead className="w-24">Akcije</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="w-16 h-16 relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-200"
                        sizes="64px"
                        quality={85}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-44">
                    <div className="font-medium text-sm truncate" title={product.name}>
                      {product.name}
                    </div>
                    {product.description && (
                      <div className="text-xs text-gray-500 truncate mt-1" title={product.description}>
                        {product.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {product.product_code}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {product.category?.name || 'Nepoznata kategorija'}
                  </span>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded truncate block max-w-28" title={product.slug}>
                    {product.slug}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(product)}
                      className="h-8 w-8 p-0"
                      title="Uredi"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      title="Obriši"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Uredi proizvod</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Naziv proizvoda</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }))
                  }}
                />
              </div>
              <div>
                <Label htmlFor="edit-product_code">Šifra proizvoda</Label>
                <Input
                  id="edit-product_code"
                  value={formData.product_code}
                  onChange={(e) => setFormData({ ...formData, product_code: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Opis</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Kategorija</Label>
                <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Izaberi kategoriju" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-image">Slika</Label>
              <Select value={formData.image_url} onValueChange={(value) => setFormData({ ...formData, image_url: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={imagesLoading ? "Učitavanje slika..." : "Izaberi sliku"} />
                </SelectTrigger>
                <SelectContent>
                  {imagesLoading ? (
                    <SelectItem value="" disabled>
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                        <span>Učitavanje slika...</span>
                      </div>
                    </SelectItem>
                  ) : availableImages.length > 0 ? (
                    availableImages.map((image) => (
                      <SelectItem key={image} value={`/images/products/${image}`}>
                        <div className="flex items-center space-x-2">
                          <ImageIcon className="h-4 w-4" />
                          <span>{image}</span>
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>
                      <span>Nema dostupnih slika</span>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Otkaži
              </Button>
              <Button onClick={handleEditProduct}>
                Sačuvaj izmene
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 