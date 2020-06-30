import React, { useState } from "react";

import "./styles.css";

import { Todo } from "./Interfaces/Todo";
import { Form } from "./Components/Form";
import { List } from "./Components/List";
import { Timer } from "./Components/Timer";


export default function App() {
    /**
     * "Nuestro estado global"
     * todo: nombre que le daremos a nuestra variable que contiene el estado
     * addTodo: nombre que le daremos a la función que actualizará nuestro estado
     */
    const [todos, setTodos] = useState<Todo[]>([]);

    /**
     * El nuevo HTML se llama JSX, todo lo que haya dentro de nuestro return, será lo que se mostrará en pantalla
     * <Form ... /> y <List ... /> son los conocidos componentes
     * ambos llevas dos atributos, "todos" y "setTodos", los conocidos como props
     * esto sirven para que desde un componente padre, como es este App, le pase valores a los hijos, también conocidos
     * como children
     */
    return (
        <div className="App">
            <h1>TODO List</h1>
            <Form todos={todos} setTodos={setTodos} />
            <Timer />
            <List todos={todos} setTodos={setTodos} />
        </div>
    );
}
