import { createCustomRelationWidget } from 'netlify-cms'
import Option from './Option'
import MultiValueLabel from './MultiValueLabel'

const { control, preview } = createCustomRelationWidget({
	collection: 'authors',
	displayName: 'AuthorControl',
	searchFields: ['semester', 'title'],
	components: { Option, MultiValueLabel },
})

export default control
export { preview }
