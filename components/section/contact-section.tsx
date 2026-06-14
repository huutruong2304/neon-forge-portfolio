'use client';

import { ArrowUpRight, Mail } from 'lucide-react';
import { useState } from 'react';
import { contactFormSchema } from '@/lib/schemas/contact';
import GlassCard from '@/components/shared/glass-card';
import Reveal from '@/components/shared/reveal';
import SectionHeading from './section-heading';

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ValidationErrors = Partial<Record<keyof ContactFormState, string>>;

const ContactSection = () => {
  const [contactForm, setContactForm] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (contactStatus !== 'idle') {
      setContactStatus('idle');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setValidationErrors({});

    // Client-side validation with Zod
    const validationResult = contactFormSchema.safeParse(contactForm);
    if (!validationResult.success) {
      const errors: ValidationErrors = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormState;
        if (field) {
          errors[field] = issue.message;
        }
      });
      setValidationErrors(errors);
      setContactStatus('error');
      setIsSubmitting(false);
      return;
    }
    // solution without backend, opens the user's mail app with pre-filled email
    // const subject = contactForm.subject || `Portfolio Contact - ${contactForm.name}`;
    // const body = `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`;
    // const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // window.location.href = mailtoUrl;

    // solution with backend, sends email to me
    // Send validated data to API
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: contactForm.name,
        email: contactForm.email,
        subject: contactForm.subject,
        message: contactForm.message,
        submittedAt: new Date().toISOString(),
        source: window.location.href,
      }),
    });

    if (res.ok) {
      setContactStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setValidationErrors({});
    } else {
      const data = await res.json();
      setContactStatus('error');
      if (data.details) {
        const errors: ValidationErrors = {};
        data.details.forEach((issue: { path: (string | number)[] }) => {
          const field = issue.path[0] as keyof ContactFormState;
          if (field) {
            errors[field] = data.error || 'Validation failed';
          }
        });
        setValidationErrors(errors);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="scroll-mt-24 mb-16">
      <Reveal>
        <SectionHeading icon={<Mail size={18} className="text-[#E1FF00]" />} title="Contact Form" className="mb-6" />
      </Reveal>

      <Reveal delay={100}>
        <GlassCard className="p-6 md:p-8 rounded-4xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                  className={`w-full rounded-2xl border bg-white/10 px-4 py-3 text-sm lg:text-base text-white placeholder:text-white/50 focus:outline-none focus:border-[#E1FF00] ${
                    validationErrors.name ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                {validationErrors.name && <p className="text-xs lg:text-sm text-red-300 mt-1 font-semibold">{validationErrors.name}</p>}
              </div>
              <div>
                <input
                  placeholder="Your email"
                  value={contactForm.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  className={`w-full rounded-2xl border bg-white/10 px-4 py-3 text-sm lg:text-base text-white placeholder:text-white/50 focus:outline-none focus:border-[#E1FF00] ${
                    validationErrors.email ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                {validationErrors.email && <p className="text-xs lg:text-sm text-red-300 mt-1 font-semibold">{validationErrors.email}</p>}
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Subject (optional)"
                value={contactForm.subject}
                onChange={(event) => handleChange('subject', event.target.value)}
                className={`w-full rounded-2xl border bg-white/10 px-4 py-3 text-sm lg:text-base text-white placeholder:text-white/50 focus:outline-none focus:border-[#E1FF00] ${
                  validationErrors.subject ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {validationErrors.subject && <p className="text-xs lg:text-sm text-red-300 mt-1 font-semibold">{validationErrors.subject}</p>}
            </div>

            <div>
              <textarea
                rows={5}
                placeholder="Your message"
                value={contactForm.message}
                onChange={(event) => handleChange('message', event.target.value)}
                className={`w-full resize-none rounded-2xl border bg-white/10 px-4 py-3 text-sm lg:text-base text-white placeholder:text-white/50 focus:outline-none focus:border-[#E1FF00] ${
                  validationErrors.message ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {validationErrors.message && <p className="text-xs lg:text-sm text-red-300 mt-1 font-semibold">{validationErrors.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 bg-[#E1FF00] text-[#113af1] font-extrabold px-6 py-3 rounded-full hover:bg-white transition-colors text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowUpRight size={18} /> {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>

              {contactStatus === 'error' && Object.keys(validationErrors).length === 0 ? (
                <p className="text-xs lg:text-sm text-rose-200 font-semibold">Failed to send message. Please try again.</p>
              ) : null}
              {contactStatus === 'success' ? (
                <p className="text-xs lg:text-sm text-emerald-200 font-semibold">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              ) : null}
            </div>
          </form>
        </GlassCard>
      </Reveal>
    </section>
  );
};

export default ContactSection;
