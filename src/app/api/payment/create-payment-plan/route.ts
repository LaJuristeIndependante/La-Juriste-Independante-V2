// app/api/payment/create-payment-plan/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
    typescript: true,
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { personalInfo } = body

        // 1) Créer un Client (Customer)
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
        })

        // 2) Créer un SetupIntent pour collecter la carte
        const setupIntent = await stripe.setupIntents.create({
            payment_method_types: ['card'],
            customer: customer.id,
        })

        return NextResponse.json({
            setupIntentClientSecret: setupIntent.client_secret,
            customerId: customer.id,
        })
    } catch (err: any) {
        console.error('[create-payment-plan] Error:', err)
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
