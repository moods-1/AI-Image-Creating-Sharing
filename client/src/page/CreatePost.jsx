import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPropmt } from '../helpers/helperFunctions';
import { API_BASE_ROUTE } from '../helpers/constants';
import { generateAiImage } from '../api/dalle';
import { generatePost } from '../api/post';
import { FormField, FormFieldButton, Loader } from '../components';

const CreatePost = () => {
	const navigate = useNavigate();
	const [generatingImage, setGeneratingImage] = useState(false);
	const [loading, setLoading] = useState(false);
	const [postForm, setPostForm] = useState({
		name: '',
		prompt: '',
		photo: '',
	});

	const generateImage = async () => {
		if (postForm.prompt) {
			setGeneratingImage(true);
			const response = await generateAiImage({ prompt: postForm.prompt });
			if (response.status === 200) {
				setPostForm({
					...postForm,
					photo: `data:image/jpeg;base64,${response.data.photo}`,
				});
			} else {
				alert('There was an error generating the image.');
			}
			setGeneratingImage(false);
		} else {
			alert('Please enter a prompt.');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (postForm.prompt && postForm.photo) {
			setLoading(true);
			const response = await generatePost(postForm);
			if (response.status <= 300) {
				setLoading(false);
				navigate('/');
			} else {
				alert('There was an problem creating the post.');
			}
			setLoading(false);
		} else {
			alert('Please enter a prompt and generate an image.');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name) {
			setPostForm({ ...postForm, [name]: value || '' });
		}
	};

	const handleSurpriseMe = () => {
		const randomPrompt = getRandomPropmt(postForm.prompt);
		setPostForm({ ...postForm, prompt: randomPrompt });
	};

	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
				<p className='mt-2 text-[#666e75] text=[14px] max-w[500px]'>
					Create imaginative and stunning images through DALL-E AI and share
					them with the community.
				</p>
			</div>
			<form className='mt-8 max-w-3xl' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-5'>
					<FormField
						LabelName='Your name'
						type='text'
						name='name'
						placeholder='Cee Moods'
						value={postForm.name}
						handleChange={handleChange}
					/>
					<FormFieldButton
						LabelName='Prompt'
						type='text'
						name='prompt'
						placeholder='Enter something here'
						value={postForm.prompt}
						handleChange={handleChange}
						isSurpriseMe
						handleSurpriseMe={handleSurpriseMe}
						data={postForm}
						generatingImage={generatingImage}
						buttonFunction={generateImage}
					/>
					<div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
						{postForm.photo ? (
							<img
								src={postForm.photo}
								alt={postForm.prompt}
								className='w-full h-full object-contain'
							/>
						) : (
							<img
								src={preview}
								alt='preview'
								className='w-9/12 h-9/12 object-contain opacity-40'
							/>
						)}
						{generatingImage && (
							<div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
								<Loader />
							</div>
						)}
					</div>
				</div>

				<div className='mt-10'>
					<p className='mt-2 text-[#666E75] text-[14px]'>
						Once you have created the image, you can share it with the
						community.
					</p>
					<button
						type='submit'
						className='mt-3 text-white bg-[#04c401] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
					>
						{loading ? 'Sharing ...' : 'Share with the community'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default CreatePost;
