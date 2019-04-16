import { createCustomRelationWidget } from 'netlify-cms'
import Option from './Option'

const { control, preview } = createCustomRelationWidget({
	collection: 'authors',
	displayName: 'AuthorControl',
	searchFields: ['semester', 'title'],
	components: { Option },
})

export default control
export { preview }
