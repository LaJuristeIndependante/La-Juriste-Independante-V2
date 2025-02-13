// app/api/payment/charge-installment/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
    typescript: true,
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            customerId,
            paymentMethodId,
            orderId,
            installments,
            installmentAmount,
        } = body

        // 1) Attacher la carte (PaymentMethod) au client
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        })

        // 2) Définir la carte comme PM par défaut
        await stripe.customers.update(customerId, {
            invoice_settings: { default_payment_method: paymentMethodId },
        })

        // 3) Créer dynamiquement un Product (optionnel, juste pour l'exemple)
        //    => Nom = "Paiement 3x pour commande <orderId>"
        const product = await stripe.products.create({
            name: `Paiement échelonné - Commande #${orderId}`,
        })

        // 4) Créer un Price mensuel basé sur installmentAmount (en centimes)
        //    ex: si installmentAmount = 5000 => 50,00 €
        const price = await stripe.prices.create({
            unit_amount: installmentAmount, // Montant de chaque mensualité
            currency: 'eur',
            recurring: {
                interval: 'month',      // mensuel
                interval_count: 1,      // 1 mois
            },
            product: product.id,
        })

        // 5) Créer une Subscription Schedule sur N=installments mois
        const schedule = await stripe.subscriptionSchedules.create({
            customer: customerId,
            start_date: 'now',
            end_behavior: 'cancel',
            default_settings: {
                collection_method: "charge_automatically"
            },
            phases: [
                {
                    items: [
                        {
                            price: price.id,
                            quantity: 1,
                        },
                    ],
                    collection_method: "charge_automatically",
                    iterations: installments,
                },
            ],
            expand: ['subscription.latest_invoice.payment_intent'],
        })

        return NextResponse.json({ schedule })
    } catch (err: any) {
        console.error('[charge-installment] Error:', err)
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
