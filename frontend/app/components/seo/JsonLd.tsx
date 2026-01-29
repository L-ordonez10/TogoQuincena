import Script from 'next/script';

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * Componente para inyectar datos estructurados JSON-LD (Schema.org)
 * Mejora el SEO permitiendo a los motores de búsqueda entender mejor el contenido
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id={`jsonld-${data['@type']}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="beforeInteractive"
    />
  );
}

/**
 * Schema para Organization - Identifica el negocio
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'QuincenaToGo',
    description: 'Adelantos de quincena fácil y rápido. Proceso 100% en línea.',
    url: 'https://quincenatogo.com.gt',
    logo: 'https://quincenatogo.com.gt/imagenes/LogoQuincenaToGo.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'soporte@quincenatogo.com',
      contactType: 'customer service',
      availableLanguage: ['Spanish'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Mexico',
    },
    serviceType: 'Adelantos de nómina',
  };

  return <JsonLd data={schema} />;
}

/**
 * Schema para WebSite con SearchAction
 */
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'QuincenaToGo',
    url: 'https://quincenatogo.com.gt',
    description: 'Adelantos de quincena fácil y rápido',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://quincenatogo.com.gt/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={schema} />;
}

/**
 * Schema para BreadcrumbList - Mejora navegación en resultados
 */
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://quincenatogo.com.gt${item.url}`,
    })),
  };

  return <JsonLd data={schema} />;
}

/**
 * Schema para Service - Describe los servicios ofrecidos
 */
export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Adelanto de Nómina',
    provider: {
      '@type': 'FinancialService',
      name: 'QuincenaToGo',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Mexico',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Adelanto',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Adelanto de Quincena',
            description: 'Obtén tu dinero antes de la fecha de pago',
          },
        },
      ],
    },
  };

  return <JsonLd data={schema} />;
}

/**
 * Schema para FAQPage - Para páginas con preguntas frecuentes
 */
export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}
