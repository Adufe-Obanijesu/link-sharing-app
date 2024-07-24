import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "./index";

const auth = getAuth();

const useAuth = () => {
  type signup = {
    email: string;
    password: string;
  };

  type response = {
    status: boolean;
    message: string;
  };

  const signup = async (data: signup): Promise<response> => {
    let response: response = {
      status: false,
      message: "",
    };

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      response = {
        status: true,
        message: "User signed up successfully",
      };
    } catch (err: any) {
      response = {
        status: false,
        message: err.code,
      };
    }

    return response;
  };

  type updateUser = {
    displayName?: string;
    photoURL?: string;
  };

  const updateUser = async (data: updateUser): Promise<response> => {
    let response: response = {
      status: false,
      message: "",
    };

    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, data);
        response = {
          status: true,
          message: "User profile updated successfully",
        };
      } catch (err: any) {
        response = {
          status: false,
          message: err.code,
        };
      }
    }

    return response;
  };

  const login = async (data: signup): Promise<response> => {
    let response: response = {
      status: false,
      message: "",
    };

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      response = {
        status: true,
        message: "User authenticated successfully",
      };
    } catch (err: any) {
      response = {
        status: false,
        message: err.code,
      };
    }

    return response;
  };

  const signout = async (): Promise<response> => {
    let response: response = {
      status: false,
      message: "",
    };

    try {
      await signOut(auth);
      response = {
        status: true,
        message: "User signed out",
      };
    } catch (err: any) {
      response = {
        status: false,
        message: err.code,
      };
    }

    return response;
  };

  return {
    signup,
    updateUser,
    login,
    signout,
  };
};

export { useAuth };
