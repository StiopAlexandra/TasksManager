import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import DialogForm from "./DialogForm";
import { Task } from "../../../types";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type EditTaskProps = {
  task: Task;
  refreshTasks: () => void;
};

const EditTask = (props: EditTaskProps) => {
  const { task, refreshTasks } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={handleClick} size="small" key="edit-btn">
          <EditOutlinedIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Tooltip>
      {open && (
        <DialogForm
          open={open}
          onClose={handleClose}
          task={task}
          refreshTasks={refreshTasks}
        />
      )}
    </>
  );
};

export default EditTask;
