import { create } from 'zustand';
import axios from 'axios';

const useInterviewStore = create((set) => ({
  interviewList: [],
  
  fetchInterviews: async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/interviews'); // API endpoint, backend'in URL'sine göre güncellendi
      set({ interviewList: response.data });
    } catch (error) {
      console.error('Failed to fetch interviews:', error);
    }
  },

  createInterview: async (interviewData) => {
    try {
      const response = await axios.post('http://localhost:5555/api/interviews', interviewData);
      set((state) => ({ interviewList: [...state.interviewList, response.data] }));
    } catch (error) {
      console.error('Failed to create interview:', error);
    }
  },

  deleteInterview: async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/interviews/${id}`);
      set((state) => ({
        interviewList: state.interviewList.filter((interview) => interview._id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete interview:', error);
    }
  },

  updateInterview: async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5555/api/interviews/${id}`, updatedData);
      set((state) => ({
        interviewList: state.interviewList.map((interview) =>
          interview._id === id ? response.data : interview
        ),
      }));
    } catch (error) {
      console.error('Failed to update interview:', error);
    }
  },
}));

export default useInterviewStore;
