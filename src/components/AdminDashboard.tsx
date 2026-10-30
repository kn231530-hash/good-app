import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Plus, 
  Check, 
  X, 
  Clock, 
  TrendingUp, 
  Bike, 
  AlertCircle,
  Eye,
  Trash2,
  Edit2
} from 'lucide-react';
import { Product, Order, OrderStatus } from '../types';
import { Currency } from './Currency';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onToggleStock: (productId: string) => void;
  onUpdatePrice: (productId: string, newPrice: number) => void;
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  onToggleStock,
  onUpdatePrice,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'customers'>('orders');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [newName, setNewName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newCategory, setNewCategory] = useState<Product['category']>('Bowls & Salads');
  const [newPrice, setNewPrice] = useState(14.50);
  const [newCalories, setNewCalories] = useState(480);
  const [newProtein, setNewProtein] = useState(32);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80');

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 2418.50);
  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const avgOrderValue = totalRevenue / Math.max(1, orders.length + 65);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newName,
      tagline: newTagline || 'Chef fresh culinary creation',
      description: `${newName} handcrafted with certified organic produce and premium ingredients.`,
      category: newCategory,
      price: newPrice,
      image: newImage,
      rating: 5.0,
      reviewsCount: 1,
      calories: newCalories,
      protein: newProtein,
      prepTime: '15-20 min',
      isOrganic: true,
      isVegan: false,
      isGlutenFree: true,
      isBestSeller: false,
      isChefSpecial: true,
      inStock: true,
      stockCount: 20,
      tags: ['Chef Special', 'Fresh 2026']
    };

    onAddProduct(newProd);
    setNewName('');
    setNewTagline('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-fade-in">
      
      {/* Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
              Fresh Bite Admin Engine
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mt-0.5">
            Store Operations & Fulfillment
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Gross GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A]">
            <Currency amount={totalRevenue} size="2xl" />
          </div>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +18.4% today
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Pipeline</span>
            <Bike className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A]">
            {activeOrdersCount} orders
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Live in kitchen & transit</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Catalog Items</span>
            <Package className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A]">
            {products.length} dishes
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {products.filter((p) => p.inStock).length} in stock
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Ticket Size</span>
            <ShoppingBag className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A]">
            <Currency amount={avgOrderValue} size="2xl" />
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Healthy margin</span>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            activeTab === 'orders'
              ? 'bg-[#0F172A] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          Orders Queue ({orders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            activeTab === 'products'
              ? 'bg-[#0F172A] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          Product Catalog ({products.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('customers')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            activeTab === 'customers'
              ? 'bg-[#0F172A] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          Customer CRM (4 Active)
        </button>
      </div>

      {/* TAB 1: ORDERS QUEUE */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#0F172A]">Live Orders & Fulfillment Pipeline</h3>
            <span className="text-xs text-slate-400">Real-time status updater</span>
          </div>

          <div className="divide-y divide-slate-100">
            {orders.map((ord) => {
              const isDelivered = ord.status === 'delivered';
              const isCancelled = ord.status === 'cancelled';

              return (
                <div key={ord.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#0F172A]">#{ord.id}</span>
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                        {ord.customerName}
                      </span>
                      <span className="text-xs text-slate-400">({ord.customerPhone})</span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          isDelivered
                            ? 'bg-slate-100 text-slate-600'
                            : isCancelled
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200 animate-pulse'
                        }`}
                      >
                        {ord.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mt-1">
                      {ord.items.map((i) => `${i.quantity}x ${i.product.name}`).join(' • ')}
                    </div>

                    <div className="text-[11px] text-slate-400 mt-1">
                      {ord.deliveryAddress} • {ord.paymentMethod}
                    </div>
                  </div>

                  {/* Actions & Status Changers */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Currency amount={ord.total} size="base" className="text-emerald-700 mr-2" />

                    {ord.status === 'placed' && (
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(ord.id, 'kitchen_prep')}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-xs font-bold"
                      >
                        Start Kitchen Prep
                      </button>
                    )}

                    {ord.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(ord.id, 'kitchen_prep')}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-xs font-bold"
                      >
                        Cook in Kitchen
                      </button>
                    )}

                    {ord.status === 'kitchen_prep' && (
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(ord.id, 'out_for_delivery')}
                        className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-xs font-bold flex items-center gap-1"
                      >
                        <Bike className="w-3 h-3" /> Dispatch Courier
                      </button>
                    )}

                    {ord.status === 'out_for_delivery' && (
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Mark Delivered
                      </button>
                    )}

                    {!isDelivered && !isCancelled && (
                      <button
                        type="button"
                        onClick={() => onUpdateOrderStatus(ord.id, 'cancelled')}
                        className="px-2.5 py-1 text-slate-400 hover:text-rose-600 rounded-full text-xs"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT CATALOG MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#0F172A]">Menu Inventory & Real-Time Stock</h3>
            <span className="text-xs text-slate-400">{products.length} Products</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-slate-100 text-slate-400 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Macros</th>
                  <th className="p-3.5">Stock Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 rounded-xl object-cover bg-slate-100"
                        />
                        <div>
                          <div className="font-extrabold text-[#0F172A]">{prod.name}</div>
                          <div className="text-[10px] text-slate-400">{prod.prepTime}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full text-[11px] text-slate-600 font-semibold">
                        {prod.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-[#0F172A]">
                      ${prod.price.toFixed(2)}
                    </td>
                    <td className="p-3.5 text-slate-500">
                      {prod.calories} kcal • {prod.protein}g P
                    </td>
                    <td className="p-3.5">
                      <button
                        type="button"
                        onClick={() => onToggleStock(prod.id)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                          prod.inStock
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {prod.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                      </button>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(prod.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER CRM */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-[#0F172A]">Registered Customer Accounts</h3>
          </div>
          <div className="p-4 space-y-3">
            {[
              { name: 'Alex Johnson', email: 'alex.johnson@freshbite.app', spend: '$142.80', orders: 6, tier: 'Gold Gourmet' },
              { name: 'Sophia Chen', email: 'sophia.c@designco.com', spend: '$98.50', orders: 4, tier: 'Silver Epicure' },
              { name: 'David Miller', email: 'david.m@siliconvalley.org', spend: '$45.00', orders: 2, tier: 'Green Member' },
              { name: 'Elena Rostova', email: 'elena@wellnesshub.io', spend: '$210.00', orders: 9, tier: 'Gold Gourmet' }
            ].map((c, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-extrabold text-[#0F172A]">{c.name}</h4>
                  <p className="text-slate-400 text-[11px]">{c.email}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700 block">{c.spend} spent</span>
                  <span className="text-[10px] text-slate-500">{c.orders} orders • {c.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD NEW PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-[#0F172A] text-base">Add New Fresh Dish</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Avocado Toast Deluxe"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Organic sourdough with poached farm eggs"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full h-9 px-2 rounded-xl border border-slate-200 outline-none"
                  >
                    <option value="Bowls & Salads">Bowls & Salads</option>
                    <option value="Artisanal Pizzas">Artisanal Pizzas</option>
                    <option value="Gourmet Burgers">Gourmet Burgers</option>
                    <option value="Smoothies & Juices">Smoothies & Juices</option>
                    <option value="Chef Specials">Chef Specials</option>
                    <option value="Healthy Treats">Healthy Treats</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={newCalories}
                    onChange={(e) => setNewCalories(parseInt(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={newProtein}
                    onChange={(e) => setNewProtein(parseInt(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold transition-colors shadow-md shadow-emerald-600/20"
              >
                Publish to Storefront
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
