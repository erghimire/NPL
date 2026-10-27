import { useState, useEffect, useCallback } from 'react';
import { notificationService, NotificationSettings } from '../services/notificationService';

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [settings, setSettings] = useState<NotificationSettings>(notificationService.getSettings());
  const [justNotified, setJustNotified] = useState<string | null>(null);

  useEffect(() => {
    setIsSupported(notificationService.isSupported());
    setPermission(notificationService.getPermission());
    setSettings(notificationService.getSettings());
  }, []);

  const requestPermission = useCallback(async () => {
    const res = await notificationService.requestPermission();
    setPermission(res);
    setSettings(notificationService.getSettings());
    return res;
  }, []);

  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    const updated = notificationService.saveSettings(newSettings);
    setSettings({ ...updated });
  }, []);

  const sendTestNotification = useCallback(async (type: 'wicket' | 'milestone' | 'general') => {
    if (permission !== 'granted') {
      const newPerm = await requestPermission();
      if (newPerm !== 'granted') return false;
    }

    if (type === 'wicket') {
      await notificationService.notifyWicket({
        bowler: 'Scott Kuggeleijn',
        batter: 'James Neesham',
        team: 'Janakpur Bolts',
        score: '174/5',
        over: '18.3',
        dismissal: 'c & b Scott Kuggeleijn'
      });
      setJustNotified('Sent Test Wicket Notification!');
    } else if (type === 'milestone') {
      await notificationService.notifyMilestone({
        batter: 'Aasif Sheikh',
        runs: 50,
        balls: 32,
        team: 'Janakpur Bolts',
        type: '50',
        fours: 5,
        sixes: 2
      });
      setJustNotified('Sent Test 50 Milestone Notification!');
    } else {
      await notificationService.show(
        '🔔 NPL Live Match Notifications Active',
        'You will receive instant background push notifications when wickets fall or players reach 50/100 runs!',
        'test-alert'
      );
      setJustNotified('Sent Test Notification!');
    }

    setTimeout(() => setJustNotified(null), 3500);
    return true;
  }, [permission, requestPermission]);

  return {
    isSupported,
    permission,
    settings,
    requestPermission,
    updateSettings,
    sendTestNotification,
    justNotified
  };
}
