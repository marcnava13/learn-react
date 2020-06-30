import React, { useState, useRef } from "react";
import { Todo } from "../../Interfaces/Todo";
import { validateWord } from "../../Services/validateWord";

import "./styles.css";

interface IFormProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const Form = ({ todos, setTodos }: IFormProps) => {
    const [inputValue, handleChangeInput] = useState<string>("");
    const [errors, setErrors] = useState<string>("");

    /**
     * Variable "inmutable" para manejar elementos estáticos
     */
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Función que añadirá un nuevo todo a la lista
     * Es buena practica separar el manejo de la función fuera de la vista
     */
    const handleAddTodo = async (event: React.MouseEvent) => {
        event.preventDefault();
        const value = inputRef.current?.value;

        try {
            setErrors("");
            /**
             * Realizamos la petición que simula una petición a nuestra mockApi, para comprobar que es valor bueno
             * de no serlo, saltará el catch de bloque try/catch
             */
            await validateWord(value);

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
        } catch (err) {
            setErrors(err.message);
            console.log(err);
        }


    };

    return (
        <form>
            {errors && <span className="form__error">{errors}</span>}
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
