export interface RawPoi {
  id: number;
  type: string;
  feature: string;
  point: string;
  tags: string;
  country: string;
  state: string;
  city: string;
  street: string;
}

export interface Poi {
  id: number;
  type: string;
  feature: string;
  point: {
    type: string;
    coordinates: number[];
  };
  tags: Record<string, string>;
  country: string;
  state: string;
  city: string;
  street: string;
}
