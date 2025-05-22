import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "context/AuthContext";
import { PDFDownloadLink } from "@react-pdf/renderer";

import ChatTranscriptPDF from "components/ChatTranscriptPDF";

const DownloadedPDF = () => {
  const { id } = useParams<{ id: string }>();

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
    continueConversation,
    downloadPDF,
  } = useAuth();

  const [disclaimer, setDisclaimer] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/disclaimers/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const slicedDisclaimer = {
          ...data,
          chat_history: data.chat_history?.slice(1),
        };
        setDisclaimer(slicedDisclaimer);
      })
      .catch((err) => console.error("failed to load disclaimer:", err));
  }, [id]);

  console.log("disclaimer", disclaimer);

  return (
    <>
      <h1>Conversation</h1>
      {disclaimer?.chat_history && (
        <PDFDownloadLink
          document={
            <ChatTranscriptPDF chat_history={disclaimer.chat_history} />
          }
          fileName={`disclaimer-${id}.pdf`}
        >
          {({ loading }: { loading: boolean }) => (
            <span>{loading ? "Generating..." : "Download Styled PDF"}</span>
          )}
        </PDFDownloadLink>
      )}
    </>
  );
};

export default DownloadedPDF;
