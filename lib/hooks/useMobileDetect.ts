// Taken from here, the library didn't have types :( https://github.com/haldarmahesh/use-mobile-detect-hook

type Detector = () => boolean;

type MobileDetectHook = {
  isAndroid: Detector;
  isDesktop: Detector;
  isIos: Detector;
  isMobile: Detector;
  isSSR: Detector;
};

function getMobileDetect(userAgent: string): MobileDetectHook {
  const isAndroid = (): boolean => Boolean(userAgent.match(/Android/i));
  const isIos = (): boolean => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = (): boolean => Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = (): boolean => Boolean(userAgent.match(/IEMobile/i));
  const isSSR = (): boolean => Boolean(userAgent.match(/SSR/i));

  const isMobile = (): boolean =>
    Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  const isDesktop = (): boolean => Boolean(!isMobile() && !isSSR());

  return {
    isAndroid,
    isDesktop,
    isIos,
    isMobile,
    isSSR,
  };
}

export default function useMobileDetect(): MobileDetectHook {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
  return getMobileDetect(userAgent);
}
