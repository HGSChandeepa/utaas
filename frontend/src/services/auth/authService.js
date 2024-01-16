//registerUser function

export const registerUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const usersCollection = collection(firestore, "users");
    const docRef = await addDoc(usersCollection, userData);

    return { success: true, userId: user.uid, docId: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//loginUser function
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return { success: true, userId: user.uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//logoutUser function

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//Google Login
export const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    return { success: true, userId: user.uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//Facebook Login
export const facebookLogin = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    return { success: true, userId: user.uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//Github Login
export const githubLogin = async () => {
  try {
    const provider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    return { success: true, userId: user.uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//resetPassword function
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//forgotPassword function
export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//updateProfile function
export const updateProfile = async (userId, userData) => {
  try {
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, userData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
