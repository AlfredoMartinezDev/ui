import { RiUserSettingsFill } from "@remixicon/react";
import { Button } from "../Button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../Dialog";
import { Input } from "../Input";

import { Toaster } from "../Toaster";
import { useToast } from "../../hooks/useToast";

export const UserSettings = () => {
	const { toast } = useToast()
	return (<>
		<Toaster />
		<div className="flex justify-center">
			<Dialog>
				<DialogTrigger asChild>
					<Button className="p-2" variant="ghost"><RiUserSettingsFill /></Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>User settings</DialogTitle>
						<DialogDescription className="mt-1 text-sm leading-6">
							<form>
								<div>
									<label>Username:</label>
									<Input />
								</div>
								<div>
									<label>First name:</label>
									<Input />
								</div>
								<div>
									<label>Last name:</label>
									<Input />
								</div>
								<div>
									<label>New password:</label>
									<Input />
								</div>
							</form>
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="mt-6">
						<DialogClose asChild>
							<Button
								className="mt-2 w-full sm:mt-0 sm:w-fit"
								variant="secondary"
							>
								Go back
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button className="w-full sm:w-fit" onClick={() =>
								toast({
									title: "Success",
									description:
										"User settings updated successfully!",
									variant: "success",
									duration: 3000,
								})
							}>Update data</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	</>
	)
};