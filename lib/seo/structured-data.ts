export function generateHostelStructuredData(hostel: any, profile: any) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: hostel.name,
    description: profile?.rulesAndPolicies || `${hostel.name} hostel accommodation`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: profile?.basicInfo?.address || '',
      addressLocality: profile?.basicInfo?.city || 'Bhopal',
      addressRegion: 'Madhya Pradesh',
      postalCode: profile?.basicInfo?.pincode || '',
      addressCountry: 'IN',
    },
    telephone: profile?.basicInfo?.contactNumber || '',
    email: profile?.basicInfo?.email || '',
    image: profile?.media?.profileImage || profile?.media?.bannerImage || '',
    ...(profile?.locationFactors?.googleMapLink && {
      hasMap: profile.locationFactors.googleMapLink,
    }),
    ...(profile?.propertyDetails?.facilities && {
      amenityFeature: profile.propertyDetails.facilities
        .filter((f: any) => f.available)
        .map((f: any) => ({
          '@type': 'LocationFeatureSpecification',
          name: f.name,
        })),
    }),
  };

  return structuredData;
}

export function generateRoomStructuredData(room: any, block: any, hostel: any) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: room.name,
    description: room.description || `${room.name} at ${hostel?.name || 'Hostel'}`,
    image: room.images?.[0]?.url || '',
    offers: {
      '@type': 'Offer',
      price: room.rent || 0,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `/rooms/${room._id}`,
    },
    brand: {
      '@type': 'Organization',
      name: hostel?.name || 'GetStay',
    },
  };

  return structuredData;
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://getstay.in${item.url}`,
    })),
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GetStay',
    url: 'https://getstay.in',
    logo: 'https://getstay.in/logo.png',
    description: 'Find the best hostels, PG accommodations, and rooms in Bhopal',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bhopal',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}
