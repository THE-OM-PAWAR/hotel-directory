export function generateHostelStructuredData(hostel: any, profile: any) {
  // Get the area/neighborhood from the address or landmark
  const getArea = (address: string = '', landmark: string = '') => {
    const bhopalAreas = [
      'MP Nagar', 'Arera Colony', 'New Market', 'TT Nagar', 'Bittan Market',
      'Kolar Road', 'Shahpura', 'Habibganj', 'BHEL', 'Bairagarh',
      'Indrapuri', 'Ayodhya Bypass', 'Hoshangabad Road', 'Lalghati',
      '10 Number Market', '11 Number Market', '12 Number Market',
      'Awadhpuri', 'Karond', 'Piplani', 'Ashoka Garden'
    ];

    const addressLower = address.toLowerCase();
    const landmarkLower = landmark.toLowerCase();
    
    const area = bhopalAreas.find(area => 
      addressLower.includes(area.toLowerCase()) || 
      landmarkLower.includes(area.toLowerCase())
    );

    return area || 'Bhopal';
  };

  const area = getArea(profile?.basicInfo?.address, profile?.basicInfo?.landmark);
  const areaKeywords = `${area}, Bhopal`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: `${hostel.name} - ${areaKeywords}`,
    description: profile?.rulesAndPolicies || 
      `${hostel.name} offers comfortable hostel accommodation in ${areaKeywords}. Perfect for students and working professionals.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: profile?.basicInfo?.address || '',
      addressLocality: 'Bhopal',
      addressRegion: 'Madhya Pradesh',
      postalCode: profile?.basicInfo?.pincode || '',
      addressCountry: 'IN',
      areaServed: areaKeywords,
    },
    telephone: profile?.basicInfo?.contactNumber || '',
    email: profile?.basicInfo?.email || '',
    image: profile?.media?.profileImage || profile?.media?.bannerImage || '',
    areaServed: {
      '@type': 'City',
      name: 'Bhopal',
      containsPlace: {
        '@type': 'Place',
        name: area,
      },
    },
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
    keywords: [
      'hostel', 'PG', 'accommodation', 'rooms',
      area, 'Bhopal', 'Madhya Pradesh',
      'student accommodation', 'working professional accommodation',
      'boys hostel', 'girls hostel',
      'affordable accommodation', 'safe accommodation',
    ].join(', '),
  };

  return structuredData;
}

export function generateRoomStructuredData(room: any, block: any, hostel: any) {
  // Get the area/neighborhood from the address or landmark
  const getArea = (address: string = '', landmark: string = '') => {
    const bhopalAreas = [
      'MP Nagar', 'Arera Colony', 'New Market', 'TT Nagar', 'Bittan Market',
      'Kolar Road', 'Shahpura', 'Habibganj', 'BHEL', 'Bairagarh',
      'Indrapuri', 'Ayodhya Bypass', 'Hoshangabad Road', 'Lalghati',
      '10 Number Market', '11 Number Market', '12 Number Market',
      'Awadhpuri', 'Karond', 'Piplani', 'Ashoka Garden'
    ];

    const addressLower = address.toLowerCase();
    const landmarkLower = landmark.toLowerCase();
    
    const area = bhopalAreas.find(area => 
      addressLower.includes(area.toLowerCase()) || 
      landmarkLower.includes(area.toLowerCase())
    );

    return area || 'Bhopal';
  };

  const area = getArea(block?.basicInfo?.address, block?.basicInfo?.landmark);
  const areaKeywords = `${area}, Bhopal`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${room.name} - ${areaKeywords}`,
    description: room.description || 
      `${room.name} - Comfortable accommodation available at ${hostel?.name || 'our hostel'} in ${areaKeywords}. Ideal for students and working professionals.`,
    image: room.images?.[0]?.url || '',
    offers: {
      '@type': 'Offer',
      price: room.rent || 0,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `/rooms/${room._id}`,
      areaServed: {
        '@type': 'City',
        name: 'Bhopal',
        containsPlace: {
          '@type': 'Place',
          name: area,
        },
      },
    },
    brand: {
      '@type': 'Organization',
      name: hostel?.name || 'GetStay',
      location: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bhopal',
          addressRegion: 'Madhya Pradesh',
          addressCountry: 'IN',
          streetAddress: block?.basicInfo?.address || '',
        },
      },
    },
    keywords: [
      'room', 'hostel room', 'PG room', 'accommodation',
      area, 'Bhopal', 'Madhya Pradesh',
      'student room', 'working professional room',
      'affordable room', 'safe accommodation',
      room.type || 'single room',
      room.gender || 'unisex',
      'furnished room',
    ].join(', '),
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
  const bhopalAreas = [
    'MP Nagar', 'Arera Colony', 'New Market', 'TT Nagar', 'Bittan Market',
    'Kolar Road', 'Shahpura', 'Habibganj', 'BHEL', 'Bairagarh',
    'Indrapuri', 'Ayodhya Bypass', 'Hoshangabad Road', 'Lalghati',
    '10 Number Market', '11 Number Market', '12 Number Market',
    'Awadhpuri', 'Karond', 'Piplani', 'Ashoka Garden'
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GetStay',
    url: 'https://getstay.in',
    logo: 'https://getstay.in/logo.png',
    description: `Find the best hostels, PG accommodations, and rooms in Bhopal. We offer affordable and safe accommodation options in prime locations including ${bhopalAreas.slice(0, 5).join(', ')} and other areas of Bhopal. Perfect for students and working professionals.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bhopal',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: 'Bhopal',
      description: `Serving all major areas in Bhopal including ${bhopalAreas.join(', ')}`,
      containsPlace: bhopalAreas.map(area => ({
        '@type': 'Place',
        name: area,
      })),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Hindi'],
    },
    keywords: [
      'hostel in Bhopal', 'PG in Bhopal', 'rooms in Bhopal',
      ...bhopalAreas.map(area => [
        `hostel in ${area}`,
        `hostels in ${area}`,
        `Best hostels in ${area}`,
        `PG in ${area}`,
        `rooms in ${area}`,
        `student accommodation in ${area}`,
        `working professional accommodation in ${area}`
      ]).flat(),
      'student hostel Bhopal', 'working professional PG Bhopal',
      'boys hostel Bhopal', 'girls hostel Bhopal',
      'affordable PG Bhopal', 'safe hostel Bhopal',
      'best PG in Bhopal', 'top hostels in Bhopal'
    ].join(', '),
  };
}
