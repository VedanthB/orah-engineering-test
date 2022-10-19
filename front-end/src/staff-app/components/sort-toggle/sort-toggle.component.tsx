import React from "react"
import styled from "styled-components"
import { FontSize, Spacing } from "shared/styles/styles"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import { useStudentState } from "context/student-data.context"

export const SortToggle: React.FC = () => {
  const {
    studentStateDispatch,
    studentState: {
      sortOptions: { isDataSorted, firstName, ascending },
    },
  } = useStudentState()

  return (
    <S.SortContainer>
      <FormControlLabel
        style={{ marginLeft: 0 }}
        control={<Switch size="small" checked={isDataSorted} onChange={() => studentStateDispatch({ type: "SORT_STUDENT_DATA" })} name="Sort User Data" />}
        label="Sort User Data"
        labelPlacement="start"
      />
      {isDataSorted && (
        <FormGroup row>
          <FormControlLabel
            control={<Switch size="small" checked={firstName} onChange={() => studentStateDispatch({ type: "SORT_STUDENT_DATA_BY_NAME" })} name="Sort by name" />}
            label={firstName ? "First Name" : "Last Name"}
          />
          <FormControlLabel
            control={<Switch size="small" checked={ascending} onChange={() => studentStateDispatch({ type: "SORT_STUDENT_DATA_BY_ORDER" })} name="Sort by Order" />}
            label={ascending ? "Ascending" : "Descending"}
          />
        </FormGroup>
      )}
    </S.SortContainer>
  )
}

const S = {
  SortContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: ${FontSize.u2};
    padding: 0 ${Spacing.u5} 0 ${Spacing.u2};
    gap: ${Spacing.u1};
  `,
}
