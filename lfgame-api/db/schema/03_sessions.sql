DROP TABLE IF EXISTS sessions CASCADE;
CREATE TABLE sessions(
    id SERIAL PRIMARY KEY NOT NULL,
    game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    population smallint DEFAULT 0,
    difficulty_level VARCHAR(255) NOT NULL,
    status boolean DEFAULT true
);