import { type FormEvent, useEffect, useMemo, useState } from "react";
import {
  clearAdminSession,
  getAdminSession,
  saveAdminSession,
  signInAdmin,
  supabaseRest,
  type SupabaseSession,
  verifyAdminAccess,
} from "../../lib/supabase";
import "./AdminPage.css";

type EmailContact = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  source: string | null;
  status: string;
  notes: string | null;
  company: string | null;
  role: string | null;
  city: string | null;
  uf: string | null;
  entity_type: string | null;
  country: string | null;
  team_size: string | null;
  message: string | null;
  page_url: string | null;
  user_agent: string | null;
  created_at: string;
};

type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
  created_at: string;
};

type AutoReply = {
  id: string;
  trigger: string;
  answer: string;
  is_active: boolean;
};

type ChatSession = {
  id: string;
  visitor_name: string | null;
  visitor_email: string | null;
  visitor_token: string;
  status: string;
  last_message_at: string;
};

type ChatMessage = {
  id: string;
  session_id: string;
  sender_type: "visitor" | "bot" | "admin";
  body: string;
  created_at: string;
};

const emptyTemplate = { name: "", subject: "", body: "" };
const emptyReply = { trigger: "", answer: "", is_active: true };
const contactStatuses = ["new", "contacted", "qualified", "archived"];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));

const AdminPage = () => {
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [contacts, setContacts] = useState<EmailContact[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [autoReplies, setAutoReplies] = useState<AutoReply[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedContactId, setSelectedContactId] = useState("");
  const [selectedChatId, setSelectedChatId] = useState("");
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(
    null,
  );
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [templateForm, setTemplateForm] = useState(emptyTemplate);
  const [replyForm, setReplyForm] = useState(emptyReply);
  const [adminReply, setAdminReply] = useState("");
  const [status, setStatus] = useState("");

  const selectedContact = useMemo(
    () => contacts.find((item) => item.id === selectedContactId),
    [contacts, selectedContactId],
  );

  const selectedChat = useMemo(
    () => chatSessions.find((item) => item.id === selectedChatId),
    [chatSessions, selectedChatId],
  );

  const loadAdminData = async (activeSession = session) => {
    if (!activeSession) return;
    const token = activeSession.access_token;

    const [loadedContacts, loadedTemplates, loadedReplies, loadedChats] =
      await Promise.all([
        supabaseRest<EmailContact[]>("email_contacts", {
          token,
          query:
            "?select=id,name,email,phone,source,status,notes,company,role,city,uf,entity_type,country,team_size,message,page_url,user_agent,created_at&order=created_at.desc&limit=120",
        }),
        supabaseRest<EmailTemplate[]>("email_templates", {
          token,
          query: "?select=id,name,subject,body,created_at&order=created_at.desc",
        }),
        supabaseRest<AutoReply[]>("chat_auto_replies", {
          token,
          query: "?select=id,trigger,answer,is_active&order=created_at.desc",
        }),
        supabaseRest<ChatSession[]>("chat_sessions", {
          token,
          query:
            "?select=id,visitor_name,visitor_email,visitor_token,status,last_message_at&order=last_message_at.desc&limit=120",
        }),
      ]);

    setContacts(loadedContacts);
    setTemplates(loadedTemplates);
    setAutoReplies(loadedReplies);
    setChatSessions(loadedChats);

    if (!selectedContactId && loadedContacts[0]) {
      setSelectedContactId(loadedContacts[0].id);
    }
    if (!selectedChatId && loadedChats[0]) {
      setSelectedChatId(loadedChats[0].id);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      const storedSession = getAdminSession();
      if (!storedSession) {
        setIsCheckingSession(false);
        return;
      }

      try {
        const canAccess = await verifyAdminAccess(storedSession);
        if (!canAccess) {
          clearAdminSession();
          return;
        }

        setSession(storedSession);
        await loadAdminData(storedSession);
      } catch {
        clearAdminSession();
      } finally {
        setIsCheckingSession(false);
      }
    };

    void bootstrap();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (!session || !selectedChatId) {
        setMessages([]);
        return;
      }

      const loadedMessages = await supabaseRest<ChatMessage[]>("chat_messages", {
        token: session.access_token,
        query: `?session_id=eq.${selectedChatId}&select=id,session_id,sender_type,body,created_at&order=created_at.asc`,
      });

      setMessages(loadedMessages);
    };

    void loadMessages();
    const interval = window.setInterval(() => {
      void loadMessages();
    }, 1500);

    return () => window.clearInterval(interval);
  }, [selectedChatId, session]);

  useEffect(() => {
    const loadLiveLists = async () => {
      if (!session) return;

      const [loadedContacts, loadedChats] = await Promise.all([
        supabaseRest<EmailContact[]>("email_contacts", {
          token: session.access_token,
          query:
            "?select=id,name,email,phone,source,status,notes,company,role,city,uf,entity_type,country,team_size,message,page_url,user_agent,created_at&order=created_at.desc&limit=120",
        }),
        supabaseRest<ChatSession[]>("chat_sessions", {
          token: session.access_token,
          query:
            "?select=id,visitor_name,visitor_email,visitor_token,status,last_message_at&order=last_message_at.desc&limit=120",
        }),
      ]);

      setContacts(loadedContacts);
      setChatSessions(loadedChats);

      if (!selectedContactId && loadedContacts[0]) {
        setSelectedContactId(loadedContacts[0].id);
      }

      if (!selectedChatId && loadedChats[0]) {
        setSelectedChatId(loadedChats[0].id);
      }
    };

    void loadLiveLists();
    const interval = window.setInterval(() => {
      void loadLiveLists();
    }, 2500);

    return () => window.clearInterval(interval);
  }, [selectedChatId, selectedContactId, session]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    try {
      const nextSession = await signInAdmin(email, password);
      const canAccess = await verifyAdminAccess(nextSession);
      if (!canAccess) {
        throw new Error("Este usuário não está autorizado como admin.");
      }

      saveAdminSession(nextSession);
      setSession(nextSession);
      await loadAdminData(nextSession);
    } catch (error) {
      setLoginError(
        error instanceof Error ? error.message : "Não foi possível entrar.",
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setSession(null);
  };

  const updateContact = async (body: Partial<EmailContact>) => {
    if (!session || !selectedContact) return;

    await supabaseRest<null>("email_contacts", {
      token: session.access_token,
      method: "PATCH",
      query: `?id=eq.${selectedContact.id}`,
      body,
    });

    setContacts((current) =>
      current.map((contact) =>
        contact.id === selectedContact.id ? { ...contact, ...body } : contact,
      ),
    );
    setStatus("Contato atualizado.");
  };

  const deleteContact = async () => {
    if (!session || !selectedContact) return;

    await supabaseRest<null>("email_contacts", {
      token: session.access_token,
      method: "DELETE",
      query: `?id=eq.${selectedContact.id}`,
    });

    setContacts((current) =>
      current.filter((contact) => contact.id !== selectedContact.id),
    );
    setSelectedContactId("");
    setStatus("Contato excluído.");
  };

  const handleSaveTemplate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) return;

    if (editingTemplateId) {
      await supabaseRest<null>("email_templates", {
        token: session.access_token,
        method: "PATCH",
        query: `?id=eq.${editingTemplateId}`,
        body: templateForm,
      });
      setStatus("Modelo atualizado.");
    } else {
      await supabaseRest<null>("email_templates", {
        token: session.access_token,
        method: "POST",
        body: templateForm,
      });
      setStatus("Modelo criado.");
    }

    setTemplateForm(emptyTemplate);
    setEditingTemplateId(null);
    await loadAdminData();
  };

  const editTemplate = (template: EmailTemplate) => {
    setEditingTemplateId(template.id);
    setTemplateForm({
      name: template.name,
      subject: template.subject,
      body: template.body,
    });
  };

  const deleteTemplate = async (id: string) => {
    if (!session) return;
    await supabaseRest<null>("email_templates", {
      token: session.access_token,
      method: "DELETE",
      query: `?id=eq.${id}`,
    });
    setTemplates((current) => current.filter((item) => item.id !== id));
    setStatus("Modelo excluído.");
  };

  const handleSaveAutoReply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) return;

    if (editingReplyId) {
      await supabaseRest<null>("chat_auto_replies", {
        token: session.access_token,
        method: "PATCH",
        query: `?id=eq.${editingReplyId}`,
        body: replyForm,
      });
      setStatus("Resposta automática atualizada.");
    } else {
      await supabaseRest<null>("chat_auto_replies", {
        token: session.access_token,
        method: "POST",
        body: replyForm,
      });
      setStatus("Resposta automática criada.");
    }

    setReplyForm(emptyReply);
    setEditingReplyId(null);
    await loadAdminData();
  };

  const editAutoReply = (reply: AutoReply) => {
    setEditingReplyId(reply.id);
    setReplyForm({
      trigger: reply.trigger,
      answer: reply.answer,
      is_active: reply.is_active,
    });
  };

  const toggleAutoReply = async (reply: AutoReply) => {
    if (!session) return;
    await supabaseRest<null>("chat_auto_replies", {
      token: session.access_token,
      method: "PATCH",
      query: `?id=eq.${reply.id}`,
      body: { is_active: !reply.is_active },
    });
    setAutoReplies((current) =>
      current.map((item) =>
        item.id === reply.id ? { ...item, is_active: !item.is_active } : item,
      ),
    );
  };

  const deleteAutoReply = async (id: string) => {
    if (!session) return;
    await supabaseRest<null>("chat_auto_replies", {
      token: session.access_token,
      method: "DELETE",
      query: `?id=eq.${id}`,
    });
    setAutoReplies((current) => current.filter((item) => item.id !== id));
    setStatus("Resposta automática excluída.");
  };

  const handleSendAdminReply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session || !selectedChatId || !selectedChat || !adminReply.trim()) {
      return;
    }

    const [created] = await supabaseRest<ChatMessage[]>("chat_messages", {
      token: session.access_token,
      method: "POST",
      body: {
        session_id: selectedChatId,
        visitor_token: selectedChat.visitor_token,
        sender_type: "admin",
        body: adminReply.trim(),
      },
      prefer: "return=representation",
    });

    await supabaseRest<null>("chat_sessions", {
      token: session.access_token,
      method: "PATCH",
      query: `?id=eq.${selectedChatId}`,
      body: {
        status: "answered",
        last_message_at: new Date().toISOString(),
      },
    });

    setMessages((current) => [...current, created]);
    setChatSessions((current) =>
      current.map((chat) =>
        chat.id === selectedChatId ? { ...chat, status: "answered" } : chat,
      ),
    );
    setAdminReply("");
    setStatus("Resposta enviada.");
  };

  const updateChatStatus = async (nextStatus: string) => {
    if (!session || !selectedChat) return;
    await supabaseRest<null>("chat_sessions", {
      token: session.access_token,
      method: "PATCH",
      query: `?id=eq.${selectedChat.id}`,
      body: { status: nextStatus },
    });
    setChatSessions((current) =>
      current.map((chat) =>
        chat.id === selectedChat.id ? { ...chat, status: nextStatus } : chat,
      ),
    );
  };

  const deleteChat = async () => {
    if (!session || !selectedChat) return;
    await supabaseRest<null>("chat_sessions", {
      token: session.access_token,
      method: "DELETE",
      query: `?id=eq.${selectedChat.id}`,
    });
    setChatSessions((current) =>
      current.filter((chat) => chat.id !== selectedChat.id),
    );
    setMessages([]);
    setSelectedChatId("");
    setStatus("Conversa excluída.");
  };

  if (isCheckingSession) {
    return (
      <main className="admin-page admin-page--center">
        <div className="admin-loading">Validando acesso...</div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="admin-page admin-page--center">
        <section className="admin-login">
          <img src="/img/logo/header-logo6.png" alt="Pilares" />
          <span>Painel administrativo</span>
          <h1>Entrar como admin</h1>
          <p>Use um usuário do Supabase Auth liberado em admin_profiles.</p>

          <form onSubmit={handleLogin}>
            <label>
              E-mail
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Senha
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>

            {loginError && <strong className="admin-error">{loginError}</strong>}

            <button type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <img src="/img/logo/header-logo6.png" alt="Pilares" />
          <span>Admin</span>
        </div>
        <button type="button" onClick={handleLogout}>
          Sair
        </button>
      </header>

      <section className="admin-hero">
        <div>
          <span>Painel privado</span>
          <h1>Gestão comercial e atendimento</h1>
          <p>
            Visualize contatos completos, qualifique leads, gerencie modelos de
            e-mail, respostas automáticas e conversas do chat.
          </p>
        </div>
        <aside>
          <strong>{contacts.length}</strong>
          <span>contatos</span>
          <strong>{chatSessions.length}</strong>
          <span>conversas</span>
        </aside>
      </section>

      {status && <div className="admin-status">{status}</div>}

      <section className="admin-grid admin-grid--contacts">
        <article className="admin-card">
          <div className="admin-card__head">
            <span>Leads</span>
            <h2>Contatos capturados</h2>
          </div>

          <div className="admin-table">
            {contacts.map((contact) => (
              <button
                className={`admin-table-row ${
                  contact.id === selectedContactId ? "is-active" : ""
                }`}
                key={contact.id}
                type="button"
                onClick={() => setSelectedContactId(contact.id)}
              >
                <div>
                  <strong>{contact.name || "Sem nome"}</strong>
                  <span>{contact.email}</span>
                  <span>{contact.company || contact.entity_type || contact.source}</span>
                </div>
                <small>{contact.status}</small>
              </button>
            ))}
            {contacts.length === 0 && (
              <p className="admin-empty">Nenhum contato cadastrado ainda.</p>
            )}
          </div>
        </article>

        <article className="admin-card admin-contact-detail">
          <div className="admin-card__head">
            <span>Detalhes</span>
            <h2>{selectedContact?.name || "Selecione um contato"}</h2>
          </div>

          {selectedContact ? (
            <>
              <div className="admin-detail-grid">
                <p>
                  <strong>E-mail</strong>
                  <span>{selectedContact.email}</span>
                </p>
                <p>
                  <strong>Telefone</strong>
                  <span>{selectedContact.phone || "Não informado"}</span>
                </p>
                <p>
                  <strong>Origem</strong>
                  <span>{selectedContact.source || "site"}</span>
                </p>
                <p>
                  <strong>Recebido em</strong>
                  <span>{formatDate(selectedContact.created_at)}</span>
                </p>
                <p>
                  <strong>Órgão / empresa</strong>
                  <span>{selectedContact.company || "Não informado"}</span>
                </p>
                <p>
                  <strong>Cargo</strong>
                  <span>{selectedContact.role || "Não informado"}</span>
                </p>
                <p>
                  <strong>Cidade / UF</strong>
                  <span>
                    {[selectedContact.city, selectedContact.uf]
                      .filter(Boolean)
                      .join(" / ") || "Não informado"}
                  </span>
                </p>
                <p>
                  <strong>Entidade</strong>
                  <span>{selectedContact.entity_type || "Não informado"}</span>
                </p>
                <p>
                  <strong>País</strong>
                  <span>{selectedContact.country || "Não informado"}</span>
                </p>
                <p>
                  <strong>Equipe</strong>
                  <span>{selectedContact.team_size || "Não informado"}</span>
                </p>
              </div>

              <div className="admin-message-box">
                <strong>Mensagem do cliente</strong>
                <p>{selectedContact.message || "Nenhuma mensagem opcional."}</p>
              </div>

              <div className="admin-message-box">
                <strong>Informações técnicas</strong>
                <p>{selectedContact.page_url || "Página não registrada"}</p>
                <small>{selectedContact.user_agent}</small>
              </div>

              <div className="admin-form admin-inline-form">
                <label>
                  Status
                  <select
                    value={selectedContact.status}
                    onChange={(event) =>
                      void updateContact({ status: event.target.value })
                    }
                  >
                    {contactStatuses.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Anotações internas
                  <textarea
                    value={selectedContact.notes || ""}
                    onChange={(event) =>
                      setContacts((current) =>
                        current.map((contact) =>
                          contact.id === selectedContact.id
                            ? { ...contact, notes: event.target.value }
                            : contact,
                        ),
                      )
                    }
                  />
                </label>
                <div className="admin-actions">
                  <button
                    type="button"
                    onClick={() =>
                      void updateContact({ notes: selectedContact.notes })
                    }
                  >
                    Salvar anotações
                  </button>
                  <button
                    className="admin-danger"
                    type="button"
                    onClick={() => void deleteContact()}
                  >
                    Excluir contato
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="admin-empty">Escolha um contato para ver detalhes.</p>
          )}
        </article>
      </section>

      <section className="admin-grid">
        <article className="admin-card">
          <div className="admin-card__head">
            <span>E-mails</span>
            <h2>Templates</h2>
          </div>
          <form className="admin-form" onSubmit={handleSaveTemplate}>
            <input
              placeholder="Nome do modelo"
              required
              value={templateForm.name}
              onChange={(event) =>
                setTemplateForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
            />
            <input
              placeholder="Assunto"
              required
              value={templateForm.subject}
              onChange={(event) =>
                setTemplateForm((current) => ({
                  ...current,
                  subject: event.target.value,
                }))
              }
            />
            <textarea
              placeholder="Corpo do e-mail"
              required
              value={templateForm.body}
              onChange={(event) =>
                setTemplateForm((current) => ({
                  ...current,
                  body: event.target.value,
                }))
              }
            />
            <div className="admin-actions">
              <button type="submit">
                {editingTemplateId ? "Atualizar modelo" : "Criar modelo"}
              </button>
              {editingTemplateId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingTemplateId(null);
                    setTemplateForm(emptyTemplate);
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="admin-list">
            {templates.map((template) => (
              <div key={template.id}>
                <strong>{template.name}</strong>
                <span>{template.subject}</span>
                <div className="admin-actions">
                  <button type="button" onClick={() => editTemplate(template)}>
                    Editar
                  </button>
                  <button
                    className="admin-danger"
                    type="button"
                    onClick={() => void deleteTemplate(template.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-card">
          <div className="admin-card__head">
            <span>Chat</span>
            <h2>Respostas automáticas</h2>
          </div>
          <form className="admin-form" onSubmit={handleSaveAutoReply}>
            <input
              placeholder="Gatilho. Ex: preço, implantação, módulos"
              required
              value={replyForm.trigger}
              onChange={(event) =>
                setReplyForm((current) => ({
                  ...current,
                  trigger: event.target.value,
                }))
              }
            />
            <textarea
              placeholder="Resposta automática"
              required
              value={replyForm.answer}
              onChange={(event) =>
                setReplyForm((current) => ({
                  ...current,
                  answer: event.target.value,
                }))
              }
            />
            <label className="admin-check">
              <input
                type="checkbox"
                checked={replyForm.is_active}
                onChange={(event) =>
                  setReplyForm((current) => ({
                    ...current,
                    is_active: event.target.checked,
                  }))
                }
              />
              Ativa
            </label>
            <div className="admin-actions">
              <button type="submit">
                {editingReplyId ? "Atualizar resposta" : "Criar resposta"}
              </button>
              {editingReplyId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingReplyId(null);
                    setReplyForm(emptyReply);
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="admin-list">
            {autoReplies.map((reply) => (
              <div key={reply.id}>
                <strong>{reply.trigger}</strong>
                <span>{reply.answer}</span>
                <small>{reply.is_active ? "Ativa" : "Inativa"}</small>
                <div className="admin-actions">
                  <button type="button" onClick={() => editAutoReply(reply)}>
                    Editar
                  </button>
                  <button type="button" onClick={() => void toggleAutoReply(reply)}>
                    {reply.is_active ? "Desativar" : "Ativar"}
                  </button>
                  <button
                    className="admin-danger"
                    type="button"
                    onClick={() => void deleteAutoReply(reply.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="admin-card admin-chat-panel">
        <div className="admin-card__head">
          <span>Atendimento</span>
          <h2>Conversas dos clientes</h2>
        </div>

        <div className="admin-chat-layout">
          <div className="admin-conversations">
            {chatSessions.map((chat) => (
              <button
                className={chat.id === selectedChatId ? "is-active" : ""}
                key={chat.id}
                type="button"
                onClick={() => setSelectedChatId(chat.id)}
              >
                <strong>{chat.visitor_name || "Visitante"}</strong>
                <span>{chat.visitor_email || chat.status}</span>
                <small>{chat.status}</small>
              </button>
            ))}
            {chatSessions.length === 0 && (
              <p className="admin-empty">Nenhuma conversa iniciada ainda.</p>
            )}
          </div>

          <div className="admin-messages">
            <div className="admin-messages__head">
              <div>
                <strong>{selectedChat?.visitor_name || "Selecione uma conversa"}</strong>
                <span>{selectedChat?.visitor_email}</span>
              </div>
              {selectedChat && (
                <div className="admin-actions">
                  <button type="button" onClick={() => void updateChatStatus("closed")}>
                    Encerrar
                  </button>
                  <button
                    className="admin-danger"
                    type="button"
                    onClick={() => void deleteChat()}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>

            <div className="admin-messages__body">
              {messages.map((message) => (
                <div
                  className={`admin-message admin-message--${message.sender_type}`}
                  key={message.id}
                >
                  <span>{message.sender_type}</span>
                  <p>{message.body}</p>
                </div>
              ))}
            </div>

            <form className="admin-reply-form" onSubmit={handleSendAdminReply}>
              <input
                placeholder="Responder cliente"
                value={adminReply}
                onChange={(event) => setAdminReply(event.target.value)}
                disabled={!selectedChatId}
              />
              <button type="submit" disabled={!selectedChatId}>
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
