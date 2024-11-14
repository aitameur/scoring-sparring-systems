const API_BASE_URL = 'http://localhost/backend/api';

export const createTournament = async (tournamentData: any) => {
  const response = await fetch(`${API_BASE_URL}/tournaments.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tournamentData),
  });
  return response.json();
};

export const saveMatch = async (matchData: any) => {
  const response = await fetch(`${API_BASE_URL}/matches.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(matchData),
  });
  return response.json();
};

export const getTournaments = async () => {
  const response = await fetch(`${API_BASE_URL}/tournaments.php`);
  return response.json();
};

export const getMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches.php`);
  return response.json();
};