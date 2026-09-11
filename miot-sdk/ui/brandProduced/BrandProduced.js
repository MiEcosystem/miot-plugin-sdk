import React from 'react';
import { useGetBrandInfo } from './useGetBrandInfo';
import { BrandComponent } from './BrandComponent';
export function BrandProduced() {
  const { brandId, brandName } = useGetBrandInfo();
  return <BrandComponent brandId={brandId} brandName={brandName} />;
}