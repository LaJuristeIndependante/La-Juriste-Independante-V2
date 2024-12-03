export function generateReceiptEmail(customerName: string, orderId: string, totalHT: number, tva: number, totalTTC: number) {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Merci pour votre achat, ${customerName} !</h2>
            <p>Voici votre reçu pour la commande <strong>${orderId}</strong> :</p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Montant HT</th>
                    <td style="padding: 8px; border: 1px solid #ddd;">${totalHT.toFixed(2)} €</td>
                </tr>
                <tr>
                    <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">TVA</th>
                    <td style="padding: 8px; border: 1px solid #ddd;">${tva.toFixed(2)} €</td>
                </tr>
                <tr>
                    <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Montant TTC</th>
                    <td style="padding: 8px; border: 1px solid #ddd;">${totalTTC.toFixed(2)} €</td>
                </tr>
            </table>
            <p>Nous espérons que vous appréciez votre achat !</p>
            <p>Cordialement, <br />L'équipe de votre Boutique</p>
        </div>
    `;
}
