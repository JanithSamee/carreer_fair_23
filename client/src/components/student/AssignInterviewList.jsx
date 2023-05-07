import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { getCompanyName } from "../../utils/helpers/formatter";

function AssignInterviewList({ userData }) {
    return (
        <div>
            <Box>
                {userData &&
                    userData.interviewsList &&
                    userData.interviewsList.map((inter, idx) => (
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
                                    - {inter && getCompanyName(inter.name)}
                                </Text>
                            </Flex>
                            <Divider my={2}></Divider>
                        </Box>
                    ))}
            </Box>
        </div>
    );
}

export default AssignInterviewList;
