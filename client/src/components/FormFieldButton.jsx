import React from 'react';

const FormField = ({
	LabelName,
	type,
	name,
	placeholder,
	value,
	handleChange,
	isSurpriseMe,
	handleSurpriseMe,
	data,
	generatingImage,
	buttonFunction,
}) => {
	return (
		<div>
			<div className='flex items-center gap-2 mb-2'>
				<label
					htmlFor={name}
					className='block text-sm font-medium text-gray-900'
				>
					{LabelName}
				</label>
				{isSurpriseMe && (
					<button
						type='button'
						onClick={handleSurpriseMe}
						className='font-semibold text-xs bg-[#ECECEC] py-1 px-2 rounded-[5px] text-black'
					>
						Surprise me
					</button>
				)}
			</div>
			<div className='relative'>
				<input
					type={type}
					id={name}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					required
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#777] focus:border-[#777] outline-none block w-full p-3'
				/>
				<button
					type='button'
					onClick={buttonFunction}
					disabled={!data.prompt || generatingImage}
					className={` absolute bottom-0 right-0 text-white font-medium  rounded-r-md text-sm w-auto px-5 py-2.5 text-center h-[100%] ${
						data.prompt && !generatingImage ? 'bg-[#000000]' : 'bg-[#777]'
					}`}
				>
					{generatingImage ? 'Generating ...' : 'Generate'}
				</button>
			</div>
		</div>
	);
};

export default FormField;
