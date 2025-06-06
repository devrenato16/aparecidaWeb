import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  DocumentData 
} from 'firebase/firestore';
import { firestore } from './config';

export interface FormData extends DocumentData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  formType: 'batismo' | 'catecismo' | 'crismaJovem' | 'crismaAdulto';
  createdAt: Timestamp | Date;
  [key: string]: any;

  birthdate: string;
  birthplace: string;
  address: string;
  fatherName: string;
  motherName: string;
  community: string;
  schooling: string;
  groupParticipation: string;
  isBaptized: "sim" | "nao";
  firstEucharist: "sim" | "nao";
  specialNeeds: "sim" | "nao";
  maritalStatus: "casado" | "moraJunto" | "solteiro";
  availableTime: string;
  jesusAnswer: string;
  godfatherName: string;
  godmotherName: string;
  availableLocate: string;
  meetingDate: string;
  baptismDate: string;
  avaiableDay: string;
  therm: string;
  
}

// Add a new registration
export const addRegistration = async (data: Omit<FormData, 'id' | 'createdAt'>) => {
  try {
    const registrationsRef = collection(firestore, 'registrations');
    const docRef = await addDoc(registrationsRef, {
      ...data,
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding registration:', error);
    return { success: false, error };
  }
};

// Get all registrations
export const getRegistrations = async (formType?: string) => {
  try {
    const registrationsRef = collection(firestore, 'registrations');
    
    let q = query(registrationsRef, orderBy('createdAt', 'desc'));
    
    if (formType) {
      q = query(registrationsRef, 
        where('formType', '==', formType),
        orderBy('createdAt', 'desc')
      );
    }
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FormData[];
  } catch (error) {
    console.error('Error getting registrations:', error);
    return [];
  }
};

// Get a single registration by ID
export const getRegistration = async (id: string) => {
  try {
    const docRef = doc(firestore, 'registrations', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as FormData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting registration:', error);
    return null;
  }
};

// Update a registration
export const updateRegistration = async (id: string, data: Partial<FormData>) => {
  try {
    const docRef = doc(firestore, 'registrations', id);
    await updateDoc(docRef, data);
    return { success: true };
  } catch (error) {
    console.error('Error updating registration:', error);
    return { success: false, error };
  }
};

// Delete a registration
export const deleteRegistration = async (id: string) => {
  try {
    const docRef = doc(firestore, 'registrations', id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting registration:', error);
    return { success: false, error };
  }
};

// Site settings
export const getSiteSettings = async () => {
  try {
    const docRef = doc(firestore, 'settings', 'siteSettings');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting site settings:', error);
    return null;
  }
};

// ===================== DIZIMISTAS =====================

export interface Dizimista extends DocumentData {
  id: string;
  fullName: string;
  phone: string;
  birthdate: string;
  availableSex: string;
  availableState: string;
  address: string;
  community: string;
  createdAt: string;
}

// Adiciona um novo dizimista
export const addDizimista = async (data: Omit<Dizimista, 'id' | 'createdAt'>) => {
  try {
    const dizimistasRef = collection(firestore, 'dizimistas');
    const docRef = await addDoc(dizimistasRef, {
      ...data,
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Erro ao adicionar dizimista:', error);
    return { success: false, error };
  }
};

// Busca todos os dizimistas
export const getDizimistas = async () => {
  try {
    const dizimistasRef = collection(firestore, 'dizimistas');
    const q = query(dizimistasRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Dizimista[];
  } catch (error) {
    console.error('Erro ao buscar dizimistas:', error);
    return [];
  }
};

// Atualiza um dizimista
export const updateDizimista = async (id: string, data: Partial<Dizimista>) => {
  try {
    const docRef = doc(firestore, 'dizimistas', id);
    await updateDoc(docRef, data);
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar dizimista:', error);
    return { success: false, error };
  }
};

// Exclui um dizimista
export const deleteDizimista = async (id: string) => {
  try {
    const docRef = doc(firestore, 'dizimistas', id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir dizimista:', error);
    return { success: false, error };
  }
};
