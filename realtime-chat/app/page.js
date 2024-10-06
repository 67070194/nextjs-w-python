'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const socket = useRef(null); // ใช้ useRef แทน

  useEffect(() => {
    // สร้าง WebSocket และเก็บใน socket.current
    socket.current = new WebSocket("ws://localhost:8000/ws");

    // ฟังก์ชันเมื่อมีข้อความใหม่เข้ามา
    socket.current.onmessage = function(event) {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // ปิดการเชื่อมต่อเมื่อคอมโพเนนต์ถูกทำลาย
    return () => {
      socket.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage !== "" && socket.current) {
      socket.current.send(inputMessage); // เรียกใช้ socket.current แทน
      setInputMessage("");
    }
  };

  return (
    <div>
      <h1>Realtime Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
