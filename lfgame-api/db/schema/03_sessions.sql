DROP TABLE IF EXISTS sessions CASCADE;
CREATE TABLE sessions(
    id SERIAL PRIMARY KEY NOT NULL,
    game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    play_level VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    population smallint DEFAULT 0,
    status boolean
);