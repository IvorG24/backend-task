"use client";

import { createTodos, deleteTodos } from "@/app/action/todo";
import { TodoData } from "@/types/types";
import React, { useOptimistic, useState } from "react";
import UpdateDialog from "./update-dialog";
import { Button } from "@/components/ui/button";
interface TodoDataProps {
  todos: TodoData[] | undefined;
  variant: "user" | "admin";
}
const TodoList = ({ todos, variant }: TodoDataProps) => {
  const [optimisticData, addOptimisticData] = useOptimistic(
    todos || [], // Provide a default value to ensure it's always an array
    (state: TodoData[], newTodo: TodoData) => {
      return [...state, newTodo];
    }
  );

  return (
    <div className="min-h-screen w-full max-w-[1300px] bg-white  flex items-center justify-center">
      {variant === "admin" ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Todo List</h1>
          <form
            action={async (formdata) => {
              addOptimisticData({
                title: formdata.get("title") as string,
                id: "",
              });
              await createTodos(formdata);
            }}
            className="mb-4"
          >
            <input
              type="text"
              name="title"
              className="border p-2 rounded w-full"
              placeholder="Add a new todo"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
            >
              Add Todo
            </button>
          </form>
          <ul>
            {optimisticData?.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <>
                  <span>{todo.title}</span>
                  <div className="flex gap-2">
                    <UpdateDialog title={todo.title} id={todo.id} />
                    <form>
                      <Button
                        formAction={async () => {
                          await deleteTodos(todo.id);
                        }}
                        variant={"destructive"}
                      >
                        Delete
                      </Button>
                    </form>
                  </div>
                </>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Todo List</h1>
          <form action={createTodos} className="mb-4">
            <input
              type="text"
              name="title"
              className="border p-2 rounded w-full"
              placeholder="Add a new todo"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
            >
              Add Todo
            </button>
          </form>
          <ul>
            {todos?.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <span>{todo.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodoList;
