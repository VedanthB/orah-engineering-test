import React, { createContext, useContext, useReducer } from "react"

const StudentContext = createContext({})

interface ContextValue {
  studentState: typeof initStudentState
  studentStateDispatch: React.Dispatch<STUDENT_STATE_ACTIONTYPE>
}

export const initStudentState = {
  searchedString: "",
  sortOptions: {
    isDataSorted: false,
    firstName: false,
    ascending: false,
  },
}

export type STUDENT_STATE_ACTIONTYPE = { type: "SORT_STUDENT_DATA" } | { type: "SORT_STUDENT_DATA_BY_NAME" } | { type: "SORT_STUDENT_DATA_BY_ORDER" }

const studentStateReducer = (state: typeof initStudentState, action: STUDENT_STATE_ACTIONTYPE) => {
  switch (action.type) {
    case "SORT_STUDENT_DATA":
      console.log("isDataSorted")
      return {
        ...state,
        sortOptions: { ...state.sortOptions, isDataSorted: !state.sortOptions.isDataSorted },
      }

    case "SORT_STUDENT_DATA_BY_NAME":
      return {
        ...state,
        sortOptions: { ...state.sortOptions, firstName: !state.sortOptions.firstName },
      }

    case "SORT_STUDENT_DATA_BY_ORDER":
      return {
        ...state,
        sortOptions: { ...state.sortOptions, ascending: !state.sortOptions.ascending },
      }

    default:
      return state
  }
}

export const StudentDataProvider: React.FC = ({ children }) => {
  const [studentState, studentStateDispatch] = useReducer(studentStateReducer, initStudentState)

  return <StudentContext.Provider value={{ studentState, studentStateDispatch }}>{children}</StudentContext.Provider>
}

export const useStudentState = () => useContext(StudentContext) as ContextValue
