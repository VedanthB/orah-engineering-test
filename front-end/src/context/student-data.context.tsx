import React, { createContext, useContext, useReducer } from "react"
import { Person } from "shared/models/person"

const StudentContext = createContext({})

/*  init studentState   */
export const initStudentState = {
  searchString: "",
  sortOptions: {
    isDataSorted: false,
    firstName: false,
    ascending: false,
  },
  isRollModeActive: false,
  rollState: [{ type: "all" }, { type: "present" }, { type: "late" }, { type: "absent" }],
  studentRolls: [] as StudentRollObj[],
  rollModeFilterType: "all",
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

export interface StudentRollObj extends Person {
  type: "unmark" | "present" | "late" | "absent"
}

/* studentState reducer action types */
export type STUDENT_STATE_ACTIONTYPE =
  | { type: "SORT_STUDENT_DATA" }
  | { type: "SORT_STUDENT_DATA_BY_NAME" }
  | { type: "SORT_STUDENT_DATA_BY_ORDER" }
  | { type: "SEARCH_STUDENTS"; searchString: string }
  | { type: "TOGGLE_IS_ROLL_MODE_ACTIVE"; isRollModeActive: boolean }
  | { type: "UPDATE_STUDENT_ROLLS"; newStudent: StudentRollObj }
  | { type: "UPDATE_STUDENT_ROLLS_WITHOUT_ROLL"; students: Person[] }
  | { type: "FILTER_STUDENT_ROLE"; rollModeFilterType: string }
  | { type: "SAVE_ROLL_COUNT" }

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

    case "TOGGLE_IS_ROLL_MODE_ACTIVE":
      return { ...state, isRollModeActive: action.isRollModeActive }

    case "UPDATE_STUDENT_ROLLS":
      const newStudent = action.newStudent
      const existingStudentRolls = state.studentRolls

      const newUpdatedStudentRoll = existingStudentRolls.some((item) => item?.id === newStudent?.id)
        ? existingStudentRolls.map((studentObj: StudentRollObj) => (studentObj.id === newStudent.id ? { ...newStudent } : { ...studentObj }))
        : existingStudentRolls.concat(action.newStudent)

      return {
        ...state,
        studentRolls: newUpdatedStudentRoll,
      }

    case "UPDATE_STUDENT_ROLLS_WITHOUT_ROLL":
      return {
        ...state,
        studentRolls: state.studentRolls.concat(action.students.map((stuObj) => ({ ...stuObj, type: "unmark" }))),
      }

    case "FILTER_STUDENT_ROLE":
      return {
        ...state,
        rollModeFilterType: action.rollModeFilterType,
      }

    case "SAVE_ROLL_COUNT":
      return {
        ...initStudentState,
      }

    default:
      return state
  }
}
