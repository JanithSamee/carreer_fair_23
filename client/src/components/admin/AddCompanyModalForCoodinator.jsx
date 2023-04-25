import React, { useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from "@chakra-ui/react";

export function AddCompanyModalForCoodinator({
    isOpen,
    onClose,
    user,
    onSubmit,
}) {
    const [company, setCompany] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(user, company);
        setCompany("");
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Company</ModalHeader>
                <ModalBody>
                    <FormControl id="company">
                        <FormLabel>Company Name</FormLabel>
                        <Input
                            value={company}
                            onChange={(event) => setCompany(event.target.value)}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
