import * as React from 'react'
import Head from 'next/head'
import {AppShell, Header} from "@mantine/core";
import Image from "next/image";

type Props = {
	children: React.ReactNode
	title?: string
}

const Layout: React.FunctionComponent<Props> = ({
													children,
													title = 'Yugioh Deals',
												}) => (
	<div>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8"/>
			<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
		</Head>
		<AppShell
			padding="md"
			header={<Header height={80} className={'flex items-center px-3'}>
				<Image src="/static/images/logo.png" height={70} width={70}/>
			</Header>
			}
			styles={(theme) => ({
				main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]},
			})}
		>
			<div className={'min-h-screen'}>
				{children}
			</div>
		</AppShell>
	</div>
)

export default Layout
