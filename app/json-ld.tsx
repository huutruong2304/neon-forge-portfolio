import { siteConfig } from '@/config/site';

export function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    sameAs: ['https://github.com/huutruong2304', 'https://www.linkedin.com/in/truongnh9x'],
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Frontend Development', 'Backend Development'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
