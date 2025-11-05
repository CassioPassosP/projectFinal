import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Impede erro em ambientes sem window (SSR, build, etc.)
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    // Escuta mudanças na largura da tela
    mql.addEventListener("change", handleChange);

    // Define valor inicial
    setIsMobile(mql.matches);

    // Cleanup
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
