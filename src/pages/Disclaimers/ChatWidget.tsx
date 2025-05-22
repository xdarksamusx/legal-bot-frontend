import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { useRef } from "react";
import Draggable from "react-draggable";

const ChatWidget = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    login,
    logout,
    deletion,
    generatedDisclaimer,
    setGeneratedDisclaimer,
    isOpen,
    createDisclaimer,
    disclaimers,
    setDisclaimers,
    messages,
    setMessages,
    activeDisclaimerId,
    setActiveDisclaimerId,
    setIsOpen,
    downloadPDF,
    downloadConversation,
  } = useAuth();
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const bottomRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUserMessage = {
      role: "user",
      content: formData.prompt,
    };

    const updatedMessages = [...messages, newUserMessage];

    const statement = await createDisclaimer(updatedMessages);

    const assistantMessage = {
      role: "assistant",
      content: statement,
    };

    const fullMessages = [...updatedMessages, assistantMessage];

    setMessages(fullMessages);
    setFormData({ prompt: "" });
  };

  useEffect(() => {
    if (messages.length > 0) {
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full z-50"
        onClick={() => setIsOpen(!isOpen)}
      ></button>

      {isOpen && (
        <Draggable>
          <div className=" overflow-y-auto max-h-[80vh] fixed top-[25%] left-1/2 transform -translate-x-1/2 w-[315px] bg-white border rounded-lg shadow-lg p-2 z-50 flex flex-col">
            <div className="w-full justify-center flex pr-4  pt-10  ">
              <form onSubmit={handleSubmit}>
                <label htmlFor="prompt"></label>
                <input
                  id="prompt"
                  name="prompt"
                  placeholder="Enter a disclaimer topic"
                  value={formData.prompt}
                  onChange={handleChange}
                  className="w-36 border rounded py-1 px-2 "
                />
                <div className="mt-2 flex justify-center">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded">
                    Generate
                  </button>{" "}
                  <Link to={`/disclaimers/${activeDisclaimerId}/download_pdf`}>
                    {" "}
                    Download Conversation{" "}
                  </Link>
                </div>
              </form>
            </div>

            <ul className="overflow-y-auto flex-1 list-none flex flex-col items-center justify-evenly pr-4">
              {messages.map((message, index) => {
                const isLast =
                  index === messages.length - 1 && message.role === "assistant";

                return (
                  <li
                    key={message.content}
                    ref={isLast ? bottomRef : null}
                    className={`mt-2    w-full max-w-[90%] mb-2 p-2 rounded-lg text-sm ${
                      message.role === "user"
                        ? "bg-blue-100 text-left"
                        : "bg-gray-100 text-left"
                    }`}
                  >
                    <strong className="block text-gray-700 mb-1">
                      {message.role === "user" ? "You" : "Bot"}:
                    </strong>
                    <p className="whitespace-pre-line">{message.content}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default ChatWidget;
