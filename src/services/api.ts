const API_BASE_URL = 'http://localhost/backend/api';

export const createTournament = async (tournamentData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tournaments.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tournamentData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error creating tournament:', error);
    throw error;
  }
};

export const saveMatch = async (matchData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error saving match:', error);
    throw error;
  }
};

export const getTournaments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tournaments.php`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error getting tournaments:', error);
    throw error;
  }
};

export const getMatches = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches.php`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error getting matches:', error);
    throw error;
  }
};