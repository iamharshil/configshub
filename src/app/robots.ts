import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/dashboard/", "/api/", "/auth/"],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				disallow: ["/dashboard/", "/api/"],
			},
			{
				userAgent: "Bingbot",
				allow: "/",
				disallow: ["/dashboard/", "/api/"],
			},
		],
		sitemap: "https://configshub.dev/sitemap.xml",
		host: "https://configshub.dev",
	};
}
