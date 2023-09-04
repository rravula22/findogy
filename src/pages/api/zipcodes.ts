import csv from 'csv-parser';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const zipcodes = <any>[];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        fs.createReadStream('./public/zipcodes.csv')
        .pipe(csv())
        .on('data', (row) => {
            zipcodes.push({label: row.zip, value: row.zip});
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            res.status(200).json(zipcodes);
        })
        .on('error', (err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}