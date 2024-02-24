export const handleDeleteItem = (data, state, setState) => {
    const itemId = data;
    if (!itemId) {
        console.error('Invalid item id:', itemId);
        return;
    }

    const updatedItems = state.items.filter(item => item.id !== itemId);

    setState({
        ...state,
        items: updatedItems
    });
};
