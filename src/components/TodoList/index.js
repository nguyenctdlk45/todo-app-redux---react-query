import { Col, Row, Input, Button, Select, Tag } from "antd";
import Todo from "../Todo";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { useAddTodoMutation, useTodos, setStatus, setData } from "./todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { todosRemainingSelector } from "../../redux/selectors";

export default function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");

  const { data: todos, isLoading } = useTodos();

  const addTodoMutation = useAddTodoMutation();

  const dispatch = useDispatch();
  // const SelectDataFromReducer = useSelector((state) => state.todoList.todos);
  const todoList = useSelector(todosRemainingSelector);
  const todosListRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      dispatch(setStatus("loading"));
    } else {
      dispatch(setStatus("idle"));
    }
    if (todos) {
      dispatch(setData(todos));
    }
  }, [isLoading, dispatch, todos]);

  const handleAddButtonClick = () => {
    addTodoMutation.mutate({
      id: uuidv4(),
      name: todoName,
      priority: priority,
      completed: false,
    });

    setTodoName("");
    setPriority("Medium");
    // Sử dụng setTimeout để đảm bảo cuộn xuống cuối danh sách sau khi cập nhật dữ liệu
    setTimeout(() => {
      if (todosListRef.current) {
        console.log(todosListRef.current);
        todosListRef.current.scrollTo({
          top: todosListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100); // Đợi 100ms để dữ liệu render trước khi cuộn xuống cuối danh sách
  };

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddButtonClick();
    }
  };

  return (
    <div className="container" style={{ position: "relative" }}>
      <div
        style={{
          overflowY: "auto",
          marginBottom: "5px",
          minHeight: "300px",
          maxHeight: "300px",
        }}
        ref={todosListRef}
      >
        {todoList?.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
      <div
        style={{
          position: "fix",
          bottom: 0,
          marginBottom: "5px",
          // width: "100%",
        }}
      >
        <Input.Group style={{ display: "flex" }} compact>
          <Input
            value={todoName}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handlePriorityChange}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </div>
    </div>
  );
}
