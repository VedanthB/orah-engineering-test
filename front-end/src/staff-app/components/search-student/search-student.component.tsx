import React from "react"
import { Grid } from "@material-ui/core"
import { Colors } from "shared/styles/colors"
import TextField from "@material-ui/core/TextField"
import { useStudentState } from "context/student-data.context"
import styled from "styled-components"

export const SearchStudent: React.FC = () => {
  const {
    studentState: { searchString },
    studentStateDispatch,
  } = useStudentState()

  return (
    <S.TextField
      size="small"
      type="search"
      value={searchString}
      label="Search User"
      variant="outlined"
      onChange={(e) => studentStateDispatch({ type: "SEARCH_STUDENTS", searchString: e.target.value })}
    />
  )
}

const S = {
  TextField: styled(TextField)`
    & label.Mui-focused {
      color: white !important;
    }

    & label {
      color: white !important;
    }

    & .MuiOutlinedInput-root {
      color: white !important;

      & fieldset {
        border-color: white;
      }
      &:hover fieldset {
        border-color: white;
      }
      &.Mui-focused fieldset {
        border-color: white;
        color: white;
      }
    }
  `,
}
