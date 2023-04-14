import {
	Card,
	CardBody,
	Avatar,
	Stack,
	Heading,
	useDisclosure,
} from "@chakra-ui/react";
import CompanyModal from "./CompanyModal";

function CompanyCard({ name, img_url }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<div>
			<Card maxW={125}>
				<CardBody>
					<Stack align={"center"}>
						<Avatar name={name} bg="tomato" src={img_url}></Avatar>
						<Heading size="xs" onClick={onOpen}>
							{name}
						</Heading>
					</Stack>
				</CardBody>
			</Card>
			<CompanyModal
				isOpen={isOpen}
				onClose={onClose}
				title={"Edit Company"}
				companyName={name}
				companyDes={"Company Description "}
			/>
		</div>
	);
}

export default CompanyCard;
