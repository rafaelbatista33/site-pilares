import { type FormEvent, useEffect, useMemo, useState } from "react";
import { supabaseRest } from "../lib/supabase";
import "./ChatWidget.css";

type ChatMessage = {
  id: string;
  session_id: string;
  sender_type: "visitor" | "bot" | "admin";
  body: string;
  created_at: string;
};

type AutoReply = {
  trigger: string;
  answer: string;
};

const CHAT_SESSION_KEY = "pilares_chat_session";

const getStoredChatSession = () => {
  const rawSession = localStorage.getItem(CHAT_SESSION_KEY);
  if (!rawSession) return null;

  try {
    return JSON.parse(rawSession) as { id: string; token: string };
  } catch {
    localStorage.removeItem(CHAT_SESSION_KEY);
    return null;
  }
};

const saveStoredChatSession = (session: { id: string; token: string }) => {
  localStorage.setItem(CHAT_SESSION_KEY, JSON.stringify(session));
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [autoReplies, setAutoReplies] = useState<AutoReply[]>([]);
  const [message, setMessage] = useState("");
  const [visitor, setVisitor] = useState({ name: "", email: "" });
  const [isSending, setIsSending] = useState(false);

  const hasStarted = Boolean(sessionId);

  const sortedAutoReplies = useMemo(
    () =>
      [...autoReplies].sort(
        (first, second) => second.trigger.length - first.trigger.length,
      ),
    [autoReplies],
  );

  useEffect(() => {
    const loadAutoReplies = async () => {
      try {
        const replies = await supabaseRest<AutoReply[]>("chat_auto_replies", {
          query: "?is_active=eq.true&select=trigger,answer",
        });
        setAutoReplies(replies);
      } catch {
        setAutoReplies([]);
      }
    };

    const storedSession = getStoredChatSession();
    if (storedSession) {
      setSessionId(storedSession.id);
      setSessionToken(storedSession.token);
    }

    void loadAutoReplies();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (!sessionId || !sessionToken) return;

      try {
        const loadedMessages = await supabaseRest<ChatMessage[]>(
          "chat_messages",
          {
            query: `?session_id=eq.${sessionId}&visitor_token=eq.${sessionToken}&select=id,session_id,sender_type,body,created_at&order=created_at.asc`,
            headers: {
              "x-visitor-token": sessionToken,
            },
          },
        );
        setMessages(loadedMessages);
      } catch {
        setMessages([]);
      }
    };

    void loadMessages();
    const interval = window.setInterval(() => {
      void loadMessages();
    }, 1500);

    return () => window.clearInterval(interval);
  }, [sessionId, sessionToken]);

  const createSession = async () => {
    const id = crypto.randomUUID();
    const token = crypto.randomUUID();
    await supabaseRest<null>("chat_sessions", {
      method: "POST",
      headers: {
        "x-visitor-token": token,
      },
      body: {
        id,
        visitor_name: visitor.name || null,
        visitor_email: visitor.email || null,
        visitor_token: token,
        status: "open",
      },
    });

    setSessionId(id);
    setSessionToken(token);
    saveStoredChatSession({ id, token });
    return { id, token };
  };

  const findAutoReply = (text: string) => {
    const normalized = text.toLowerCase();
    return sortedAutoReplies.find((reply) =>
      normalized.includes(reply.trigger.toLowerCase()),
    );
  };

  const insertMessage = async (
    nextSessionId: string,
    nextSessionToken: string,
    senderType: ChatMessage["sender_type"],
    body: string,
  ) => {
    const id = crypto.randomUUID();

    await supabaseRest<null>("chat_messages", {
      method: "POST",
      body: {
        id,
        session_id: nextSessionId,
        visitor_token: nextSessionToken,
        sender_type: senderType,
        body,
      },
      headers: {
        "x-visitor-token": nextSessionToken,
      },
    });

    setMessages((current) => [
      ...current,
      {
        id,
        session_id: nextSessionId,
        sender_type: senderType,
        body,
        created_at: new Date().toISOString(),
      },
    ]);
  };

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim() || isSending) return;

    setIsSending(true);

    try {
      const activeSession =
        sessionId && sessionToken
          ? { id: sessionId, token: sessionToken }
          : await createSession();

      const visitorMessage = message.trim();
      setMessage("");

      await insertMessage(
        activeSession.id,
        activeSession.token,
        "visitor",
        visitorMessage,
      );

      await supabaseRest<null>("chat_sessions", {
        method: "PATCH",
        query: `?id=eq.${activeSession.id}`,
        headers: {
          "x-visitor-token": activeSession.token,
        },
        body: {
          last_message_at: new Date().toISOString(),
          status: "open",
        },
      });

      const autoReply = findAutoReply(visitorMessage);
      if (autoReply) {
        await insertMessage(
          activeSession.id,
          activeSession.token,
          "bot",
          autoReply.answer,
        );
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <section className="chat-widget__panel" aria-label="Chat da Pilares">
          <header>
            <div>
              <strong>Pilares</strong>
              <span>Atendimento e dúvidas</span>
            </div>
            <button type="button" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </header>

          {!hasStarted && (
            <div className="chat-widget__visitor">
              <input
                placeholder="Seu nome"
                value={visitor.name}
                onChange={(event) =>
                  setVisitor((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
              <input
                placeholder="Seu e-mail"
                type="email"
                value={visitor.email}
                onChange={(event) =>
                  setVisitor((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </div>
          )}

          <div className="chat-widget__messages">
            {messages.length === 0 && (
              <p>
                Envie sua dúvida sobre módulos, implantação ou atendimento. Se
                houver uma resposta cadastrada, ela aparece automaticamente.
              </p>
            )}

            {messages.map((item) => (
              <div
                className={`chat-widget__message chat-widget__message--${item.sender_type}`}
                key={item.id}
              >
                <span>{item.sender_type === "visitor" ? "Você" : "Pilares"}</span>
                <p>{item.body}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage}>
            <input
              placeholder="Digite sua dúvida"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit" disabled={isSending}>
              <i className="fa-solid fa-paper-plane" aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <button
        className="chat-widget__trigger"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Abrir chat"
      >
        <i className="fa-solid fa-message" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ChatWidget;
