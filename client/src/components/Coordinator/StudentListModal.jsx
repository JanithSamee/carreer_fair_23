import { useEffect, useState } from "react";
import {
    Table,
    Tbody,
    Tr,
    Td,
    Button,
    Badge,
    Stack,
    Text,
    Box,
    useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getInterviewsByCompany } from "../../utils/api/interview.api";

const initialStudents = [
    { interviewId: 1, name: "John", interviewsStatus: "pending", time: "8.45" },
    { interviewId: 2, name: "Mary", interviewsStatus: "onGoing", time: "9.45" },
    {
        interviewId: 3,
        name: "Jane",
        interviewsStatus: "completed",
        time: "18.45",
    },
];

const statusColors = {
    pending: "yellow",
    onGoing: "red",
    completed: "green",
};

const statusOrder = { pending: 2, onGoing: 1, completed: 3 };

const sortStudents = (a, b) => {
    if (a.interviewsStatus !== b.interviewsStatus) {
        return (
            statusOrder[a.interviewsStatus] - statusOrder[b.interviewsStatus]
        );
    }
    return a.time.localeCompare(b.time);
};
const StudentListModal = ({ companyId }) => {
    const toast = useToast();

    const [students, setStudents] = useState([]);

    const updateStudentStatus = (id, interviewsStatus) => {
        const updatedStudents = students.map((student) =>
            student.interviewId === id
                ? { ...student, interviewsStatus }
                : student
        );
        setStudents(updatedStudents.sort(sortStudents));
    };

    const [loading, setloading] = useState(false);
    const [isChanged, setisChanged] = useState(false);
    useEffect(() => {
        async function getData() {
            setloading(true);
            const _res = await getInterviewsByCompany(companyId);
            setloading(false);
            console.log(_res);

            if (_res.error) {
                return toast({
                    title: "An error occurred.",
                    description: _res.data,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }

            if (_res.data && Array.isArray(_res.data)) {
                setStudents(_res.data.sort(sortStudents));
            }
        }
        companyId && getData();
    }, [isChanged]);

    return (
        <Table variant="simple">
            <Tbody>
                {loading ? (
                    <Text>Updating...</Text>
                ) : (
                    students.map((student, index) => (
                        <Tr key={index}>
                            <Td
                                opacity={
                                    student.interviewsStatus === "completed"
                                        ? 0.5
                                        : 1
                                }
                            >
                                <Stack>
                                    <Text>{student.studentId}</Text>
                                    <Text color={"GrayText"}>
                                        {student.time}
                                    </Text>
                                </Stack>
                            </Td>
                            <Td>
                                <Badge
                                    colorScheme={
                                        statusColors[student.interviewsStatus]
                                    }
                                >
                                    {student.interviewsStatus}
                                </Badge>
                            </Td>

                            <Td>
                                {student.interviewsStatus === "completed" ? (
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            updateStudentStatus(
                                                student.interviewId,
                                                "pending"
                                            )
                                        }
                                    >
                                        Update to Pending
                                    </Button>
                                ) : (
                                    <>
                                        {student.interviewsStatus ===
                                        "onGoing" ? (
                                            <>
                                                <Button
                                                    size="sm"
                                                    mr={2}
                                                    mb={1}
                                                    onClick={() =>
                                                        updateStudentStatus(
                                                            student.interviewId,
                                                            "completed"
                                                        )
                                                    }
                                                >
                                                    Mark as Completed
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    mr={2}
                                                    mb={1}
                                                    onClick={() =>
                                                        updateStudentStatus(
                                                            student.interviewId,
                                                            "pending"
                                                        )
                                                    }
                                                >
                                                    Mark as pending
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                size="sm"
                                                mr={2}
                                                onClick={() =>
                                                    updateStudentStatus(
                                                        student.interviewId,
                                                        "onGoing"
                                                    )
                                                }
                                            >
                                                Start
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Td>
                            <Td>
                                <Stack direction={"row"}>
                                    <Button
                                        variant={"link"}
                                        colorScheme="facebook"
                                    >
                                        main
                                    </Button>
                                    <Button
                                        variant={"link"}
                                        colorScheme="facebook"
                                    >
                                        EE
                                    </Button>
                                    <Button
                                        variant={"link"}
                                        colorScheme="facebook"
                                    >
                                        CS
                                    </Button>
                                    <Button
                                        variant={"link"}
                                        colorScheme="facebook"
                                    >
                                        MN
                                    </Button>
                                </Stack>
                            </Td>
                        </Tr>
                    ))
                )}
            </Tbody>
        </Table>
    );
};

export default StudentListModal;
