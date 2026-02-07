"use client"

import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";

export default function Home() {

	const router = useRouter();

	return (
		<>
			<div className="h-screen w-full flex flex-col justify-center items-center">

				<p className="mb-4 underline">
					<span className="text-3xl">k</span>
					AA
					<span className="text-3xl">m</span>
					<span> </span>
					<span className="text-3xl">d</span>O
				</p>

				<div className="flex gap-2">
					{/* redirect to user login page */}
					<PrimaryButton
						buttonLabel={"USER Login"}
						onClick = {() => router.push('/user/login')}
					/>

					{/* redirect to vendor login page */}
					<PrimaryButton
						buttonLabel={"VENDOR Login"}
						onClick = {() => router.push('/vendor/login')}
					/>
				</div>

			</div>
		</>
	);
}
