'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Lock, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

const checkoutSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  zipCode: z.string().min(4, 'Valid ZIP code required'),
  cardNumber: z.string().min(16, 'Valid card number required').max(19),
  expDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'MM/YY required'),
  cvc: z.string().min(3, 'CVC required').max(4),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Order submitted:', data);
    setIsSubmitting(false);
    alert('Payment successful! Your order has been placed.');
  };

  const nextStep = async (step: number, fieldsToValidate: (keyof CheckoutFormValues)[]) => {
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setActiveStep(step + 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-sans">
      {/* Quick Checkout Express */}
      <div className="mb-8 text-center">
        <h2 className="text-sm text-gray-500 mb-4 tracking-wide font-medium">EXPRESS CHECKOUT</h2>
        <div className="flex gap-4 justify-center">
          <button className="flex-1 bg-black text-white h-12 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
            Pay with <span className="font-bold">Apple Pay</span>
          </button>
          <button className="flex-1 bg-white border border-gray-200 text-black h-12 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
            Pay with <span className="font-bold">GPay</span>
          </button>
        </div>
        <div className="relative mt-8 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-400">OR CONTINUE BELOW</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* STEP 1: Contact */}
        <section className={`border border-gray-200 rounded-xl p-6 transition-all duration-300 ${activeStep !== 1 ? 'opacity-60 bg-gray-50' : 'bg-white shadow-sm'}`}>
          <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setActiveStep(1)}>
            <h3 className="text-lg font-semibold text-gray-900">1. Contact Information</h3>
            {activeStep > 1 && <span className="text-sm text-blue-600 hover:underline">Edit</span>}
          </div>
          
          {activeStep === 1 && (
            <div className="space-y-4 animate-slide-down">
              <div className="relative checkout-input pt-4">
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  placeholder=" "
                  className={`block w-full px-4 py-3 bg-transparent border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md appearance-none focus:outline-none focus:ring-0 peer`}
                />
                <label htmlFor="email" className={`absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-85 peer-focus:-translate-y-4 left-2`}>
                  Email Address
                </label>
                {errors.email && <p className="text-red-500 text-xs mt-1 absolute">{errors.email.message}</p>}
              </div>
              <button 
                type="button" 
                onClick={() => nextStep(1, ['email'])}
                className="mt-6 w-full bg-black text-white py-3.5 rounded-md font-medium hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
              >
                Continue to Shipping <ChevronRight size={18} />
              </button>
            </div>
          )}
        </section>

        {/* STEP 2: Shipping */}
        <section className={`border border-gray-200 rounded-xl p-6 transition-all duration-300 ${activeStep !== 2 ? 'opacity-60 bg-gray-50' : 'bg-white shadow-sm'}`}>
          <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => activeStep > 2 && setActiveStep(2)}>
            <h3 className="text-lg font-semibold text-gray-900">2. Shipping Address</h3>
            {activeStep > 2 && <span className="text-sm text-blue-600 hover:underline">Edit</span>}
          </div>

          {activeStep === 2 && (
            <div className="space-y-4 animate-slide-down">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative checkout-input pt-4">
                  <input {...register('firstName')} id="firstName" placeholder=" " className={`block w-full px-4 py-3 bg-transparent border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md appearance-none focus:outline-none peer`} />
                  <label htmlFor="firstName" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-85 peer-focus:-translate-y-4 left-2">First Name</label>
                  {errors.firstName && <p className="text-red-500 text-xs mt-1 absolute">{errors.firstName.message}</p>}
                </div>
                <div className="relative checkout-input pt-4">
                  <input {...register('lastName')} id="lastName" placeholder=" " className={`block w-full px-4 py-3 bg-transparent border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md appearance-none focus:outline-none peer`} />
                  <label htmlFor="lastName" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-85 peer-focus:-translate-y-4 left-2">Last Name</label>
                </div>
              </div>

              <div className="relative checkout-input pt-4">
                <input {...register('address')} id="address" placeholder=" " className={`block w-full px-4 py-3 bg-transparent border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md appearance-none focus:outline-none peer`} />
                <label htmlFor="address" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-85 peer-focus:-translate-y-4 left-2">Address</label>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="relative checkout-input pt-4 col-span-1">
                  <input {...register('zipCode')} id="zipCode" placeholder=" " className={`block w-full px-4 py-3 bg-transparent border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-md appearance-none focus:outline-none peer`} />
                  <label htmlFor="zipCode" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-85 peer-focus:-translate-y-4 left-2">ZIP</label>
                </div>
                <div className="relative checkout-input pt-4 col-span-2">
                  <input {...register('city')} id="city" placeholder=" " className={`block w-full px-4 py-3 bg-transparent border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md appearance-none focus:outline-none peer`} />
                  <label htmlFor="city" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-85 peer-focus:-translate-y-4 left-2">City</label>
                </div>
              </div>

              <div className="relative checkout-input pt-4">
                <input {...register('country')} id="country" placeholder=" " className={`block w-full px-4 py-3 bg-transparent border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md appearance-none focus:outline-none peer`} />
                <label htmlFor="country" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-85 peer-focus:-translate-y-4 left-2">Country</label>
              </div>

              <button 
                type="button" 
                onClick={() => nextStep(2, ['firstName', 'lastName', 'address', 'city', 'zipCode', 'country'])}
                className="mt-6 w-full bg-black text-white py-3.5 rounded-md font-medium hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
              >
                Continue to Payment <ChevronRight size={18} />
              </button>
            </div>
          )}
        </section>

        {/* STEP 3: Payment */}
        <section className={`border border-gray-200 rounded-xl p-6 transition-all duration-300 ${activeStep !== 3 ? 'opacity-60 bg-gray-50' : 'bg-white shadow-sm'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              3. Payment <Lock size={16} className="text-green-600" />
            </h3>
            <div className="flex gap-2">
              <ShieldCheck size={20} className="text-gray-400" />
            </div>
          </div>

          {activeStep === 3 && (
            <div className="space-y-4 animate-slide-down">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col gap-4">
                <div className="relative checkout-input pt-2">
                  <div className="absolute inset-y-0 right-4 flex items-center top-2 pointer-events-none">
                    <CreditCard size={20} className="text-gray-400" />
                  </div>
                  <input {...register('cardNumber')} id="cardNumber" placeholder=" " className={`block w-full px-4 py-3 bg-white border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md appearance-none focus:outline-none peer`} />
                  <label htmlFor="cardNumber" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:-translate-y-4 peer-focus:scale-85 left-2">Card Number</label>
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1 absolute">{errors.cardNumber.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative checkout-input pt-2">
                    <input {...register('expDate')} id="expDate" placeholder=" " className={`block w-full px-4 py-3 bg-white border ${errors.expDate ? 'border-red-500' : 'border-gray-300'} rounded-md appearance-none focus:outline-none peer`} />
                    <label htmlFor="expDate" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:-translate-y-4 peer-focus:scale-85 left-2">MM/YY</label>
                  </div>
                  <div className="relative checkout-input pt-2">
                    <input {...register('cvc')} id="cvc" placeholder=" " className={`block w-full px-4 py-3 bg-white border ${errors.cvc ? 'border-red-500' : 'border-gray-300'} rounded-md appearance-none focus:outline-none peer`} />
                    <label htmlFor="cvc" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:-translate-y-4 peer-focus:scale-85 left-2">CVC</label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors flex justify-center items-center shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Pay Now'
                  )}
                </button>
                <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock size={12} /> Payments are secure and encrypted.
                </div>
              </div>
            </div>
          )}
        </section>
      </form>
    </div>
  );
}
