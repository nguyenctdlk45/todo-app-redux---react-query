import { Row, Tag, Checkbox } from "antd";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { toggleTodoStatus } from '../../redux/actions';
// import todoListSlice, { updateTodo } from "../TodoList/todosSlice";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../TodoList/todosSlice";
import { DeleteOutlined } from "@ant-design/icons";
import "../../App.css";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function Todo({ todo }) {
  // const dispatch = useDispatch();
  const updateTodoMutation = useUpdateTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();

  const [checked, setChecked] = useState(todo.completed);

  const toggleCheckbox = () => {
    setChecked(!checked);
    const updatedTodo = {
      ...todo,
      completed: !checked,
    };
    updateTodoMutation.mutate(updatedTodo);
    // dispatch(updateTodo(updatedTodo));
  };
  const deletTodo = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: 3,
      }}
    >
      <Checkbox
        checked={checked}
        onChange={toggleCheckbox}
        style={checked ? { opacity: 0.5, textDecoration: "line-through" } : {}}
      >
        {todo.name}
      </Checkbox>
      <div>
        <Tag
          color={priorityColorMapping[todo.priority]}
          style={{
            margin: 0,
            ...(checked
              ? { opacity: 0.5, textDecoration: "line-through" }
              : {}),
          }}
        >
          {todo.priority}
        </Tag>
        <DeleteOutlined className="delete-icon" onClick={deletTodo} />
      </div>
    </Row>
  );
}
