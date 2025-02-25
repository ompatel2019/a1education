import React, { ImgHTMLAttributes } from 'react';

interface ImageComponentProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: string | number;
  height: string | number;
  srcSet?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean; // When true, forces eager loading and high fetch priority for critical images
  className?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height,
  srcSet,
  sizes,
  loading = 'lazy',
  priority = false,
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
