import {MetadataRoute} from "next";
import * as process from "node:process";

export default function robots() : MetadataRoute.Robots{
    return {
        rules:[
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin",
                    "/support",
                ]
            }
        ],
        sitemap: `${process.env.NEXTAUTH_URL}/sitemap.xml`,
    }
}