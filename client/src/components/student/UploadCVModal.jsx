import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    FormControl,
    FormLabel,
    useDisclosure,
} from "@chakra-ui/react";
import useAuth from "../../utils/providers/AuthProvider";
import { handleFileUpload } from "../../utils/firebase/firebaseUtils";
import { updateStudentCV } from "../../utils/api/student.api";
import { Link } from "react-router-dom";

const UploadCVModal = ({ cvUrl, userData, setUserData }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { user } = useAuth();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCvUpload = async () => {
        setLoading(true);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                //setImageUrl(reader.result);
                const res = await handleFileUpload(
                    file,
                    "student/cv/",
                    user.uid
                );
                if (res.error) {
                    //TODO: add toast
                    setLoading(false);
                } else {
                    const __res = await updateStudentCV(res.data);
                    if (__res.error) {
                        //TODO: add toast
                        setLoading(false);
                    }
                    console.log("done");
                    setUserData({ ...userData, cvURL: res.data });
                    onClose();
                }
                setLoading(false);
            };
            reader.readAsDataURL(file);
        } else {
            //TODO:add toast
            setLoading(false);
        }
    };

    return (
        <>
            <Button colorScheme="yellow" mt={4} onClick={onOpen} w={"100%"}>
                Upload CV/Resume
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload your CV/Resume</ModalHeader>
                    <ModalBody>
                        {cvUrl && (
                            <Button m={"4"} ml={0} as={Link} to={cvUrl}>
                                Download My CV/Resume
                            </Button>
                        )}
                        <FormControl>
                            <FormLabel>Choose a PDF file to upload</FormLabel>
                            <Input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            isLoading={loading}
                            colorScheme="blue"
                            ml={3}
                            onClick={() => handleCvUpload()}
                        >
                            Upload
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UploadCVModal;
