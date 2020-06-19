import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [ newColor, setNewColor ] = useState( initialColor );

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth().put( `/api/colors/${ colorToEdit.id }`, colorToEdit )
      .then( response => updateColors( prev => prev.map( c => c.id === colorToEdit.id ? colorToEdit : c ) ) )
      .catch( error => console.error( error ) );

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const addNewColor = e =>
  {
    e.preventDefault();
    axiosWithAuth().post( "/api/colors" , newColor )
      .then( response => updateColors( response.data ) )
      .catch( error => console.error( error ) );
  }

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete( `/api/colors/${ color.id }` )
      .then( response => updateColors( previous => previous.filter( x => color.id !== x.id ) ) )
      .catch( error => console.error( error ) );
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={ addNewColor }>
          <legend>Add New Color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add</button>
          </div>
        </form>
    </div>
  );
};

export default ColorList;
