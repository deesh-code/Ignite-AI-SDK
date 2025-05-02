import './globals.css';

export const metadata = {
  title: 'Chat OpenAI Example - @actionpackd/ai-sdk',
  description: 'A streaming chat example using @actionpackd/ai-sdk with OpenAI',
};

import { ReactNode } from 'react';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
