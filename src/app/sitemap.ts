import {MetadataRoute} from "next";
import * as process from "node:process";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    return[
        {
            url: `${process.env.NEXTAUTH_URL}/support`,
            lastModified: new Date(),
        }
    ]
}