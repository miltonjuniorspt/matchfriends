"use server";

import { db } from '@/lib/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'Active' | 'Banned';
  plan: 'Lover' | 'Boyfriend' | 'Free';
}

export async function getUsers(): Promise<User[]> {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      console.warn("As variáveis de ambiente do Firebase não estão configuradas. Retornando lista de usuários vazia.");
      return [];
    }
    const usersCollection = collection(db, 'users');
    const userSnapshot = await getDocs(usersCollection);
    const usersList = userSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || 'N/A',
        email: data.email || 'N/A',
        avatar: data.avatar || 'https://placehold.co/100x100',
        status: data.status || 'Active',
        plan: data.plan || 'Free',
      } as User;
    });
    return usersList;
  } catch (error) {
    console.error("Erro ao buscar usuários do Firestore:", error);
    return [];
  }
}
