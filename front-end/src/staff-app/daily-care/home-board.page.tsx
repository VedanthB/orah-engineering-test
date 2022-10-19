import React, { useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { useStudentState } from "context/student-data.context"
import { SortToggle } from "staff-app/components/sort-toggle/sort-toggle.component"
import { filterStudentsByRollCall, searchStudents, sortStudents } from "shared/helpers/studentData-utils"
import { SearchStudent } from "staff-app/components/search-student/search-student.component"

export const HomeBoardPage: React.FC = () => {
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  const { studentState, studentStateDispatch } = useStudentState()

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    loadState === "loaded" && data?.students && studentStateDispatch({ type: "UPDATE_STUDENT_ROLLS_WITHOUT_ROLL", students: data?.students })
  }, [loadState, studentStateDispatch, data])

  const sortedStudents = data && sortStudents(studentState?.studentRolls, studentState)

  const searchedStudents = sortedStudents && searchStudents(sortedStudents, studentState.searchString)

  const filteredStudents = searchedStudents && filterStudentsByRollCall(searchedStudents, studentState)

  return (
    <>
      <S.PageContainer>
        <Toolbar />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {filteredStudents?.map((s: any) => (
              <StudentListTile key={s.id} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>

      <ActiveRollOverlay />
    </>
  )
}

const Toolbar: React.FC = () => {
  const { studentStateDispatch } = useStudentState()

  const handleStartRollMode = () => studentStateDispatch({ type: "TOGGLE_IS_ROLL_MODE_ACTIVE", isRollModeActive: true })

  return (
    <S.ToolbarContainer>
      <SortToggle />

      <SearchStudent />

      <S.Button onClick={handleStartRollMode}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 8px 20px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
