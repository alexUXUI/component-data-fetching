import Head from "next/head";
import Image from "next/image";
import { useMemo } from "react";
import { SmartTodoComponent, useTodos, TodosContext } from "../components/todo.component";
import styles from "../styles/Home.module.css";

function TodosProvider({ children, postId }: any) {
  const { todo, error } = useTodos(postId);
  const value = {todo, error};
  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}

export default function Home() {
  // PDP page knows what the product id is based on the url
  // We pass the product id to the Page -> Component Content bridge

  return (
    <TodosProvider postId={1}>
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          { /*  no props here! */ }
          <SmartTodoComponent />
        </main>
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </TodosProvider>
  );
}





