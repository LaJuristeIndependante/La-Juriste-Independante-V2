import {NextRequest, NextResponse} from 'next/server'
import Stripe from 'stripe'
import * as process from "node:process";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
    typescript: true
})

export const GET = async (req: NextRequest) => {
    try{
        const {searchParams} = new URL(req.url);
        const token = searchParams.get('token');
        const orderId = searchParams.get('orderId');

        if(!orderId){
            return NextResponse.json({error: "il n'y a pas de commande"}, {status: 400});
        }

        if(!token){
            return NextResponse.json({error: "token is required"}, {status: 400});
        }

        const customer = await stripe.customers.retrieve(token)

        if((customer as Stripe.DeletedCustomer).deleted){
            return NextResponse.json({error: "customer has been deleted"}, {status: 404});
        }

        const customerData = customer as Stripe.Customer

        return NextResponse.json({name: customerData.name, email: customerData.email, orderId: orderId}, {status: 200})

    }catch(err : any){
        console.error(err);
        return NextResponse.json({error: "Erreur de la requete GET"}, {status: 500})
    }
}
