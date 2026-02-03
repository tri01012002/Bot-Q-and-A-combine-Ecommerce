"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Filter } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

const ecommerceProducts = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        description: "Experience crystal clear sound with our flagship noise-cancelling headphones. Featuring 30-hour battery life and touch controls.",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        rating: 4.8,
    },
    {
        id: 2,
        name: "Minimalist Mechanical Keyboard",
        price: 159.50,
        description: "A compact 65% mechanical keyboard with hot-swappable switches and customizable RGB lighting for the ultimate typing experience.",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
        rating: 4.9,
    },
    {
        id: 3,
        name: "Leather Messenger Bag",
        price: 185.00,
        description: "Handcrafted from genuine top-grain leather, this messenger bag fits a 15-inch laptop and features solid brass hardware.",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        rating: 4.7,
    },
    {
        id: 4,
        name: "Professional Camera Lens",
        price: 899.00,
        description: "Ultra-wide angle lens perfect for landscape and architectural photography. f/2.8 aperture for stunning low-light performance.",
        category: "Photography",
        image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&q=80",
        rating: 5.0,
    },
    {
        id: 5,
        name: "Smart Running Watch",
        price: 249.00,
        description: "Track your workouts, heart rate, and sleep with precision. Built-in GPS and water-resistant up to 50 meters.",
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        rating: 4.6,
    },
    {
        id: 6,
        name: "Architectural Desk Lamp",
        price: 75.00,
        description: "Brushed aluminum desk lamp with adjustable arm and color temperature controls. Ideal for late-night design sessions.",
        category: "Home Office",
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80",
        rating: 4.5,
    }
];

export default function ShopPage() {
    return (
        <div className="min-h-screen bg-slate-950 py-24 px-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-slate-500 bg-clip-text text-transparent">
                            Premium Collection
                        </h1>
                        <p className="text-slate-400 max-w-xl text-lg">
                            Elevate your lifestyle with our curated selection of high-performance gear and essentials.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-2 text-sm text-slate-300 hover:border-indigo-500/30 transition-all cursor-pointer">
                            <Filter size={18} /> Filter Categories
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ecommerceProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
