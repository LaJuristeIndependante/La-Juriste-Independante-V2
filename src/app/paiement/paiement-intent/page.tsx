"use client";

import PaiementIntentForm from "@lib/StripeLib/components/PaiementIntentForm";
export const dynamic = "force-dynamic";
import React, {Suspense} from "react";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

export default function PaiementIntentPage() {
    return (
        <section className={"min-h-screen flex justify-center items-center w-full"}>
            <Suspense fallback={<div>Chargement…</div>}>
                <Elements stripe={stripePromise}>
                    <PaiementIntentForm/>
                </Elements>
            </Suspense>
        </section>
    );
}
