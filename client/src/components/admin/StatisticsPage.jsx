import React from "react";
import {
    Box,
    Flex,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    StatNumber,
} from "@chakra-ui/react";

const StatisticsPage = () => {
    const studentSignupCount = 500;
    const studentAppliedCount = 250;
    const registeredCompanyCount = 50;
    const cvUploadedCount = 300;

    return (
        <Flex direction="column" align="center" justify="center">
            <Box
                px={8}
                py={6}
                borderRadius="md"
                mb={8}
                w="100%"
                display={"flex"}
                flexDir={"row"}
            >
                <Stat>
                    <StatLabel fontSize="xl" fontWeight="bold">
                        Student Sign Up Count:
                    </StatLabel>
                    <StatNumber fontSize="2xl" fontWeight="semibold">
                        {studentSignupCount}
                    </StatNumber>
                    <StatHelpText>
                        <StatArrow type="increase" />
                        23.36%
                    </StatHelpText>
                </Stat>

                <Stat>
                    <StatLabel fontSize="xl" fontWeight="bold">
                        Student Applied Count:
                    </StatLabel>
                    <StatNumber fontSize="2xl" fontWeight="semibold">
                        {studentAppliedCount}
                    </StatNumber>
                    <StatHelpText>
                        <StatArrow type="increase" />
                        23.36%
                    </StatHelpText>
                </Stat>
            </Box>

            <Box
                px={8}
                py={6}
                borderRadius="md"
                mb={8}
                w="100%"
                display={"flex"}
                flexDir={"row"}
            >
                <Stat>
                    <StatLabel fontSize="xl" fontWeight="bold">
                        Registered Company Count:
                    </StatLabel>
                    <StatNumber fontSize="2xl" fontWeight="semibold">
                        {registeredCompanyCount}
                    </StatNumber>
                    <StatHelpText>
                        <StatArrow type="increase" />
                        23.36%
                    </StatHelpText>
                </Stat>

                <Stat>
                    <StatLabel fontSize="xl" fontWeight="bold">
                        CV Uploaded Student Count:
                    </StatLabel>
                    <StatNumber fontSize="2xl" fontWeight="semibold">
                        {cvUploadedCount}
                    </StatNumber>
                    <StatHelpText>
                        <StatArrow type="increase" />
                        23.36%
                    </StatHelpText>
                </Stat>
            </Box>
        </Flex>
    );
};

export default StatisticsPage;
