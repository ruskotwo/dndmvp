export const handleUpdateItem = (data, state, setState) => {
    const updatedItem = data;
    if (!updatedItem || typeof updatedItem !== 'object' || !updatedItem.id || !updatedItem.key || !updatedItem.value) {
        console.error('Invalid data received for item update:', updatedItem);
        return;
    }

    const updatedItems = state.items.map(item => {
        if (item.id === updatedItem.id) {
            return {
                ...item,
                [updatedItem.key]: updatedItem.value
            };
        } else {
            return item;
        }
    });

    setState({
        ...state,
        items: updatedItems
    });
};
