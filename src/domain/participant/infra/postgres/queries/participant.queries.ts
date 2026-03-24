const PARTICIPANT_COLUMNS = `
  id,
  session_id,
  name,
  speak_locale,
  listen_locale,
  speak_country,
  listen_country,
  is_online,
  is_muted,
  joined_at
`;

export const CREATE_PARTICIPANT_QUERY = `
  INSERT INTO participants (
    id,
    session_id,
    name,
    speak_locale,
    listen_locale,
    speak_country,
    listen_country,
    is_online,
    is_muted,
    joined_at
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING ${PARTICIPANT_COLUMNS}
`;

export const FIND_PARTICIPANTS_BY_SESSION_ID_QUERY = `
  SELECT ${PARTICIPANT_COLUMNS}
  FROM participants
  WHERE session_id = $1
  ORDER BY joined_at ASC
`;

export const FIND_PARTICIPANT_BY_ID_QUERY = `
  SELECT ${PARTICIPANT_COLUMNS}
  FROM participants
  WHERE id = $1
  LIMIT 1
`;
