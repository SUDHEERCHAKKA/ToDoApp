import React, { useState } from "react";
import "./List.css";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './Dialog.css';

function List(props) {
  const { itemList, setItemList } = props;
  const [editItem, setEditItem] = useState({ key: null, value: "" });

  function deleteItemList(key) {
    const newList = itemList.filter((item) => item.key !== key);
    setItemList(newList);
  }

  function handleEditClick(key, item) {
    setEditItem({ key, value: item });
  }

  function handleEditSave() {
    const updatedList = itemList.map((itemObj) => {
      if (itemObj.key === editItem.key) {
        return { key: itemObj.key, item: editItem.value };
      }
      return itemObj;
    });

    setItemList(updatedList);
    setEditItem({ key: null, value: "" });
  }

  return (
    <div>
      {itemList.map((itemObj) => (
        <div key={itemObj.key} className="item">
          {/* {editItem.key === itemObj.key ? (
            <div>
              <input
                type="text"
                value={editItem.value}
                onChange={(e) => setEditItem({ ...editItem, value: e.target.value })}
              />
              <button onClick={handleEditSave}>Save</button>
            </div>
          ) : ( */}
            <div className="direction">
              <div><p>{itemObj.item}</p></div>
              <div className="move">
                {/* <button onClick={() => handleEditClick(itemObj.key, itemObj.item)}>Edit</button> */}
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button className="Button violet" onClick={() => handleEditClick(itemObj.key, itemObj.item)}>Edit</button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
                      <Dialog.Description className="DialogDescription">
                        Make changes to your todo here. Click Save When You're Done.
                      </Dialog.Description>
                      <fieldset className="Fieldset">
                        <label className="Label" htmlFor="name">
                          Name
                        </label>
                        <input className="Input" 
                          value={editItem.value}
                          onChange={(e) => setEditItem({ ...editItem, value: e.target.value })}
                          id="name" defaultValue="Pedro Duarte" />
                      </fieldset>
                      <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                        <Dialog.Close asChild>
                          <button className="Button green" onClick={handleEditSave}>Save changes</button>
                        </Dialog.Close>
                      </div>
                      <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                          <Cross2Icon />
                        </button>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <button onClick={() => deleteItemList(itemObj.key)}>x</button>
              </div>
            </div>
        </div>
      ))}
    </div>
  );
}

export default List;