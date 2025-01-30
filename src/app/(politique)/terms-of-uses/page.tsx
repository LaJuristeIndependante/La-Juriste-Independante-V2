import PolicyManager from "@lib/PolicyLib/component/PolicyManager";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Politique de contition d'utilisation",
};

const CGUPage = () => {
    return <PolicyManager slug="CGU" />;
};

export default CGUPage;
