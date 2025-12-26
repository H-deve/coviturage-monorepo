import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.inter.YlaGO',
  appName: 'covoiturage-front2',
  webDir: 'dist/covoiturage-front2/browser',
   // Update this to point to the correct directory

  server: {
    //  hostname: 'localhost',  // Only for dev (ng serve)
    androidScheme: 'https',  // Force HTTPS in Android
    // cleartext: false        // Disable HTTP (ngrok uses HTTPS)
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,  // Enable native HTTP plugin for better performance
    },
  }
};
export default config;
