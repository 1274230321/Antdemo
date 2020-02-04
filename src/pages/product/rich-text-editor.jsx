import React,{ useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Input } from "antd";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

let RichTextEditor = (props, ref) => {
    const [editorState, setEditorState] = useState()
    const { TextArea } = Input
    const {detail} = props
    //hooks
    useImperativeHandle(
      ref,
      () => ({
        getDetail : () => draftToHtml(convertToRaw(editorState.getCurrentContent()))
      }))

      useEffect(() => {
        let editorState
        if(detail){
          const blocksFromHtml = htmlToDraft(detail)
          const { contentBlocks, entityMap } = blocksFromHtml
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap) 
          editorState = EditorState.createWithContent(contentState)
        }else{
          editorState = EditorState.createEmpty()
        }
        setEditorState(editorState)
      }, [])
    //callback

    return (
        <div>
        <Editor
          editorState={editorState}
          editorStyle={{height: 250, border: '1px solid #000', padding: '0 30px'}}
          onEditorStateChange={setEditorState}
        />
      </div>
    )

}
RichTextEditor = forwardRef(RichTextEditor)
export default RichTextEditor;