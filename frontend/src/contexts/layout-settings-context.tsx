"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useCallback,
} from "react";

type LayoutSettings = {
  rounded: boolean;
  setRounding: (value: boolean) => void;
  registerOverride: (initial: boolean) => string;
  unregisterOverride: (id: string) => void;
};

const LayoutSettingsContext = createContext<LayoutSettings | undefined>(
  undefined,
);

export const useLayoutSettings = () => {
  const ctx = useContext(LayoutSettingsContext);
  if (!ctx) throw new Error("useLayoutSettings must be inside Provider");
  return ctx;
};

export const LayoutSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [overrides, setOverrides] = useState<
    { id: string; rounded: boolean }[]
  >([]);

  const [baseRounded, setBaseRounded] = useState(false);

  const rounded =
    overrides.length > 0
      ? overrides[overrides.length - 1]!.rounded
      : baseRounded;

  const setRounding = useCallback(
    (value: boolean) => {
      if (overrides.length === 0) {
        setBaseRounded(value);
      } else {
        setOverrides((ov) => {
          const copy = [...ov];
          copy[copy.length - 1] = { ...copy[copy.length - 1], rounded: value };
          return copy;
        });
      }
    },
    [overrides.length],
  );

  const registerOverride = useCallback((initial: boolean) => {
    let id = `${Math.random()}`;

    if (crypto && crypto.randomUUID) {
      id = crypto.randomUUID();
    }

    setOverrides((ov) => [...ov, { id, rounded: initial }]);
    return id;
  }, []);

  const unregisterOverride = useCallback((id: string) => {
    setOverrides((ov) => ov.filter((o) => o.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      rounded,
      setRounding,
      registerOverride,
      unregisterOverride,
    }),
    [rounded, setRounding, registerOverride, unregisterOverride],
  );

  return (
    <LayoutSettingsContext.Provider value={value}>
      {children}
    </LayoutSettingsContext.Provider>
  );
};
