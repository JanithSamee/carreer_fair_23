import {
	Tab,
	Tabs,
	TabList,
	TabPanels,
	TabPanel,
	Grid,
	Text,
	Box,
	Button,
} from "@chakra-ui/react";
import StudentCardGrid from "../components/StudentCardsGrid";
import CompanyCardsGrid from "../components/CompanyCardsGrid";
import AdminManagement from "../components/admin/AdminManagement";
import StatisticsPage from "../components/admin/StatisticsPage";
import AdminAccountsTab from "../components/admin/AdminAccountsTab";
import { useState } from "react";
import useAuth from "../utils/providers/AuthProvider";

function Admin() {
	const [currentTab, setcurrentTab] = useState(0);
	const { logout, user } = useAuth();

	function handleTabChange(event) {
		setcurrentTab(event);
	}
	return (
		<div>
			<Box
				w={"100%"}
				display={"flex"}
				flexDir={"row"}
				alignItems={"baseline"}
				justifyContent={"space-between"}
			>
				<Text
					color={"blackAlpha.500"}
					fontStyle={"oblique"}
					fontSize={"2xl"}
					fontWeight={"bold"}
					m={4}
				>
					Admin Panel
				</Text>
				<Box display={"flex"} flexDir={"row"} alignItems={"baseline"}>
					<Text color="GrayText" fontStyle={"italic"} mr={2}>
						{user && user.email}
					</Text>
					<Button
						float={"right"}
						mr={4}
						colorScheme="red"
						onClick={() => logout()}
					>
						Logout
					</Button>
				</Box>
			</Box>
			<Tabs
				variant="soft-rounded"
				colorScheme="teal"
				mt={5}
				ml={5}
				size="sm"
				onChange={handleTabChange}
				index={currentTab}
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
						{currentTab === 0 && <StatisticsPage />}
					</TabPanel>
					<TabPanel>
						<Grid templateColumns="repeat(8, 1fr)" gap={1}>
							{currentTab === 1 && <StudentCardGrid />}
						</Grid>
					</TabPanel>
					<TabPanel>
						<Grid templateColumns="repeat(7, 1fr)" gap={3}>
							{currentTab === 2 && <CompanyCardsGrid />}
						</Grid>
					</TabPanel>
					<TabPanel>
						{currentTab === 3 && <AdminManagement />}
					</TabPanel>
					<TabPanel>
						{currentTab === 4 && <AdminAccountsTab />}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
}

export default Admin;
