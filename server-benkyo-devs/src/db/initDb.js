require('dotenv').config();

const { getConnection } = require('./db');

async function main() {
    let connection;

    try {
        connection = await getConnection();

        console.log('Borrando base de datos');

        await connection.query('DROP DATABASE IF EXISTS benkyo')

        console.log('Creando base de datos...');

        await connection.query('CREATE DATABASE benkyo')

        console.log('Usando base de datos...');

        await connection.query('USE benkyo')

        console.log('Creando tabla USER');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS user (
                id int not null auto_increment primary key,
                name varchar(50) not null,
                username varchar(30) not null,
                description varchar (500),
                avatar varchar(255),
                email varchar(100) not null,
                password varchar(255) not null
            );
        `);

        console.log('Creando tabla LANGUAGE');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS language (
                id int not null auto_increment primary key,
                name varchar(50) NOT NULL
            );
        `);

        console.log('Creando tabla LEVEL');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS level (
                id int not null auto_increment primary key,
                name enum('easy', 'intermidate', 'advanced')
            );
        `);

        console.log('Creando tabla CARD');

        await connection.query(`        
            CREATE TABLE IF NOT EXISTS card (
                id int not null auto_increment primary key,
                id_language int not null,
                id_level int not null,
                question varchar(300) not null,
                answer varchar(300) not null,
                true_answer varchar(300) not null,
                false_answer varchar(300) not null,
                foreign key(id_language) references language(id),
                foreign key(id_level) references level(id)
            );
        `);

        console.log('Creando tabla DECK');

        await connection.query(`      
            CREATE TABLE IF NOT EXISTS deck (
                id int not null auto_increment primary key,
                name varchar(100)
            );
        `);

        console.log('Creando tabla USER_CARD');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS user_card (
                id int not null auto_increment primary key,
                id_user int not null,
                id_card int not null,
                is_correct boolean,
                is_favourite boolean,
                foreign key(id_user) references user(id),
                foreign key(id_card) references card(id)
            );
        `);

        console.log('Creando tabla USER_CARD_DECK');

        await connection.query(`  
            CREATE TABLE IF NOT EXISTS user_card_deck (
                id int not null auto_increment primary key,
                id_user int not null,
                id_card int not null,
                id_deck int not null,
                foreign key(id_user) references user(id),
                foreign key(id_card) references card(id),
                foreign key(id_deck) references deck(id)
            );        
        `); 

        console.log('Creando tabla USER_CARD_COUNTER');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS user_card_counter (
                id int not null auto_increment primary key,
                easy_counter int,
                intermidate_counter int,
                advanced_counter int,
                id_user int not null,
                id_card int not null,
                foreign key(id_user) references user(id),
                foreign key(id_card) references card(id)
            );
        `);

    } catch(error) {
        console.error(error);

    } finally {
        if(connection) connection.release();
        process.exit();
    }
}

main();