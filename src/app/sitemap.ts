import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://configshub.dev";
	const lastModified = new Date();

	return [
		{
			url: baseUrl,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/auth/signin`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/auth/signup`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/dashboard`,
			lastModified,
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/features`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/pricing`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/docs`,
			lastModified,
			changeFrequency: "weekly",
			priority: 0.6,
		},
	];
}
