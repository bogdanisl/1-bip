import { Bip } from "@/src/types/Bip";
import { MapParams, OfficeData } from "@/src/types/OfficeData";
import { storage } from "@/src/services/storage/asyncStorage";
import { useEffect, useState } from "react";
import { apiRequest } from "@/src/services/api/client";
import { useSelectedBipStore } from "@/src/hooks/use-selected-bip";

export const useOfficeMap = () => {
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const [mapParams, setMapParams] = useState<MapParams | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!selectedBip) return;

      const cacheKey = `${selectedBip.id}/officeData`;
      const cached = await storage.get<OfficeData>(cacheKey);

      if (cached?.map) {
        setMapParams(cached.map);
        return;
      }

      // if (!selectedBip.url) return;

      // try {
      //   const fetched = await apiRequest<OfficeData>('/api/v1/data')
      //   if (!fetched) return;

      //   setMapParams(fetched.map ?? null);
      //   await storage.set(cacheKey, fetched);
      // } catch (error) {
      //   console.error("useOfficeMap error:", error);
      // }
    };

    load();
  }, [selectedBip]);

  return mapParams;
};