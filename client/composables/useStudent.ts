export const useStudent = () => {
  const students = ref({}),
    errors = ref({}),
    metaData = ref({}),
    pageNumber = ref("1"),
    search = ref("");
  const sanctumFetch = useSanctumClient();

  let studentsUrl = computed(() => {
    let url = new URL("http://backend.test/api/students");

    url.searchParams.append("page", pageNumber.value);

    if (search.value) {
      url.searchParams.append("search", search.value);
    }

    return url;
  });

  const fetchStudents = async (studentsUrl: string) => {
    console.log(studentsUrl);

    try {
      let response = await sanctumFetch(studentsUrl);

      students.value = response.data;
      metaData.value = response.meta;
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

  const updatedPageNumber = (link: Object) => {
    pageNumber.value = link.url.split("page=")[1];
  };

  watch(
    () => studentsUrl.value,
    (updatedStudentsUrl) => {
      fetchStudents(updatedStudentsUrl);
    }
  );

  return {
    students,
    fetchStudents,
    studentsUrl,
    createStudent,
    errors,
    updateStudent,
    getStudent,
    deleteStudent,
    pageNumber,
    metaData,
    updatedPageNumber,
    search,
  };
};
