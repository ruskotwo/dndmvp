export const handleCreateItem = (data, state, setState) => {
    const newItem = data;
    if (!newItem || typeof newItem !== 'object' || !newItem.id) {
        console.error('Invalid data for creating item:', newItem);
        return;
    }

    if (state.items.find(item => item.id === newItem.id)) {
        console.error('Item with ID already exists:', newItem.id);
        return;
    }

    setState(prevState => ({
        ...state,
        items: [...prevState.items, newItem]
    }));
};
