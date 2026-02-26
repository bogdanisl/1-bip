import { OfficeData } from "@/src/types/OfficeData";
import { storage } from "@/src/services/storage/asyncStorage";
import { useEffect, useState } from "react";
import { apiRequest } from "@/src/services/api/client";
import { useSelectedBipStore } from "@/src/hooks/use-selected-bip";

export const useOfficeData = () => {
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);
  const [officeData, setOfficeData] = useState<OfficeData | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!selectedBip) return;

      const cacheKey = `${selectedBip.id}/officeData`;
      const cached = await storage.get<OfficeData>(cacheKey);

      if (cached) {
        setOfficeData(cached);
        return;
      }
      return;
    }

    load();
  }, [selectedBip]);

  return officeData;
};