export type User = {
  fname: string;
  lname: string;
  email: string;
  password: string;
};

export type Task = {
  title: string;
  description: string;
  createDate: string;
  userId: string;
};

export type ErrorType = string | null | undefined;
export type SortType = "newest" | "oldest";
