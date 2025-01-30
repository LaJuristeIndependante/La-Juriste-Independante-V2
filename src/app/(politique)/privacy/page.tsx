import PolicyManager from "@lib/PolicyLib/component/PolicyManager";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "politique de confidentialité",
};

const CGUPage = () => {
    return <PolicyManager slug="Confidentialite" />;
};

export default CGUPage;
