import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { useRef } from "react";
import { Rnd } from "react-rnd";
import CloseButton from "components/CloseButton";

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

  const [size, setSize] = useState({ width: 315, height: 300 });
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 160,
    y: window.innerHeight / 4,
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

  /////////////////

  /////////////

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full z-50"
        onClick={() => setIsOpen(!isOpen)}
      ></button>

      {isOpen && (
        <Rnd
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            maxHeight: "80vh",
          }}
          size={size}
          onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
          onResizeStop={(e, direction, ref, delta, pos) => {
            setSize({
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
            });
            setPosition(pos);
          }}
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
          bounds="window"
          minWidth={300}
          minHeight={100}
          resizeHandleStyles={{
            top: {
              top: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "12px",
              height: "12px",
              position: "absolute",
              cursor: "n-resize",
              background: "#888",
              borderRadius: "4px",
            },
            bottom: {
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "12px",
              height: "12px",
              position: "absolute",
              cursor: "s-resize",
              background: "#888",
              borderRadius: "4px",
            },
            left: {
              left: "-6px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "12px",
              height: "12px",
              position: "absolute",
              cursor: "w-resize",
              background: "#888",
              borderRadius: "4px",
            },
            right: {
              right: "-6px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "12px",
              height: "12px",
              position: "absolute",
              cursor: "e-resize",
              background: "#888",
              borderRadius: "4px",
            },
            topLeft: {
              top: "-6px",
              left: "-6px",
              width: "12px",
              height: "12px",
              position: "absolute",
              cursor: "nw-resize",
              background: "blue",
              borderRadius: "4px",
            },
            topRight: {
              top: "-6px",
              right: "-6px",
              width: "12px",
              height: "12px",
              position: "absolute",
              cursor: "ne-resize",
              background: "blue",
              borderRadius: "4px",
            },
            bottomLeft: {
              bottom: "-6px",
              left: "-6px",
              width: "12px",
              height: "12px",
              position: "absolute",
              cursor: "sw-resize",
              background: "blue",
              borderRadius: "4px",
            },
            bottomRight: {
              bottom: "-6px",
              right: "-6px",
              width: "12px",
              height: "12px",
              position: "absolute",
              cursor: "se-resize",
              background: "blue",
              borderRadius: "4px",
            },
          }}
          className="relative z-50 bg-green-100 rounded-lg shadow-lg flex-grow"
        >
          <div className="flex flex-col h-full w-full overflow-hidden p-4 box-border bg-white rounded-lg shadow-lg">
            {" "}
            <div className="bg-red-600 w-5 h-4 flex items-center justify-center">
              {" "}
              <CloseButton />{" "}
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="prompt"></label>

              <div className="mt-2 flex gap-2 justify-center items-center px-4">
                <input
                  id="prompt"
                  name="prompt"
                  placeholder="Enter a disclaimer topic"
                  value={formData.prompt}
                  onChange={handleChange}
                  className="w-36 border rounded py-1 px-2 "
                />
              </div>
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
            {}
            <div className="flex-1 min-h-0 overflow-y-auto scroll-smooth my-2 px-2 box-border">
              <ul className="flex flex-col gap-2 w-full px-4">
                {messages.map((message, index) => {
                  const isLast =
                    index === messages.length - 1 &&
                    message.role === "assistant";

                  return (
                    <li
                      key={message.content}
                      ref={isLast ? bottomRef : null}
                      className={`w-full max-w-[95%] px-4 py-2 rounded-lg text-sm shadow-sm ${
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
          </div>
        </Rnd>
      )}
    </>
  );
};

export default ChatWidget;
