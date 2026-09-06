"use client";

import {FormEvent,useRef,useState} from "react";

type SubmissionState = {kind:"idle"|"sending"|"success"|"error";message:string};

export function ContactForm({fallbackEmail}:{fallbackEmail:string|null}){
  const [state,setState]=useState<SubmissionState>({kind:"idle",message:""});
  const formRef=useRef<HTMLFormElement>(null);

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const form=event.currentTarget;
    if(!form.reportValidity()) return;
    setState({kind:"sending",message:"Sending your note…"});
    const values=Object.fromEntries(new FormData(form).entries());
    try{
      const response=await fetch("/api/contact",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(values)});
      const payload=await response.json() as {success:boolean;data?:{message?:string};error?:{message?:string}};
      if(!response.ok||!payload.success) throw new Error(payload.error?.message??"The note could not be sent.");
      form.reset();
      setState({kind:"success",message:"Your note is in. I’ll read it soon."});
    }catch(error){
      setState({kind:"error",message:error instanceof Error?error.message:"The note could not be sent. Please use email instead."});
      formRef.current?.querySelector<HTMLElement>("button[type='submit']")?.focus();
    }
  }

  return <form className="contact-form" ref={formRef} onSubmit={submit} data-state={state.kind}>
    <div className="contact-form-pair"><label>Name<input name="name" type="text" autoComplete="name" maxLength={100} required/></label><label>Email<input name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} required/></label></div>
    <label>Subject<input name="subject" type="text" autoComplete="off" maxLength={200} required/></label>
    <label>Message<textarea name="message" rows={6} maxLength={5000} required/></label>
    <label className="contact-trap" aria-hidden="true">Company website<input name="honeypot" type="text" tabIndex={-1} autoComplete="off"/></label>
    <div className="contact-form-footer"><button className="button primary" type="submit" disabled={state.kind==="sending"}>{state.kind==="sending"?"Sending…":"Send note ↗"}</button>{fallbackEmail&&<a className="contact-mail-fallback" href={`mailto:${fallbackEmail}`}>Email remains available if the form is offline.</a>}</div>
    <p className="contact-form-status" role="status" aria-live="polite" data-kind={state.kind}>{state.message}</p>
  </form>;
}
