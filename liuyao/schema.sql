CREATE TABLE IF NOT EXISTS readings (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    gua_name      TEXT    NOT NULL,
    bian_gua_name TEXT,
    yao_types     TEXT,
    year_gz       TEXT,
    month_gz      TEXT,
    day_gz        TEXT,
    hour_gz       TEXT,
    lang          TEXT    DEFAULT 'zh',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_readings_created ON readings(created_at DESC);
