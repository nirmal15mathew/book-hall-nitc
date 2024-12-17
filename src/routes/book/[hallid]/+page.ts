import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    // load schedule from db based on hall id and start date and end date
	return {
        title: 'Hi'
    }

	error(404, 'Not found');
};