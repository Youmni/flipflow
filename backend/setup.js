import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Maak verbinding met de MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test verbinding
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Functie om tabellen aan te maken
const createTables = () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const cardSetsTable = `
    CREATE TABLE IF NOT EXISTS card_sets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      visibility ENUM('private', 'public') DEFAULT 'private',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  const cardsTable = `
    CREATE TABLE IF NOT EXISTS cards (
      id INT AUTO_INCREMENT PRIMARY KEY,
      card_set_id INT NOT NULL,
      question VARCHAR(255) NOT NULL,
      answer VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (card_set_id) REFERENCES card_sets(id) ON DELETE CASCADE
    );
  `;

  connection.query(usersTable, (err, result) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }
    console.log("Users table created or exists.");
  });

  connection.query(cardSetsTable, (err, result) => {
    if (err) {
      console.error("Error creating card_sets table:", err);
      return;
    }
    console.log("Card_sets table created or exists.");
  });

  connection.query(cardsTable, (err, result) => {
    if (err) {
      console.error("Error creating cards table:", err);
      return;
    }
    console.log("Cards table created or exists.");
  });
};

// Functie om dummydata toe te voegen
const insertDummyData = () => {
  // password = Ikbenyoumni
  const insertUser = `
    INSERT INTO users (first_name, last_name, username, email, password) 
    VALUES ('Youmni', 'Malha', 'youmni.malha@student.ehb.be', 'youmni.malha@student.ehb.be', '$2b$10$4NJAPV.GhCeXhufG0WUWXOl1ju5oz7cCrFYON/fFD9qoXqzbZNm6a');
  `;

  const insertCardSet = `
    INSERT INTO card_sets (user_id, title, description)
    VALUES
    (1, 'Spaans voor Beginners', 'Deze set helpt je de basis van de Spaanse taal te leren, inclusief veelgebruikte zinnen en woorden in het dagelijks leven.'),
    (1, 'Frans voor Beginners', 'Leer de basisprincipes van het Frans, inclusief begroetingen, vragen en antwoorden die je helpen in gesprekken.'),
    (1, 'Duits voor Beginners', 'Deze set bevat basiswoorden en zinnen die je helpen te communiceren in het Duits, van begroetingen tot dagelijkse uitdrukkingen.'),
    (1, 'Italiaans voor Beginners', 'Leer Italiaanse basiszinnen die handig zijn voor reisdoeleinden of dagelijks gebruik.'),
    (1, 'Nederlands voor Beginners', 'Deze set helpt je om de basis van de Nederlandse taal te leren, van begroetingen tot eenvoudige zinnen.'),
    (1, 'Japans voor Beginners', 'Deze cardset biedt een overzicht van eenvoudige Japanse zinnen en woorden om een gesprek te beginnen.'),
    (1, 'Russisch voor Beginners', 'Leer de basis van het Russisch, met nadruk op woorden die je helpen dagelijks te communiceren.'),
    (1, 'Portugees voor Beginners', 'Leer de basiszinnen van het Portugees, ideaal voor beginners die zich in het Portugees willen uitdrukken.'),
    (1, 'Arabisch voor Beginners', 'Ontdek de basis van de Arabische taal met veelgebruikte uitdrukkingen en vragen.'),
    (1, 'Chinees voor Beginners', 'Leer basale Chinese uitdrukkingen die je kunnen helpen communiceren in alledaagse situaties.');
    `;

  const insertCardsSpanish = `
  INSERT INTO cards (card_set_id, question, answer)
  VALUES
  (1, 'Hoe zeg je "Hallo" in het Spaans?', 'Hola'),
  (1, 'Hoe zeg je "Hoe gaat het?" in het Spaans?', '¿Cómo estás?'),
  (1, 'Wat betekent "Gracias" in het Nederlands?', 'Dank je wel'),
  (1, 'Hoe zeg je "Ik ben een student" in het Spaans?', 'Soy estudiante'),
  (1, 'Hoe zeg je "Ja" in het Spaans?', 'Sí'),
  (1, 'Wat is de Spaanse vertaling voor "waar is de wc?"', '¿Dónde está el baño?'),
  (1, 'Hoe zeg je "Ik hou van je" in het Spaans?', 'Te quiero'),
  (1, 'Wat betekent "Amigo" in het Nederlands?', 'Vriend'),
  (1, 'Hoe zeg je "Wat is je naam?" in het Spaans?', '¿Cuál es tu nombre?'),
  (1, 'Hoe zeg je "Tot ziens" in het Spaans?', 'Adiós');
  `;

  const insertCardsFrench = `
  INSERT INTO cards (card_set_id, question, answer)
  VALUES
  (2, 'Hoe zeg je "Goedemorgen" in het Frans?', 'Bonjour'),
  (2, 'Wat is de Franse vertaling voor "Bedankt"?', 'Merci'),
  (2, 'Hoe zeg je "Hoe heet jij?" in het Frans?', 'Comment tu t''appelles?'),
  (2, 'Wat betekent "Pardon" in het Nederlands?', 'Excuseer'),
  (2, 'Hoe zeg je "Ik begrijp het" in het Frans?', 'Je comprends'),
  (2, 'Hoe zeg je "Waar is de bibliotheek?" in het Frans?', 'Où est la bibliothèque?'),
  (2, 'Wat is de Franse vertaling voor "Ik ben verloren"', 'Je suis perdu'),
  (2, 'Hoe zeg je "Goed nacht" in het Frans?', 'Bonne nuit'),
  (2, 'Wat is "Vriend" in het Frans?', 'Ami'),
  (2, 'Hoe zeg je "Ik ben moe" in het Frans?', 'Je suis fatigué');
`;

const insertCardsGerman = `
  INSERT INTO cards (card_set_id, question, answer)
  VALUES
  (3, 'Hoe zeg je "Hallo" in het Duits?', 'Hallo'),
  (3, 'Wat is de vertaling van "Hoe gaat het?" in het Duits?', 'Wie geht''s?'),
  (3, 'Hoe zeg je "Dank je wel" in het Duits?', 'Danke'),
  (3, 'Wat betekent "Freund" in het Nederlands?', 'Vriend'),
  (3, 'Hoe zeg je "Waar is het station?" in het Duits?', 'Wo ist der Bahnhof?'),
  (3, 'Wat is de Duitse vertaling voor "Tot ziens"?', 'Auf Wiedersehen'),
  (3, 'Hoe zeg je "Ik heb dorst" in het Duits?', 'Ich habe Durst'),
  (3, 'Wat is de vertaling van "Wat is je naam?" in het Duits?', 'Wie heißt du?'),
  (3, 'Hoe zeg je "Ik hou van jou" in het Duits?', 'Ich liebe dich'),
  (3, 'Wat is de Duitse vertaling voor "Ik ben ziek"?', 'Ich bin krank');
`;

  const insertCardsItalian = `
  INSERT INTO cards (card_set_id, question, answer)
  VALUES
  (4, 'Hoe zeg je "Hallo" in het Italiaans?', 'Ciao'),
  (4, 'Wat is de Italiaanse vertaling voor "Dank je wel"?', 'Grazie'),
  (4, 'Hoe zeg je "Waar is de wc?" in het Italiaans?', 'Dove è il bagno?'),
  (4, 'Wat betekent "Amico" in het Nederlands?', 'Vriend'),
  (4, 'Hoe zeg je "Hoe gaat het?" in het Italiaans?', 'Come stai?'),
  (4, 'Wat is de Italiaanse vertaling voor "Ik hou van je"?', 'Ti amo'),
  (4, 'Hoe zeg je "Ik ben moe" in het Italiaans?', 'Sono stanco'),
  (4, 'Wat betekent "Scusi" in het Nederlands?', 'Excuseer'),
  (4, 'Hoe zeg je "Wat is je naam?" in het Italiaans?', 'Come ti chiami?'),
  (4, 'Hoe zeg je "Tot ziens" in het Italiaans?', 'Arrivederci');
  `;

  const insertCardsDutch = `
  INSERT INTO cards (card_set_id, question, answer)
  VALUES
  (5, 'Hoe zeg je "Hallo" in het Nederlands?', 'Hallo'),
  (5, 'Wat betekent "Dank je wel" in het Engels?', 'Thank you'),
  (5, 'Hoe zeg je "Hoe gaat het?" in het Nederlands?', 'Hoe gaat het?'),
  (5, 'Wat is de Nederlandse vertaling voor "I am tired"?', 'Ik ben moe'),
  (5, 'Hoe zeg je "Goedemorgen" in het Nederlands?', 'Goedemorgen'),
  (5, 'Wat betekent "Vriend" in het Engels?', 'Friend'),
  (5, 'Hoe zeg je "Waar is de wc?" in het Nederlands?', 'Waar is de wc?'),
  (5, 'Hoe zeg je "Ik hou van je" in het Nederlands?', 'Ik hou van jou'),
  (5, 'Wat is de Nederlandse vertaling voor "I am lost"?', 'Ik ben verloren'),
  (5, 'Hoe zeg je "Tot ziens" in het Nederlands?', 'Tot ziens');
  `;

  const insertCardsJapanese = `
  INSERT INTO cards (card_set_id, question, answer)
  VALUES
  (6, 'Hoe zeg je "Hallo" in het Japans?', 'こんにちは (Konnichiwa)'),
  (6, 'Wat is de Japanse vertaling voor "Bedankt"?', 'ありがとう (Arigatou)'),
  (6, 'Hoe zeg je "Hoe gaat het?" in het Japans?', 'お元気ですか? (Ogenki desu ka?)'),
  (6, 'Wat betekent "友達 (Tomodachi)" in het Nederlands?', 'Vriend'),
  (6, 'Hoe zeg je "Waar is de wc?" in het Japans?', 'トイレはどこですか? (Toire wa doko desu ka?)'),
  (6, 'Wat is de Japanse vertaling voor "Ik ben moe"?', '疲れました (Tsukaremashita)'),
  (6, 'Hoe zeg je "Ik hou van je" in het Japans?', '愛してる (Aishiteru)'),
  (6, 'Wat is de Japanse vertaling voor "Ik ben verloren"?', '迷子になりました (Maigo ni narimashita)'),
  (6, 'Hoe zeg je "Goedemorgen" in het Japans?', 'おはようございます (Ohayou gozaimasu)'),
  (6, 'Hoe zeg je "Tot ziens" in het Japans?', 'さようなら (Sayounara)');
  `;

  const insertCardsRussian = `
  INSERT INTO cards (card_set_id, question, answer)
  VALUES
  (7, 'Hoe zeg je "Hallo" in het Russisch?', 'Привет (Privet)'),
  (7, 'Wat is de Russische vertaling voor "Bedankt"?', 'Спасибо (Spasibo)'),
  (7, 'Hoe zeg je "Hoe gaat het?" in het Russisch?', 'Как дела? (Kak dela?)'),
  (7, 'Wat betekent "Друг (Drug)" in het Nederlands?', 'Vriend'),
  (7, 'Hoe zeg je "Waar is de wc?" in het Russisch?', 'Где туалет? (Gde toalet?)'),
  (7, 'Wat is de Russische vertaling voor "Ik ben moe"?', 'Я устал (Ya ustal)'),
  (7, 'Hoe zeg je "Ik hou van je" in het Russisch?', 'Я тебя люблю (Ya tebya lyublyu)'),
  (7, 'Wat betekent "Помощь (Pomoshch)" in het Nederlands?', 'Hulp'),
  (7, 'Hoe zeg je "Ik ben verloren" in het Russisch?', 'Я потерялся (Ya poteryalsya)'),
  (7, 'Hoe zeg je "Tot ziens" in het Russisch?', 'До свидания (Do svidaniya)');
  `;

  const insertCardsPortugees = `
  INSERT INTO cards (card_set_id, question, answer)
  VALUES
  (8, 'Hoe zeg je "Hallo" in het Portugees?', 'Olá'),
  (8, 'Wat is de Portugese vertaling voor "Bedankt"?', 'Obrigado'),
  (8, 'Hoe zeg je "Hoe gaat het?" in het Portugees?', 'Como vai?'),
  (8, 'Wat betekent "Amigo" in het Nederlands?', 'Vriend'),
  (8, 'Hoe zeg je "Waar is de wc?" in het Portugees?', 'Onde é o banheiro?'),
  (8, 'Wat is de Portugese vertaling voor "Ik hou van je"?', 'Eu te amo'),
  (8, 'Hoe zeg je "Ik ben moe" in het Portugees?', 'Estou cansado'),
  (8, 'Wat betekent "Desculpe" in het Nederlands?', 'Sorry'),
  (8, 'Hoe zeg je "Wat is je naam?" in het Portugees?', 'Qual é o seu nome?'),
  (8, 'Hoe zeg je "Tot ziens" in het Portugees?', 'Adeus');
  `;

  const insertCardsArabic = `
  INSERT INTO cards (card_set_id, question, answer)
  VALUES
  (9, 'Hoe zeg je "Hallo" in het Arabisch?', 'مرحباً (Marhaban)'),
  (9, 'Wat is de Arabische vertaling voor "Bedankt"?', 'شكراً (Shukran)'),
  (9, 'Hoe zeg je "Hoe gaat het?" in het Arabisch?', 'كيف حالك؟ (Kayfa halak?)'),
  (9, 'Wat betekent "صديق (Sadiq)" in het Nederlands?', 'Vriend'),
  (9, 'Hoe zeg je "Waar is de wc?" in het Arabisch?', 'أين الحمام؟ (Ayna al-hammam?)'),
  (9, 'Wat is de Arabische vertaling voor "Ik hou van je"?', 'أحبك (Uhibbuka)'),
  (9, 'Hoe zeg je "Ik ben moe" in het Arabisch?', 'أنا متعب (Ana mutaab)'),
  (9, 'Wat betekent "عفواً (Afwan)" in het Nederlands?', 'Excuseer'),
  (9, 'Hoe zeg je "Wat is je naam?" in het Arabisch?', 'ما اسمك؟ (Ma ismuka?)'),
  (9, 'Hoe zeg je "Tot ziens" in het Arabisch?', 'إلى اللقاء (Ila al-liqaa)');
  `;

  const insertCardsChinese = `
  INSERT INTO cards (card_set_id, question, answer)
  VALUES
  (10, 'Hoe zeg je "Hallo" in het Chinees?', '你好 (Nǐ hǎo)'),
  (10, 'Wat is de Chinese vertaling voor "Bedankt"?', '谢谢 (Xièxiè)'),
  (10, 'Hoe zeg je "Hoe gaat het?" in het Chinees?', '你好吗？ (Nǐ hǎo ma?)'),
  (10, 'Wat betekent "朋友 (Péngyǒu)" in het Nederlands?', 'Vriend'),
  (10, 'Hoe zeg je "Waar is de wc?" in het Chinees?', '厕所在哪里？(Cèsuǒ zài nǎlǐ?)'),
  (10, 'Wat is de Chinese vertaling voor "Ik hou van je"?', '我爱你 (Wǒ ài nǐ)'),
  (10, 'Hoe zeg je "Ik ben moe" in het Chinees?', '我累了 (Wǒ lèile)'),
  (10, 'Wat betekent "对不起 (Duìbuqǐ)" in het Nederlands?', 'Sorry'),
  (10, 'Hoe zeg je "Wat is je naam?" in het Chinees?', '你叫什么名字？(Nǐ jiào shénme míngzì?)'),
  (10, 'Hoe zeg je "Tot ziens" in het Chinees?', '再见 (Zàijiàn)');
  `;

  connection.query(insertUser, (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return;
    }
    console.log("User added.");
  });

  connection.query(insertCardSet, (err, result) => {
    if (err) {
      console.error("Error inserting card set:", err);
      return;
    }
    console.log("Card set added.");
  });

  connection.query(insertCardsSpanish, (err, result) => {
    if (err) {
      console.error("Error inserting cards:", err);
      return;
    }
    console.log("Cards for SPANISH added.");
  });

  connection.query(insertCardsFrench, (err, result) => {
    if (err) {
      console.error("Error inserting cards:", err);
      return;
    }
    console.log("Cards for FRENCH added.");
  });

  connection.query(insertCardsGerman, (err, result) => {
    if (err) {
      console.error("Error inserting cards:", err);
      return;
    }
    console.log("Cards for GERMAN added.");
  });

  connection.query(insertCardsItalian, (err, result) => {
    if (err) {
      console.error("Error inserting cards:", err);
      return;
    }
    console.log("Cards for ITALIAN added.");
  });

  connection.query(insertCardsDutch, (err, result) => {
    if (err) {
      console.error("Error inserting cards:", err);
      return;
    }
    console.log("Cards for DUTCH added.");
  });

  connection.query(insertCardsJapanese, (err, result) => {
    if (err) {
      console.error("Error inserting cards:", err);
      return;
    }
    console.log("Cards for JAPANESE added.");
  });

  connection.query(insertCardsRussian, (err, result) => {
    if (err) {
      console.error("Error inserting cards:", err);
      return;
    }
    console.log("Cards for RUSSIAN added.");
  });

  connection.query(insertCardsPortugees, (err, result) => {
    if (err) {
      console.error("Error inserting cards:", err);
      return;
    }
    console.log("Cards for PORTUGESE added.");
  });

  connection.query(insertCardsArabic, (err, result) => {
    if (err) {
      console.error("Error inserting cards:", err);
      return;
    }
    console.log("Cards for ARABIC added.");
  });

  connection.query(insertCardsChinese, (err, result) => {
    if (err) {
      console.error("Error inserting cards:", err);
      return;
    }
    console.log("Cards for CHINESE added.");
  });
};

const setupDatabase = () => {
  createTables();
  insertDummyData();
};

setupDatabase();

connection.end();
