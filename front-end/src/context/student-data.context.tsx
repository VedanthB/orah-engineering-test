import React, { createContext, useContext, useEffect, useReducer, useState } from "react"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"

const StudentContext = createContext({})

interface ContextValue {
  studentData: Person[]
  sortOptions: typeof sortInitState
  sortDispatch: React.Dispatch<SORT_ACTIONTYPE>
  sortStudentData: (sortOptions: typeof sortInitState, studentData: Person[]) => Person[]
}

interface IStudentDataState {
  sortAscending: Boolean
  sortDescending: Boolean
  sortBy: string
}

let sortInitState = {
  sortAscending: false,
  sortDescending: false,
  sortBy: "First Name",
} as IStudentDataState

export type SORT_ACTIONTYPE = { type: "SORT_BY"; sortBy: string } | { type: "SORT_ASCENDING" } | { type: "SORT_DESCENDING" } | { type: "RESET" }

const sortReducer = (state: IStudentDataState, action: SORT_ACTIONTYPE) => {
  const { type } = action
  switch (type) {
    case "SORT_BY":
      return { ...state, sortBy: action.sortBy }
    case "SORT_ASCENDING":
      return { ...state, sortAscending: true, sortDescending: false }
    case "SORT_DESCENDING":
      return { ...state, sortAscending: false, sortDescending: true }
    case "RESET":
      return { ...state, sortAscending: false, sortDescending: false, sortBy: "First Name" }
    default:
      return state
  }
}

const sortStudentData = (sortOptions: typeof sortInitState, studentData: Person[]) => {
  const sortStudentDataByFirstName = (studentData: Person[], ascending: boolean) => {
    return studentData.sort((a: Person, b: Person) => {
      if (a.first_name < b.first_name) {
        return ascending ? -1 : 1
      }
      if (a.first_name > b.first_name) {
        return ascending ? 1 : -1
      }
      return 0
    })
  }
  const sortStudentDataByLastName = (studentData: Person[], ascending: boolean) => {
    return studentData.sort((a: Person, b: Person) => {
      if (a.last_name < b.last_name) {
        return ascending ? -1 : 1
      }
      if (a.last_name > b.last_name) {
        return ascending ? 1 : -1
      }
      return 0
    })
  }

  if (sortOptions.sortAscending) {
    return sortOptions.sortBy === "First Name" ? sortStudentDataByFirstName(studentData, true) : sortStudentDataByLastName(studentData, true)
  }

  if (sortOptions.sortDescending) {
    return sortOptions.sortBy === "First Name" ? sortStudentDataByFirstName(studentData, false) : sortStudentDataByLastName(studentData, false)
  }

  return studentData
}

export const StudentDataProvider: React.FC = ({ children }) => {
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  const [studentData, setStudentData] = useState<Person[]>([])

  const [sortOptions, sortDispatch] = useReducer(sortReducer, sortInitState)

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    if (loadState === "loaded" && data?.students) {
      setStudentData(data?.students)
    }
  }, [data])

  useEffect(() => {
    // setStudentData(sortStudentData(sortOptions, studentData))
  }, [sortOptions])

  console.log(sortOptions, "23444", studentData)

  return <StudentContext.Provider value={{ studentData, sortOptions, sortDispatch, sortStudentData }}>{children}</StudentContext.Provider>
}

export const useStudentData = () => useContext(StudentContext) as ContextValue
