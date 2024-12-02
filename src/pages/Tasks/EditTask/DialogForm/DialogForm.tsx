import {
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";
import { useCallback, useContext } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Task } from "../../../../types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { updateTask } from "../../../../api/mockApi";
import ErrorContext from "../../../../contexts/ErrorContext";

type DialogFormProps = {
  open: boolean;
  task: Task;
  onClose: () => void;
  refreshTasks: () => void;
};

type FormValues = Omit<Task, "createDate" | "userId">;

const DialogForm = (props: DialogFormProps) => {
  const { open, onClose, task, refreshTasks } = props;
  const { createDate, title, description } = task;
  const { setError } = useContext(ErrorContext);

  const schema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .required("Title required!")
      .max(50, "Title must be less than 50 characters!"),
    description: Yup.string()
      .trim()
      .required("Description required!")
      .max(500, "Description must be less than 500 characters!"),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      title,
      description,
    },
    reValidateMode: "onChange",
    resolver: yupResolver<FormValues>(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      const result = await updateTask(createDate, data);
      if (result.success) {
        refreshTasks();
        onClose();
      } else {
        setError(result.error);
      }
    },
    [setError, onClose, createDate, refreshTasks]
  );

  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={() => onClose()}>
      <DialogTitle
        sx={{ padding: "30px 30px 20px" }}
        align="center"
        lineHeight={1}
      >
        Edit Task
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "10px 30px 0px !important",
        }}
      >
        <Controller
          name="title"
          control={control}
          render={({ field: { name, onChange, value } }) => {
            return (
              <TextField
                variant="outlined"
                label={"Title"}
                placeholder={"Title"}
                autoComplete={"off"}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={value || ""}
                onChange={onChange}
                helperText={errors?.[name]?.message}
                error={!!errors?.[name]}
              />
            );
          }}
        />
        <Controller
          name="description"
          control={control}
          render={({ field: { name, onChange, value } }) => {
            return (
              <TextField
                variant="outlined"
                label={"Description"}
                placeholder={"Description"}
                autoComplete={"off"}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                rows={6}
                value={value || ""}
                onChange={onChange}
                helperText={errors?.[name]?.message}
                error={!!errors?.[name]}
              />
            );
          }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "30px", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
        <Button variant="outlined" onClick={() => onClose()}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogForm;
