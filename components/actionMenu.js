import { Popover } from "@headlessui/react";
import { mutate } from "swr";
import { useState } from "react";

import styles from "../styles/Home.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ActionDropdown({ id, pinValue }) {
  //Memo Input Control State
  const [isOpen, setIsOpen] = useState(false);
  //Memo Input Value State
  const [memoValue, setMemoValue] = useState(null);

  //Pin Todo By Id "PATCH" Function
  const pinTodoById = async (id, pinValue) => {
    await fetcher("/api/tasks/" + `${id}`, {
      method: "PATCH",
      body: JSON.stringify({ pinned: !pinValue }),
    });
    mutate("/api/tasks");
  };

  //Add Memo By Id "PATCH" Function
  const memoTodoById = async (id, memo) => {
    await fetcher("/api/tasks/" + `${id}`, {
      method: "PATCH",
      body: JSON.stringify({ memo: memo }),
    });
    setIsOpen(false);
    mutate("/api/tasks");
  };

  //Delete Todo By Id "DELETE" Function
  const deleteTodoById = async (id) => {
    await fetcher("/api/tasks/" + `${id}`, {
      method: "DELETE",
    });
    mutate("/api/tasks");
  };

  return (
    <Popover className={styles.popover}>
      <Popover.Button className={styles.menuButton}>
        <svg
          className={styles.menuIcon}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          width="24"
          height="12"
          viewBox="0 0 122.88 29.956"
          enableBackground="new 0 0 122.88 29.956"
          xmlSpace="preserve"
        >
          <g>
            <path
              fill="#a9b1ba"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M122.88,14.978c0,8.271-6.708,14.979-14.979,14.979s-14.976-6.708-14.976-14.979 C92.926,6.708,99.631,0,107.901,0S122.88,6.708,122.88,14.978L122.88,14.978z M29.954,14.978c0,8.271-6.708,14.979-14.979,14.979 S0,23.248,0,14.978C0,6.708,6.705,0,14.976,0S29.954,6.708,29.954,14.978L29.954,14.978z M76.417,14.978 c0,8.271-6.708,14.979-14.979,14.979c-8.27,0-14.978-6.708-14.978-14.979C46.46,6.708,53.168,0,61.438,0 C69.709,0,76.417,6.708,76.417,14.978L76.417,14.978z"
            />
          </g>
        </svg>
      </Popover.Button>
      <Popover.Panel className={styles.popoverPanel}>
        <button
          className={styles.panelButton}
          onClick={() => pinTodoById(id, pinValue)}
        >
          <div className={styles.panelButtonArea}>
            <svg
              className={styles.pinIcon}
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
                    fill="#a9b1ba"
                    d="M675,998l315-315L815,508l-70,70L617.6,450.6c23.3-56.4,28.8-116,16.5-178.9c-12.3-62.9-41.2-116.7-86.5-161.4L377.5,280.5L185,88L10,18l70,175l192.5,192.5L102.4,555.6c44.7,45.4,98.5,74.2,161.4,86.5s122.5,6.8,178.9-16.5L570,753l-70,70L675,998z"
                  />
                </g>
              </g>
            </svg>
            <span className={styles.buttonText}>Pin on the top</span>
          </div>
        </button>
        <button className={styles.panelButton}>
          <div className={styles.panelButtonArea}>
            <svg
              className={styles.buttonIcon}
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
                <path
                  fill="#a9b1ba"
                  d="M910.5,21.6H89.5C45.6,21.6,10,57.2,10,101.1v797.8c0,43.9,35.6,79.5,79.5,79.5H689c43.9,0,79.5-35.6,79.5-79.5V756.8h141.9c43.9,0,79.5-35.6,79.5-79.5V101.1C990,57.2,954.4,21.6,910.5,21.6 M910.5,101.1v576.2H689v221.6H89.5V101.1L910.5,101.1L910.5,101.1z"
                />
                <path fill="#a9b1ba" d="M170.5,325h650.7H170.5z" />
                <path fill="#a9b1ba" d="M170.5,515.9h552.8H170.5z" />
                <path
                  fill="#a9b1ba"
                  d="M745.3,954l-44-263.1l274.1,33L745.3,954L745.3,954z"
                />
              </g>
            </svg>
            <span className={styles.buttonText} onClick={() => setIsOpen(true)}>
              Add a memo
            </span>
          </div>
        </button>
        {isOpen && (
          <div className={styles.addMemo}>
            <input
              className={styles.memoInput}
              name="memo"
              onChange={(e) => setMemoValue(e.target.value)}
            />
            <button
              className={styles.memoButtonOkay}
              onClick={(e) => {
                memoTodoById(id, memoValue);
                setMemoValue(null);
              }}
            >
              O
            </button>
            <button
              className={styles.memoButtonCancel}
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>
        )}
        <button
          className={styles.panelButton}
          onClick={() => deleteTodoById(id)}
        >
          <div className={styles.panelButtonArea}>
            <svg
              className={styles.buttonIcon}
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
                <path
                  fill="#a9b1ba"
                  d="M648.5,10h-297c-32.8,0-59.4,26.6-59.4,59.4v118.8H84.2c-32.8,0-59.4,26.6-59.4,59.4c0,32.8,26.6,59.4,59.4,59.4h831.5c32.8,0,59.4-26.6,59.4-59.4c0-32.8-26.6-59.4-59.4-59.4H707.9V69.4C707.9,36.6,681.3,10,648.5,10z M618.8,188.2H381.2V99.1h237.6V188.2L618.8,188.2z M113.9,396.1v475.2c0,65.7,53.2,118.8,118.8,118.8h534.5c65.6,0,118.8-53.1,118.8-118.8V396.1H767.3v475.2H648.5V396.1h-89.1v475.2H440.6V396.1h-89.1v475.2H232.7V396.1H113.9L113.9,396.1z"
                />
              </g>
            </svg>
            <span className={styles.buttonText}>Delete</span>
          </div>
        </button>
      </Popover.Panel>
    </Popover>
  );
}
