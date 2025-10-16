// pages/_app.tsx

import type { AppProps } from "next/app";
import { StatsigProvider, useClientAsyncInit } from '@statsig/react-bindings';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';


export default function App({ Component, pageProps }: AppProps) {
  const { client } = useClientAsyncInit(
    "client-XhPsrKxYayKQiU801FzHk7Cp1tRpaBvyn3xKGKCVsnF",
    { userID: 'a-user' }, 
    { plugins: [ new StatsigAutoCapturePlugin(), new StatsigSessionReplayPlugin() ] },
  );

  return (
    <StatsigProvider client={client} loadingComponent={<div>Loading...</div>}>
      <div>Hello World</div>
    </StatsigProvider>
  );
}
