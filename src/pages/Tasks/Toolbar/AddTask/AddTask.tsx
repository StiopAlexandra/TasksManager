import { Button } from "@mui/material";
import { useState } from "react";
import DialogForm from "./DialogForm";
import { Add } from "@mui/icons-material";

type AddTaskProps = {
  refreshTasks: () => void;
};

const AddTask = (props: AddTaskProps) => {
  const { refreshTasks } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        startIcon={<Add />}
      >
        Add Task
      </Button>
      {open && (
        <DialogForm
          open={open}
          onClose={handleClose}
          refreshTasks={refreshTasks}
        />
      )}
    </>
  );
};

export default AddTask;
