export type TodoData = {
  id: string;
  title: string;
};

export type UserData = {
  id: string;
  role: string;
  avatar: string;
};

export type TodoDataProps = {
  todos: TodoData[] | undefined;
  variant: 'member' | 'admin';
  currentPage: number;
  totalPages: number;
};
