import { SURPRISE_ME_PROMPTS } from './constants';
import FileSaver from 'file-saver';

export const getRandomPropmt = (prompt) => {
	const randomIndex = Math.floor(Math.random() * SURPRISE_ME_PROMPTS.length);
	const randomPrompt = SURPRISE_ME_PROMPTS[randomIndex];
	if (randomPrompt === prompt) return getRandomPropmt(prompt);
	return randomPrompt;
};

export const downloadImage = async (_id, photo) => {
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
