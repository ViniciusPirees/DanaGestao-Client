import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
export default function Colunas({ colunas, setColunas, refCol2, setColAtivo }) {
  // React state to track order of items
  //const [itemList, setItemList] = useState(defaultList);

  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...colunas];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setColunas(updatedList);
  };

  const handleChange = (e, index) => {
    var items = [...colunas];
    items[index][3] = e.target.checked;
    setColunas(items);
  };

  return (
    <>
      <div
        ref={refCol2}
        className="absolute z-[51] rounded-lg p-3 w-48 max-h-96 overflow-y-auto right-0 top-[2.75rem] bg-[#fff]"
      >
        <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="list-container">
            {(provided) => (
              <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {colunas.map(
                  (item, index) =>
                    item[4] != "" && (
                      <>
                        <Draggable
                          key={item[0]}
                          draggableId={item[0]}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="ms-2 text-lg font-medium text-[#000] dark:text-gray-300"
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 mr-2"
                                defaultChecked={item[3]}
                                onChange={(e) => handleChange(e, index)}
                              />
                              {item[0]}
                              {index + 1 != colunas.length && (
                                <hr className="border-1 my-1 mx-4 border-[#f3f3f3]"></hr>
                              )}
                            </div>
                          )}
                        </Draggable>
                      </>
                    )
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
