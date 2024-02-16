import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'hogi.bi.radio.app',
  appName: 'radio',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  }
};

export default config;
