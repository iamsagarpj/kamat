'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { contact, profile } from '@/content/site';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'not-configured';

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

/**
 * Works on static hosting through Web3Forms (set NEXT_PUBLIC_WEB3FORMS_KEY).
 * Without a key it validates and then says plainly that the form isn't connected.
 * It never pretends a message was sent.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    if (!String(data.get('name') || '').trim()) errs.name = 'Please enter your name.';
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    if (!email && !phone) errs.email = 'Please give an email or a phone number so we can reply.';
    if (email && !/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Please enter a valid email address.';
    if (String(data.get('message') || '').trim().length < 10) errs.message = 'Please write a short message (at least 10 characters).';
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    if (data.get('botcheck')) return;
    if (!accessKey) {
      setStatus('not-configured');
      return;
    }
    setStatus('sending');
    try {
      data.append('access_key', accessKey);
      data.append('subject', `Website enquiry: ${data.get('type')}`);
      data.append('from_name', `${profile.name} website`);
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        setStatus('sent');
        form.reset();
      } else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  const field = 'mt-2 block w-full border border-ink/15 bg-paper px-4 py-3 text-base text-ink placeholder:text-stone-light focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze';
  const label = 'text-sm font-semibold text-ink';
  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-[#9B2C2C]">{errors[k]}</p>
    ) : null;

  if (status === 'sent') {
    return (
      <div role="status" className="border border-bronze/40 bg-paper p-8">
        <CheckCircle2 className="h-8 w-8 text-bronze-deep" aria-hidden />
        <p className="mt-4 font-serif text-2xl">Thank you. Your message has been sent.</p>
        <p className="mt-2 text-stone">The team will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6" aria-describedby="form-status">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Full name *</label>
          <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="type" className={label}>Enquiry type</label>
          <select id="type" name="type" className={field} defaultValue={contact.enquiryTypes[0]}>
            {contact.enquiryTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
          {err('email')}
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={label}>Message *</label>
        <textarea id="message" name="message" rows={6} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
        {err('message')}
      </div>
      <p className="text-xs leading-relaxed text-stone">
        Your details are used only to respond to this enquiry and are not shared with anyone else.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === 'sending'} className="btn-ink disabled:opacity-60">
          {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <div id="form-status" role="status" aria-live="polite" className="text-sm">
          {status === 'error' && (
            <span className="flex items-center gap-2 text-[#9B2C2C]"><AlertCircle className="h-4 w-4" aria-hidden />Something went wrong. Please try again or message on Instagram.</span>
          )}
          {status === 'not-configured' && (
            <span className="flex items-center gap-2 text-bronze-deep"><AlertCircle className="h-4 w-4 shrink-0" aria-hidden />The online form isn’t connected yet. Your message was not sent. Please reach out on Instagram or Facebook for now.</span>
          )}
        </div>
      </div>
    </form>
  );
}
