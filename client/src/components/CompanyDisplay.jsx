import {
	Card,
	CardBody,
	Avatar,
	Stack,
	Heading,
	useDisclosure,
	Input,
} from "@chakra-ui/react";
import CompanyModal from "./CompanyModal";
import CompanyDisplayModal from "./CompanyDisplayModal";

function CompanyDisplay({ name, img_url }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<div>
			<Card minW={115} minH={[170, 150, 180]}>
				<CardBody onClick={onOpen} cursor="pointer">
					<Stack align={"center"}>
						<Avatar
							name={name}
							bg="tomato"
							src={img_url}
							size={["lg", "md", "xl"]}
						></Avatar>
						<Heading
							size={["xs", "xs", "sm"]}
							textAlign="center"
							cursor="pointer"
						>
							{name}
						</Heading>
					</Stack>
				</CardBody>
			</Card>
			<CompanyDisplayModal
				isOpen={isOpen}
				onClose={onClose}
				title={name}
				companyName={name}
				companyDes={
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. "
				}
				email={"careers@wso2.com"}
				vacancies={5}
			></CompanyDisplayModal>
		</div>
	);
}

export default CompanyDisplay;
