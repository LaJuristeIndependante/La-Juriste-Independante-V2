import UserOrders from "@/components/orders/UserOrders";

export default function orderPage() {
    return (
        <main className="relative h-auto flex flex-col items-center justify-between min-h-screen">
            <UserOrders/>
        </main>
    )
}