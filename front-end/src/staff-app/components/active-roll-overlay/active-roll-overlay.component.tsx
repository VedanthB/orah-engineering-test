import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { useStudentState } from "context/student-data.context"
import { useApi } from "shared/hooks/use-api"

export type ActiveRollAction = "filter" | "exit"

export const ActiveRollOverlay: React.FC = () => {
  const [saveRoll, rollData, loadState] = useApi<{}>({ url: "save-roll" })

  const {
    studentState: { isRollModeActive, studentRolls },
    studentStateDispatch,
  } = useStudentState()

  const saveRollCountHandler = () => {
    studentStateDispatch({ type: "TOGGLE_IS_ROLL_MODE_ACTIVE", isRollModeActive: false })

    studentStateDispatch({ type: "FILTER_STUDENT_ROLE", rollModeFilterType: "all" })

    void saveRoll({ student_roll_states: studentRolls.map((item) => ({ student_id: item.id, roll_state: item.type })) })

    studentStateDispatch({ type: "SAVE_ROLL_COUNT" })
  }

  const exitButtonHandler = () => {
    studentStateDispatch({ type: "TOGGLE_IS_ROLL_MODE_ACTIVE", isRollModeActive: false })
    studentStateDispatch({ type: "FILTER_STUDENT_ROLE", rollModeFilterType: "all" })
  }

  return (
    <S.Overlay isActive={isRollModeActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList />

          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={exitButtonHandler}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={saveRollCountHandler}>
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
