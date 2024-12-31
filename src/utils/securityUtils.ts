interface ValidationResult {
    isValid: boolean;
    error?: string;
  }
  
  export class SecurityUtils {
    // Session-based rate limiter
    private static readonly SESSION_KEY = 'contact-form-session';
    private static readonly MAX_ATTEMPTS = 5;
    private static readonly TIME_WINDOW = 15 * 60 * 1000; // 15 minutes
  
    public static initializeSession(): void {
      if (!sessionStorage.getItem(this.SESSION_KEY)) {
        sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({
          attempts: 0,
          firstAttempt: Date.now(),
          lastAttempt: Date.now()
        }));
      }
    }
  
    public static checkSessionLimit(): ValidationResult {
      const session = JSON.parse(sessionStorage.getItem(this.SESSION_KEY) || '{}');
      const now = Date.now();
  
      // Reset if time window has passed
      if (now - session.firstAttempt >= this.TIME_WINDOW) {
        sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({
          attempts: 0,
          firstAttempt: now,
          lastAttempt: now
        }));
        return { isValid: true };
      }
  
      if (session.attempts >= this.MAX_ATTEMPTS) {
        const remainingTime = Math.ceil((session.firstAttempt + this.TIME_WINDOW - now) / 60000);
        return {
          isValid: false,
          error: `Session limit reached. Please try again in ${remainingTime} minutes.`
        };
      }
  
      return { isValid: true };
    }
  
    public static incrementSessionAttempts(): void {
      const session = JSON.parse(sessionStorage.getItem(this.SESSION_KEY) || '{}');
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({
        attempts: (session.attempts || 0) + 1,
        firstAttempt: session.firstAttempt || Date.now(),
        lastAttempt: Date.now()
      }));
    }
  
    // Timestamp validation
    public static validateTimestamp(startTime: number): ValidationResult {
      const submissionTime = Date.now();
      const timeDiff = submissionTime - startTime;
  
      // Reject if form is submitted too quickly (less than 3 seconds) - likely a bot
      if (timeDiff < 3000) {
        return {
          isValid: false,
          error: 'Form submitted too quickly. Please take your time.'
        };
      }
  
      // Reject if form submission is too old (more than 1 hour)
      if (timeDiff > 3600000) {
        return {
          isValid: false,
          error: 'Form session expired. Please refresh the page.'
        };
      }
  
      return { isValid: true };
    }
  
    // Additional input validation
    public static validateInput(email: string, message: string): ValidationResult {
      // Email validation
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(email)) {
        return {
          isValid: false,
          error: 'Please enter a valid email address.'
        };
      }
  
      // Message validation
      if (message.length < 10) {
        return {
          isValid: false,
          error: 'Message must be at least 10 characters long.'
        };
      }
  
      // Check for suspicious patterns
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /data:/i,
        /on\w+=/i,
        /\[\]=\{/
      ];
  
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(message) || pattern.test(email)) {
          return {
            isValid: false,
            error: 'Invalid input detected.'
          };
        }
      }
  
      return { isValid: true };
    }
  }