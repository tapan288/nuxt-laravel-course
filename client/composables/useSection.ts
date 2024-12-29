export const useSection = () => {
  const sanctumFetch = useSanctumClient();
  const sections = ref({});

  const fetchSections = async (unit_id: string) => {
    try {
      const response = await sanctumFetch("api/sections?unit_id=" + unit_id);

      sections.value = response;
    } catch (error) {
      console.log(error);
    }
  };

  return { sections, fetchSections };
};
