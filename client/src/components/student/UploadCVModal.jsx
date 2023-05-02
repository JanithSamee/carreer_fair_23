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
    useToast,
    Text,
    Stack,
    IconButton,
} from "@chakra-ui/react";
import { MdDelete, MdDownload } from "react-icons/md";
import useAuth from "../../utils/providers/AuthProvider";
import { handleFileUpload } from "../../utils/firebase/firebaseUtils";
import {
    updateStudentCV,
    updateStudentCVAsCategory,
} from "../../utils/api/student.api";
import { Link } from "react-router-dom";

const UploadCVModal = ({ cvUrl, userData, setUserData }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const toast = useToast();
    // console.log(userData);

    const { user } = useAuth();

    const [file, setFile] = useState(null);
    const [files, setFiles] = useState({ EE: "", CS: "", MN: "" });
    const [showCategory, setshowCategory] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCvUpload = async () => {
        setLoading(true);
        if (file) {
            if (file.size > 5000 * 1024) {
                return toast({
                    title: "Maximum File Size Limit Exceeded!",
                    description:
                        "The file you are trying to upload exceeds the maximum file size limit of 5MB. Please choose a file that is smaller than 5MB and try again.",
                    status: "false",
                    duration: 4000,
                    isClosable: true,
                });
            }

            const reader = new FileReader();
            reader.onloadend = async () => {
                //setImageUrl(reader.result);
                const res = await handleFileUpload(
                    file,
                    "student/cv/",
                    user.uid
                );
                if (res.error) {
                    setLoading(false);
                    return toast({
                        title: "An error occurred.",
                        description: res.data,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    const __res = await updateStudentCV(res.data);
                    if (__res.error) {
                        setLoading(false);
                        return toast({
                            title: "An error occurred.",
                            description: __res.data,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        });
                    }
                    toast({
                        title: "Success",
                        description: "Successfully Uploaded!",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                    setUserData({ ...userData, cvURL: res.data });
                    onClose();
                }
                setLoading(false);
            };
            reader.readAsDataURL(file);
        } else {
            setLoading(false);
            return toast({
                title: "Invalid Inputs!",
                description: "Please Select a PDF to upload.",
                status: "warning",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleCvUploadAsCategory = async (comp) => {
        setLoading(true);
        if (files[comp]) {
            if (files[comp].size > 5000 * 1024) {
                setLoading(false);
                return toast({
                    title: "Maximum File Size Limit Exceeded!",
                    description:
                        "The file you are trying to upload exceeds the maximum file size limit of 5MB. Please choose a file that is smaller than 5MB and try again.",
                    status: "warning",
                    duration: 4000,
                    isClosable: true,
                });
            }

            const reader = new FileReader();
            reader.onloadend = async () => {
                //setImageUrl(reader.result);
                const res = await handleFileUpload(
                    files[comp],
                    "student/cv/",
                    user.uid + "-" + comp
                );
                if (res.error) {
                    setLoading(false);
                    return toast({
                        title: "An error occurred.",
                        description: res.data,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    const __res = await updateStudentCVAsCategory({
                        ...userData.CVCategory,
                        [comp]: res.data,
                    });
                    if (__res.error) {
                        setLoading(false);
                        return toast({
                            title: "An error occurred.",
                            description: __res.data,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        });
                    }
                    toast({
                        title: "Success",
                        description: "Successfully Uploaded!",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                    setUserData({
                        ...userData,
                        CVCategory: {
                            ...userData.CVCategory,
                            [comp]: res.data,
                        },
                    });
                    onClose();
                }
                setLoading(false);
            };
            reader.readAsDataURL(files[comp]);
        } else {
            setLoading(false);
            return toast({
                title: "Invalid Inputs!",
                description: "Please Select a PDF to upload.",
                status: "warning",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Button
                colorScheme="yellow"
                mt={4}
                onClick={onOpen}
                w={"100%"}
                textOverflow={"revert"}
            >
                Upload CV/Resume
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    {showCategory ? (
                        <>
                            <ModalHeader>
                                Upload your CV/Resume as Category
                            </ModalHeader>
                            <ModalBody>
                                <Text
                                    fontSize={"lg"}
                                    color="GrayText"
                                    fontStyle={"italic"}
                                    fontWeight={"bold"}
                                    mt={3}
                                    mb={1}
                                >
                                    Electrical Engineering
                                </Text>
                                <FormControl>
                                    <FormLabel>
                                        Choose a PDF file to upload
                                    </FormLabel>
                                    <Stack direction={"row"}>
                                        <Input
                                            type="file"
                                            accept=".pdf"
                                            value={files.EE.fileName}
                                            onChange={(e) =>
                                                setFiles({
                                                    ...files,
                                                    EE: e.target.files[0] || "",
                                                })
                                            }
                                        />
                                        <IconButton
                                            aria-label="Download file"
                                            colorScheme="facebook"
                                            target="_blank"
                                            as={Link}
                                            isDisabled={
                                                !userData ||
                                                !userData.CVCategory ||
                                                !userData.CVCategory.EE
                                            }
                                            to={
                                                userData &&
                                                userData.CVCategory &&
                                                userData.CVCategory.EE
                                            }
                                            icon={<MdDownload />}
                                            mt={2}
                                        />
                                        {/* <IconButton
                                            aria-label="Delete file"
                                            colorScheme="red"
                                            icon={<MdDelete />}
                                            mt={2}
                                            onChange={(e) =>
                                                setFiles({
                                                    ...files,
                                                    EE: "",
                                                })
                                            }
                                        /> */}
                                        <Button
                                            mt={2}
                                            isLoading={loading}
                                            colorScheme="blue"
                                            ml={3}
                                            onClick={async () =>
                                                await handleCvUploadAsCategory(
                                                    "EE"
                                                )
                                            }
                                        >
                                            Upload
                                        </Button>
                                    </Stack>
                                </FormControl>
                                <Text
                                    fontSize={"lg"}
                                    color="GrayText"
                                    fontStyle={"italic"}
                                    fontWeight={"bold"}
                                    mt={3}
                                    mb={1}
                                >
                                    Computer Science
                                </Text>
                                <FormControl>
                                    <FormLabel>
                                        Choose a PDF file to upload
                                    </FormLabel>
                                    <Stack direction={"row"}>
                                        <Input
                                            type="file"
                                            accept=".pdf"
                                            value={files.CS.fileName}
                                            onChange={(e) =>
                                                setFiles({
                                                    ...files,
                                                    CS: e.target.files[0] || "",
                                                })
                                            }
                                        />
                                        <IconButton
                                            aria-label="Download file"
                                            colorScheme="facebook"
                                            target="_blank"
                                            isDisabled={
                                                !userData ||
                                                !userData.CVCategory ||
                                                !userData.CVCategory.CS
                                            }
                                            as={Link}
                                            to={
                                                userData &&
                                                userData.CVCategory &&
                                                userData.CVCategory.CS
                                            }
                                            icon={<MdDownload />}
                                            mt={2}
                                        />
                                        {/* <IconButton
                                            aria-label="Delete file"
                                            colorScheme="red"
                                            icon={<MdDelete />}
                                            mt={2}
                                            onChange={(e) =>
                                                setFiles({
                                                    ...files,
                                                    CS: "",
                                                })
                                            }
                                        /> */}
                                        <Button
                                            mt={2}
                                            isLoading={loading}
                                            colorScheme="blue"
                                            ml={3}
                                            onClick={async () =>
                                                await handleCvUploadAsCategory(
                                                    "CS"
                                                )
                                            }
                                        >
                                            Upload
                                        </Button>
                                    </Stack>
                                </FormControl>
                                <Text
                                    fontSize={"lg"}
                                    color="GrayText"
                                    fontStyle={"italic"}
                                    fontWeight={"bold"}
                                    mt={3}
                                    mb={1}
                                >
                                    Management
                                </Text>
                                <FormControl>
                                    <FormLabel>
                                        Choose a PDF file to upload
                                    </FormLabel>
                                    <Stack direction={"row"}>
                                        <Input
                                            type="file"
                                            accept=".pdf"
                                            value={files.MN.fileName}
                                            onChange={(e) =>
                                                setFiles({
                                                    ...files,
                                                    MN: e.target.files[0] || "",
                                                })
                                            }
                                        />
                                        <IconButton
                                            aria-label="Download file"
                                            colorScheme="facebook"
                                            target="_blank"
                                            as={Link}
                                            isDisabled={
                                                !userData ||
                                                !userData.CVCategory ||
                                                !userData.CVCategory.MN
                                            }
                                            to={
                                                userData &&
                                                userData.CVCategory &&
                                                userData.CVCategory.MN
                                            }
                                            icon={<MdDownload />}
                                            mt={2}
                                        />
                                        {/* <IconButton
                                            aria-label="Delete file"
                                            colorScheme="red"
                                            icon={<MdDelete />}
                                            mt={2}
                                            onChange={(e) =>
                                                setFiles({
                                                    ...files,
                                                    MN: "",
                                                })
                                            }
                                        /> */}
                                        <Button
                                            mt={2}
                                            isLoading={loading}
                                            colorScheme="blue"
                                            ml={3}
                                            onClick={async () =>
                                                await handleCvUploadAsCategory(
                                                    "MN"
                                                )
                                            }
                                        >
                                            Upload
                                        </Button>
                                    </Stack>
                                </FormControl>
                                <Button
                                    mt={4}
                                    colorScheme="blackAlpha"
                                    onClick={() => setshowCategory(false)}
                                >
                                    Upload Main CV/Resume
                                </Button>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="ghost" onClick={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    ) : (
                        <>
                            <ModalHeader>Upload your CV/Resume</ModalHeader>
                            <ModalBody>
                                {/* {cvUrl && (
                                    <Button m={"4"} ml={0} as={Link} to={cvUrl}>
                                        Download My CV/Resume
                                    </Button>
                                )} */}
                                <FormControl>
                                    <FormLabel>
                                        Choose a PDF file to upload
                                    </FormLabel>
                                    <Stack direction={"row"}>
                                        <Input
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) =>
                                                setFile(e.target.files[0])
                                            }
                                        />
                                        <IconButton
                                            target="_blank"
                                            aria-label="Download file"
                                            colorScheme="facebook"
                                            as={Link}
                                            isDisabled={!cvUrl}
                                            to={cvUrl}
                                            icon={<MdDownload />}
                                            mt={2}
                                        />
                                    </Stack>
                                </FormControl>
                                <Button
                                    mt={4}
                                    colorScheme="blackAlpha"
                                    onClick={() => setshowCategory(true)}
                                >
                                    Upload Specific CVs
                                </Button>
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
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UploadCVModal;
