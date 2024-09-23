"use client";

import React, {useState, useEffect} from 'react';
import {useSession} from "next-auth/react";
import {notFound, useRouter} from "next/navigation";
import {ProductDetail, ProductPageProps} from "@/../_lib/ProductLib/type/Product";
import {fetchProductById} from "@/../_lib/ProductLib/service/produit";
import {createOrder} from "@/../_lib/OrderLib/service/orders";
import {FaShoppingCart} from "react-icons/fa";
import Image from "next/image";
import {addToCart} from "@/../_lib/CartLib/service/cart";

export default function ProductPage({params}: ProductPageProps) {
    return (
        <main className="relative min-h-screen flex items-center justify-center">

        </main>
    );
}
