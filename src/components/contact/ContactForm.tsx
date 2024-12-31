'use client';

import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { ClientRateLimiter } from '@/utils/rateLimiter';
import { SecurityUtils } from '@/utils/securityUtils';

export const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // honeypot field
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formStartTime] = useState(Date.now()); // track when form was loaded
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const rateLimiter = new ClientRateLimiter('contact-form');

  // initialize session-based rate limiting
  useEffect(() => {
    SecurityUtils.initializeSession();
  }, []);

  const validateForm = (): boolean => {
    // check honeypot
    if (honeypot) {
      console.log('Honeypot triggered');
      setError('Invalid submission');
      return false;
    }

    // check local storage rate limit
    const limitStatus = rateLimiter.checkLimit();
    if (!limitStatus.allowed) {
      setError(`Too many attempts. Please try again later.`);
      return false;
    }

    // check session rate limit
    const sessionStatus = SecurityUtils.checkSessionLimit();
    if (!sessionStatus.isValid) {
      setError(sessionStatus.error || null);
      return false;
    }

    // validate timestamp
    const timeStatus = SecurityUtils.validateTimestamp(formStartTime);
    if (!timeStatus.isValid) {
      setError(timeStatus.error || null);
      return false;
    }

    // validate input
    const inputStatus = SecurityUtils.validateInput(email, message);
    if (!inputStatus.isValid) {
      setError(inputStatus.error || null);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setStatus('sending');
      setError(null);

      // increment both rate limiters
      rateLimiter.increment();
      SecurityUtils.incrementSessionAttempts();

      // add timestamps
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const templateParams = {
        user_email: email,
        message: message,
        submission_time: new Date().toISOString(),
        form_load_time: new Date(formStartTime).toISOString(),
        'g-recaptcha-response': captchaToken
      };

      // format timestamps
      const formattedLoadTime = new Date(formStartTime).toLocaleString();
      const formattedSubmitTime = new Date().toLocaleString();

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_email: email,
          message: message,
          submission_time: formattedSubmitTime,
          form_load_time: formattedLoadTime,
          'g-recaptcha-response': captchaToken
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setStatus('success');
        setEmail('');
        setMessage('');
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="max-w-lg mx-auto p-6">
      {/* honeypot field - hidden */}
      <div className="opacity-0 position-absolute h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="user_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
          disabled={status === 'sending'}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
          disabled={status === 'sending'}
          required
        />
      </div>

      <div className="mb-4 flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={handleCaptchaChange}
          theme="dark"
        />
      </div>

      {error && (
        <div className="mb-4 text-red-600 dark:text-red-400 text-center">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending' || !captchaToken}
        className={`w-full py-2 rounded-lg transition-colors ${
          status === 'sending' || !captchaToken
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <p className="mt-4 text-green-600 dark:text-green-400 text-center">
          Message sent successfully!
        </p>
      )}
    </form>
  );
};