import React from 'react';

const ImageComponent = ({
  src,
  alt,
  width,
  height,
  srcSet,
  sizes,
  loading = 'lazy',
  priority = false, // When true, image loads eagerly with high fetch priority
  className,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={sizes}
      loading={priority ? 'eager' : loading}
      {...(priority ? { fetchpriority: 'high' } : {})}
      className={className}
      {...props}
    />
  );
};

export default ImageComponent;
