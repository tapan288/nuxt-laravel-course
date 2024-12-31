<script setup>
import MagnifyingGlass from "~/components/MagnifyingGlass.vue";

definePageMeta({
  middleware: ["sanctum:auth"],
  title: "Student List",
});

const {
  fetchStudents,
  students,
  deleteStudent,
  pageNumber,
  metaData,
  updatedPageNumber,
  studentsUrl,
  search,
  unit_id,
} = useStudent();

const { units, fetchUnits } = useUnit();

fetchStudents(studentsUrl.value);
fetchUnits();

const deleteAction = (id) => {
  if (confirm("Are you sure you want to delete this student?")) {
    deleteStudent(id).then(() => {
      students.value = students.value.filter((student) => student.id !== id);
    });
  }
};
</script>

<template>
  <div class="py-10">
    <div class="mx-auto">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Students</h1>
            <p class="mt-2 text-sm text-gray-700">
              A list of all the Students.
            </p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <NuxtLink
              to="students/create"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Student
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-col justify-start sm:flex-row mt-6">
          <div class="relative text-sm text-gray-800 col-span-3">
            <div
              class="absolute pl-2 left-0 top-0 bottom-0 flex items-center pointer-events-none text-gray-500"
            >
              <MagnifyingGlass />
            </div>
            <input
              v-model="search"
              type="text"
              autocomplete="off"
              placeholder="Search students data..."
              id="search"
              class="block rounded-lg border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <select
            v-model="unit_id"
            class="block rounded-lg border-0 py-2 ml-5 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          >
            <option value="">Filter By Class</option>
            <option v-for="unit in units" :key="unit.id" :value="unit.id">
              {{ unit.name }}
            </option>
          </select>
        </div>
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
            >
              <div
                class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg relative"
              >
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Class
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Section
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        class="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      />
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="student in students" :key="student.id">
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                      >
                        {{ student.id }}
                      </td>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                      >
                        {{ student.name }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        {{ student.email }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        {{ student.unit.name }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        {{ student.section.name }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        {{ student.created_at }}
                      </td>
                      <td
                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                      >
                        <NuxtLink
                          :to="`students/${student.id}/edit`"
                          class="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </NuxtLink>
                        <button
                          @click="deleteAction(student.id)"
                          class="ml-2 text-indigo-600 hover:text-indigo-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Pagination
                :metaData="metaData"
                :updatedPageNumber="updatedPageNumber"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
