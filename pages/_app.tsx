import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "../components/Layout";

function App({Component, pageProps}: AppProps) {
	// Check if the page has a custom layout.
	if (Component.hasOwnProperty('getLayout')) {
		const getLayout = (Component as any).getLayout;
		return getLayout(<Component {...pageProps} />);
	} else {
		return (
			<Layout>
				<Component {...pageProps} />
			</Layout>
		)
	}
}

export default App
