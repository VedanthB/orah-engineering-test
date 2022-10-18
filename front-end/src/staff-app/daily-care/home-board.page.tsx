import React, { useState, useEffect, useReducer } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { SortDropdown } from "staff-app/components/sort-dropdown/sort-dropdown.component"
import { TextField } from "@material-ui/core"
import { useStudentData } from "context/student-data.context"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)

  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  const { studentData, sortOptions, sortStudentData } = useStudentData()

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  // let str = "mor"

  // let searchByFirstName = (str: string) => data?.students?.filter(({ first_name }) => first_name.toLowerCase().includes(str))
  // let searchByLastName = (str: string) => data?.students?.filter(({ last_name }) => last_name.toLowerCase().includes(str))

  // console.log("data", data)

  // const result1 = searchByFirstName(str.toLowerCase())
  // const result2 = searchByLastName(str.toLowerCase())

  // console.log(result1, result2)

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && studentData && (
          <>
            {sortStudentData(sortOptions, studentData).map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>

      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick } = props

  const { sortOptions } = useStudentData()

  return (
    <S.ToolbarContainer>
      <S.SortDropdownContainer onClick={() => onItemClick("sort")}>
        {sortOptions.sortBy} <SortDropdown />
      </S.SortDropdownContainer>
      <S.TextField label="Search" size="small" variant="outlined" />
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
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
  SortDropdownContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  TextField: styled(TextField)`
    & label.Mui-focused {
      color: white;
    }

    & label {
      color: white;
    }

    & .MuiOutlinedInput-root {
      color: white;

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
