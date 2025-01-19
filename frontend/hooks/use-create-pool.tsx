import { creatoHook } from "@/type/type";
import moment from "moment";
import { useEffect } from "react";


export function useCreatePool({
  poolDemoImage,
  poolEnd,
  poolStart,
  poolLock,
  setEndDate,
  setLockDate,
  setImage,
  setStartDate,
}:creatoHook) {
  useEffect(() => {
    if (poolDemoImage !== undefined) {
      const fileContent = poolDemoImage[0]; // Example string
      if (!fileContent) return
      const blob = new Blob([fileContent], { type: "image/*" }); // Create a Blob from the string
      setImage(URL.createObjectURL(blob));
    }
    // Check if the value is a valid Moment object
    if (moment.isMoment(poolStart)) {
      // Math.floor(new Date().getTime() / 1000.0);
      const date = Math.floor(
        new Date(poolStart.format("YYYY-MM-DD HH:mm:ss")).getTime()
      );
      setStartDate(+date);
    }
    // Check if the value is a valid Moment object
    if (moment.isMoment(poolLock)) {
      const date = Math.floor(
        new Date(poolLock.format("YYYY-MM-DD HH:mm:ss")).getTime()
      );
      setLockDate(+date);
    }
    // Check if the value is a valid Moment object
    if (moment.isMoment(poolEnd)) {
      const date = Math.floor(
        new Date(poolEnd.format("YYYY-MM-DD HH:mm:ss")).getTime()
      );
      setEndDate(date);
    }
  }, [
    poolDemoImage,
    poolEnd,
    poolLock,
    poolStart,
    setEndDate,
    setLockDate,
    setImage,
    setStartDate,
  ]);
}