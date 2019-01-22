import {createCustomRelationWidget} from 'netlify-cms'
// import {renderSuggestion} from './Suggestion'

const {control, preview} = CMS.createCustomRelationWidget({
	collection: 'editorials',
	displayName: 'EditorialControl',
	searchFields: ['semester', 'title'],
})

export default control
export {preview}

