
export interface City {
  name: string;
  slug: string;
  state: string;
  stateCode: string;
}

export const cities: City[] = [
  { name: 'Phoenix', slug: 'phoenix', state: 'Arizona', stateCode: 'az' },
  { name: 'Scottsdale', slug: 'scottsdale', state: 'Arizona', stateCode: 'az' },
  { name: 'Los Angeles', slug: 'los-angeles', state: 'California', stateCode: 'ca' },
  { name: 'San Francisco', slug: 'san-francisco', state: 'California', stateCode: 'ca' },
  { name: 'Miami', slug: 'miami', state: 'Florida', stateCode: 'fl' },
  { name: 'Chicago', slug: 'chicago', state: 'Illinois', stateCode: 'il' },
  { name: 'New York', slug: 'new-york', state: 'New York', stateCode: 'ny' },
  { name: 'Portland', slug: 'portland', state: 'Oregon', stateCode: 'or' },
  { name: 'Dallas', slug: 'dallas', state: 'Texas', stateCode: 'tx' },
  { name: 'Seattle', slug: 'seattle', state: 'Washington', stateCode: 'wa' },
];

export const getCityBySlug = (stateSlug: string, citySlug: string): City | undefined => {
  return cities.find(
    (city) => city.stateCode === stateSlug && city.slug === citySlug
  );
};
