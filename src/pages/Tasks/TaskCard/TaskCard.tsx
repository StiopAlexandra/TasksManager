import { Box, styled, Typography } from "@mui/material";
import { Task } from "../../../types";
import EditTask from "../EditTask";
import DeleteTask from "../DeleteTask";

type TaskCardProps = {
  task: Task;
  refreshTasks: () => void;
};

const Card = styled("div")(() => ({
  padding: "20px",
  maxHeight: "185px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
  background: "#fff",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
}));

const Row = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  paddingBottom: "5px",
  width: "100%",
}));

const StyledTitle = styled(Typography)(() => ({
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const StyledDescription = styled(Typography)(() => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 4,
  overflow: "hidden",
}));

const TaskCard = (props: TaskCardProps) => {
  const { task, refreshTasks } = props;

  return (
    <Card>
      <Row>
        <StyledTitle variant="h6">{task.title}</StyledTitle>
        <Box sx={{ width: "60px" }}>
          <EditTask task={task} refreshTasks={refreshTasks}/>
          <DeleteTask task={task} refreshTasks={refreshTasks}/>
        </Box>
      </Row>
      <StyledDescription variant="body2" color="textSecondary">
        {task.description}
      </StyledDescription>
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ paddingTop: "5px" }}
      >
        {new Date(task.createDate).toLocaleString()}
      </Typography>
    </Card>
  );
};

export default TaskCard;
