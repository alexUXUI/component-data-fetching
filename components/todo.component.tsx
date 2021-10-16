import { useSSE } from "use-sse";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const TodoComponent = () => {
  const [todos, error] = useSSE((): Promise<Todo[]> => {
    return fetch("https://jsonplaceholder.typicode.com/todos").then(
      (response: Response) => response.json()
    );
  }, []);

  if (error) return <div>{error.message}</div>;

  if (!todos?.length) return <span>Loading...</span>;

  return (
    <section>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo: Todo) => {
          return (
            <li key={todo.id}>
              <h2>{todo.title}</h2>
              <p>{todo.completed ? "Completed" : "Not Completed"}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
