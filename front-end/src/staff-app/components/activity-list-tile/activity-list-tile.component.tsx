import React from "react"
import styled from "styled-components"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { Activity } from "shared/models/activity"

interface Props {
  activity: Activity
}

export const ActivityListTile: React.FC<Props> = ({ activity }) => {
  return (
    <S.Container>
      <S.Content>
        <div>{activity?.entity?.name}</div>
      </S.Content>

      <S.Content>{<div>{new Date(activity?.date).toDateString()}</div>}</S.Content>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    margin-top: ${Spacing.u3};
    padding: ${Spacing.u2};
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
    }
  `,
  Content: styled.div`
    padding: ${Spacing.u2};
    color: ${Colors.dark.base};
    font-weight: ${FontWeight.strong};
  `,
}
