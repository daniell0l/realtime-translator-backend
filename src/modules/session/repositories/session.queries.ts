const SESSION_COLUMNS = `
  id,
  code,
  mode,
  status,
  created_at
`;

export const CREATE_SESSION_QUERY = `
  INSERT INTO sessions (id, code, mode, status, created_at)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING ${SESSION_COLUMNS}
`;

export const FIND_SESSION_BY_CODE_QUERY = `
  SELECT ${SESSION_COLUMNS}
  FROM sessions
  WHERE code = $1
  LIMIT 1
`;

export const FIND_SESSION_BY_ID_QUERY = `
  SELECT ${SESSION_COLUMNS}
  FROM sessions
  WHERE id = $1
  LIMIT 1
`;

export const UPDATE_SESSION_QUERY = `
  UPDATE sessions
  SET code = $2,
      mode = $3,
      status = $4,
      created_at = $5
  WHERE id = $1
  RETURNING ${SESSION_COLUMNS}
`;

export const LIST_SESSIONS_QUERY = `
  SELECT ${SESSION_COLUMNS}
  FROM sessions
  ORDER BY created_at DESC
`;
