"use client"

import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import axios from "axios";
import {updateOrderStatus} from "@lib/OrderLib/service/orders";
import {useRouter} from "next/navigation";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId") || "";
    const token = searchParams.get("token");
    const router = useRouter();
    const [customerData, setCustomerData] = useState<any>(null)
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    useEffect(()=>{
        if(token){
            axios.get(`/api/payment/success`, {params: {token, orderId}})
            .then(res => setCustomerData(res.data))
                .catch(err => console.log(err))
        }
        const updateStatus = async (): Promise<void> => {
            try {
                await updateOrderStatus(orderId, 'paid');
            } catch (err: any) {
                setErrorMessage('An error occurred while updating your order.');
                console.error('Erreur lors de la mise à jour de la commande:', err.message);
            }
        };

        updateStatus();
    }, [customerData, orderId, token])

    if(!token){
        return <div>Loading...</div>;
    }

    const orderPageReturn = () => {
        router.push("/orders");
    }

    return(
        <div className="w-full min-h-screen flex items-center justify-center flex-col gap-3 text-center">
            <h1>Paiement reussi</h1>

            {customerData ? (
                <div>
                    <p>merci pour votre achat, {customerData?.name}</p>
                    <ul>
                        <li>Email: {customerData?.email}</li>
                    </ul>
                    <button onClick={()=>orderPageReturn()}>Voir mon produit</button>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    )
}