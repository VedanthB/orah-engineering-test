import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { Spacing, FontWeight } from "shared/styles/styles"
import { useStudentState } from "context/student-data.context"

interface Props {
  size?: number
}
export const RollStateList: React.FC<Props> = ({ size = 14 }) => {
  const {
    studentState: { rollState, studentRolls },
    studentStateDispatch,
  } = useStudentState()

  return (
    <S.ListContainer>
      {rollState.map((s: any, i: any) => {
        if (s.type === "all") {
          return (
            <S.ListItem key={i}>
              <FontAwesomeIcon
                icon="users"
                size="sm"
                style={{ cursor: "pointer" }}
                onClick={() => studentStateDispatch({ type: "FILTER_STUDENT_ROLE", rollModeFilterType: s.type })}
              />
              <span>{studentRolls.length}</span>
            </S.ListItem>
          )
        }

        return (
          <S.ListItem key={i}>
            <RollStateIcon type={s.type} size={size} onClick={() => studentStateDispatch({ type: "FILTER_STUDENT_ROLE", rollModeFilterType: s.type })} />

            <span>{studentRolls.filter((stateObj: any) => stateObj.type === s.type)?.length}</span>
          </S.ListItem>
        )
      })}
    </S.ListContainer>
  )
}

const S = {
  ListContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  ListItem: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u2};

    span {
      font-weight: ${FontWeight.strong};
      margin-left: ${Spacing.u2};
    }
  `,
}
