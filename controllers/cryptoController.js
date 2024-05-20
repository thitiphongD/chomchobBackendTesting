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
        const id = uuidv4();
        const { name, symbol, value } = req.body;
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

const calExchangeRates = async (amount, sender, receiver) => {
    try {
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
            console.log('senderToReceiverRate', senderToReceiverRate);
            const amountReceiverNeeded = amount * senderToReceiverRate;

            return amountReceiverNeeded;
        } else {
            throw new Error('Value not found for sender or receiver cryptocurrency.');
        }
    } catch (error) {
        throw new Error('Error fetching values from the database: ' + error.message);
    }
}

exports.calTransfer = async (req, res) => {
    try {
        const { amount, sender, receiver } = req.body;
        const amountReceiverNeeded = await calExchangeRates(amount, sender, receiver);
        res.json({ amountReceiverNeeded });

    } catch (error) {
        console.error('Error create Crypto:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

