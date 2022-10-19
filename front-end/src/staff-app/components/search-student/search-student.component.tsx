import React from "react"
import { Grid } from "@material-ui/core"
import { Colors } from "shared/styles/colors"
import TextField from "@material-ui/core/TextField"
import { useStudentState } from "context/student-data.context"

export const SearchStudent: React.FC = () => {
  const {
    studentState: { searchString },
    studentStateDispatch,
  } = useStudentState()

  return (
    <TextField
      multiline
      rowsMax={1}
      size="small"
      type="search"
      value={searchString}
      label="Search User"
      variant="filled"
      fullWidth={false}
      onChange={(e) => studentStateDispatch({ type: "SEARCH_STUDENTS", searchString: e.target.value })}
      InputProps={{ style: { backgroundColor: `${Colors.neutral.lighter}` } }}
    />
  )
}
