const MESSAGE_COLUMNS = `
  id,
  session_id,
  sender_id,
  sender_name,
  original_text,
  translated_text,
  source_locale,
  target_locale,
  created_at
`;

export const CREATE_CHAT_MESSAGE_QUERY = `
  INSERT INTO messages (
    id,
    session_id,
    sender_id,
    sender_name,
    original_text,
    translated_text,
    source_locale,
    target_locale,
    created_at
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING ${MESSAGE_COLUMNS}
`;

export const FIND_CHAT_MESSAGES_BY_SESSION_ID_QUERY = `
  SELECT ${MESSAGE_COLUMNS}
  FROM messages
  WHERE session_id = $1
  ORDER BY created_at ASC
`;
