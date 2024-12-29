export const useUnit = () => {
  const sanctumFetch = useSanctumClient();
  const units = ref({});

  const fetchUnits = async () => {
    try {
      const response = await sanctumFetch("api/units");

      units.value = response;
    } catch (error) {
      console.log(error);
    }
  };

  return { units, fetchUnits };
};
