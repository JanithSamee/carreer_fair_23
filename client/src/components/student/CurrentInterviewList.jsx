import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getInterviewsByStudent } from "../../utils/api/interview.api";
import { getCompanyName } from "../../utils/helpers/formatter";

function CurrentInterviewList({ indexNumber }) {
    const toast = useToast();
    const [interviewsList, setinterviewsList] = useState([]);
    const [loading, setloading] = useState(false);
    const [isChanged, setisChanged] = useState(false);

    useEffect(() => {
        async function getData() {
            setloading(true);
            setinterviewsList([]);
            const _res = await getInterviewsByStudent();
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
                const data = _res.data.filter(
                    (interview) => interview.interviewsStatus !== "completed"
                );
                setinterviewsList(data);
            }
        }
        getData();
    }, [isChanged]);

    return (
        <div>
            <Box>
                <Button mb={2} onClick={() => setisChanged((prev) => !prev)}>
                    Tap to Refresh
                </Button>
                {loading && (
                    <Text color={"GrayText"} fontStyle={"oblique"}>
                        Updating...
                    </Text>
                )}
                {interviewsList &&
                    interviewsList.map((inter, idx) => (
                        <Box flexWrap="wrap" alignItems="center" key={idx}>
                            <Flex>
                                <Text
                                    color="gray"
                                    fontSize={["sm", "sm", "md"]}
                                >
                                    May 08, 2023 at {inter && inter.time}
                                </Text>
                                <Text
                                    ml={2}
                                    fontWeight={700}
                                    fontSize={["md", "sm", "lg"]}
                                >
                                    - {inter && getCompanyName(inter.companyId)}
                                </Text>
                            </Flex>
                            <Text>
                                <span>{inter && inter.interviewsStatus} </span>{" "}
                                {/* 5 People In queue */}
                            </Text>
                            <Divider my={2}></Divider>
                        </Box>
                    ))}
            </Box>
        </div>
    );
}

export default CurrentInterviewList;
