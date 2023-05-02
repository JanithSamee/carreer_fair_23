import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { formatError } from "../helpers/formatter";

const storage = getStorage();

const handleFileUpload = async (file, folder, fileName) => {
    try {
        const storageRef = ref(storage, folder + fileName || file.name);
        const fileRef = await uploadBytes(storageRef, file);
        const a = fileRef.metadata.ref;
        const url = await getDownloadURL(storageRef);
        return { error: false, data: url };
    } catch (error) {
        throw formatError(error);
    }
};

export { handleFileUpload };
