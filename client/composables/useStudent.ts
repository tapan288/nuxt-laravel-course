export const useStudent = () => {
  const students = ref({}),
    errors = ref({});
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

  const createStudent = async (studentForm) => {
    try {
      let response = await sanctumFetch("api/students", {
        method: "POST",
        body: studentForm,
      });

      return response;
    } catch (error: any) {
      if (error.statusCode == 422) {
        errors.value = error.data.errors;
      }

      return Promise.reject(null);
    }
  };

  const updateStudent = async (id: string, studentForm: StudentForm) => {
    try {
      let response = await sanctumFetch("api/students/" + id, {
        method: "PUT",
        body: studentForm,
      });

      return response;
    } catch (error: any) {
      if (error.statusCode == 422) {
        errors.value = error.data.errors;
      }

      return Promise.reject(null);
    }
  };

  const getStudent = async (id: string) => {
    try {
      let response = await sanctumFetch("api/students/" + id);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      let response = await sanctumFetch("api/students/" + id, {
        method: "DELETE",
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    students,
    fetchStudents,
    studentsUrl,
    createStudent,
    errors,
    updateStudent,
    getStudent,
    deleteStudent,
  };
};
