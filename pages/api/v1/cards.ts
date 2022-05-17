import type {NextApiRequest, NextApiResponse} from 'next';

const cache = require('memory-cache');

type Data = {
	cards: any[]
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === 'GET') {
		const limit = req.query.limit ? parseInt(req.query.limit as string) : null
		const offset = req.query.offset ? parseInt(req.query.offset as string) : null
		let cards = cache.get('cards')
		if (!cards) {
			const cardsResponse = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
			const cardsJSON = await cardsResponse.json();
			cards = cardsJSON.data;
			// Refetch every 10 minutes
			cache.put('cards', cards, 1000 * 60 * 10);
		}

		if (limit) {
			if (offset) {
				cards = cards.slice(offset, offset + limit)
			} else {
				cards = cards.slice(0, limit)
			}
		} else if (offset) {
			cards = cards.slice(offset)
		}

		res.status(200).json({cards})
	} else {
		res.status(405).end('Method Not Allowed')
	}
}
