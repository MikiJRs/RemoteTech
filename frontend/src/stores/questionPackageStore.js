import { create } from 'zustand';
import axios from 'axios';

// Backend API URL'sini tanımla
const apiUrl = 'http://localhost:5555/api';

// Zustand Store'u oluştur
const useQuestionPackageStore = create((set) => ({
  questionPackages: [],

  // API'den veri çekme fonksiyonu
  fetchPackages: async () => {
    try {
      const response = await axios.get(`${apiUrl}/question-packages`);
      set({ questionPackages: response.data });
    } catch (error) {
      console.error('Veri çekilirken bir hata oluştu:', error);
    }
  },

  // Yeni bir paket ekleme
  addPackage: async (newPackage) => {
    try {
      const response = await axios.post(`${apiUrl}/question-package`, newPackage);
      set((state) => ({
        questionPackages: [...state.questionPackages, response.data],
      }));
    } catch (error) {
      console.error('Yeni paket eklenirken bir hata oluştu:', error);
    }
  },

  // Paketi güncelleme
  updatePackage: async (id, updatedPackage) => {
    try {
      const response = await axios.put(`${apiUrl}/question-package/${id}`, updatedPackage);
      set((state) => ({
        questionPackages: state.questionPackages.map((pkg) =>
          pkg._id === id ? response.data.updatedQuestionPackage : pkg
        ),
      }));
    } catch (error) {
      console.error('Paket güncellenirken bir hata oluştu:', error);
    }
  },

  // Paketi silme
  deletePackage: async (id) => {
    try {
      await axios.delete(`${apiUrl}/question-package/${id}`);
      set((state) => ({
        questionPackages: state.questionPackages.filter((pkg) => pkg._id !== id),
      }));
    } catch (error) {
      console.error('Paket silinirken bir hata oluştu:', error);
    }
  },
}));

export default useQuestionPackageStore;
