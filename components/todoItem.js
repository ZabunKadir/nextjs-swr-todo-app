import ActionDropdown from "./actionMenu";
import { mutate } from "swr";

import styles from "../styles/Home.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TodoItem = ({ id, isChecked, isPinned, content, memo }) => {
  //Todo Check By Id "PATCH" Function
  const checkTodoById = async (id, check) => {
    await fetcher("/api/tasks/" + `${id}`, {
      method: "PATCH",
      body: JSON.stringify({ checked: check }),
    });
    mutate("/api/tasks");
  };

  return (
    <div className={styles.todoItem}>
      <div className={styles.pinArea}>
        {isPinned && (
          <svg
            className={styles.bigPinIcon}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 1000 1000"
            enableBackground="new 0 0 1000 1000"
            xmlSpace="preserve"
          >
            <g>
              <g transform="matrix(1 0 0 -1 0 1008)">
                <path
                  fill="#f06292"
                  d="M675,998l315-315L815,508l-70,70L617.6,450.6c23.3-56.4,28.8-116,16.5-178.9c-12.3-62.9-41.2-116.7-86.5-161.4L377.5,280.5L185,88L10,18l70,175l192.5,192.5L102.4,555.6c44.7,45.4,98.5,74.2,161.4,86.5s122.5,6.8,178.9-16.5L570,753l-70,70L675,998z"
                />
              </g>
            </g>
          </svg>
        )}
      </div>
      <div className={styles.check}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => checkTodoById(id, e.target.checked)}
          />
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <div className={styles.content}>
        <span className={styles.contentText}>{content}</span>
        {memo && <span className={styles.contentMemo}>{memo}</span>}
      </div>
      <div className={styles.actionButton}>
        <ActionDropdown id={id} value={isPinned}></ActionDropdown>
      </div>
    </div>
  );
};
export default TodoItem;
