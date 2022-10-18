import React from "react"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@material-ui/core"
import { SORT_ACTIONTYPE, useStudentData } from "context/student-data.context"

interface SortDropdownProps {
  // sortDispatch: React.Dispatch<SORT_ACTIONTYPE>
}

export const SortDropdown: React.FC<SortDropdownProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = React.useState<null | number>(null)

  const { sortDispatch } = useStudentData()

  const menuOptions = [
    { name: "Sort By First Name", action: () => sortDispatch({ type: "SORT_BY", sortBy: "First Name" }) },
    { name: "Sort By Last Name", action: () => sortDispatch({ type: "SORT_BY", sortBy: "Last Name" }) },
    { name: "Sort Ascending", action: () => sortDispatch({ type: "SORT_ASCENDING" }) },
    { name: "Sort Decending", action: () => sortDispatch({ type: "SORT_DESCENDING" }) },

    { name: "Reset", action: () => sortDispatch({ type: "RESET" }) },
  ]

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number, action: Function) => {
    if (index === 4) {
      setSelectedIndex(null)
    } else {
      setSelectedIndex(index)
    }
    action()
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FontAwesomeIcon icon="ellipsis-v" size="xs" color="white" />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {menuOptions.map((option, index) => (
          <MenuItem key={option.name} onClick={(event) => handleMenuItemClick(event, index, option.action)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
