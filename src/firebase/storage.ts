import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';
import { storage } from './config';

// Upload a file to Firebase Storage
export const uploadFile = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { success: true, downloadURL };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, error };
  }
};

// Delete a file from Firebase Storage
export const deleteFile = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error };
  }
};

// List all files in a directory
export const listFiles = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    const res = await listAll(storageRef);
    
    const fileURLs = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          url
        };
      })
    );
    
    return fileURLs;
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
};