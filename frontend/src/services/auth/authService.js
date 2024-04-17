export const getUserData = async (uid) => {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
