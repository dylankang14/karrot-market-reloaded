"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { getUploadUrl, uploadProduct } from "./actions";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType, uploadProductSchema } from "./schema";

export default function AddProduct() {
	const [preview, setPreview] = useState("");
	const [uploadUrl, setUploadUrl] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { errors },
	} = useForm<ProductType>({
		resolver: zodResolver(uploadProductSchema),
	});
	const onSubmit = handleSubmit(async (data: ProductType) => {
		if (!file) return;
		const cloudflareFormData = new FormData();
		cloudflareFormData.append("file", file);

		const response = await fetch(uploadUrl, {
			method: "POST",
			body: cloudflareFormData,
		});
		if (response.status !== 200) return;

		const newFormData = new FormData();
		newFormData.append("photo", data.photo);
		newFormData.append("title", data.title);
		newFormData.append("price", data.price + "");
		newFormData.append("description", data.description);
		const errors = await uploadProduct(newFormData);
		if (errors) {
			// setError("");
		}
	});
	const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
		const { success, result } = await getUploadUrl();
		if (success) {
			const { id, uploadURL } = result;
			setUploadUrl(uploadURL);
			setFile(file);
			setValue("photo", `https://imagedelivery.net/59L1jwv_XqyOgDmZ_Moo2w/${id}`);
		}
	};
	const onValid = async () => {
		await onSubmit();
	};

	return (
		<form action={onValid} className="flex flex-col gap-4 p-5">
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
						{errors.photo?.message}
					</>
				) : null}
			</label>
			<Input onChange={onImageChange} id="photo" name="photo" type="file" accept="image/" className="hidden" />
			<Input required type="text" placeholder="Title" errors={[errors.title?.message ?? ""]} {...register("title")} />
			<Input required type="number" placeholder="Price" errors={[errors.price?.message ?? ""]} {...register("price")} />
			<Input
				required
				type="text"
				placeholder="설명을 입력해주세요."
				errors={[errors.description?.message ?? ""]}
				{...register("description")}
			/>
			<Button text="작성 완료" />
		</form>
	);
}
