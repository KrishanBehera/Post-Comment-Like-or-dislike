import React, { useState } from "react";
import "./App.css";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { MdOutlineReply } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
function App() {
  const [title, settitle] = useState("");
  const [commentdata, setcommentdata] = useState([]);
  function HandleClick(e) {
    e.preventDefault();
    const obj = {
      id: crypto.randomUUID(),
      message: title,
      countofLike: 0,
      countofDislike: 0,
      replie: {},
    };
    if (title.trim().length === 0) {
      return alert("Comment Something");
    }
    setcommentdata((prev) => {
      return [...prev, obj];
    });
    settitle("");
  }
  function Like(id) {
    setcommentdata((prev) => {
      return prev.map((x) => {
        if (x.id === id) {
          return { ...x, countofLike: x.countofLike + 1 };
        } else {
          return x;
        }
      });
    });
  }
  function DisLike(id) {
    setcommentdata((prev) => {
      return prev.map((x) => {
        if (x.id === id) {
          return { ...x, countofLike: x.countofLike - 1 };
        } else {
          return x;
        }
      });
    });
  }
  function DeleteCommnet(id) {
    setcommentdata((prev) => {
      return prev.filter((x) => {
        return x.id !== id;
      });
    });
  }
  return (
    <div className="Main">
      <div>
        <textarea
          placeholder="Comment"
          name="text"
          id="text"
          onChange={(e) => settitle(e.target.value)}
          value={title}
        ></textarea>
        <button onClick={HandleClick}>Post</button>
      </div>
      {commentdata &&
        commentdata.map((Comm) => {
          return (
            <div key={Comm.id} className="Commnet">
              This Comment
              <ul>
                <li>{Comm.message}</li>
              </ul>
              <p>Count of Like : {Comm.countofLike}</p>
              <div className="btn">
                {Comm.countofLike === 0 && (
                  <button onClick={() => Like(Comm.id)}>
                    <BiLike />
                  </button>
                )}
                {Comm.countofDislike === 0 && (
                  <button onClick={() => DisLike(Comm.id)}>
                    <BiDislike />
                  </button>
                )}
                <button>
                  <MdOutlineReply />
                </button>
                <button onClick={() => DeleteCommnet(Comm.id)}>
                  <IoIosRemoveCircle />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
