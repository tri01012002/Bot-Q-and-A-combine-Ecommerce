"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
}

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all group backdrop-blur-sm"
        >
            <div className="h-64 relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-xs font-semibold text-indigo-300 rounded-full border border-indigo-500/30">
                        {product.category}
                    </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center justify-center gap-2 font-bold transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg shadow-indigo-600/20"
                    >
                        <ShoppingCart size={18} /> Add to Cart
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                </div>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2 h-10">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-white">
                        ${product.price.toFixed(2)}
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        className="p-3 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-xl transition-all"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
