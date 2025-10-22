import { useState, useEffect } from "react";
import { db } from "./Service/FirebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

export const useUsersStore = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  // Real-time listener for users
  useEffect(() => {
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const addNewUser = async (user) => {
    try {
      const newUser = {
        ...user,
        createdAt: new Date().toISOString(),
      };
      await addDoc(usersCollectionRef, newUser);
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const editUser = async (id, updatedUser) => {
    try {
      const userDoc = doc(db, "users", id);
      await updateDoc(userDoc, updatedUser);
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const deleteAllUsers = async () => {
    try {
      const snapshot = await usersCollectionRef.get();
      const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting all users: ", error);
    }
  };

  return { users, addNewUser, editUser, deleteUser, deleteAllUsers };
};
