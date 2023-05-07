import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Flex,
    IconButton,
    Divider,
} from "@chakra-ui/react";
import StudentList from "./StudentList";
import { TiTick } from "react-icons/ti";
import { getCompanyName } from "../../utils/helpers/formatter";
import StudentListModal from "./StudentListModal";

export default function CoordinatorCompanyModal({
    selectedCompany,
    handleModalClose,
    setOngoing,
    ongoing,
    completedList,
    handleComplete,
}) {
    return (
        <Modal
            isOpen={!!selectedCompany}
            onClose={handleModalClose}
            size={"3xl"}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{getCompanyName(selectedCompany)}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <StudentListModal
                        companyId={selectedCompany}
                    ></StudentListModal>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
