import type { ImgHTMLAttributes } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fetchPriority?: 'high' | 'low' | 'auto';
}

export default function AppImage({
  alt,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  ...props
}: AppImageProps) {
  return <img alt={alt} loading={loading} decoding={decoding} fetchPriority={fetchPriority} {...props} />;
}
