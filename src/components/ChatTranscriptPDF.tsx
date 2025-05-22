import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

interface ChatMessage {
  role: string;
  content: string;
}

interface ChatTranscriptPDFProps {
  chat_history: ChatMessage[];
}

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10 },
  role: { fontWeight: "bold", marginBottom: 2 },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const ChatTranscriptPDF: React.FC<ChatTranscriptPDFProps> = ({
  chat_history,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Conversation Transcript</Text>
      {chat_history.map((msg, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.role}>{msg.role}:</Text>
          <Text>{msg.content}</Text>
        </View>
      ))}

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

export default ChatTranscriptPDF;
