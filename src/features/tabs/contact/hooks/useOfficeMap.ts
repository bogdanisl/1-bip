import { Bip } from "@/types/Bip";
import { MapParams, OfficeData } from "@/types/OfficeData";
import { fetchOfficeData } from "@/utils/data";
import { storage } from "@/utils/storage/asyncStorage";
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