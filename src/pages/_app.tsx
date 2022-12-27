import type { AppProps } from "next/app";

import { trpc } from "@/client/trpc";

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default trpc.withTRPC(App);
