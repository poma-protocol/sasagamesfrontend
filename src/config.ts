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
const PROJECT_ID: string = import.meta.env.VITE_PROJECT_ID;
const environment: string = import.meta.env.VITE_ENVIRONMENT;
if (!PROJECT_ID) {
    throw new Error('VITE_PROJECT_ID is not defined in .env file');
}

let chains: _chains;
if (environment === "prod") {
    chains = [arbitrum];
} else {
    chains = [arbitrumSepolia];
}
console.log("Using chains: ", chains);
const config = getDefaultConfig({
    appName: 'ZendoCash',
    projectId: PROJECT_ID,
    chains: chains,
});
export {config, RainbowKitProvider}