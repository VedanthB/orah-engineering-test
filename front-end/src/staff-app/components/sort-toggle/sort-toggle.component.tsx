import React from "react"
import styled from "styled-components"
import { FontSize, Spacing } from "shared/styles/styles"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import { useStudentState } from "context/student-data.context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
        label="Sort Student Data"
        labelPlacement="start"
      />
      {isDataSorted && (
        <FormGroup row style={{ paddingLeft: "8px" }}>
          <S.FormContainer>
            <FormControlLabel
              control={<Switch size="small" checked={firstName} onChange={() => studentStateDispatch({ type: "SORT_STUDENT_DATA_BY_NAME" })} name="Sort by name" />}
              label={firstName ? "First Name" : "Last Name"}
            />

            {ascending ? (
              <FontAwesomeIcon style={{ cursor: "pointer" }} size="xs" icon="arrow-up" onClick={() => studentStateDispatch({ type: "SORT_STUDENT_DATA_BY_ORDER" })} />
            ) : (
              <FontAwesomeIcon style={{ cursor: "pointer" }} size="xs" icon="arrow-down" onClick={() => studentStateDispatch({ type: "SORT_STUDENT_DATA_BY_ORDER" })} />
            )}
          </S.FormContainer>
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
  FormContainer: styled.div`
    display: flex;
    align-items: center;
  `,
}
