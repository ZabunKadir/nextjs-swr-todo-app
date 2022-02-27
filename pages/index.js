import TodoItem from "../components/todoItem";
import styles from "../styles/Home.module.css";
import useSWR, { mutate } from "swr";
import { useState, useEffect } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function Home() {
  const { data, error } = useSWR("/api/tasks", fetcher);

  const [inputTitle, setInputTitle] = useState(null);

  //Create New Todo By Title "POST" Function
  const addTodo = async (title) => {
    await fetcher("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: title }),
    });
    mutate("/api/tasks");
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.todo}>
          <div className={styles.header}>
            <span className={styles.title}>To Do List</span>
          </div>
          <div className={styles.create}>
            <div className={styles.newTodo}>
              <div className={styles.addTask}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a9b1ba"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="14" y1="10" x2="3" y2="10" />
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="21" y1="14" x2="3" y2="14" />
                  <line x1="14" y1="18" x2="3" y2="18" />
                </svg>
                <input
                  placeholder="Add a task..."
                  name="title"
                  onChange={(e) => setInputTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTodo(inputTitle);
                      e.target.value = null;
                    }
                  }}
                  className={styles.addInput}
                />
              </div>
              <div className={styles.pinned}>
                {data?.map(
                  (item) =>
                    item?.pinned && (
                      <TodoItem
                        key={item?.id}
                        id={item?.id}
                        isPinned={true}
                        isChecked={item?.checked}
                        content={item?.title}
                        memo={item?.memo}
                      />
                    )
                )}
              </div>
            </div>
            <div className={styles.todos}>
              {data?.map(
                (item) =>
                  !item?.pinned && (
                    <TodoItem
                      key={item?.id}
                      id={item?.id}
                      isChecked={item?.checked}
                      isPinned={item?.pinned}
                      content={item?.title}
                      memo={item?.memo}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
