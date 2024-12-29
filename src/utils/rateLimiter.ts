interface RateLimitInfo {
    attempts: number;
    firstAttempt: number;
    lastAttempt: number;
  }
  
  export class ClientRateLimiter {
    private key: string;
    private maxAttempts: number;
    private timeWindow: number; // in milliseconds
  
    constructor(key: string, maxAttempts: number = 5, timeWindowMinutes: number = 15) {
      this.key = `rate-limit-${key}`;
      this.maxAttempts = maxAttempts;
      this.timeWindow = timeWindowMinutes * 60 * 1000;
    }
  
    private getLimitInfo(): RateLimitInfo {
      const info = localStorage.getItem(this.key);
      if (!info) {
        return {
          attempts: 0,
          firstAttempt: Date.now(),
          lastAttempt: Date.now()
        };
      }
      return JSON.parse(info);
    }
  
    private saveLimitInfo(info: RateLimitInfo): void {
      localStorage.setItem(this.key, JSON.stringify(info));
    }
  
    private cleanupOldAttempts(): void {
      const info = this.getLimitInfo();
      const now = Date.now();
  
      if (now - info.firstAttempt >= this.timeWindow) {
        // Reset if time window has passed
        this.saveLimitInfo({
          attempts: 0,
          firstAttempt: now,
          lastAttempt: now
        });
      }
    }
  
    public checkLimit(): { allowed: boolean; remainingAttempts: number; nextResetTime: number } {
      this.cleanupOldAttempts();
      const info = this.getLimitInfo();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const now = Date.now();
  
      if (info.attempts >= this.maxAttempts) {
        const resetTime = info.firstAttempt + this.timeWindow;
        return {
          allowed: false,
          remainingAttempts: 0,
          nextResetTime: resetTime
        };
      }
  
      return {
        allowed: true,
        remainingAttempts: this.maxAttempts - info.attempts,
        nextResetTime: info.firstAttempt + this.timeWindow
      };
    }
  
    public increment(): void {
      const info = this.getLimitInfo();
      this.saveLimitInfo({
        attempts: info.attempts + 1,
        firstAttempt: info.attempts === 0 ? Date.now() : info.firstAttempt,
        lastAttempt: Date.now()
      });
    }
  
    public getRemainingTime(): number {
      const info = this.getLimitInfo();
      return Math.max(0, (info.firstAttempt + this.timeWindow) - Date.now());
    }
  
    public reset(): void {
      localStorage.removeItem(this.key);
    }
  }