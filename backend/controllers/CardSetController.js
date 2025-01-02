class CardSetController {
  constructor(connection) {
    this.connection = connection;
  }

  async createCardSet(req, res) {
    const userId = req.params.id;
    const { title, description, visibility } = req.body;

    try {
      const [existingUser] = await this.connection
        .promise()
        .query("SELECT * FROM users WHERE id = ?", [userId]);

      if (existingUser.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }

      const query =
        "INSERT INTO card_sets (user_id, title, description, visibility) VALUES (?, ?, ?, ?)";
      const [results] = await this.connection
        .promise()
        .query(query, [userId, title, description, visibility]);

      res
        .status(201)
        .json({
          message: "CardSet created successfully.",
          setId: results.insertId,
        });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          message: "There was an error while creating the cardset.",
          error: err.message,
        });
    }
  }

  async updateCardSet(req, res) {
    const userId = req.params.id;
    const { title, description, visibility } = req.body;

    try {
      const [existingUser] = await this.connection
        .promise()
        .query("SELECT * FROM users WHERE id = ?", [userId]);

      if (existingUser.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }

      const query =
        "UPDATE card_sets SET title = ?, description = ?, visibility = ? WHERE id = ?";
      await this.connection
        .promise()
        .query(query, [title, description, visibility, userId]);

      res.status(200).json({ message: "Cardset updated successfully." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          message: "There was an error while updating the cardset.",
          error: err.message,
        });
    }
  }

  async deleteCardSet(req, res) {
    const { card_set_id } = req.params;

    try {
      const [existingCardSet] = await this.connection
        .promise()
        .query("SELECT * FROM card_sets WHERE id = ?", [card_set_id]);

      if (existingCardSet.length === 0) {
        return res.status(404).json({ message: "Card set not found." });
      }

      await this.connection
        .promise()
        .query("DELETE FROM cards WHERE card_set_id = ?", [card_set_id]);
      await this.connection
        .promise()
        .query("DELETE FROM card_sets WHERE id = ?", [card_set_id]);

      res.status(200).json({ message: "Card set deleted successfully." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          message: "There was an error while deleting the card set.",
          error: err.message,
        });
    }
  }

  async getCardSetById(req, res) {
    const { id } = req.params;

    try {
      console.log(id);
      const [existingCardSet] = await this.connection
        .promise()
        .query("SELECT * FROM card_sets WHERE id = ?", [id]);

      if (existingCardSet.length === 0) {
        return res.status(404).json({ message: "Card set not found." });
      }

      const [cardSet] = await this.connection
        .promise()
        .query("SELECT * FROM card_sets WHERE card_sets.id = ?", [id]);
      res.status(200).json({ cardset: cardSet[0] });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          message: "There was an error fetching the card set.",
          error: err.message,
        });
    }
  }

  async getAllCardSets(req, res) {
    const { limit = 10, offset = 0 } = req.query;

    try {
      const query = `
            SELECT 
                c.id, 
                c.title, 
                c.description, 
                c.visibility, 
                c.created_at,
                JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'name', t.name)) AS tags
            FROM card_sets c
            LEFT JOIN card_tags ct ON c.id = ct.set_id
            LEFT JOIN tags t ON ct.tag_id = t.id
            GROUP BY c.id
            LIMIT ? OFFSET ?;
        `;
      const [cardSets] = await this.connection
        .promise()
        .query(query, [parseInt(limit), parseInt(offset)]);

      res.status(200).json({
        cardSets,
        metadata: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          count: cardSets.length,
        },
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          message: "There was an error fetching the card sets.",
          error: err.message,
        });
    }
  }

  async getCardSetWithCardsById(req, res) {
    const { id } = req.params;

    try {
      const [existingCardSet] = await this.connection
        .promise()
        .query("SELECT * FROM card_sets WHERE id = ?", [id]);

      if (existingCardSet.length === 0) {
        return res.status(404).json({ message: "Card set not found." });
      }

      const query = `
      SELECT 
          card_sets.id, 
          card_sets.title, 
          card_sets.description, 
          card_sets.visibility, 
          card_sets.created_at, 
          cards.id AS card_id, 
          cards.question, 
          cards.answer
      FROM card_sets
      LEFT JOIN cards 
          ON card_sets.id = cards.card_set_id
      LEFT JOIN card_tags 
          ON card_sets.id = card_tags.set_id
      LEFT JOIN tags 
          ON card_tags.tag_id = tags.id
      WHERE card_sets.id = ?
  `;

      const [results] = await this.connection.promise().query(query, [id]);

      const cardSet = {
        card_set_id: results[0].id,
        title: results[0].title,
        description: results[0].description,
        visibility: results[0].visibility,
        created_at: results[0].created_at,
        cards: [],
      };

      results.forEach((result) => {
        if (result.card_id) {
          cardSet.cards.push({
            card_id: result.card_id,
            question: result.question,
            answer: result.answer,
          });
        }
      });

      res.status(200).json(cardSet);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          message: "There was an error fetching the card set.",
          error: err.message,
        });
    }
  }

  async addTagToCardSet(req, res) {
    const { card_set_id, tag_id } = req.body;

    try {
      console.log(card_set_id, tag_id);
      const [existingCardSet] = await this.connection
        .promise()
        .query("SELECT * FROM card_sets WHERE id = ?", [card_set_id]);

      if (existingCardSet.length === 0) {
        return res.status(404).json({ message: "Card set not found." });
      }

      const [existingTag] = await this.connection
        .promise()
        .query("SELECT * FROM tags WHERE id = ?", [tag_id]);

      if (existingTag.length === 0) {
        return res.status(404).json({ message: "Tag not found." });
      }

      const query = "INSERT INTO card_tags (set_id, tag_id) VALUES (?, ?)";
      await this.connection.promise().query(query, [card_set_id, tag_id]);

      res.status(201).json({ message: "Tag added to card set successfully." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          message: "There was an error adding the tag to the card set.",
          error: err.message,
        });
    }
  }

  async removeTagFromCardSet(req, res) {
    const { card_set_id, tag_id } = req.body;

    try {
      const [existingRelation] = await this.connection
        .promise()
        .query("SELECT * FROM card_tags WHERE set_id = ? AND tag_id = ?", [
          card_set_id,
          tag_id,
        ]);

      if (existingRelation.length === 0) {
        return res
          .status(404)
          .json({ message: "Tag not associated with the card set." });
      }

      const query = "DELETE FROM card_tags WHERE set_id = ? AND tag_id = ?";
      await this.connection.promise().query(query, [card_set_id, tag_id]);

      res
        .status(200)
        .json({ message: "Tag removed from card set successfully." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          message: "There was an error removing the tag from the card set.",
          error: err.message,
        });
    }
  }
}
export default CardSetController;