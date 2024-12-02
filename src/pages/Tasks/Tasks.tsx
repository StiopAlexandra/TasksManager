import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { styled, Typography } from "@mui/material";
import { SortType, Task } from "../../types";
import TaskCard from "./TaskCard";
import Toolbar from "./Toolbar";
import { fetchTasks } from "../../api/mockApi";
import UserContext from "../../contexts/UserContext";

type LoadingOverlayProps = {
  disabled: boolean;
};

const LoadingOverlay = styled("div")(({ disabled }: LoadingOverlayProps) => ({
  height: "100%",
  opacity: disabled ? 0.5 : 1,
  pointerEvents: disabled ? "none" : "auto",
  position: "relative",

  "&::after": {
    content: '""',
    display: disabled ? "block" : "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: "-20px 0 0 -20px",
    width: "40px",
    height: "40px",
    border: "4px solid rgba(0, 0, 0, 0.2)",
    borderTop: "4px solid #000",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    zIndex: 11,
  },

  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
}));

const PageContainer = styled("div")(() => ({
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const TasksList = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
}));

const EmptyBox = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100%",
}));

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortType>("newest");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    const data = await fetchTasks(user as string);
    setTasks(data);
    setLoading(false);
  }, [user]);

  const handleSearch = (data: string) => {
    setSearchQuery(data);
  };

  const handleSort = (data: SortType) => {
    setSortOrder(data);
  };

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const filteredAndSortedTasks = useMemo(
    () =>
      tasks
        .filter((task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          if (sortOrder === "newest") {
            return (
              new Date(b.createDate).getTime() -
              new Date(a.createDate).getTime()
            );
          } else if (sortOrder === "oldest") {
            return (
              new Date(a.createDate).getTime() -
              new Date(b.createDate).getTime()
            );
          }
          return 0;
        }),
    [tasks, sortOrder, searchQuery]
  );

  return (
    <PageContainer>
      <Toolbar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        sortOrder={sortOrder}
        handleSort={handleSort}
        refreshTasks={loadTasks}
      />
      {filteredAndSortedTasks.length === 0 && !loading ? (
        <EmptyBox>
          <Typography variant="body1" color="textSecondary">
            No Tasks Yet
          </Typography>
        </EmptyBox>
      ) : (
        <LoadingOverlay disabled={loading}>
          <TasksList>
            {filteredAndSortedTasks?.map((task, index) => (
              <TaskCard key={index} task={task} refreshTasks={loadTasks} />
            ))}
          </TasksList>
        </LoadingOverlay>
      )}
    </PageContainer>
  );
};

export default Tasks;
