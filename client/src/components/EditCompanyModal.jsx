import {
    useDisclosure,
    Modal,
    ModalBody,
    ModalOverlay,
    Button,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalCloseButton,
    Avatar,
    Box,
    FormControl,
    FormLabel,
    Input,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInput,
    Textarea,
    AvatarBadge,
    Center,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { handleFileUpload } from "../utils/firebase/firebaseUtils";
import { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import {
    getCompany,
    updateCompany,
    updateCompanyProfilePicture,
} from "../utils/api/company.api";

function EditCompanyModal({
    isOpen,
    onClose,
    title,
    email,
    companyId,
    imgUrl,
}) {
    const [imageLoading, setimageLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const [formInputs, setFormInputs] = useState({
        email: "",
        name: "",
        maximumInterviews: "",
        startTime: "",
        endTime: "",
        requirements: "",
    });
    const [formError, setFormError] = useState({ error: false, message: "" });
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    async function handleSubmit() {
        setLoading(true);
        const _res = await updateCompany(formInputs);
        if (_res.error) {
            toast({
                title: "An error occurred.",
                description: _res.data,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            setLoading(false);
        } else {
            toast({
                title: "Done",
                description: "Company Updated Successfully !",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            setLoading(false);
        }
        onClose();
    }

    useEffect(() => {
        async function getCompanyDetails(comID) {
            const _res = await getCompany(comID);
            if (_res.error) {
                toast({
                    title: "An error occurred.",
                    description: _res.data,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                setFormInputs(_res.data);
            }
        }
        if (companyId) {
            getCompanyDetails(companyId);
        }
        if (imgUrl) {
            setImageUrl(imgUrl);
        }
    }, [companyId]);

    function handleImageUpload(e) {
        setimageLoading(true);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setImageUrl(reader.result);
                const res = await handleFileUpload(
                    file,
                    "company/profile-pictures/",
                    formInputs.companyId
                );
                if (res.error) {
                    setimageLoading(false);
                    return toast({
                        title: "An error occurred.",
                        description: res.data,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    const __res = await updateCompanyProfilePicture({
                        companyId: formInputs.companyId,
                        imageUrl: res.data,
                    });
                    if (__res.error) {
                        setimageLoading(false);
                        return toast({
                            title: "An error occurred.",
                            description: __res.data,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        });
                    }
                }
                setimageLoading(false);
            };
            reader.readAsDataURL(file);
        } else {
            setimageLoading(false);
            return toast({
                title: "Invalid Inputs!",
                description: "Please Select a Photo to upload",
                status: "warning",
                duration: 9000,
                isClosable: true,
            });
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader size="xs">{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box align="center">
                        <FormControl>
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
                            {imageLoading && (
                                <Center mt={2}>
                                    <Text fontSize="xl">Uploading...</Text>
                                </Center>
                            )}
                        </FormControl>
                    </Box>
                    <FormControl
                        isInvalid={formError != undefined && formError.error}
                    >
                        <FormLabel fontSize="xs" mb={0.5}>
                            Company Name
                        </FormLabel>
                        <Input
                            size="xs"
                            fontSize="xs"
                            placeholder={"Company Name"}
                            value={formInputs && formInputs.name}
                            readOnly
                            w={200}
                        ></Input>
                    </FormControl>
                    <FormControl
                        isInvalid={formError != undefined && formError.error}
                    >
                        <FormLabel fontSize="xs" mb={0.5}>
                            Email
                        </FormLabel>
                        <Input
                            size="xs"
                            fontSize="xs"
                            placeholder={email}
                            value={formInputs && formInputs.email}
                            w={200}
                            readOnly
                        ></Input>
                    </FormControl>
                    <FormControl
                        isRequired
                        isInvalid={formError != undefined && formError.error}
                    >
                        <FormLabel fontSize="xs" mb={0.5}>
                            No. of Vacancies
                        </FormLabel>
                        <NumberInput
                            max={30}
                            min={1}
                            size="xs"
                            w={55}
                            placeholder="0"
                            value={
                                (formInputs && formInputs.maximumInterviews) ||
                                0
                            }
                            onChange={(e) => {
                                if (e) {
                                    const _num = parseInt(e) || 0;
                                    setFormInputs({
                                        ...formInputs,
                                        maximumInterviews: _num,
                                    });
                                }
                            }}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl
                        isRequired
                        isInvalid={formError != undefined && formError.error}
                    >
                        <FormLabel fontSize="xs" mb={0.5}>
                            Description
                        </FormLabel>
                        <Textarea
                            size="xs"
                            placeholder={"Company Description"}
                            value={formInputs && formInputs.requirements}
                            onChange={(e) =>
                                setFormInputs({
                                    ...formInputs,
                                    requirements: e.target.value,
                                })
                            }
                        ></Textarea>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="red"
                        mr={3}
                        onClick={onClose}
                        size="xs"
                    >
                        Close
                    </Button>
                    <Button
                        size="xs"
                        colorScheme="green"
                        isLoading={loading}
                        loadingText="Updating"
                        onClick={() => handleSubmit()}
                    >
                        Update
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default EditCompanyModal;
