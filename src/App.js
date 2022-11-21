import { VStack, Text } from "@chakra-ui/react"
import './App.css';
import { useState, useEffect } from 'react'
import Todo from "./components/Todo";
import TodoList from "./components/TodoList";

function App() {

    const [todos, setTodos] = useState(
        () => JSON.parse(localStorage.getItem("todos")) || []
      );
    
      useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
      }, [todos]);

    function addTodo(newTodo) {
        setTodos([...todos, newTodo])
    }

    function editTodo(id, updatedTodo) {
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        setTodos(updatedItem)
    }

    function deleteTodo(id) {
        const newTodos = todos.filter((item) => {
            return item.id !== id
        })
        setTodos(newTodos)
        console.log(newTodos)
    }

    return (
        <VStack p={5}>
            <Text
                fontSize='50px'
                fontWeight="bold">
                Todo App
            </Text>
            <Todo addTodo={addTodo} />
            <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
        </VStack>
    );
}
export default App;