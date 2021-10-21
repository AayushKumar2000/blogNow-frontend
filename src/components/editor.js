import React, { useState } from 'react';
import { draft,EditorState ,convertToRaw,convertFromRaw , mergeEntityData, ContentState, ContentBlock} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToMarkdown from 'draftjs-to-markdown';
import {stateToHTML} from 'draft-js-export-html';


function MyEditor({editorContent,draftID}) {
  // const [editorState, setEditorState] = useState(
  //   () => EditorState.createEmpty()
  // );
  let newEditorState = EditorState.createEmpty();
  
  if(draftID){
  const data = JSON.parse(localStorage.getItem(draftID));
  console.log(data.editorState)

   newEditorState = EditorState.createWithContent(convertFromRaw(data.editorState))
  }


  const [editorState, setEditorState] = useState(
    () => newEditorState 
  );


  let currentContentAsHTML="";

  const handleEditorChange = (state) => {
    setEditorState(state);
    editorContent(convertToRaw(editorState.getCurrentContent()))
  }


  return (
    <div >
      <Editor 
      editorState={editorState} 
      placeholder="Write here"
      onEditorStateChange={handleEditorChange}
      // wrapperClassName="p-2"
       editorClassName="pl-5 pr-5"
      // toolbarClassName="shadow-sm "      
      toolbar={{
        colorPicker: {
          icon: 'color',
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          colors: [
          '#000000',
          '#EF4444',
          '#D1D5DB',
          '#FCD34D',
          '#10B981',
          '#3B82F6',
          '#6366F1',
          '#8B5CF6',
          '#EC4899'],
        },
        fontFamily: {
          options: ['Arial', 'Georgia', 'Times New Roman', 'Cambria', 'Roboto'],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
        },
      }}
      />
    </div>
  )

}

 export default MyEditor;