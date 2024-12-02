import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import AddTask from "./AddTask";
import { SortType } from "../../../types";

type ToolbarProps = {
  searchQuery: string;
  handleSearch: (data: string) => void;
  sortOrder: SortType;
  handleSort: (data: SortType) => void;
  refreshTasks: () => void;
};

const StyledBox = styled("div")(({ theme }) => ({
  width: "100%",
  zIndex: 1,
  padding: "20px",
  position: "sticky",
  boxSizing: "border-box",
  top: "0px",
  left: "0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "10px",
  minWidth: "fit-content",
  backgroundColor: "rgba(248, 248, 248, 0.8)",
  borderBottom: "1px solid rgb(240, 240, 240)",
  backdropFilter: "blur(5px)",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

const Toolbar = (props: ToolbarProps) => {
  const { searchQuery, handleSearch, sortOrder, handleSort, refreshTasks } =
    props;

  return (
    <>
      <StyledBox>
        <AddTask refreshTasks={refreshTasks} />
        <TextField
          label="Search Tasks"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <FormControl variant="outlined" size="small" sx={{ minWidth: "128px" }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOrder}
            label="Sort By"
            onChange={(e) => handleSort(e.target.value as SortType)}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </StyledBox>
    </>
  );
};

export default Toolbar;
