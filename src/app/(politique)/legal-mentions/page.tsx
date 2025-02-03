import PolicyManager from "@lib/PolicyLib/component/PolicyManager";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "mentions légale",
    robots:{
        index: false,
        follow: true,
    }
};

const CGUPage = () => {
    return <PolicyManager slug="Mentions legales"/>;
};

export default CGUPage;
