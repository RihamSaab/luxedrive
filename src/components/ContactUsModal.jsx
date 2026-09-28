import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";

const CONTACT_EMAIL = "hello@luxedrive.com";
const CONTACT_PHONE = "+961 1 234 567";
const CONTACT_ADDRESS = "Beirut, Lebanon";

export default function ContactUsModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      try {
        const saved = localStorage.getItem("user");
        const user = saved ? JSON.parse(saved) : null;
        if (user?.username) setName(user.username);
      } catch {
        /* no-op */
      }
    } else {
      // reset when closed
      setSent(false);
      setError("");
      setMessage("");
    }
  }, [open]);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSubmit =
    name.trim() !== "" && validEmail && message.trim().length >= 5;

  const handleSubmit = () => {
    setError("");
    if (!name.trim()) return setError("Please tell us your name.");
    if (!validEmail) return setError("Please enter a valid email.");
    if (message.trim().length < 5)
      return setError("Message should be at least 5 characters.");

    // No backend endpoint yet — surface a confirmation locally.
    setSent(true);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      width={480}
    >
      <Container>
        {!sent ? (
          <>
            <Title>Get in touch</Title>
            <Subtitle>
              Questions, feedback, or a special request? We'd love to hear
              from you.
            </Subtitle>

            <InfoList>
              <InfoRow>
                <InfoIcon>
                  <FiMapPin />
                </InfoIcon>
                <InfoText>{CONTACT_ADDRESS}</InfoText>
              </InfoRow>
              <InfoRow>
                <InfoIcon>
                  <FiPhone />
                </InfoIcon>
                <InfoText>
                  <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}>
                    {CONTACT_PHONE}
                  </a>
                </InfoText>
              </InfoRow>
              <InfoRow>
                <InfoIcon>
                  <FiMail />
                </InfoIcon>
                <InfoText>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </InfoText>
              </InfoRow>
            </InfoList>

            <FormLabel>Send us a message</FormLabel>

            <Field>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>

            <Field>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field>
              <TextArea
                rows={4}
                placeholder="How can we help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Field>

            {error && <ErrorText>{error}</ErrorText>}

            <Actions>
              <PrimaryButton
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
              >
                <FiSend />
                Send message
              </PrimaryButton>
              <SecondaryButton type="button" onClick={onClose}>
                Cancel
              </SecondaryButton>
            </Actions>
          </>
        ) : (
          <SentWrap>
            <SentIcon>
              <FiCheckCircle />
            </SentIcon>
            <Title>Message sent</Title>
            <Subtitle>
              Thanks {name || "for reaching out"} — our team will get back to
              you shortly.
            </Subtitle>
            <PrimaryButton type="button" onClick={onClose}>
              Got it
            </PrimaryButton>
          </SentWrap>
        )}
      </Container>
    </Modal>
  );
}

/* ===================== STYLED COMPONENTS ===================== */

const Container = styled.div`
  padding: 6px 4px 2px;
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  color: #000;
`;

const Subtitle = styled.p`
  margin: 0 0 18px;
  color: #666;
  font-size: 14px;
  line-height: 1.55;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InfoIcon = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 15px;
  flex-shrink: 0;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #333;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #000;
      text-decoration: underline;
    }
  }
`;

const FormLabel = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #999;
  margin-bottom: 10px;
`;

const Field = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #000;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    border-color: #000;
  }
`;

const ErrorText = styled.p`
  margin: 4px 0 10px;
  color: #d32f2f;
  font-size: 13px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 40px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: 0.25s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: transparent;
    color: #000;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background: transparent;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 40px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    color: #000;
    border-color: #000;
  }
`;

const SentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 6px 4px 4px;
`;

const SentIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f4f4;
  color: #000;
  font-size: 34px;
  margin-bottom: 16px;
`;
