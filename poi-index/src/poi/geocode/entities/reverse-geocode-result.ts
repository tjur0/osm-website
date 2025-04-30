export interface ReverseGeocodeResult {
  type: 'FeatureCollection';
  geocoding: {
    version: string;
    attribution: string;
    licence: string;
    query: string;
  };
  features: Feature[];
}

export interface Feature {
  type: 'Feature';
  properties: {
    geocoding: {
      place_id: number;
      osm_type: string;
      osm_id: number;
      osm_key: string;
      osm_value: string;
      type: string;
      accuracy: number;
      label: string;
      name: string;
      housenumber: string;
      postcode: string;
      street?: string;
      district?: string;
      city?: string;
      state?: string;
      country: string;
      country_code: string;
      admin: {
        level10?: string;
        level8?: string;
        level4?: string;
        level3?: string;
      };
    };
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}
