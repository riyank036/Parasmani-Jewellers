import { useEffect, useState } from 'react';

export interface DeviceCapabilities {
  isTouch: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  canPlayVideo: boolean;
  reducedMotion: boolean;
  connectionSlow: boolean;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>({
    isTouch: false,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    canPlayVideo: true,
    reducedMotion: false,
    connectionSlow: false,
  });

  useEffect(() => {
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const conn = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
    const connectionSlow = conn
      ? conn.saveData === true ||
        ['slow-2g', '2g', '3g'].includes(conn.effectiveType ?? '')
      : false;

    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const lowMem = typeof deviceMemory === 'number' && deviceMemory <= 2;

    const canPlayVideo = !connectionSlow && !lowMem;

    setCaps({
      isTouch,
      isMobile,
      isTablet,
      isDesktop,
      canPlayVideo,
      reducedMotion,
      connectionSlow,
    });
  }, []);

  return caps;
}
