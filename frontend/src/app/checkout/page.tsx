"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowLeft, CheckCircle2, Loader2, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setOrderConfirmed(true);
            clearCart();
            setLoading(false);
        }, 1500);
    };

    if (orderConfirmed) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05),transparent)]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
                    <p className="text-slate-400 mb-8">
                        Thank you for your purchase. Your premium items will be shipped shortly.
                    </p>
                    <Link
                        href="/"
                        className="inline-block w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20"
                    >
                        Return to Shop
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
                <ShoppingBag size={48} className="text-slate-700 mb-6" />
                <h1 className="text-2xl font-bold mb-2 text-white">Your cart is empty</h1>
                <p className="text-slate-400 mb-8 text-center max-w-sm">
                    Please add some items to your cart before proceeding to checkout.
                </p>
                <Link
                    href="/"
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 py-24 px-6">
            <div className="container mx-auto max-w-6xl">
                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group w-fit">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Shop
                </Link>

                <div className="grid lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3">
                        <h1 className="text-4xl font-bold mb-8 text-white">Checkout</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Shipping Address</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="123 Creator Lane"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Payment Method</label>
                                <div className="flex items-center gap-3 px-4 py-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-300">
                                    <CreditCard size={20} />
                                    <span className="font-medium text-sm">Demo Checkout - No payment required</span>
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Confirm Order'}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sticky top-32">
                            <h2 className="text-xl font-bold mb-6 text-white text-center">Summary</h2>
                            <div className="space-y-4 mb-8">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-200 line-clamp-1">{item.name}</span>
                                        </div>
                                        <span className="text-sm text-slate-400 whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-white">Total</span>
                                <span className="text-2xl font-bold text-indigo-400">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
