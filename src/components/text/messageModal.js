import React from 'react'
import { Modal } from 'react-responsive-modal';
import { WithContext as ReactTags } from 'react-tag-input';

const CONTACTS = ["new","new 2"]
const suggestions = CONTACTS.map(contact => {
    return {
      id: contact,
      text: contact
    };
  });
  
  const KeyCodes = {
    comma: 188,
    enter: 13
  };
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

const MessageModal = ({open, handleCloseMessageModal}) => {
    const [tags, setTags] = React.useState([
        { id: 'Thailand', text: 'Thailand' },
        { id: 'India', text: 'India' },
        { id: 'Vietnam', text: 'Vietnam' },
        { id: 'Turkey', text: 'Turkey' }
      ]);
    
      const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
      };
    
      const handleAddition = tag => {
        setTags([...tags, tag]);
      };
      const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        setTags(newTags);
      };
    
      const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
      };
  return (
        <Modal open={open} onClose={handleCloseMessageModal} center>
            <div className="modal-header">
                <h3>New Message</h3>
            </div>
            <div className="modal-body">
                <form className="main-form">
                    <div className="field-group flexFull searchField">
                        <label>Enter Contact Name</label>
                        <ReactTags
                            tags={tags}
                            suggestions={suggestions}
                            delimiters={delimiters}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            handleTagClick={handleTagClick}
                            inputFieldPosition="bottom"
                            autocomplete
                        />
                    </div>
                    <div className="field-group flexFull">
                        <label>Message</label>
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Type your message"
                            name="name"
                        />
                    </div>
                    <div className="field-group flexFull text-center mt-3">
                        <button type="button" className="btn btn-cancel me-3" onClick={() => handleCloseMessageModal()} > Dismiss </button>
                        <button type="button" className="btn btn-primary"> Save </button>
                    </div>
                </form>
            </div>
        </Modal>
  )
}

export default MessageModal