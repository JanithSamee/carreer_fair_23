import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { esocLogo, eventlogo } from "../assets/exportAssets";

function About() {
    return (
        <Box p={8}>
            <Center display={"flex"} flexDir={"column"} mb={4}>
                <Heading mb={4}>About</Heading>
                <Box display={"flex"}>
                    <img src={esocLogo} alt="EESOC Logo" width={"100%"} />
                    <img src={eventlogo} alt="EESPIRE Logo" />
                </Box>
            </Center>
            <VStack spacing={6}>
                <Box w="80%" mx="auto">
                    <Text textAlign="justify">
                        The Department of Electrical Engineering at the
                        University of Moratuwa is home to the Electrical
                        Engineering Society (EESOC), a student-run organization
                        that aims to bring together students and faculty
                        interested in electrical engineering.
                    </Text>
                </Box>
                <Box w="80%" mx="auto">
                    <Text textAlign="justify">
                        EESOC provides a platform for students to explore and
                        expand their knowledge and skills in electrical
                        engineering through various technical events and
                        workshops. The society also organizes social and
                        cultural events to promote friendship and camaraderie
                        among its members.
                    </Text>
                </Box>
                <Box w="80%" mx="auto">
                    <Text textAlign="justify">
                        EESOC is committed to promoting excellence in electrical
                        engineering education and research, and to fostering a
                        culture of innovation and creativity among its members.
                    </Text>
                </Box>
                <Box w="80%" mx="auto">
                    <Text textAlign="justify">
                        EESPIRE is an annual event organized by the EESOC
                        community at the Department of Electrical Engineering,
                        University of Moratuwa. This event aims to showcase the
                        innovative and groundbreaking projects of the final year
                        undergraduates of the department, along with providing a
                        platform for industry professionals, academics, and
                        students to connect, collaborate, and share knowledge.
                        The event consists of project exhibitions, guest
                        speeches, technical workshops, and interactive sessions
                        that foster intellectual growth and creativity in the
                        field of electrical engineering. EESPIRE also features a
                        range of competitions, such as hackathons and robotics
                        challenges, that encourage participants to put their
                        skills to the test and develop innovative solutions to
                        real-world problems.
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
}

export default About;
