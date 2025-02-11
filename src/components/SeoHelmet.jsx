// components/SeoHelmet.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

const SeoHelmet = ({ title, description, jsonSchema }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {jsonSchema && (
        <script type="application/ld+json">
          {JSON.stringify(jsonSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SeoHelmet;
