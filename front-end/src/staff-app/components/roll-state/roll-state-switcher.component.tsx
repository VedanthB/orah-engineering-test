import { useStudentState } from "context/student-data.context"
import React, { useState } from "react"
import { Person } from "shared/models/person"
import { RolllStateType } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"

interface Props {
  size?: number

  student: Person
}
export const RollStateSwitcher: React.FC<Props> = ({ size = 40, student }) => {
  const {
    studentState: { studentRolls },
    studentStateDispatch,
  } = useStudentState()

  const rollState = studentRolls.find((stuObj: any) => stuObj?.id === student?.id)?.type

  const nextState = () => {
    const states: RolllStateType[] = ["present", "late", "absent"]

    if (rollState === "unmark" || rollState === "absent") return states[0]

    const matchingIndex = states.findIndex((s) => s === rollState)

    return matchingIndex > -1 ? states[matchingIndex + 1] : states[0]
  }

  const onClick = () => studentStateDispatch({ type: "UPDATE_STUDENT_ROLLS", newStudent: { ...student, type: nextState() } })

  return <RollStateIcon type={rollState} size={size} onClick={onClick} />
}
