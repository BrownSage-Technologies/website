"use client";

import { useState } from "react";
import { contactForm, site, whatsappLink } from "../content";
import { Button } from "./Button";
import { Reveal } from "./motion";

const empty = { name: "", phone: "", organisation: "", need: "" };

function isLocalHost() {
  return /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
}

export function Contact() {
  const [values, setValues] = useState(empty);
  const [status, setStatus] = useState("idle");
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
  const ready = site.formspreeId && site.formspreeId !== "YOUR_FORM_ID";

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (event.target._gotcha?.value) {
      setStatus("sent");
      return;
    }
    if (!ready) {
      setStatus(isLocalHost() ? "preview" : "unconfigured");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Form failed");
      setValues(empty);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-grid">
        <Reveal>
          <h2>{contactForm.heading}</h2>
          <p className="lede">{contactForm.intro}</p>
          <ul className="contact-list">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={maps} target="_blank" rel="noopener noreferrer">
                {site.address}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          {status === "sent" || status === "preview" ? (
            <div className="form-thanks" role="status">
              <p className="thanks-title">{contactForm.thanks}</p>
              {status === "preview" ? <p className="form-note">{contactForm.previewNote}</p> : null}
              <Button type="button" onClick={() => setStatus("idle")}>
                {contactForm.another}
              </Button>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit}>
              {status === "error" || status === "unconfigured" ? (
                <p className="form-note" role="status">
                  {status === "error" ? contactForm.error : contactForm.unconfigured}{" "}
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </p>
              ) : null}
              <div className="form-row">
                {contactForm.fields.slice(0, 2).map((field) => (
                  <label key={field.name} className="field">
                    <span>{field.label}</span>
                    <input
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      value={values[field.name]}
                      onChange={update}
                      required
                    />
                  </label>
                ))}
              </div>
              {contactForm.fields.slice(2).map((field) => (
                <label key={field.name} className="field">
                  <span>{field.label}</span>
                  {field.type === "textarea" ? (
                    <textarea name={field.name} value={values[field.name]} onChange={update} required rows={5} />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      value={values[field.name]}
                      onChange={update}
                      required
                    />
                  )}
                </label>
              ))}
              <input className="hp" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? contactForm.sending : contactForm.submit}
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
