import catalog from "@/data/feeling-yachty-main.json";

export interface YachtSource {
  title: string;
  fileId: string;
  tab: string;
  gid: string;
  url: string;
  ignoredTabs: string[];
  importedAt: string;
  modifiedTime: string;
  owner: string;
  count: number;
}

export interface Yacht {
  id: number;
  name: string;
  brand: string | null;
  model: string | null;
  type: string;
  year: number | null;
  capacity: number | null;
  lengthFt: number | null;
  pricePerHour: number | null;
  priceRaw: string | null;
  location: string;
  captainIncluded: boolean;
  rating: number | null;
  status: string;
  lat: number | null;
  lng: number | null;
  owner: string;
  photoCount: number;
  description: string;
  lastSynced: string | null;
  heroImage: string | null;
}

export const yachtSource = catalog.source as YachtSource;
export const yachts = catalog.yachts as unknown as Yacht[];

export function yachtStats(list: Yacht[] = yachts) {
  const types: Record<string, number> = {};
  const owners: Record<string, number> = {};
  let captains = 0;
  let prices = 0;
  let priceSum = 0;
  for (const yacht of list) {
    types[yacht.type] = (types[yacht.type] ?? 0) + 1;
    owners[yacht.owner] = (owners[yacht.owner] ?? 0) + 1;
    if (yacht.captainIncluded) captains += 1;
    if (yacht.pricePerHour != null) {
      prices += 1;
      priceSum += yacht.pricePerHour;
    }
  }
  return {
    count: list.length,
    types,
    owners,
    captains,
    avgPrice: prices ? Math.round(priceSum / prices) : 0,
  };
}

export function findYacht(id: number): Yacht | undefined {
  return yachts.find((yacht) => yacht.id === id);
}
