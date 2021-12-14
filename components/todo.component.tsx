import { useSSE } from "use-sse";
import { createContext, useState, useEffect, useMemo, useContext } from 'react'
interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// get a Post By ID: https://jsonplaceholder.typicode.com/posts/1

// When the Page loads, we want to set the product ID in context, so that
// it is avaialble to children.

// page -> component bridge

// this is for client


// RULE OF THREE

// 1: Data fetch
export function dataFetcher(postId: number) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
      (response: Response) => response.json()
    );
}

// 2: Dumb Component - takes the data, does not request it
export const TodoMarkup = ({ todo, error }: any) => {

  if (!todo || !Object.keys(todo)?.length) return <span>Loading...</span>;

  if (error) return <span>Error: {error.message}</span>;

  if (todo?.id) {
    const {id, title, body} = todo;
    return (
        <section>
          <h1>Todo List</h1>
          <ul>
            <li key={id}>
              <h2>{title}</h2>
              <p>{body ? body : "Not body"}</p>
            </li>
          </ul>
        </section>
    );
  }

  return null;
};


export const useTodos = (postId: number): {todo: Todo, error: Error} => {

  const [todo, error] = useSSE((): Promise<Todo[]> => {
    return dataFetcher(postId)
  }, [postId]);

  return {
    todo,
    error
  };
};

// this is a helper component that will get the context from the Provider. It's like <Context.Consumer>
// this will help any child of the <TodosProvider /> get access to the todos data from the context API and not from props.
export function useTodosContext() {
  const todosContext = useContext(TodosContext);
  if (!todosContext) {
    // if the call to get the contet from the provider doesn't work its because there is not context prodiver to consume
    // https://reactjs.org/docs/hooks-reference.html#usecontext
    throw new Error(`useTodosContext must be used within a Todos Provider!`);
  }
  return todosContext;
}

// Todos Context
export const TodosContext = createContext<{
  todo: Todo,
  error: Error | undefined
}>({
  todo: {
    userId: 0,
    id: 0,
    title: 'default',
    body: 'some defualt text'
  }, 
  error: undefined
});

export const TodosComponent = ({ todo: todoProp, error: errorProp, dataFetcher: any }: {todo: Todo, error: Error}) => {
  const { todo: todoInternal, error: errorInternal } = useTodosContext(dataFetcher);

  if (!todoProp) {
    if (!todoInternal || !Object.keys(todoInternal)?.length) return <span>Loading...</span>;
    if (errorInternal) return <span>Error: {errorInternal.message}</span>;
    if (todoInternal) {
      <TodoMarkup todo={todoInternal} error={errorInternal} />
    }
  } 

  return <TodoMarkup todo={todoProp} error={errorProp} />;
};
