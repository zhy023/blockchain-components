import {
  buildConnectors,
  BuildConnectorsProps,
} from 'src/connectors/buildConnectors';
import {Chain, configureChains, createConfig} from 'wagmi';
import {mainnet} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';

type WagmiFixtureProps = Omit<BuildConnectorsProps, 'chains'> & {
  chains?: Chain[];
};

export const createWagmiFixture = ({
  appName,
  chains = [mainnet],
  customConnectors,
  excludedConnectors = ['coinbaseWallet'],
}: WagmiFixtureProps) => {
  const {publicClient, webSocketPublicClient} = configureChains(chains, [
    publicProvider(),
  ]);

  const {connectors, wagmiConnectors} = buildConnectors({
    appName,
    chains,
    customConnectors,
    excludedConnectors,
  });

  const client = createConfig({
    autoConnect: true,
    connectors: wagmiConnectors,
    publicClient,
    webSocketPublicClient,
  });

  return {chains, client, connectors};
};
