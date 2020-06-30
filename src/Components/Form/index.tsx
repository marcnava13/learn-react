import React, { useState, useRef } from "react";
import { Todo } from "../../Interfaces/Todo";

import "./styles.css";

interface IFormProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const Form = ({ todos, setTodos }: IFormProps) => {
    const [inputValue, handleChangeInput] = useState<string>("");

    /**
     * Variable "inmutable" para manejar elementos estáticos
     */
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Función que añadirá un nuevo todo a la lista
     * Es buena practica separar el manejo de la función fuera de la vista
     */
    const handleAddTodo = (event: React.MouseEvent) => {
        event.preventDefault();

        // Creamos nuestro nuevo TODO
        const todo: Todo = {
            id: todos.length + 1,
            name: inputRef.current!.value
        };
        /**
         * Dos clases de actualizar el estado
         * Especialmente a mi me gusta la segunda, pues con problema de asincronía,
         * siempre respetará el estado, mientra que la primera no.
         */
        setTodos([...todos, todo]);
        handleChangeInput("");
        //setTodos(previousTodos => [.✖️ ♾..previousTodos, todo]);
    };

    return (
        <form>
            <input
                ref={inputRef}
                className="form_input"
                placeholder="Add your todo to list"
                value={inputValue}
                // Otra forma de agregar funcionalidad a nuestro código, aunque es mala practica
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleChangeInput(event.target.value);
                }}
            />
            <button className="form__button" onClick={handleAddTodo}>
                Add
      </button>
        </form>
    );
};
