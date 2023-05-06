import {
    Card,
    CardBody,
    Avatar,
    Stack,
    Heading,
    useDisclosure,
    Modal,
    ModalBody,
    ModalOverlay,
    Button,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalCloseButton,
} from "@chakra-ui/react";
import StudentModalContent from "./StudentModalContent";
import { useEffect, useState } from "react";
import { getStudent } from "../utils/api/student.api";

function StudentCard({
    name,
    index_number,
    img_url,
    name_initial,
    interviewsList,
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <Card maxW={125} onClick={onOpen}>
                <CardBody>
                    <Stack align={"center"}>
                        <Avatar
                            name={name}
                            bg="teal.500"
                            src={img_url}
                        ></Avatar>
                        <Heading size="xs">{index_number}</Heading>
                    </Stack>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader size="xs">Edit Preferences</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <StudentModalContent
                            name={name}
                            index_number={index_number}
                            name_initial={name_initial}
                            img_url={img_url}
                            interviewsList={interviewsList}
                        ></StudentModalContent>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default StudentCard;
