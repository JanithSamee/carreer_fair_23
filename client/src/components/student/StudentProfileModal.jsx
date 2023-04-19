import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Center,
    Avatar,
    AvatarBadge,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import {
    updateStudent,
    updateStudentProfilePicture,
} from "../../utils/api/student.api";
import { handleFileUpload } from "../../utils/firebase/firebaseUtils";
import useAuth from "../../utils/providers/AuthProvider";

export default function StudentProfileModal({ isOpen, onClose, studentData }) {
    const { user, setuser } = useAuth();
    const [loading, setloading] = useState(false);
    const [imageLoading, setimageLoading] = useState(false);
    const [formInput, setFormInput] = useState({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        setFormInput((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (event) => {
        setloading(true);
        event.preventDefault();
        const _res = await updateStudent(formInput);
        console.log(_res);
        //TODO:add Toast
        setloading(false);
    };
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (studentData && studentData.profilePhoto) {
            setImageUrl(studentData.profilePhoto);
        }
    }, [studentData]);

    function handleImageUpload(e) {
        setimageLoading(true);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setImageUrl(reader.result);
                const res = await handleFileUpload(
                    file,
                    "student/profile-pictures/",
                    studentData.indexNumber
                );
                if (res.error) {
                    //TODO: add toast
                    setimageLoading(false);
                } else {
                    const __res = await updateStudentProfilePicture(res.data);
                    setuser({ ...user, photoURL: res.data });
                    if (__res.error) {
                        //TODO: add toast
                        setimageLoading(false);
                    }
                }
                setimageLoading(false);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <label>
                                <Avatar size="xl" src={imageUrl}>
                                    <AvatarBadge boxSize="0.9em" bg="green.500">
                                        <MdAdd
                                            style={{ margin: 0 }}
                                            color="white"
                                            size={30}
                                        ></MdAdd>
                                    </AvatarBadge>
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={handleImageUpload}
                                    />
                                </Avatar>
                            </label>
                        </Center>
                        {imageLoading && (
                            <Center mt={2}>
                                <Text fontSize="xl">Uploading...</Text>
                            </Center>
                        )}
                        <form onSubmit={handleSubmit}>
                            <FormControl id="firstName" mb="2">
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    type="text"
                                    name="firstName"
                                    value={formInput.firstName}
                                    placeholder={studentData.firstName}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl id="lastName" mb="2">
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={formInput.lastName}
                                    placeholder={studentData.lastName}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            {/* <hr></hr>
                            <FormControl
                                id="password"
                                isRequired
                                mb={4}
                                // isInvalid={formError.error}
                            >
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl
                                id="confirmPassword"
                                isRequired
                                mb={4}
                                // isInvalid={formError.error}
                            >
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    onChange={handleInputChange}
                                />
                                {/* {formError.error && (
                                    <FormErrorMessage>
                                        {formError.message}
                                    </FormErrorMessage>
                                )} */}
                            {/* </FormControl> */}
                            <Button
                                type="submit"
                                colorScheme="blue"
                                isLoading={loading}
                                loadingText="Submiting..."
                            >
                                Submit
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
