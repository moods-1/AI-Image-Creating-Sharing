import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import Home from './page/Home';
import CreatePost from './page/CreatePost';

const App = () => {
	return (
		<div>
			<header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
				<Link to='/'>
					<img src={logo} alt='logo' className='w-28 object-contain' />
				</Link>
				<Link
					to='/create-post'
					className='bg-[#000000] text-sm text-white px-5 py-1 rounded-md'
				>
					Create
				</Link>
			</header>
			<main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/create-post' element={<CreatePost />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
