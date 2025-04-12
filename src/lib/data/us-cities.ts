
export interface City {
  name: string;
  slug: string;
  state: string;
}

// This is a sample list - you will need to expand this with your actual city data
export const cities: City[] = [
  { name: 'Phoenix', slug: 'phoenix', state: 'az' },
  { name: 'Scottsdale', slug: 'scottsdale', state: 'az' },
  { name: 'Tempe', slug: 'tempe', state: 'az' },
  { name: 'Mesa', slug: 'mesa', state: 'az' },
  { name: 'Los Angeles', slug: 'los-angeles', state: 'ca' },
  { name: 'San Francisco', slug: 'san-francisco', state: 'ca' },
  { name: 'New York', slug: 'new-york', state: 'ny' },
  { name: 'Chicago', slug: 'chicago', state: 'il' },
  { name: 'Miami', slug: 'miami', state: 'fl' },
  { name: 'Dallas', slug: 'dallas', state: 'tx' },
  { name: 'Houston', slug: 'houston', state: 'tx' },
  { name: 'Seattle', slug: 'seattle', state: 'wa' },
  { name: 'Portland', slug: 'portland', state: 'or' },
  { name: 'Las Vegas', slug: 'las-vegas', state: 'nv' },
  { name: 'Denver', slug: 'denver', state: 'co' }
];
