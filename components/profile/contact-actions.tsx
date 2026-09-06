"use client";

import { CheckIcon, CopyIcon, GithubLogoIcon, WarningIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

type ContactActionsProps = {
  email: string | null;
  github: string | null;
};

export function ContactActions({ email, github }: ContactActionsProps) {
  const [message, setMessage] = useState("");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  const copyEmail = async () => {
    if (!email) {
      setMessage("A public email address has not been confirmed yet.");
      return;
    }
    try {
      await navigator.clipboard.writeText(email);
      setMessage("Email copied.");
    } catch {
      setMessage(`Copy failed. Email: ${email}`);
    }
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setMessage(""), 4500);
  };

  return (
    <div className="contact-actions">
      {email ? (
        <>
          <a className="button button--primary" href={`mailto:${email}`}>Send email</a>
          <button className="button button--secondary" type="button" onClick={copyEmail}>
            <CopyIcon size={19} weight="bold" aria-hidden="true" />
            Copy email
          </button>
        </>
      ) : (
        <div className="contact-pending">
          <WarningIcon size={23} weight="duotone" aria-hidden="true" />
          <p>A public email address is being confirmed.</p>
        </div>
      )}
      {github ? (
        <a className="button button--secondary" href={github} target="_blank" rel="noreferrer">
          <GithubLogoIcon size={20} weight="bold" aria-hidden="true" />
          GitHub profile
        </a>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {message}
      </p>
      {message ? (
        <p className="contact-message" aria-hidden="true">
          {message.startsWith("Email copied") ? <CheckIcon size={18} weight="bold" /> : null}
          {message}
        </p>
      ) : null}
    </div>
  );
}
