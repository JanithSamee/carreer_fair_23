import {
	Tab,
	Tabs,
	TabList,
	TabPanels,
	TabPanel,
	Grid,
} from "@chakra-ui/react";
import StudentCardGrid from "../components/StudentCardsGrid";
import CompanyCardsGrid from "../components/CompanyCardsGrid";

function Admin() {
	return (
		<div>
			<Tabs
				variant="soft-rounded"
				colorScheme="teal"
				mt={5}
				ml={5}
				size="sm"
			>
				<TabList>
					<Tab>Students</Tab>
					<Tab>Companies</Tab>
				</TabList>
				<TabPanels>
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
				</TabPanels>
			</Tabs>
		</div>
	);
}

export default Admin;
