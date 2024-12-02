import { IconButton, Tooltip } from "@mui/material";
import { useCallback, useContext } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutline";
import { Task } from "../../../types";
import ErrorContext from "../../../contexts/ErrorContext";
import { deleteTask } from "../../../api/mockApi";

type DeleteTaskProps = {
  task: Task;
  refreshTasks: () => void;
};

const DeleteTask = (props: DeleteTaskProps) => {
  const { task, refreshTasks } = props;
  const { createDate } = task;
  const { setError } = useContext(ErrorContext);

  const handleDelete = useCallback(async () => {
    const result = await deleteTask(createDate);
    if (result.success) {
      refreshTasks();
    } else {
      setError(result.error);
    }
  }, [setError, createDate, refreshTasks]);

  return (
    <Tooltip title="Delete">
      <IconButton onClick={handleDelete} size="small" key="delete-btn">
        <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteTask;
