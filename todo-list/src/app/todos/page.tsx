"use client";
import React, { useState } from "react";

export default function Todos() {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([
        { id: 1, desc: "Build todo", completed: false },
        { id: 2, desc: "write code", completed: false },
        { id: 3, desc: "Deploy the App", completed: false }
    ]);
    const [editMode, setEditMode] = useState(false);
    const [editedTodo, setEditedTodo] = useState({ id: null, desc: "", completed: false });

    const handleEditSubmit = () => {
        // Find the index of the edited todo
        const index = todos.findIndex(todo => todo.id === editedTodo.id);
        if (index !== -1) {
            // Update the todo with the edited description
            const updatedTodos = [...todos];
            updatedTodos[index] = editedTodo;
            setTodos(updatedTodos);
        }
        setEditMode(false);
    };

    const handleAddTodo = () => {
        if (inputText.trim() !== "") {
            const newTodo = {
                id: todos.length + 1,
                desc: inputText,
                completed: false
            };
            setTodos([...todos, newTodo]);
            setInputText("");
        }
    };

    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
            <div className="text-2xl">TODO LIST</div>
            <div className="flex gap-2">
                <input
                    className="text-xl rounded-md shadow-md"
                    type="text"
                    placeholder="Enter Todo"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1" onClick={handleAddTodo}>ADD</button>
                <button className="text-xl shadow-md bg-gray-600 text-white hover:bg-blue-500 rounded-md px-3 py-1">CLEAR</button>
            </div>
            <div className="w-5/6 flex flex-col gap-2">
                {todos.map((todo, index) => (
                    <div className="bg-blue-600 flex justify-between items-center p-2 rounded-lg shadow-md" key={todo.id}>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" checked={todo.completed} onChange={() => {}} />
                            <div className="text-lg text-white shadow-md bg-yellow-600 text-white hover:bg-blue-500 rounded-md px-1">{todo.desc}</div>
                        </div>
                        <div>
                            <button className="text-xl shadow-md bg-green-600 text-white hover:bg-blue-500 rounded-md px-1" onClick={() => {
                                setEditedTodo(todo);
                                setEditMode(true);
                            }}>EDIT</button>
                            <button className="text-xl shadow-md bg-red-600 text-white hover:bg-blue-500 rounded-md px-1" onClick={() => handleDeleteTodo(todo.id)}>DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
            {editMode && (
                <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
                    <div className="text-2xl">EDIT TODO</div>
                    <div className="flex gap-4">
                        <div className="text-lg">EDIT DESC:</div>
                        <input
                            className="rounded-md shadow-md text-lg"
                            type="text"
                            placeholder="Enter new desc"
                            value={editedTodo.desc}
                            onChange={(e) => setEditedTodo({ ...editedTodo, desc: e.target.value })}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="text-lg">Edit completed</div>
                        <input
                            type="checkbox"
                            checked={editedTodo.completed}
                            onChange={(e) => setEditedTodo({ ...editedTodo, completed: e.target.checked })}
                        />
                        <button className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1" onClick={handleEditSubmit}>SUBMIT</button>
                    </div>
                </div>
            )}
        </div>
    );
}
