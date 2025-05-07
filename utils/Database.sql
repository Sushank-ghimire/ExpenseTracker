CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  amount REAL NOT NULL,
  description TEXT,
  type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL
);

CREATE TABLE notifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  read INTEGER DEFAULT 0,
  date TEXT NOT NULL
);

-- Get Transaction
SELECT * FROM transactions ORDER BY date DESC LIMIT ?;

-- Add Transaction
INSERT INTO transactions (id, amount, description, type, category, date)
VALUES (?, ?, ?, ?, ?, ?);

-- Delete Transaction
DELETE FROM transactions WHERE id = ?;

-- Get Expense By Category
SELECT category AS id, category AS name, SUM(amount) AS amount, '#FF5733' AS color
FROM transactions
WHERE type = 'expense'
GROUP BY category;

--
