export const useStudent = () => {
  const students = ref({});
  const sanctumFetch = useSanctumClient();

  let studentsUrl = computed(() => {
    let url = new URL("http://backend.test/api/students");

    return url;
  });

  const fetchStudents = async () => {
    try {
      let response = await sanctumFetch(studentsUrl.value.href);

      students.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { students, fetchStudents, studentsUrl };
};
