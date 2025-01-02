class TagController{

    constructor(connection){
        this.connection = connection;
    }

    async createTag(req, res){
        const { name: tagName } = req.body;
        try{
            const query = 'INSERT INTO tags (name) VALUES (?)';
            const [results] = await this.connection.promise().query(query, [tagName]);

            res.status(201).json({ message: 'Tag created successfully.', tagId: results.insertId });
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'There was an error while creating the tag.', error: err.message });
        }
    };

    async deleteTag (req, res){
        try {
            const { id } = req.params;

            const [existingTag] = await this.connection.promise().query('SELECT * FROM tags WHERE id = ?', [id]);

            if (existingTag.length === 0) {
                return res.status(404).json({ message: 'Tag not found.' });
            }
            await connection.promise().query('DELETE FROM tags WHERE id = ?', [id]);

            res.status(200).json({ message: 'Tag deleted successfully.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was an error while deleting the tag.', error: err.message });
        }
    };

    async getAllTags (req, res){
        try{
            const [cardSet] = await this.connection.promise().query('SELECT * FROM tags');
            res.status(200).json(cardSet);
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'There was an error while fetching the tags.', error: err.message });
        }
    };

    async getTagsById (req, res){
        try{
            const { id } = req.params;

            const [cardSet] = await this.connection.promise().query('SELECT * FROM tags WHERE id = ?', [id]);
            res.status(200).json(cardSet);
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'There was an error while fetching the tag.', error: err.message });
        }
    };

    async getTagsByNameContaining(req, res){
        try{
            const { name } = req.body;

            const [cardSet] = await this.connection.promise().query('SELECT * FROM tags WHERE name LIKE ?', [`%${name}%`]);
            res.status(200).json(cardSet);
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'There was an error while fetching the tag.', error: err.message });
        }
    };
};
export default TagController;