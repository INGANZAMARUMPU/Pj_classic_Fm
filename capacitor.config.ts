import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'hogi.bi.radio.app',
  appName: 'pj_classic_fm',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  }
};

export default config;
