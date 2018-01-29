import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const sampleMarkup =
  '<b>Bold text</b>, <i>Italic text</i><br/ ><br />';

const blocksFromHTML = convertFromHTML(sampleMarkup);
const state = ContentState.createFromBlockArray(
  blocksFromHTML.contentBlocks,
  blocksFromHTML.entityMap
);

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    // const DBEditorState = convertFromRaw(content);

    this.state = { editorState: EditorState.createWithContent(state), };
  }
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  onChange(editorState) {
    this.setState({ editorState });
    const contentState = editorState.getCurrentContent();
    console.log(convertToRaw(editorState));
  }
  render() {
    console.log(this.props, 'props');
    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange}
        placeholder="place your text..."
      />
    );
  }
}

export default MyEditor;
