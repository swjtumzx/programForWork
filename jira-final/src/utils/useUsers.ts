import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { User } from '../screens/project-list/User';

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};