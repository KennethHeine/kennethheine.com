import { FC } from 'react';

/**
 * Props for the JsonLd component
 */
interface JsonLdProps {
  /** Structured data object to be embedded as JSON-LD */
  data: Record<string, unknown>;
}

/**
 * Component for embedding JSON-LD structured data
 *
 * This component takes a structured data object and embeds it as a JSON-LD script tag
 * for search engines to parse. Follows schema.org standards.
 *
 * @param data - The structured data object to embed
 * @returns Script tag with JSON-LD structured data
 */
export const JsonLd: FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  );
};
