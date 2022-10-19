import React, { createContext, useContext, useReducer } from "react"

const StudentContext = createContext({})

/*  init studentState   */
export const initStudentState = {
  searchString: "",
  sortOptions: {
    isDataSorted: false,
    firstName: false,
    ascending: false,
  },
}

/* studentState context provider */
export const StudentDataProvider: React.FC = ({ children }) => {
  const [studentState, studentStateDispatch] = useReducer(studentStateReducer, initStudentState)

  return <StudentContext.Provider value={{ studentState, studentStateDispatch }}>{children}</StudentContext.Provider>
}

/* use studentState hook */
export const useStudentState = () => useContext(StudentContext) as ContextValue

/* studentState context type */
interface ContextValue {
  studentState: typeof initStudentState
  studentStateDispatch: React.Dispatch<STUDENT_STATE_ACTIONTYPE>
}

/* studentState reducer action types */
export type STUDENT_STATE_ACTIONTYPE =
  | { type: "SORT_STUDENT_DATA" }
  | { type: "SORT_STUDENT_DATA_BY_NAME" }
  | { type: "SORT_STUDENT_DATA_BY_ORDER" }
  | { type: "SEARCH_STUDENTS"; searchString: string }

/* studentState reducer */
const studentStateReducer = (state: typeof initStudentState, action: STUDENT_STATE_ACTIONTYPE) => {
  switch (action.type) {
    case "SORT_STUDENT_DATA":
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

    case "SEARCH_STUDENTS":
      return {
        ...state,
        searchString: action.searchString,
      }

    default:
      return state
  }
}
