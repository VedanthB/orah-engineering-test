import { initStudentState, StudentRollObj } from "context/student-data.context"
import { Person, PersonHelper } from "shared/models/person"

export const searchStudents = (studentRolls: StudentRollObj[], searchString: string) => {
  if (searchString === "") {
    return studentRolls
  }

  return studentRolls?.filter((student) => (PersonHelper.getFullName(student).toLowerCase().includes(searchString.toLowerCase()) ? student : false))
}

export const sortStudents = (studentRolls: StudentRollObj[], appState: typeof initStudentState) => {
  const { sortOptions } = appState

  let sortedStudents: StudentRollObj[] = []
  let key: keyof StudentRollObj

  let nameOne
  let nameTwo

  if (sortOptions.isDataSorted) {
    key = sortOptions.firstName ? "first_name" : "last_name"

    sortedStudents = studentRolls.sort((a, b) => {
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

  return studentRolls
}

export const filterStudentsByRollCall = (studentRolls: StudentRollObj[], state: typeof initStudentState) => {
  if (state.rollModeFilterType === "all") {
    return studentRolls
  } else {
    return studentRolls.filter((stuObj: StudentRollObj) => stuObj.type == state.rollModeFilterType)
  }
}
