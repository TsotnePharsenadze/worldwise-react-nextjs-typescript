import { useSearchParams } from "next/navigation";

export function useUrlPosition(): [number | null, number | null] {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const latitude = lat ? parseFloat(lat) : null;
  const longitude = lng ? parseFloat(lng) : null;

  return [latitude, longitude];
}
