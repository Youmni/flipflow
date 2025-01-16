class CardController{
    constructor(connection) {
        this.connection = connection;
    }

    async createCard (req, res) {
        const { id } = req.params;
        const { question, answer } = req.body;

        try {
            const [existingCardSet] = await this.connection.promise().query('SELECT * FROM card_sets WHERE id = ?', [id]);

            if (existingCardSet.length === 0) {
                return res.status(404).json({ message: 'Card set not found.' });
            }

            const query = 'INSERT INTO cards (card_set_id, question, answer) VALUES (?, ?, ?)';
            const [results] = await this.connection.promise().query(query, [id, question, answer]);

            res.status(201).json({ message: 'Card created successfully.', cardId: results.insertId, card: {question: question, answer: answer} });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was an error while creating the card.', error: err.message });
        }
    };

    async updateCard (req, res) {
        const { set_id, id } = req.params;
        const { question, answer } = req.body;

        try {
            const [existingCardSet] = await this.connection.promise().query('SELECT * FROM card_sets WHERE id = ?', [set_id]);

            if (existingCardSet.length === 0) {
                return res.status(404).json({ message: 'Card set not found.' });
            }

            const [existingCard] = await this.connection.promise().query('SELECT * FROM cards WHERE card_set_id = ? AND id = ?', [set_id, id]);

            if (existingCard.length === 0) {
                return res.status(404).json({ message: 'Card not found in this card set.' });
            }

            const query = 'UPDATE cards SET question = ?, answer = ? WHERE card_set_id = ? AND id = ?';
            await this.connection.promise().query(query, [question, answer, set_id, id]);

            res.status(200).json({ message: 'Card updated successfully.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was an error while updating the card.', error: err.message });
        }
    };

    async deleteCard (req, res) {
        const { set_id, id } = req.params;
        console.log("hier")
        try {
            const [existingCardSet] = await this.connection.promise().query('SELECT * FROM card_sets WHERE id = ?', [set_id]);

            if (existingCardSet.length === 0) {
                return res.status(404).json({ message: 'Card set not found.' });
            }

            const [existingCard] = await this.connection.promise().query('SELECT * FROM cards WHERE card_set_id = ? AND id = ?', [set_id, id]);

            if (existingCard.length === 0) {
                return res.status(404).json({ message: 'Card not found in this card set.' });
            }

            await this.connection.promise().query('DELETE FROM cards WHERE card_set_id = ? AND id = ?', [set_id, id]);

            res.status(200).json({ message: 'Card deleted successfully.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was an error while deleting the card.', error: err.message });
        }
    };

    async getCardById (req, res) {
        const { set_id, id } = req.params;

        try {
            const [existingCardSet] = await this.connection.promise().query('SELECT * FROM card_sets WHERE id = ?', [set_id]);

            if (existingCardSet.length === 0) {
                return res.status(404).json({ message: 'Card set not found.' });
            }

            const [card] = await this.connection.promise().query('SELECT * FROM cards WHERE card_set_id = ? AND id = ?', [set_id, id]);

            if (card.length === 0) {
                return res.status(404).json({ message: 'Card not found in this card set.' });
            }

            res.status(200).json(card[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was an error fetching the card.', error: err.message });
        }
    };

    async getAllCards (req, res) {

        try {

            const [cards] = await this.connection.promise().query('SELECT * FROM cards');

            res.status(200).json(cards);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was an error fetching the cards.', error: err.message });
        }
    };
}
export default CardController;