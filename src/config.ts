import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import {
    arbitrum,
    arbitrumSepolia
} from 'wagmi/chains';
import { _chains } from 'node_modules/@rainbow-me/rainbowkit/dist/config/getDefaultConfig';
const PROJECT_ID: string = import.meta.env.VITE_PROJECT_ID || 'your_project_id';
const environment: string = import.meta.env.VITE_ENVIRONMENT || 'staging';

// API Configuration
export const API_CONFIG = {
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'https://staging.arbitrum.pomaprotocol.com/api',
    ACTIVITY_IMAGE_URL: import.meta.env.VITE_ACTIVITY_IMAGE_URL || 'https://staging.arbitrum.pomaprotocol.com/',
    ENVIRONMENT: environment,
    PROJECT_ID: PROJECT_ID,
};

let chains: _chains;
if (environment === "prod") {
    chains = [arbitrum];
} else {
    chains = [arbitrumSepolia];
}
const config = getDefaultConfig({
    appName: 'SasaGames',
    projectId: PROJECT_ID,
    chains: chains,
});
export {config, RainbowKitProvider}