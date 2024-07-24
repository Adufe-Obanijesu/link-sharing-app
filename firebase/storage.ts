import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "./index";

type upload = {
  name: string;
  file: any;
};

type response = {
  status: boolean;
  message: string;
};

type responseData = response & {
  url: null | string;
};

const useStorage = () => {
  const upload = async ({ name, file }: upload): Promise<responseData> => {
    let response: responseData = {
      status: false,
      message: "",
      url: null,
    };

    const storage = getStorage();

    const fileRef = ref(storage, name);

    try {
      await uploadBytes(fileRef, file);

      try {
        const url = await getDownloadURL(fileRef);
        response = {
          status: true,
          message: "File uploaded successfully",
          url,
        };
      } catch (err: any) {
        response = {
          status: false,
          message: err.code,
          url: null,
        };
      }
    } catch (err: any) {
      response = {
        status: false,
        message: err.code,
        url: null,
      };
    }

    return response;
  };

  const deleteFile = async (name: string): Promise<response> => {
    let response: response = {
      status: false,
      message: "",
    };

    const storage = getStorage();

    const fileRef = ref(storage, name);

    try {
      await deleteObject(fileRef);

      response = {
        status: true,
        message: "File deleted successfully",
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
    upload,
    deleteFile,
  };
};

export { useStorage };
