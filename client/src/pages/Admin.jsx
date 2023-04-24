import {
    Tab,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Grid,
    Text,
} from "@chakra-ui/react";
import StudentCardGrid from "../components/StudentCardsGrid";
import CompanyCardsGrid from "../components/CompanyCardsGrid";
import AdminManagement from "../components/admin/AdminManagement";
import StatisticsPage from "../components/admin/StatisticsPage";
import AdminAccountsTab from "../components/admin/AdminAccountsTab";

function Admin() {
    return (
        <div>
            <Text
                color={"blackAlpha.500"}
                fontStyle={"oblique"}
                fontSize={"2xl"}
                fontWeight={"bold"}
                m={4}
            >
                Admin Panel
            </Text>
            <Tabs
                variant="soft-rounded"
                colorScheme="teal"
                mt={5}
                ml={5}
                size="sm"
            >
                <TabList>
                    <Tab>Statistics</Tab>
                    <Tab>Students</Tab>
                    <Tab>Companies</Tab>
                    <Tab>Admin Management</Tab>
                    <Tab>Admin Accounts</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <StatisticsPage />
                    </TabPanel>
                    <TabPanel>
                        <Grid templateColumns="repeat(7, 1fr)" gap={3}>
                            <StudentCardGrid />
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        <Grid templateColumns="repeat(7, 1fr)" gap={3}>
                            <CompanyCardsGrid />
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        <AdminManagement />
                    </TabPanel>
                    <TabPanel>
                        <AdminAccountsTab />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}

export default Admin;
