import {createCustomRelationWidget} from 'netlify-cms'
// import {renderSuggestion} from './Suggestion'

console.log(createCustomRelationWidget)

const {control, preview} = createCustomRelationWidget({
	collection: 'authors',
	displayName: 'AuthorControl',
	searchFields: ['semester', 'title'],
})

export default control
export {preview}
