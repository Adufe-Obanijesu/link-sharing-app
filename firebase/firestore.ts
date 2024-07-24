import {
  collection,
  db,
  addDoc,
  onSnapshot,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  limit,
  orderBy,
} from "./index";
import { useEffect, useState } from "react";

// addDoc
type useAddDocType = {
  addDocument: ({ config, data }: addDocArgs) => Promise<response>;
};

type response = {
  status: boolean;
  message: string;
};

type responseData = response & {
  data: null | { [key: string]: any }[];
};

type addDocArgs = {
  config: {
    collectionName: string;
  };
  data: {
    [key: string]: any;
  };
};

const useAddDoc = (): useAddDocType => {
  const addDocument = async ({
    config,
    data,
  }: addDocArgs): Promise<response> => {
    let response: response = {
      status: false,
      message: "",
    };

    if (!config || !data) {
      return response;
    }

    const colRef = collection(db, config.collectionName);

    try {
      await addDoc(colRef, data);

      response = {
        status: true,
        message: "Document added successfully",
      };
    } catch (err: any) {
      response = {
        status: false,
        message: err.code,
      };
    }

    return response;
  };

  return { addDocument };
};

// getDocs
type arrType = any;

type getAllDocs = {
  config: {
    collectionName: string;
  };
};

type getAllDocsRealTime = getAllDocs & {
  setData: (arg: arrType) => void;
  setLoading: (arg: boolean) => void;
};

type getQueriedDocs = {
  config: {
    collectionName: string;
    where?: {
      fieldPath: string;
      opStr: any;
      value: string;
    }[];
  };
};

type getQueriedDocsRealTime = {
  config: {
    collectionName: string;
    where?: {
      fieldPath: string;
      opStr: any;
      value: string;
    }[];
    limit?: number;
    order?: {
      fieldPath: string;
      type: any;
    };
  };
};

const useFetch = () => {
  const getAllDocsRealTime = (collectionName: string) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const colRef = collection(db, collectionName);

      const unsubscribe = onSnapshot(colRef, (snapshot: any) => {
        const arr = snapshot.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(arr);
        setLoading(false);
      });

      return () => unsubscribe(); // Clean up the listener on unmount
    }, [collectionName]);

    return { data, loading };
  };

  const getAllDocs = async ({ config }: getAllDocs): Promise<responseData> => {
    console.log(config);
    const colRef = collection(db, config.collectionName);

    let response: responseData = {
      status: false,
      message: "",
      data: null,
    };
    try {
      const snapshot = await getDocs(colRef);

      let arr: arrType = [];
      snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });

      response = {
        status: true,
        message: "Documents retrieved successfully",
        data: arr,
      };
    } catch (err: any) {
      response = {
        status: false,
        message: err.code,
        data: null,
      };
    }

    return response;
  };

  const getQueriedDocsRealTime = ({ config }: getQueriedDocsRealTime) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const whereQueries = !config.where
        ? []
        : config.where.map((query) =>
            where(query.fieldPath, query.opStr, query.value)
          );

      const limitQuery = !config.limit ? [] : [limit(config.limit)];
      const orderQuery = !config.order
        ? []
        : [orderBy(config.order.fieldPath, config.order.type)];

      const colRef = collection(db, config.collectionName);
      const q = query(colRef, ...whereQueries, ...limitQuery, ...orderQuery);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const arr: any = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(arr);
        setLoading(false);
      });

      return () => unsubscribe(); // Clean up the listener on unmount
    }, [config.collectionName]);

    return { data, loading };
  };

  const getQueriedDocs = async ({
    config,
  }: getQueriedDocs): Promise<responseData> => {
    const whereQueries = !config.where
      ? []
      : config.where.map((query) =>
          where(query.fieldPath, query.opStr, query.value)
        );

    const colRef = collection(db, config.collectionName);
    const q = query(colRef, ...whereQueries);

    let response: responseData = {
      status: false,
      message: "",
      data: null,
    };
    try {
      const snapshot = await getDocs(q);

      let arr: arrType = [];
      snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });

      response = {
        status: true,
        message: "Documents retrieved successfully",
        data: arr,
      };
    } catch (err: any) {
      response = {
        status: false,
        message: err.code,
        data: null,
      };
    }

    return response;
  };

  return {
    getAllDocsRealTime,
    getAllDocs,
    getQueriedDocsRealTime,
    getQueriedDocs,
  };
};

type deleteDocument = {
  fieldPath: string;
  id: string;
};

type deleteResponse = {
  status: boolean;
  message: string;
};

const useDeleteDoc = () => {
  const deleteDocument = async (
    config: deleteDocument
  ): Promise<deleteResponse> => {
    let response = {
      status: false,
      message: "",
    };

    try {
      const docRef = doc(db, config.fieldPath, config.id);
      await deleteDoc(docRef);

      response = {
        status: true,
        message: "Delete successful",
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
    deleteDocument,
  };
};

type updateDocument = {
  fieldPath: string;
  id: string;
  data: {
    [key: string]: any;
  };
};

const useUpdateDoc = () => {
  const updateDocument = async (config: updateDocument): Promise<response> => {
    let response: response = {
      status: false,
      message: "",
    };
    const docRef = doc(db, config.fieldPath, config.id);

    try {
      await updateDoc(docRef, config.data);

      response = {
        status: true,
        message: "Update successful",
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
    updateDocument,
  };
};

export { useAddDoc, useFetch, useDeleteDoc, useUpdateDoc };
