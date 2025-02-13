import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";
import convertToSubcurrency from "@lib/StripeLib/convertToSubcurrency";
import * as process from "node:process";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion:"2024-06-20",
    typescript: true
});

export async function POST(request: NextRequest) {
    try {
        const { amount, orderId ,personalInfo } = await request.json();

        const amountInCent = convertToSubcurrency(amount)

        // Créer un client Stripe
        const customer = await stripe.customers.create({
            name: personalInfo.name,
            email: personalInfo.email,
            phone: personalInfo.phone,
            address: {
                city: personalInfo.address.city,
                country: personalInfo.address.country,
                postal_code: personalInfo.address.postalCode,
                line1: personalInfo.address.line1,
            },
        });

        const checkout = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer: customer.id,
            mode: "payment",
            success_url: `https://${process.env.NEXTAUTH_URL}/paiement/success?token=${customer.id}&orderId=${orderId}`,
            cancel_url: `https://${process.env.NEXTAUTH_URL}?token=`+customer.id,
            line_items: [{
                quantity: 1,
                price_data: {
                    product_data: {
                        name: personalInfo.name,
                    },
                    currency: "EUR",
                    unit_amount: amountInCent,
                },
            }]
        })
        return NextResponse.json({msg: checkout, url: checkout.url}, {status: 200});
    } catch (error) {
        console.error("Internal Error", error);

        return NextResponse.json(
            { error: `Internal Server Error : ${error}` },
            { status: 500 }
        );
    }
}
