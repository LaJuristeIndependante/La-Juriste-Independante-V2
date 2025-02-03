import PolicyManager from "@lib/PolicyLib/component/PolicyManager";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "politique de confidentialité",
    robots:{
        index: false,
        follow: true,
    }
};

const CGUPage = () => {
    return <PolicyManager slug="Confidentialite" />;
};

export default CGUPage;
