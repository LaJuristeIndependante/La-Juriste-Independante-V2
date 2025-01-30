import PolicyManager from "@lib/PolicyLib/component/PolicyManager";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Politique de condition de ventes",
};

const CGUPage = () => {
    return <PolicyManager slug="CGV" />;
};

export default CGUPage;
