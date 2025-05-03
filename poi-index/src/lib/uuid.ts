import { v5 as uuidv5 } from 'uuid';

export const FEATURE_NAMESPACE = '61fc4ccb-d7e8-44d3-84dc-a503d1c52ff3';

export function generateFeatureUUID(key: string, value: string): string {
  return uuidv5(`${key}:${value}`, FEATURE_NAMESPACE);
}
