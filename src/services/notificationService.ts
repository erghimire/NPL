import { cricketSound } from '../utils/audio';

export interface NotificationSettings {
  enabled: boolean;
  notifyWickets: boolean;
  notifyMilestones: boolean; // 50s and 100s
  soundVibration: boolean;
}

const STORAGE_KEY = 'npl_notification_settings_v1';

class NotificationService {
  private settings: NotificationSettings = {
    enabled: true,
    notifyWickets: true,
    notifyMilestones: true,
    soundVibration: true,
  };

  constructor() {
    this.loadSettings();
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  public getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }

  public loadSettings(): NotificationSettings {
    if (typeof window === 'undefined') return this.settings;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.settings = { ...this.settings, ...JSON.parse(stored) };
      }
    } catch {
      // Ignore
    }
    return this.settings;
  }

  public saveSettings(newSettings: Partial<NotificationSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
      } catch {
        // Ignore
      }
    }
    return this.settings;
  }

  public getSettings(): NotificationSettings {
    return { ...this.settings };
  }

  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) return 'denied';
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.saveSettings({ enabled: true });
      }
      return permission;
    } catch {
      return 'denied';
    }
  }

  public async show(title: string, body: string, tag: string = 'npl-alert', extraData: Record<string, unknown> = {}) {
    if (!this.isSupported() || this.getPermission() !== 'granted' || !this.settings.enabled) {
      return false;
    }

    if (this.settings.soundVibration) {
      // Vibrate mobile device if supported
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }

    const options: NotificationOptions & { renotify?: boolean; vibrate?: number[] } = {
      body,
      icon: '/pwa-192x192.png',
      badge: '/favicon.ico',
      tag,
      renotify: true,
      data: {
        url: '/',
        timestamp: Date.now(),
        ...extraData
      }
    };

    // Prefer service worker showNotification for persistent background notification
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (registration && 'showNotification' in registration) {
          await registration.showNotification(title, options);
          return true;
        }
      } catch {
        // Service worker fallback
      }
    }

    // Fallback to standard window Notification
    try {
      new Notification(title, options);
      return true;
    } catch {
      return false;
    }
  }

  public async notifyWicket(data: {
    bowler: string;
    batter: string;
    team: string;
    score: string;
    over: string;
    dismissal?: string;
  }) {
    if (!this.settings.notifyWickets) return;

    const title = `💥 WICKET FALL! [NPL Live]`;
    const body = `${data.bowler} strikes! ${data.batter} is OUT (${data.dismissal || 'dismissed'}). ${data.team}: ${data.score} (${data.over} ov).`;
    
    if (this.settings.soundVibration) {
      cricketSound.playWicket();
    }

    await this.show(title, body, `wicket-${Date.now()}`, { type: 'wicket', ...data });
  }

  public async notifyMilestone(data: {
    batter: string;
    runs: number;
    balls: number;
    team: string;
    type: '50' | '100';
    fours: number;
    sixes: number;
  }) {
    if (!this.settings.notifyMilestones) return;

    const isHundred = data.type === '100';
    const title = isHundred
      ? `🌟 CENTURY! 100 RUNS FOR ${data.batter.toUpperCase()}! 🏏`
      : `🔥 50 REACHED! FIFTY FOR ${data.batter.toUpperCase()}! 👏`;

    const body = `${data.batter} reaches a magnificent ${data.type}! ${data.runs} runs off ${data.balls} balls (${data.fours}x4, ${data.sixes}x6) for ${data.team}.`;

    if (this.settings.soundVibration) {
      cricketSound.playBoundary();
    }

    await this.show(title, body, `milestone-${data.batter}-${data.type}`, { milestoneCategory: 'player-milestone', ...data });
  }
}

export const notificationService = new NotificationService();
