export interface RawPoi {
  id: number;
  type: string;
  feature: string;
  tags: Record<string, string>;
  country: string;
  state: string;
  city: string;
  street: string;
  name: string;
}

export interface Poi {
  id: number;
  type: string;
  feature: string;
  tags: Record<string, string>;
  country: string;
  state: string;
  city: string;
  street: string;
  name: string;
}
