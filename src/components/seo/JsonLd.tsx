export function JsonLd() {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": "https://configshub.dev/#organization",
				name: "ConfigsHub",
				url: "https://configshub.dev",
				logo: {
					"@type": "ImageObject",
					url: "https://configshub.dev/logo.png",
					width: 512,
					height: 512,
				},
				description: "Modern configuration management platform for developers",
				sameAs: [
					"https://twitter.com/configshub",
					"https://github.com/configshub",
					"https://linkedin.com/company/configshub",
				],
			},
			{
				"@type": "WebSite",
				"@id": "https://configshub.dev/#website",
				url: "https://configshub.dev",
				name: "ConfigsHub - Modern Configuration Management Platform",
				description: "Secure, scalable configuration management for modern applications",
				publisher: {
					"@id": "https://configshub.dev/#organization",
				},
				potentialAction: [
					{
						"@type": "SearchAction",
						target: {
							"@type": "EntryPoint",
							urlTemplate: "https://configshub.dev/search?q={search_term_string}",
						},
						"query-input": "required name=search_term_string",
					},
				],
			},
			{
				"@type": "WebPage",
				"@id": "https://configshub.dev/#webpage",
				url: "https://configshub.dev",
				name: "ConfigsHub - Modern Configuration Management Platform",
				isPartOf: {
					"@id": "https://configshub.dev/#website",
				},
				description:
					"Transform how you manage application configurations with our secure, scalable platform featuring Apple-inspired design and enterprise-grade security.",
				breadcrumb: {
					"@id": "https://configshub.dev/#breadcrumb",
				},
			},
			{
				"@type": "SoftwareApplication",
				"@id": "https://configshub.dev/#software",
				name: "ConfigsHub",
				description: "Modern configuration management platform for developers and DevOps teams",
				url: "https://configshub.dev",
				applicationCategory: "DeveloperApplication",
				operatingSystem: "Web Browser",
				offers: {
					"@type": "AggregateOffer",
					priceCurrency: "USD",
					lowPrice: "0",
					highPrice: "99",
					offerCount: "3",
				},
				aggregateRating: {
					"@type": "AggregateRating",
					ratingValue: "4.8",
					reviewCount: "150",
					bestRating: "5",
				},
				featureList: [
					"Enterprise Security",
					"Version Control",
					"Multi-Environment Support",
					"Access Control",
					"API Integration",
					"Real-time Deployment",
				],
			},
		],
	};

	// biome-ignore lint/security/noDangerouslySetInnerHtml: Necessary for JSON-LD script injection
	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
	// biome-ignore lint/security/noDangerouslySetInnerHtml: Necessary for JSON-LD script injection
	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
