create database showtime;
create table showtime.movies(movie_id serial primary key, title varchar(255) not null, certificate varchar(20), duration int, rating decimal(3,1), description text, poster_url text, trailer_url text, is_active boolean default true, created_at timestamp default now(), updated_at timestamp default now());
create table showtime.movie_genres(genre_id serial primary key, movie_id int references showtime.movies(movie_id) on delete cascade, genre varchar(50) not null);
create table showtime.movie_languages(language_id serial primary key, movie_id int references showtime.movies(movie_id) on delete cascade, langauge varchar(50) not null);
create table showtime.movie_formats(format_id serial primary key, movie_id int references showtime.movies(movie_id) on delete cascade, format varchar(50) not null);
create table showtime.theatres(theatre_id serial primary key, name varchar(255) not null, city varchar(255) not null, address text, is_active boolean default true, created_at timestamp default now(), updated_at timestamp default now());
create table showtime.screens(screen_id serial primary key, theatre_id int references showtime.theatres(theatre_id) on delete cascade, screen_number varchar(50), total_seats int, is_active boolean default true, created_at timestamp default now(), updated_at timestamp default now());
create table showtime.seat_layout(seat_layout_id serial primary key, screen_id int references showtime.screens(screen_id) on delete cascade, seat_number varchar(20), seat_type varchar(50));
create table showtime.show_dates(show_date_id serial primary key, movie_id int references showtime.movies(movie_id) on delete cascade, show_date date not null);
CREATE TABLE showtime.shows (show_id SERIAL PRIMARY KEY, show_date_id INT REFERENCES showtime.show_dates(show_date_id) ON DELETE CASCADE, screen_id INT REFERENCES showtime.screens(screen_id), show_time TIME NOT NULL, format VARCHAR(50) NOT NULL, ticket_price DECIMAL(10,2) NOT NULL, is_active BOOLEAN DEFAULT TRUE);
CREATE TABLE showtime.show_seats (show_seat_id SERIAL PRIMARY KEY, show_id INT REFERENCES showtime.shows(show_id) ON DELETE CASCADE, seat_layout_id INT REFERENCES showtime.seat_layout(seat_layout_id), booked BOOLEAN DEFAULT FALSE);
CREATE TABLE showtime.cast (cast_id SERIAL PRIMARY KEY, movie_id INT REFERENCES showtime.movies(movie_id) ON DELETE CASCADE, name VARCHAR(255) NOT NULL, role VARCHAR(255) NOT NULL, image_url TEXT);
CREATE TABLE showtime.crew (crew_id SERIAL PRIMARY KEY, movie_id INT REFERENCES showtime.movies(movie_id) ON DELETE CASCADE, name VARCHAR(255) NOT NULL, role VARCHAR(255) NOT NULL, image_url TEXT);
CREATE TABLE showtime.reviews (review_id SERIAL PRIMARY KEY, movie_id INT REFERENCES showtime.movies(movie_id) ON DELETE CASCADE, user_name VARCHAR(255), comment TEXT, rating DECIMAL(3,1), timestamp TIMESTAMP DEFAULT NOW());
CREATE TABLE showtime.users (user_id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), phone VARCHAR(20), is_active BOOLEAN DEFAULT TRUE, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW());
CREATE TABLE showtime.bookings (booking_id SERIAL PRIMARY KEY, user_id INT REFERENCES showtime.users(user_id), show_id INT REFERENCES showtime.shows(show_id), booking_time TIMESTAMP DEFAULT NOW(), total_amount DECIMAL(10,2), status VARCHAR(20));
CREATE TABLE showtime.booked_seats (booking_seat_id SERIAL PRIMARY KEY, booking_id INT REFERENCES showtime.bookings(booking_id) ON DELETE CASCADE, seat_layout_id INT REFERENCES showtime.seat_layout(seat_layout_id));

-- Alter commands
alter table showtime.users add column role varchar(50) not null;
ALTER TABLE showtime.movies ADD COLUMN release_date TIMESTAMP NULL, ADD COLUMN genre VARCHAR(255) NULL, ADD COLUMN language VARCHAR(255) NULL, ADD COLUMN format VARCHAR(255) NULL;

-- Insertion commands
INSERT INTO showtime.movies (
    title, certificate, duration, rating, description,
    poster_url, trailer_url, release_date, genre, language,
    format, is_active, created_at, updated_at
) VALUES
      (
          'Inception', 'UA', 148, 8.8, 'A mind-bending thriller about dreams within dreams.',
          'https://example.com/poster/inception.jpg','https://youtube.com/inception-trailer',
          '2010-07-16 00:00:00', 'Sci-Fi', 'English', 'IMAX 2D', TRUE,
          NOW(), NOW()
      ),
      (
          'KGF Chapter 2', 'UA', 168, 8.5, 'A high-octane action drama following Rocky’s rise.',
          'https://example.com/poster/kgf2.jpg','https://youtube.com/kgf2-trailer',
          '2022-04-14 00:00:00', 'Action', 'Kannada', 'IMAX 2D', TRUE,
          NOW(), NOW()
      ),
      (
          'Titanic', 'U', 195, 7.9, 'A romantic tragedy set aboard the ill-fated Titanic.',
          'https://example.com/poster/titanic.jpg','https://youtube.com/titanic-trailer',
          '1997-12-19 00:00:00', 'Romantic', 'English', '2D', TRUE,
          NOW(), NOW()
      ),
      (
          '3 Idiots', 'U', 170, 8.4, 'A comedy-drama exploring friendship and education pressure.',
          'https://example.com/poster/3idiots.jpg','https://youtube.com/3idiots-trailer',
          '2009-12-25 00:00:00', 'Comedy', 'Hindi', '2D', TRUE,
          NOW(), NOW()
      ),
      (
          'Avengers: Endgame', 'UA', 181, 8.4, 'The epic finale of the Avengers saga.',
          'https://example.com/poster/endgame.jpg','https://youtube.com/endgame-trailer',
          '2019-04-26 00:00:00', 'Action', 'English', 'IMAX 3D', TRUE,
          NOW(), NOW()
      );




