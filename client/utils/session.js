import axios from 'axios';

export async function fetchSessionStatus() {
    const server = process.env.NEXT_PUBLIC_SERVER_URL; // Ensure this is correctly defined
    try {
      const response = await fetch(`http://localhost:3000/user/profile`, {
        method: 'GET',
        credentials: 'include', // For passing along cookies if needed
      });
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching session status:', error);
      return false;
    }
  }
  
export const adminStatus = false