DROP TABLE IF EXISTS joined_sessions CASCADE;
CREATE TABLE joined_sessions(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    in_session boolean default true
);