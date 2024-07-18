import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const todosSlice = createSlice({
  //tạo slice
  name: "todoList",
  initialState: { status: "idle", todos: [] },
  //
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setData: (state, action) => {
      state.todos = action.payload;
    },
  },
});

//update data

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedTodo) => {
      return axios.put(
        `http://localhost:3001/todos/${updatedTodo.id}`,
        updatedTodo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("todos");
      },
    }
  );
};

// use react query
const fetchTodos = async () => {
  const { data } = await axios.get("http://localhost:3001/todos");
  return data;
};
export const useTodos = () => {
  return useQuery("todos", fetchTodos);
};
// add todo
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (newTodo) => {
      return axios.post("http://localhost:3001/todos", newTodo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("todos");
      },
    }
  );
};
export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id) => {
      return axios.delete(`http://localhost:3001/todos/${id}`);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("todos");
      },
    }
  );
};

export const { setStatus, setData } = todosSlice.actions;
export default todosSlice;
