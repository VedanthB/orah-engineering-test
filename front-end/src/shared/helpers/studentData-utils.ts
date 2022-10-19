import { initStudentState } from "context/student-data.context"
import { Person, PersonHelper } from "shared/models/person"

export const getSearchedStudents = (allStudents: Person[], searchString: string) => {
  if (searchString === "") {
    return allStudents
  }

  return allStudents?.filter((student) => (PersonHelper.getFullName(student).toLowerCase().includes(searchString.toLowerCase()) ? student : false))
}

export const getSortedStudents = (studentsData: Person[], appState: typeof initStudentState) => {
  const { sortOptions } = appState

  let sortedStudents: Person[] = []
  let key: keyof Person
  let nameOne
  let nameTwo

  if (sortOptions.isDataSorted) {
    key = sortOptions.firstName ? "first_name" : "last_name"

    sortedStudents = studentsData.sort((a, b) => {
      if (sortOptions.ascending) {
        nameOne = a[key]
        nameTwo = b[key]
      } else {
        nameOne = b[key]
        nameTwo = a[key]
      }

      if (nameOne && nameTwo) {
        if (nameOne < nameTwo) {
          return -1
        }
        if (nameOne > nameTwo) {
          return 1
        }
      }

      return 0
    })

    return sortedStudents
  }

  return studentsData
}
