// SeoHelmet.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

const SeoHelmet = ({ title, description, canonicalUrl, jsonSchema }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {jsonSchema && (
        <script type="application/ld+json">
          {JSON.stringify(jsonSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SeoHelmet;
