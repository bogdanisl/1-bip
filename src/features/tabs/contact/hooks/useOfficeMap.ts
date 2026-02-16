import { Bip } from "@/src/types/Bip";
import { MapParams, OfficeData } from "@/src/types/OfficeData";
import { fetchOfficeData } from "@/src/services/api/data";
import { storage } from "@/src/storage/asyncStorage";
import { useEffect, useState } from "react";

export const useOfficeMap = (selectedBip: Bip | null) => {
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

      if (!selectedBip.url) return;

      try {
        const fetched = await fetchOfficeData(selectedBip.url);
        if (!fetched) return;

        setMapParams(fetched.map ?? null);
        await storage.set(cacheKey, fetched);
      } catch (error) {
        console.error("useOfficeMap error:", error);
      }
    };

    load();
  }, [selectedBip]);

  return mapParams;
};