// Import the 'firebase' instance from your configuration.
import { firebase } from '../config';

/**
 * Fetches user data from the Firestore database based on the currently authenticated user's email.
 * @returns {Array} An array of user data objects or an empty array if there's no user data.
 */
export const fetchUserData = async () => {
  try {
    // Get a reference to the Firestore database.
    const db = firebase.firestore();

    // Get the currently authenticated user.
    const user = firebase.auth().currentUser;

    if (user) {
      // Retrieve the user's email.
      const userEmail = user.email;

      // Get a reference to the 'users' collection.
      const usersCollection = db.collection('users');

      // Query the database to find the user data based on their email.
      const querySnapshot = await usersCollection.where("email", "==", userEmail).get();

      // Map the query results to an array of user data objects.
      const users = querySnapshot.docs.map((doc) => doc.data());
      return users;
    }

    // If there's no authenticated user, return an empty array.
    return [];
  } catch (error) {
    console.error("Error fetching user data:", error);
    // If an error occurs, return an empty array.
    return [];
  }
};

/**
 * Signs the user out of their Firebase authentication session.
 * @returns {boolean} 'true' if the sign-out is successful, 'false' if there's an error.
 */
export const signOut = async () => {
  try {
    // Use Firebase authentication to sign the user out.
    await firebase.auth().signOut();
    // Return 'true' to indicate a successful sign-out.
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    // If there's an error during sign-out, return 'false' to indicate failure.
    return false;
  }
};

/**
 * Function to sign in with email and password.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {string | null} - An error message or null if the login is successful.
 */
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return null; // Successful login, return null for no error
  } catch (error) {
    return error.message; // Return the error message
  }
};

/**
 * Function to update the user's credit and add scanned data to Firestore.
 * @param {number} intData - The integer data scanned from the QR code.
 * @param {object} navigation - Navigation object for redirecting to the dashboard.
 * @param {function} setUserData - Function to update the user data in the application state.
 */
export const updateCreditAndAddScannedData = async (intData, navigation, setUserData) => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  if (!user) {
    return; // No user authenticated, return early
  }

  const usersCollection = db.collection('users');
  const scannedDataCollection = db.collection('scannedData');

  try {
    // Get the user's current credit amount
    const userDoc = await usersCollection.doc(user.uid).get();
    const userData = userDoc.data();

    if (userData) {
      const currentCredit = userData.credit;
      const updatedCredit = currentCredit + intData;

      // Update the user's credit amount in Firestore
      await usersCollection.doc(user.uid).update({ credit: updatedCredit });

      // Add the scanned data to the "scannedData" collection
      await scannedDataCollection.add({
        value: intData,
        timestamp: new Date(),
      });
      // Fetch the updated user data and set it in the state
      const updatedUsers = await fetchUserData();
      setUserData(updatedUsers);

      // Redirect to the dashboard after a successful update
      navigation.navigate('Bottom Navigation');

      
    }
  } catch (error) {
    console.error("Error updating credit and adding document: ", error);
  }
};
