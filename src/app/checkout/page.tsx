import React from 'react';
import './checkout.css'; // Inject Tailwind specific to checkout
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

export const metadata = {
  title: 'Checkout | Modern Apparel',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-gray-200">
      <header className="border-b border-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          {/* Logo Placeholder */}
          <h1 className="text-2xl font-extrabold tracking-tighter uppercase font-sans">
            MODERN APPAREL.
          </h1>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20">
          {/* Left Column: Checkout Flow */}
          <div className="flex-1 w-full">
            <CheckoutForm />
          </div>
          
          {/* Right Column: Order Summary (Sticky) */}
          <div className="w-full lg:w-[420px]">
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>
  );
}
