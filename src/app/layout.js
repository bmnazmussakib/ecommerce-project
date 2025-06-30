// src/app/layout.js
// 'use client';

import './globals.css';
// import { Provider } from 'react-redux';
// import { store } from '@/redux/store';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import ReduxProvider from '@/redux/ReduxProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body >
        <ReduxProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
