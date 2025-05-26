import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { Rnd } from "react-rnd";
import CloseButton from "components/CloseButton";
import { useState, useEffect } from "react";

const ContinueChatWidget = ({ id }) => {
  const navigate = useNavigate();

  const [disclaimer, setDisclaimer] = useState<any>(null);
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
    continueConversation,
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

  const [newPrompt, setNewPrompt] = useState("");

  const handleConversation = async () => {
    if (!disclaimer) return;
    setActiveDisclaimerId(disclaimer.id);
    const updated = await continueConversation(disclaimer.id, newPrompt);
    setDisclaimer(updated);
    setMessages(updated.chat_history);
    setNewPrompt("");
  };

  const handleDownload = async () => {
    console.log("id", id);
    downloadPDF(id);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/disclaimers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setDisclaimer(data))
      .catch((err) => console.error("Failed to load disclaimer", err));
  }, [id]);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full z-50 "
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
            <div className="bg-red-600 w-5 h-4 flex items-center justify-center">
              <CloseButton />
            </div>

            <div className="mt-2 flex gap-2 justify-center items-center">
              <input
                type="text"
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="Ask a follow-up"
                className="flex-1 border py-1 rounded max-w-36 pl-2"
              />
            </div>

            {/* Scrollable Chat History Area */}
            <div className="flex-1 min-h-0 overflow-y-auto scroll-smooth my-2 px-2 box-border">
              <ul className="list-none flex flex-col gap-2 w-full">
                {disclaimer.chat_history?.map((msg, idx) => {
                  const isLast = idx === disclaimer.chat_history.length - 1;

                  return (
                    <li
                      ref={isLast ? bottomRef : null}
                      key={idx}
                      className={`mt-2 pl-4 pr-4  mr-3  ml-3 mb-2 p-2  rounded-lg text-sm ${
                        msg.role === "user"
                          ? "bg-blue-100 text-left"
                          : "bg-gray-100 text-left"
                      }`}
                    >
                      <strong>
                        {msg.role === "user"
                          ? "You"
                          : msg.role === "assistant"
                          ? "Bot"
                          : "System"}
                        :
                      </strong>{" "}
                      {msg.content}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Sticky Button Row */}
            <div className="mt-2 flex justify-center">
              <button
                onClick={handleConversation}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Send
              </button>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded ml-2 hover:bg-green-700"
                onClick={handleDownload}
              >
                Download Transcript
              </button>
            </div>
          </div>
        </Rnd>
      )}
    </>
  );
};

export default ContinueChatWidget;
