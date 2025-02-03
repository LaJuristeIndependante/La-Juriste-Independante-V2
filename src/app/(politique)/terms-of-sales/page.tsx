import PolicyManager from "@lib/PolicyLib/component/PolicyManager";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Politique de condition de ventes",
    robots:{
        index: false,
        follow: true,
    }
};

const CGUPage = () => {
    return <PolicyManager slug="CGV" />;
};

export default CGUPage;
