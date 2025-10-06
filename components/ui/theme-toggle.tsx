'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-secondary/50 border-2 border-border">
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary border-2 border-border transition-all duration-200 hover:scale-105 active:scale-95"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-foreground transition-transform rotate-0 scale-100" />
      ) : (
        <Moon className="h-5 w-5 text-foreground transition-transform rotate-0 scale-100" />
      )}
    </button>
  );
}
