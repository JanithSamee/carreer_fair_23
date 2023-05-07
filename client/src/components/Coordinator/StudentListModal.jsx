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
import {
    getInterviewsByCompany,
    updateInterview,
} from "../../utils/api/interview.api";
import { getCvByIndex } from "../../utils/api/student.api";

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
    const [loadingAction, setloadingAction] = useState(false);

    const updateStudentStatus = async (id, interviewsStatus) => {
        const updatedStudents = students.map((student) =>
            student.interviewId === id
                ? { ...student, interviewsStatus }
                : student
        );
        setloadingAction(true);
        const _res = await updateInterview({
            interviewId: id,
            status: interviewsStatus,
        });
        setloadingAction(false);
        if (_res.error) {
            return toast({
                title: "An error occurred.",
                description: _res.data,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } else {
            setStudents(updatedStudents.sort(sortStudents));
        }
    };

    const [studentCv, setstudentCv] = useState("");
    const [studentCvLoading, setstudentCvLoading] = useState(false);
    async function getCvs(indexNumber) {
        setstudentCvLoading(true);
        const _res = await getCvByIndex(indexNumber);
        setstudentCvLoading(false);
        if (_res.error) {
            return toast({
                title: "An error occurred.",
                description: _res.data,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        setstudentCv(_res.data);
    }

    const [loading, setloading] = useState(false);
    const [isChanged, setisChanged] = useState(false);
    useEffect(() => {
        async function getData() {
            setloading(true);
            const _res = await getInterviewsByCompany(companyId);
            setloading(false);

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
                    <Tr>
                        <Td>
                            <Text>Updating...</Text>
                        </Td>
                    </Tr>
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
                                        isLoading={loadingAction}
                                        loadingText={"Loading..."}
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
                                                    isLoading={loadingAction}
                                                    loadingText={"Loading..."}
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
                                                    isLoading={loadingAction}
                                                    loadingText={"Loading..."}
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
                                                isLoading={loadingAction}
                                                loadingText={"Loading..."}
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
                                {!studentCv ||
                                studentCv.indexNumber !== student.studentId ? (
                                    <Button
                                        isLoading={studentCvLoading}
                                        loadingText="Loading..."
                                        onClick={async () =>
                                            await getCvs(student.studentId)
                                        }
                                    >
                                        Get CVs
                                    </Button>
                                ) : (
                                    <Stack direction={"row"}>
                                        <Button
                                            as={Link}
                                            target="_blank"
                                            isDisabled={
                                                !studentCv || !studentCv.cvURL
                                            }
                                            to={studentCv && studentCv.cvURL}
                                            variant={"link"}
                                            colorScheme="facebook"
                                        >
                                            main
                                        </Button>
                                        <Button
                                            as={Link}
                                            target="_blank"
                                            isDisabled={
                                                !studentCv ||
                                                !studentCv.CVCategory ||
                                                !studentCv.CVCategory.EE
                                            }
                                            to={
                                                studentCv &&
                                                studentCv.CVCategory &&
                                                studentCv.CVCategory.EE
                                            }
                                            variant={"link"}
                                            colorScheme="facebook"
                                        >
                                            EE
                                        </Button>
                                        <Button
                                            as={Link}
                                            target="_blank"
                                            isDisabled={
                                                !studentCv ||
                                                !studentCv.CVCategory ||
                                                !studentCv.CVCategory.CS
                                            }
                                            to={
                                                studentCv &&
                                                studentCv.CVCategory &&
                                                studentCv.CVCategory.CS
                                            }
                                            variant={"link"}
                                            colorScheme="facebook"
                                        >
                                            CS
                                        </Button>
                                        <Button
                                            as={Link}
                                            target="_blank"
                                            isDisabled={
                                                !studentCv ||
                                                !studentCv.CVCategory ||
                                                !studentCv.CVCategory.MN
                                            }
                                            to={
                                                studentCv &&
                                                studentCv.CVCategory &&
                                                studentCv.CVCategory.MN
                                            }
                                            variant={"link"}
                                            colorScheme="facebook"
                                        >
                                            MN
                                        </Button>
                                    </Stack>
                                )}
                            </Td>
                        </Tr>
                    ))
                )}
            </Tbody>
        </Table>
    );
};

export default StudentListModal;
