import { collection, getDocs, doc, getDoc, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

export const fetchAllProperties = async () => {
  try {
    const propertiesRef = collection(db, 'properties');
    const snapshot = await getDocs(propertiesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

export const fetchPropertyById = async (id) => {
  try {
    const propertyRef = doc(db, 'properties', id);
    const snapshot = await getDoc(propertyRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
};

export const fetchPropertiesByCity = async (city, limitCount = 10) => {
  try {
    const propertiesRef = collection(db, 'properties');
    const q = query(
      propertiesRef,
      where('city', '==', city),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching properties by city:', error);
    return [];
  }
};

export const searchProperties = async (filters) => {
  try {
    const propertiesRef = collection(db, 'properties');
    let q = query(propertiesRef);

    if (filters.location) {
      q = query(q, where('city', '==', filters.location));
    }
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      q = query(q, where('bhk', 'in', filters.propertyTypes.map(t => parseInt(t))));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error searching properties:', error);
    return [];
  }
};