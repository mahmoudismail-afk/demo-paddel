'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tag, Check } from 'lucide-react';

const mockItems = [
  {
    id: 1,
    name: 'Essential Oversized Hoodie',
    price: 85.00,
    color: 'Bone White',
    size: 'L',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Heavyweight Cargo Pants',
    price: 120.00,
    color: 'Charcoal',
    size: '32',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=200&auto=format&fit=crop'
  }
];

export default function OrderSummary() {
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');

  const subtotal = mockItems.reduce((acc, item) => acc + item.price, 0);
  const shipping = 15.00;
  const taxes = subtotal * 0.08;
  const discountAmount = discountApplied ? subtotal * 0.15 : 0; // 15% off
  const total = subtotal + shipping + taxes - discountAmount;

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountCode.trim()) return;
    
    if (discountCode.toUpperCase() === 'VIP15') {
      setDiscountApplied(true);
      setDiscountError('');
    } else {
      setDiscountError('Invalid or expired discount code');
      setDiscountApplied(false);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6 font-sans">Order Summary</h2>

      <div className="space-y-4 mb-8">
        {mockItems.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative w-16 h-20 rounded-md overflow-hidden bg-gray-200 border border-gray-200 flex-shrink-0">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover" 
                unoptimized
              />
              <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                1
              </span>
            </div>
            <div className="flex-1 font-sans">
              <h4 className="text-sm font-semibold text-gray-900">{item.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{item.color} / {item.size}</p>
            </div>
            <div className="text-sm font-medium text-gray-900 font-sans">
              ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 py-6 mb-6">
        <form onSubmit={handleApplyDiscount} className="flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Discount code" 
              className="w-full pl-4 pr-10 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black font-sans text-sm"
              disabled={discountApplied}
            />
            <Tag size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            type="submit" 
            disabled={discountApplied || !discountCode}
            className="bg-gray-900 text-white px-5 rounded-md text-sm font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply
          </button>
        </form>
        
        {discountError && (
          <p className="text-red-500 text-xs mt-2 animate-slide-down">{discountError}</p>
        )}
        
        {discountApplied && (
          <div className="mt-3 flex items-center justify-between bg-gray-100 px-3 py-2 rounded border border-gray-200 animate-slide-down">
            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium font-sans">
              <Tag size={14} className="text-gray-500" /> {discountCode.toUpperCase()}
            </div>
            <button 
              onClick={() => { setDiscountApplied(false); setDiscountCode(''); }}
              className="text-xs text-gray-500 hover:text-black font-sans"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3 font-sans text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        
        {discountApplied && (
          <div className="flex justify-between text-green-600 animate-slide-down">
            <span>Discount (VIP15)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Taxes</span>
          <span className="font-medium text-gray-900">${taxes.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">Total</span>
          <div className="text-right">
            <span className="text-xs text-gray-500 mr-2">USD</span>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
