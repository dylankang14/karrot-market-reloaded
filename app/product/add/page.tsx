"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { uploadProduct } from "./actions";
import { useFormState } from "react-dom";

export default function AddProduct() {
	const [preview, setPreview] = useState("");
	const [state, action] = useFormState(uploadProduct, null);
	const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = event;
		if (!files) {
			return;
		}
		const file = files[0];

		const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
		if (!file.type.includes("image")) {
			console.log("Image only allowed here!");
			return;
		}
		if (file.size > FILE_SIZE_LIMIT) {
			console.log("Image allowed size less than 5MB.");
			return;
		}
		const url = URL.createObjectURL(file);
		setPreview(url);
	};
	return (
		<form action={action} className="flex flex-col gap-4 p-5">
			<label
				htmlFor="photo"
				className="aspect-square border-2 border-dashed border-neutral-300 rounded-md center justify-center items-center flex flex-col text-neutral-400 cursor-pointer bg-cover bg-center"
				style={{
					backgroundImage: `url(${preview})`,
				}}
			>
				{!preview ? (
					<>
						<PhotoIcon className="size-24" />
						<div className="">사진을 추가해주세요.</div>
						{state?.fieldErrors.photo}
					</>
				) : null}
			</label>
			<Input onChange={onImageChange} required id="photo" name="photo" type="file" accept="image/" className="hidden" />
			<Input required name="title" type="text" placeholder="Title" errors={state?.fieldErrors.title} />
			<Input required name="price" type="number" placeholder="Price" errors={state?.fieldErrors.price} />
			<Input
				required
				name="description"
				type="text"
				placeholder="설명을 입력해주세요."
				errors={state?.fieldErrors.description}
			/>
			<Button text="작성 완료" />
		</form>
	);
}
