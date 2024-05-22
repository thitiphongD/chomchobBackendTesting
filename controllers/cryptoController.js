const { v4: uuidv4 } = require('uuid');
const Crypto = require('../models/Crypto');
const axios = require('axios');

exports.getAllCryptos = async (req, res) => {
    try {
        const cryptos = await Crypto.findAll();
        res.status(200).json({ data: cryptos });
    } catch (error) {
        console.error('Error get all Crypto', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createCrypto = async (req, res) => {
    try {
        const { name, symbol, value } = req.body;

        if (!name || !symbol || value === undefined) {
            return res.status(400).json({ error: 'name, symbol, and value are required' });
        }

        if (typeof value !== 'number' || value < 0) {
            return res.status(400).json({ error: 'value must be a non-negative number' });
        }
        const existingCrypto = await Crypto.findOne({ $or: [{ name }, { symbol }] });
        if (existingCrypto) {
            return res.status(400).json({ error: 'Crypto same name or symbol' });
        }
        const id = uuidv4();

        const newCrypto = await Crypto.create({
            id,
            name,
            symbol,
            value,
        });

        res.status(201).json({ data: newCrypto });
    } catch (error) {
        console.error('Error create Crypto:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.calTransfer = async (req, res) => {
    try {
        const { amount, sender, receiver } = req.body;

        const senderCrypto = await Crypto.findOne({
            where: { symbol: sender },
            attributes: ['value']
        });

        const receiverCrypto = await Crypto.findOne({
            where: { symbol: receiver },
            attributes: ['value']
        });

        if (senderCrypto && receiverCrypto) {
            const senderToReceiverRate = senderCrypto.value / receiverCrypto.value;
            const amountReceive = amount * senderToReceiverRate;
            return res.status(200).json({ amountReceive });
        }
    } catch (error) {
        console.error('Error create Crypto:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

