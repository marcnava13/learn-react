import React from "react";
import { Todo } from "../../Interfaces/Todo";

import "./styles.css";

interface IListProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

interface IField {
    [id: number]: string;
}

export const List = ({ todos, setTodos }: IListProps) => {
    const handleToggleEditButton = (todoId: number) => {
        setTodos(
            todos.map(todo =>
                todo.id === todoId ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    };

    const handleEditTodo = (
        todoId: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setTodos(
            todos.map(todo => (todo.id === todoId ? { ...todo, name: value } : todo))
        );
    };

    const handleDoneTodo = (todoId: number) => {
        setTodos(previousTodos =>
            previousTodos.map(todo =>
                todoId === todo.id ? { ...todo, done: true } : todo
            )
        );
    };

    const handleRemoveTodo = (todoId: number) => {
        setTodos(todos.filter(todo => todo.id !== todoId));
    };

    return (
        <ul className="list">
            {todos.map(todo => {
                const style = todo.done ? "list__label--with-line" : "";

                return (
                    <li className="list__item" key={todo.id}>
                        {todo.isEditing ? (
                            <input
                                className="list__input"
                                defaultValue={todo.name}
                                onChange={event => handleEditTodo(todo.id, event)}
                            />
                        ) : (
                                <label className={`list__label ${style}`}>{todo.name}</label>
                            )}
                        <span
                            className="list__button"
                            onClick={() => handleToggleEditButton(todo.id)}
                        >
                            <>Editar</>
                        </span>
                        <span
                            className={`list__button ${
                                todo.done ? "list__button--disabled" : ""
                                }`}
                            onClick={() => (!todo.done ? handleDoneTodo(todo.id) : null)}
                        >
                            <>Realizada</>
                        </span>
                        <span
                            className="list__button list__button--delete"
                            onClick={() => handleRemoveTodo(todo.id)}
                        >
                            <>Eliminar</>
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};
