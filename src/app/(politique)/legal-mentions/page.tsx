import PolicyManager from "@lib/PolicyLib/component/PolicyManager";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "mentions légale",
};

const CGUPage = () => {
    return <PolicyManager slug="Mentions legales"/>;
};

export default CGUPage;
