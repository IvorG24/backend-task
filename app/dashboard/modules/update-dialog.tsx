import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { updateTodos } from "@/app/action/todo";
import { Button } from "@/components/ui/button";
interface UpdateDialogProps {
  title: string;
  id: string;
}
const UpdateDialog = ({ title, id }: UpdateDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-yellow-500 text-white p-2 rounded">
        Edit
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely you want to edit?
          </AlertDialogTitle>
          <form
            className="space-y-4"
            action={async (formdata) => {
              console.log(id);

              await updateTodos(formdata, id);
            }}
          >
            <input
              type="text"
              name="title"
              defaultValue={title}
              className="border p-2 rounded w-full"
              placeholder="edit a todo"
            />
            <div className="flex justify-between">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">
                Submit New Todo
              </AlertDialogAction>
            </div>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateDialog;
